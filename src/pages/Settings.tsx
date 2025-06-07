
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Palette, Globe } from "lucide-react";

const Settings = () => {
  return (
    <PageLayout
      title="Paramètres"
      subtitle="Gérez vos préférences et paramètres de compte"
    >
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Apparence
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Langue
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Informations du profil</CardTitle>
                <CardDescription>
                  Modifiez vos informations personnelles et votre profil public
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Votre prénom"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Votre nom"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="username" className="text-gray-300">Nom d'utilisateur</Label>
                  <Input
                    id="username"
                    placeholder="@votreusername"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                  <Input
                    id="bio"
                    placeholder="Parlez-nous de vous..."
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Sauvegarder les modifications
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Préférences de notification</CardTitle>
                <CardDescription>
                  Gérez vos notifications et alertes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notifications push</p>
                    <p className="text-gray-400 text-sm">Recevez des notifications sur votre appareil</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notifications email</p>
                    <p className="text-gray-400 text-sm">Recevez des notifications par email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Nouvelles transactions</p>
                    <p className="text-gray-400 text-sm">Alertes pour les nouvelles transactions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Offres NFT</p>
                    <p className="text-gray-400 text-sm">Notifications pour les offres sur vos NFTs</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Sécurité</CardTitle>
                <CardDescription>
                  Gérez vos paramètres de sécurité et d'authentification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Authentification à deux facteurs</p>
                    <p className="text-gray-400 text-sm">Renforcez la sécurité de votre compte</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Mode privé</p>
                    <p className="text-gray-400 text-sm">Masquez votre profil des recherches publiques</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Changer le mot de passe</Label>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Mot de passe actuel"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Input
                      type="password"
                      placeholder="Nouveau mot de passe"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Input
                      type="password"
                      placeholder="Confirmer le nouveau mot de passe"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    Mettre à jour le mot de passe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Apparence</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence de l'application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Thème</Label>
                  <Select defaultValue="dark">
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Langue et région</CardTitle>
                <CardDescription>
                  Choisissez votre langue et vos préférences régionales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Langue</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Devise</Label>
                  <Select defaultValue="eur">
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eth">ETH (Ξ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Settings;
