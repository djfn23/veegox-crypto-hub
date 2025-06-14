
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  to: string;
  type: 'swap_success' | 'price_alert' | 'transaction_complete' | 'security_alert';
  data: any;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, type, data }: NotificationRequest = await req.json();

    let subject = '';
    let html = '';

    switch (type) {
      case 'swap_success':
        subject = 'Swap exécuté avec succès';
        html = `
          <h2>Votre swap a été exécuté</h2>
          <p><strong>De:</strong> ${data.fromAmount} ${data.fromToken}</p>
          <p><strong>Vers:</strong> ${data.toAmount} ${data.toToken}</p>
          <p><strong>Hash de transaction:</strong> ${data.txHash}</p>
        `;
        break;
      case 'price_alert':
        subject = `Alerte de prix: ${data.token}`;
        html = `
          <h2>Alerte de prix</h2>
          <p><strong>${data.token}</strong> a atteint ${data.price} ${data.currency}</p>
          <p>Variation: ${data.change > 0 ? '+' : ''}${data.change}%</p>
        `;
        break;
      case 'transaction_complete':
        subject = 'Transaction complétée';
        html = `
          <h2>Transaction confirmée</h2>
          <p><strong>Montant:</strong> ${data.amount} ${data.token}</p>
          <p><strong>Status:</strong> Confirmée</p>
        `;
        break;
      case 'security_alert':
        subject = 'Alerte de sécurité';
        html = `
          <h2>Alerte de sécurité</h2>
          <p>${data.message}</p>
          <p>Si ce n'était pas vous, veuillez sécuriser votre compte immédiatement.</p>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "VeegoX <noreply@veegox.com>",
      to: [to],
      subject,
      html,
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
