
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Palette, Globe, Wallet } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("fr");
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <PageLayout
      title="Paramètres"
      subtitle="Gérez vos préférences et paramètres de compte"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profil */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5" />
              Profil
            </CardTitle>
            <CardDescription>
              Informations personnelles et paramètres du compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Nom d'utilisateur</Label>
                <Input
                  defaultValue="user123"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input
                  defaultValue="user@example.com"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Bio</Label>
              <Input
                placeholder="Décrivez-vous en quelques mots..."
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Apparence */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Apparence
            </CardTitle>
            <CardDescription>
              Personnalisez l'apparence de l'interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Thème</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Sombre</SelectItem>
                    <SelectItem value="light">Clair</SelectItem>
                    <SelectItem value="auto">Automatique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Langue</Label>
                <Select value={language} onValueChange={setLanguage}>
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
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configurez vos préférences de notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Notifications générales</Label>
                <p className="text-sm text-gray-400">Recevoir des notifications sur l'activité</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Notifications par email</Label>
                <p className="text-sm text-gray-400">Recevoir des emails pour les événements importants</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Sécurité */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Sécurité
            </CardTitle>
            <CardDescription>
              Paramètres de sécurité et authentification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Authentification à deux facteurs</Label>
                <p className="text-sm text-gray-400">Sécurisez votre compte avec 2FA</p>
              </div>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </div>
            <Separator className="bg-gray-700" />
            <div className="space-y-2">
              <Button variant="outline" className="border-gray-600 text-gray-300">
                Changer le mot de passe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Portefeuilles connectés */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Portefeuilles connectés
            </CardTitle>
            <CardDescription>
              Gérez vos portefeuilles Web3 connectés
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">MetaMask</p>
                  <p className="text-sm text-gray-400">0x1234...5678</p>
                </div>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                  Déconnecter
                </Button>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Connecter un nouveau portefeuille
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="border-gray-600 text-gray-300">
            Annuler
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Sauvegarder
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
