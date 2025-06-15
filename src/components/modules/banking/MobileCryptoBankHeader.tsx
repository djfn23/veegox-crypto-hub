
import { useState } from "react";
import { ArrowLeft, Shield, Plus, QrCode, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { useSecureToast } from "@/hooks/useSecureToast";

interface MobileCryptoBankHeaderProps {
  activeView: string | null;
  onBackClick: () => void;
  showQuickActions?: boolean;
}

export const MobileCryptoBankHeader = ({ 
  activeView, 
  onBackClick, 
  showQuickActions = true 
}: MobileCryptoBankHeaderProps) => {
  const { user } = useUnifiedAuth();
  const { isSupported: isBiometricSupported, isEnrolled: isBiometricEnrolled, enrollBiometric } = useBiometricAuth();
  const { success: toastSuccess, error: toastError } = useSecureToast();

  const handleEnableBiometric = async () => {
    if (!user) return;
    
    try {
      const result = await enrollBiometric(user.id);
      if (result.success) {
        await toastSuccess("Authentification biométrique activée");
      } else {
        await toastError(result.error || "Impossible d'activer l'authentification biométrique");
      }
    } catch (error) {
      await toastError("Erreur lors de l'activation biométrique");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with back button and security */}
      <div className="flex items-center justify-between">
        {activeView ? (
          <Button
            variant="ghost"
            onClick={onBackClick}
            className="touch-target-lg text-white p-3 -ml-1 hover:bg-white/10 active:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Retour</span>
          </Button>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex-shrink-0"></div>
            <div>
              <h1 className="text-xl font-bold text-white">Banque Crypto</h1>
              <p className="text-gray-400 text-sm">Services intelligents</p>
            </div>
          </div>
        )}
        
        {/* Security Badge */}
        <div className="flex items-center gap-2">
          {isBiometricEnrolled ? (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1.5">
              <Shield className="h-3 w-3 mr-1" />
              <span className="font-medium">Sécurisé</span>
            </Badge>
          ) : isBiometricSupported ? (
            <Button
              onClick={handleEnableBiometric}
              size="sm"
              variant="outline"
              className="border-green-600/50 text-green-400 hover:bg-green-600 hover:text-white touch-target transition-all duration-200 px-3 py-2"
            >
              <Shield className="h-4 w-4 mr-1" />
              <span className="font-medium">Sécuriser</span>
            </Button>
          ) : null}
        </div>
      </div>

      {/* Quick Actions - only show on main dashboard */}
      {!activeView && showQuickActions && (
        <div className="grid grid-cols-2 gap-4">
          <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 touch-target-xl p-4 h-auto flex-col shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]">
            <Plus className="h-6 w-6 mb-2 text-white" />
            <span className="text-sm font-semibold text-white">Nouveau Virement</span>
          </Button>
          <Button 
            variant="outline" 
            className="border-slate-600/50 bg-slate-800/50 text-white hover:bg-slate-700/70 touch-target-xl p-4 h-auto flex-col shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
          >
            <QrCode className="h-6 w-6 mb-2 text-purple-400" />
            <span className="text-sm font-semibold">Scanner QR</span>
          </Button>
        </div>
      )}
    </div>
  );
};
