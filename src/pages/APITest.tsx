
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { StripePaymentTest } from '@/components/test/StripePaymentTest';
import { ResendEmailTest } from '@/components/test/ResendEmailTest';
import { APIStatusWidget } from '@/components/dashboard/APIStatusWidget';
import { Settings } from 'lucide-react';

const APITest = () => {
  return (
    <PageLayout
      title="Test des APIs"
      subtitle="Testez les intégrations Stripe et Resend"
      icon={<Settings className="h-6 w-6 text-purple-400" />}
    >
      <div className="space-y-6">
        {/* Statut des APIs */}
        <APIStatusWidget />
        
        {/* Tests des APIs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StripePaymentTest />
          <ResendEmailTest />
        </div>

        {/* Instructions */}
        <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Instructions de test</h3>
          <div className="space-y-4 text-gray-300">
            <div>
              <h4 className="text-blue-400 font-medium">Stripe Payment:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Utilisez la carte test: 4242 4242 4242 4242</li>
                <li>Date d'expiration: toute date future</li>
                <li>CVC: tout code à 3 chiffres</li>
                <li>Le paiement s'ouvrira dans un nouvel onglet</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-medium">Resend Email:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Entrez votre adresse email pour recevoir le test</li>
                <li>Choisissez le type de notification à tester</li>
                <li>Optionnel: ajoutez des données JSON personnalisées</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default APITest;
