
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Lock, Eye, Smartphone, AlertTriangle, CheckCircle, Key, Globe } from "lucide-react";

const Security = () => {
  const [settings, setSettings] = useState({
    twoFactor: false,
    emailAlerts: true,
    loginNotifications: true,
    deviceTracking: true,
    sessionTimeout: true
  });

  const connections = [
    { device: "iPhone 14 Pro", location: "Paris, France", lastActive: "Maintenant", current: true },
    { device: "MacBook Pro", location: "Paris, France", lastActive: "Il y a 2h", current: false },
    { device: "Chrome Windows", location: "Lyon, France", lastActive: "Il y a 1 jour", current: false },
    { device: "Unknown Device", location: "Berlin, Germany", lastActive: "Il y a 3 jours", current: false, suspicious: true }
  ];

  const auditLogs = [
    { action: "Connexion réussie", ip: "192.168.1.100", time: "Il y a 5 min", risk: "low" },
    { action: "Changement de mot de passe", ip: "192.168.1.100", time: "Il y a 2h", risk: "medium" },
    { action: "Tentative de connexion échouée", ip: "45.123.67.89", time: "Il y a 1 jour", risk: "high" },
    { action: "Token créé", ip: "192.168.1.100", time: "Il y a 2 jours", risk: "low" },
    { action: "Portefeuille connecté", ip: "192.168.1.100", time: "Il y a 3 jours", risk: "low" }
  ];

  const securityScores = {
    overall: 85,
    password: 90,
    twoFactor: settings.twoFactor ? 100 : 0,
    devices: 80,
    network: 85
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Shield className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Sécurité</h1>
        </div>

        {/* Security Score */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">Score de Sécurité</CardTitle>
            <CardDescription className="text-gray-300">
              Évaluation globale de la sécurité de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-8 border-gray-700 flex items-center justify-center">
                  <div className="text-2xl font-bold text-white">{securityScores.overall}%</div>
                </div>
                <div 
                  className="absolute top-0 left-0 w-24 h-24 rounded-full border-8 border-green-400 border-t-transparent transform -rotate-90"
                  style={{ 
                    borderImage: `conic-gradient(#10b981 ${securityScores.overall * 3.6}deg, transparent 0deg) 1`
                  }}
                ></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{securityScores.password}%</div>
                  <div className="text-xs text-gray-400">Mot de passe</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{securityScores.twoFactor}%</div>
                  <div className="text-xs text-gray-400">2FA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{securityScores.devices}%</div>
                  <div className="text-xs text-gray-400">Appareils</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{securityScores.network}%</div>
                  <div className="text-xs text-gray-400">Réseau</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="settings" className="text-white">Paramètres</TabsTrigger>
            <TabsTrigger value="devices" className="text-white">Appareils</TabsTrigger>
            <TabsTrigger value="audit" className="text-white">Journal</TabsTrigger>
            <TabsTrigger value="recommendations" className="text-white">Conseils</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-6">
            <div className="grid gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Authentification
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Configurez vos méthodes d'authentification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Authentification à deux facteurs (2FA)</div>
                        <div className="text-gray-400 text-sm">Protection supplémentaire avec votre téléphone</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={settings.twoFactor}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, twoFactor: checked }))}
                        />
                        {!settings.twoFactor && (
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                            <Smartphone className="h-4 w-4 mr-1" />
                            Configurer
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Mot de passe</div>
                        <div className="text-gray-400 text-sm">Dernière modification il y a 2 mois</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Key className="h-4 w-4 mr-1" />
                        Changer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Notifications de Sécurité
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Alertes pour les activités suspectes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Alertes par email</div>
                        <div className="text-gray-400 text-sm">Notifications en cas d'activité suspecte</div>
                      </div>
                      <Switch 
                        checked={settings.emailAlerts}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailAlerts: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Notifications de connexion</div>
                        <div className="text-gray-400 text-sm">Email à chaque nouvelle connexion</div>
                      </div>
                      <Switch 
                        checked={settings.loginNotifications}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, loginNotifications: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Suivi des appareils</div>
                        <div className="text-gray-400 text-sm">Enregistrer les nouveaux appareils</div>
                      </div>
                      <Switch 
                        checked={settings.deviceTracking}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, deviceTracking: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Déconnexion automatique</div>
                        <div className="text-gray-400 text-sm">Déconnexion après 30 minutes d'inactivité</div>
                      </div>
                      <Switch 
                        checked={settings.sessionTimeout}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sessionTimeout: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Appareils Connectés</CardTitle>
                <CardDescription className="text-gray-300">
                  Gérez les appareils qui ont accès à votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {connections.map((connection, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${connection.suspicious ? 'bg-red-500/10 border-red-500' : 'bg-white/5 border-gray-500'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                            {connection.device.includes('iPhone') ? (
                              <Smartphone className="h-5 w-5 text-white" />
                            ) : (
                              <Globe className="h-5 w-5 text-white" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-white font-medium">{connection.device}</h4>
                              {connection.current && <Badge className="bg-green-500">Actuel</Badge>}
                              {connection.suspicious && <Badge className="bg-red-500">Suspect</Badge>}
                            </div>
                            <p className="text-gray-400 text-sm">{connection.location}</p>
                            <p className="text-gray-500 text-xs">{connection.lastActive}</p>
                          </div>
                        </div>
                        {!connection.current && (
                          <Button 
                            variant={connection.suspicious ? "destructive" : "outline"} 
                            size="sm"
                          >
                            {connection.suspicious ? "Bloquer" : "Déconnecter"}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Journal d'Audit</CardTitle>
                <CardDescription className="text-gray-300">
                  Historique des actions de sécurité sur votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          log.risk === 'high' ? 'bg-red-500/20' : 
                          log.risk === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                        }`}>
                          {log.risk === 'high' ? (
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{log.action}</h4>
                          <p className="text-gray-400 text-sm">IP: {log.ip}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{log.time}</p>
                        <Badge 
                          variant={log.risk === 'high' ? 'destructive' : log.risk === 'medium' ? 'secondary' : 'default'}
                          className={log.risk === 'low' ? 'bg-green-500' : ''}
                        >
                          {log.risk === 'high' ? 'Élevé' : log.risk === 'medium' ? 'Moyen' : 'Faible'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <div className="grid gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recommandations de Sécurité</CardTitle>
                  <CardDescription className="text-gray-300">
                    Actions recommandées pour améliorer votre sécurité
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {!settings.twoFactor && (
                      <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                          <div className="flex-1">
                            <h4 className="text-white font-medium">Activez l'authentification 2FA</h4>
                            <p className="text-gray-400 text-sm">Réduisez de 99% les risques de piratage en activant la 2FA</p>
                          </div>
                          <Button size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600">
                            Activer
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-blue-400" />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">Vérifiez vos portefeuilles connectés</h4>
                          <p className="text-gray-400 text-sm">Assurez-vous que seuls vos portefeuilles sont connectés</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Vérifier
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">Mot de passe fort activé</h4>
                          <p className="text-gray-400 text-sm">Votre mot de passe respecte les bonnes pratiques</p>
                        </div>
                        <Badge className="bg-green-500">✓ Actif</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Bonnes Pratiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Utilisez un gestionnaire de mots de passe</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Ne partagez jamais vos clés privées</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Vérifiez toujours les URLs avant de vous connecter</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Utilisez des réseaux WiFi sécurisés</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Gardez vos appareils à jour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Security;
