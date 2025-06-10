
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key, AlertTriangle, CheckCircle } from "lucide-react";

const Security = () => {
  return (
    <PageLayout
      title="Sécurité"
      subtitle="Protégez votre compte et vos actifs"
      icon={<Shield className="h-6 w-6" />}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Statut de sécurité */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Statut de Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Authentification 2FA", status: true },
                { label: "Mot de passe fort", status: true },
                { label: "Email vérifié", status: true },
                { label: "Backup de récupération", status: false }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-white">{item.label}</span>
                  {item.status ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Paramètres de sécurité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Authentification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Configurer 2FA
              </Button>
              <Button variant="outline" className="w-full text-white border-white/20">
                Changer le mot de passe
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="h-5 w-5" />
                Clés de Récupération
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Générer des clés
              </Button>
              <Button variant="outline" className="w-full text-white border-white/20">
                Voir les clés existantes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Security;
