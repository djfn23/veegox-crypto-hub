
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Key, 
  Smartphone, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Lock,
  RefreshCw
} from "lucide-react";

const Security = () => {
  return (
    <PageLayout
      title="Sécurité"
      subtitle="Protégez votre compte et vos actifs"
      icon={<Shield className="h-6 w-6 text-green-400" />}
    >
      <div className="space-y-6">
        {/* Security Overview */}
        <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold">Niveau de Sécurité : Élevé</h3>
                <p className="text-green-300">Votre compte est bien protégé</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    2FA Activé
                  </Badge>
                  <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Wallet Sécurisé
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Password Security */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="h-5 w-5 text-blue-400" />
                Mot de Passe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Mot de passe actuel</Label>
                <Input 
                  type="password"
                  className="bg-white/5 border-white/10 text-white mt-2"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Label className="text-gray-300">Nouveau mot de passe</Label>
                <Input 
                  type="password"
                  className="bg-white/5 border-white/10 text-white mt-2"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Label className="text-gray-300">Confirmer le mot de passe</Label>
                <Input 
                  type="password"
                  className="bg-white/5 border-white/10 text-white mt-2"
                  placeholder="••••••••"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Lock className="h-4 w-4 mr-2" />
                Modifier le mot de passe
              </Button>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-purple-400" />
                Authentification à Deux Facteurs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">2FA par SMS</p>
                  <p className="text-gray-400 text-sm">+33 6 ** ** ** 45</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">App Authenticator</p>
                  <p className="text-gray-400 text-sm">Google Authenticator</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <p className="text-purple-300 text-sm">
                  <strong>Codes de récupération :</strong> Assurez-vous de sauvegarder vos codes de récupération dans un endroit sûr.
                </p>
              </div>

              <Button variant="outline" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                <RefreshCw className="h-4 w-4 mr-2" />
                Générer nouveaux codes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Session Management */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Sessions Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  device: "MacBook Pro - Chrome",
                  location: "Paris, France",
                  lastActive: "Actuellement",
                  current: true
                },
                {
                  device: "iPhone - Safari",
                  location: "Lyon, France", 
                  lastActive: "Il y a 2 heures",
                  current: false
                },
                {
                  device: "Windows - Edge",
                  location: "Marseille, France",
                  lastActive: "Il y a 1 jour",
                  current: false
                }
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Eye className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{session.device}</p>
                      <p className="text-gray-400 text-sm">{session.location} • {session.lastActive}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.current ? (
                      <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                        Session actuelle
                      </Badge>
                    ) : (
                      <Button variant="outline" size="sm" className="border-red-500/30 text-red-300 hover:bg-red-500/10">
                        Déconnecter
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Paramètres de Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Notifications de connexion</p>
                  <p className="text-gray-400 text-sm">Recevoir un email à chaque connexion</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Blocage automatique</p>
                  <p className="text-gray-400 text-sm">Verrouiller après 15 min d'inactivité</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">IP autorisées seulement</p>
                  <p className="text-gray-400 text-sm">Restreindre l'accès à certaines IP</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Activité Suspecte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">Aucune activité suspecte</span>
                </div>
                <p className="text-gray-300 text-sm mt-1">
                  Dernière vérification : Il y a 5 minutes
                </p>
              </div>

              <Button variant="outline" className="w-full">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Signaler un problème
              </Button>

              <Button variant="outline" className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10">
                <Lock className="h-4 w-4 mr-2" />
                Verrouiller le compte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Security;
