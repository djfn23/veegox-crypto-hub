
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { texts, getResponsiveText } from '@/lib/constants/texts';
import { Chrome, Twitter, Mail, Lock, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: redirectUrl
        }
      });
      
      if (error) throw error;
      
      toast.success(texts.auth.modal.messages.signupSuccess);
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
      
      toast.success(texts.auth.modal.messages.signinSuccess);
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'twitter') => {
    setOauthLoading(provider);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
          queryParams: provider === 'google' ? {
            access_type: 'offline',
            prompt: 'consent',
          } : undefined
        }
      });
      
      if (error) throw error;
      
      // Don't close modal or show success message here - the redirect will handle it
    } catch (error: any) {
      console.error(`${provider} OAuth error:`, error);
      if (error.message.includes('Invalid login credentials')) {
        toast.error(`Erreur de connexion ${provider}. Veuillez réessayer.`);
      } else if (error.message.includes('not configured')) {
        toast.error(`L'authentification ${provider} n'est pas configurée.`);
      } else {
        toast.error(`Erreur de connexion avec ${provider}: ${error.message}`);
      }
    } finally {
      setOauthLoading(null);
    }
  };

  const OAuthButton = ({ 
    provider, 
    icon: Icon, 
    label, 
    colorClass 
  }: { 
    provider: 'google' | 'twitter'; 
    icon: any; 
    label: string; 
    colorClass: string;
  }) => (
    <Button
      onClick={() => handleOAuthSignIn(provider)}
      disabled={oauthLoading !== null}
      className={`w-full ${colorClass} ${isMobile ? 'h-12 text-base' : 'h-10'}`}
    >
      {oauthLoading === provider ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
      ) : (
        <Icon className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />
      )}
      {oauthLoading === provider ? 'Connexion...' : label}
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'w-[95vw] h-[90vh] max-w-none flex flex-col' : 'sm:max-w-md'} bg-slate-900 border-slate-700`}>
        <DialogHeader className={isMobile ? 'flex-shrink-0' : ''}>
          <DialogTitle className="text-white text-center">{texts.auth.modal.title}</DialogTitle>
        </DialogHeader>
        
        <div className={`${isMobile ? 'flex-1 overflow-y-auto' : ''} px-1`}>
          {/* OAuth Buttons Section */}
          <div className={`space-y-3 ${isMobile ? 'mb-6' : 'mb-4'}`}>
            <OAuthButton
              provider="google"
              icon={Chrome}
              label="Continuer avec Google"
              colorClass="bg-white hover:bg-gray-100 text-gray-900 border border-gray-300"
            />
            
            <OAuthButton
              provider="twitter"
              icon={Twitter}
              label="Continuer avec Twitter"
              colorClass="bg-blue-500 hover:bg-blue-600 text-white"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-slate-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">ou</span>
            </div>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 bg-slate-800 ${isMobile ? 'h-12 mt-6' : 'mt-4'}`}>
              <TabsTrigger 
                value="signin" 
                className={`text-white data-[state=active]:bg-slate-700 ${isMobile ? 'text-sm py-3' : ''}`}
              >
                <Mail className="h-4 w-4 mr-1" />
                {getResponsiveText(texts.auth.modal.tabs.signin, isMobile)}
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className={`text-white data-[state=active]:bg-slate-700 ${isMobile ? 'text-sm py-3' : ''}`}
              >
                <User className="h-4 w-4 mr-1" />
                {getResponsiveText(texts.auth.modal.tabs.signup, isMobile)}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className={`space-y-4 ${isMobile ? 'mt-6' : 'mt-4'}`}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">{texts.auth.modal.fields.email.label}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={texts.auth.modal.fields.email.placeholder}
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">{texts.auth.modal.fields.password.label}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={texts.auth.modal.fields.password.placeholder}
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
                />
              </div>
              <Button 
                onClick={handleSignIn} 
                className={`w-full bg-blue-600 hover:bg-blue-700 ${isMobile ? 'h-12 text-base mt-6' : ''}`}
                disabled={isLoading || oauthLoading !== null}
              >
                <Lock className="h-4 w-4 mr-2" />
                {isLoading ? texts.auth.modal.buttons.signin.loading : texts.auth.modal.buttons.signin.default}
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className={`space-y-4 ${isMobile ? 'mt-6' : 'mt-4'}`}>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">{texts.auth.modal.fields.fullName.label}</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={texts.auth.modal.fields.fullName.placeholder}
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">{texts.auth.modal.fields.email.label}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={texts.auth.modal.fields.email.placeholder}
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">{texts.auth.modal.fields.password.label}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={texts.auth.modal.fields.password.placeholder}
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
                />
              </div>
              <Button 
                onClick={handleSignUp} 
                className={`w-full bg-green-600 hover:bg-green-700 ${isMobile ? 'h-12 text-base mt-6' : ''}`}
                disabled={isLoading || oauthLoading !== null}
              >
                <User className="h-4 w-4 mr-2" />
                {isLoading ? texts.auth.modal.buttons.signup.loading : texts.auth.modal.buttons.signup.default}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
