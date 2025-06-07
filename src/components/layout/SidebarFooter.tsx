
import React from "react"
import { Link } from "react-router-dom"
import { TouchTarget } from "@/components/ui/mobile-touch-target"
import { MobileCard, MobileText } from "@/components/ui/mobile-components"
import { 
  Settings, 
  HelpCircle, 
  Shield, 
  LogOut,
  User,
  Crown
} from "lucide-react"

interface SidebarFooterProps {
  onItemClick?: () => void
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ onItemClick }) => {
  return (
    <div className="mt-auto p-4 space-y-4">
      {/* Profil utilisateur */}
      <MobileCard variant="glass" padding="sm" className="border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <Crown className="h-2 w-2 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">John Doe</p>
            <MobileText variant="caption" className="text-gray-400">
              Premium Member
            </MobileText>
          </div>
        </div>
      </MobileCard>

      {/* Actions rapides */}
      <div className="space-y-1">
        <TouchTarget
          asChild
          size="lg"
          variant="ghost"
          className="w-full justify-start px-3 text-sm text-gray-300 hover:text-white hover:bg-white/5"
        >
          <Link to="/profile" onClick={onItemClick}>
            <Settings className="h-4 w-4" />
            <span className="ml-3">Paramètres</span>
          </Link>
        </TouchTarget>

        <TouchTarget
          asChild
          size="lg"
          variant="ghost"
          className="w-full justify-start px-3 text-sm text-gray-300 hover:text-white hover:bg-white/5"
        >
          <Link to="/help" onClick={onItemClick}>
            <HelpCircle className="h-4 w-4" />
            <span className="ml-3">Aide</span>
          </Link>
        </TouchTarget>

        <TouchTarget
          asChild
          size="lg"
          variant="ghost"
          className="w-full justify-start px-3 text-sm text-gray-300 hover:text-white hover:bg-white/5"
        >
          <Link to="/security" onClick={onItemClick}>
            <Shield className="h-4 w-4" />
            <span className="ml-3">Sécurité</span>
          </Link>
        </TouchTarget>

        <TouchTarget
          size="lg"
          variant="ghost"
          className="w-full justify-start px-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="ml-3">Déconnexion</span>
        </TouchTarget>
      </div>
    </div>
  )
}
