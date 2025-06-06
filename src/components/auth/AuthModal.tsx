
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, Wallet } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onModeChange: (mode: "login" | "signup") => void;
}

const AuthModal = ({ isOpen, onClose, mode, onModeChange }: AuthModalProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleAuth = async (type: "login" | "signup") => {
    setLoading(true);
    try {
      if (type === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        toast.success("Compte créé ! Vérifiez votre email pour confirmer votre compte.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Connexion réussie !");
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    // Cette fonction sera implémentée avec Web3 plus tard
    toast.info("Connexion wallet sera disponible prochainement");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            {mode === "login" ? "Connexion à Veegox" : "Créer un compte Veegox"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {mode === "login" 
              ? "Connectez-vous pour accéder à votre dashboard" 
              : "Rejoignez la révolution DeFi avec Veegox"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={mode} onValueChange={(value) => onModeChange(value as "login" | "signup")}>
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="login" className="text-white">Connexion</TabsTrigger>
            <TabsTrigger value="signup" className="text-white">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>
            <Button 
              onClick={() => handleAuth("login")} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Se connecter
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>
            <Button 
              onClick={() => handleAuth("signup")} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Créer un compte
            </Button>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-400">ou</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          onClick={connectWallet}
          className="w-full border-slate-600 text-white hover:bg-slate-800"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connecter un Wallet
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
