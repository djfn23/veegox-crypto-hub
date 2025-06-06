
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Compte créé avec succès ! Vérifiez votre email.');
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success('Connexion réussie !');
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'w-[95vw] h-[90vh] max-w-none flex flex-col' : 'sm:max-w-md'} bg-slate-900 border-slate-700`}>
        <DialogHeader className={isMobile ? 'flex-shrink-0' : ''}>
          <DialogTitle className="text-white text-center">Authentification</DialogTitle>
        </DialogHeader>
        
        <div className={`${isMobile ? 'flex-1 overflow-y-auto' : ''} px-1`}>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 bg-slate-800 ${isMobile ? 'h-12' : ''}`}>
              <TabsTrigger 
                value="signin" 
                className={`text-white data-[state=active]:bg-slate-700 ${isMobile ? 'text-sm py-3' : ''}`}
              >
                {isMobile ? '📧 Connexion' : 'Connexion'}
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className={`text-white data-[state=active]:bg-slate-700 ${isMobile ? 'text-sm py-3' : ''}`}
              >
                {isMobile ? '🆕 Inscription' : 'Inscription'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className={`space-y-4 ${isMobile ? 'mt-6' : 'mt-4'}`}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
                />
              </div>
              <Button 
                onClick={handleSignIn} 
                className={`w-full bg-blue-600 hover:bg-blue-700 ${isMobile ? 'h-12 text-base mt-6' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className={`space-y-4 ${isMobile ? 'mt-6' : 'mt-4'}`}>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">Nom complet</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jean Dupont"
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
                />
              </div>
              <Button 
                onClick={handleSignUp} 
                className={`w-full bg-green-600 hover:bg-green-700 ${isMobile ? 'h-12 text-base mt-6' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Inscription...' : 'S\'inscrire'}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
