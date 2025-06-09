
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";

const Profile = () => {
  return (
    <PageLayout
      title="Mon Profil"
      subtitle="Gérez vos informations personnelles"
      icon={<User className="h-6 w-6" />}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-purple-600 text-white text-xl">JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="text-white border-white/20">
                <Edit className="h-4 w-4 mr-2" />
                Changer la photo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">Prénom</Label>
                <Input
                  id="firstName"
                  defaultValue="John"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">Nom</Label>
                <Input
                  id="lastName"
                  defaultValue="Doe"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Téléphone</Label>
                <Input
                  id="phone"
                  defaultValue="+33 1 23 45 67 89"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" className="text-white border-white/20">
                Annuler
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Profile;
