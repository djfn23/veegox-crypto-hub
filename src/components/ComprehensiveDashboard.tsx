
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Coins, ArrowRightLeft } from "lucide-react";

const ComprehensiveDashboard: React.FC = () => {
  console.log('ComprehensiveDashboard: Rendering component');

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Tableau de Bord
          </h1>
          <p className="text-gray-400">
            Bienvenue sur votre plateforme DeFi complète
          </p>
        </div>
      </div>

      {/* Wallet Section */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="text-center p-8">
          <h3 className="text-lg font-medium text-white mb-2">
            Connectez votre Wallet
          </h3>
          <p className="text-gray-400 mb-6">
            Connectez votre wallet pour voir votre balance et gérer vos actifs
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Connecter Wallet
          </Button>
        </CardContent>
      </Card>

      {/* Quick Access Links */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Accès Rapide
        </h2>  
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Trading", icon: TrendingUp, color: "bg-green-500" },
            { name: "Staking", icon: Coins, color: "bg-blue-500" },
            { name: "Exchange", icon: ArrowRightLeft, color: "bg-purple-500" },
            { name: "Wallet", icon: Wallet, color: "bg-indigo-500" }
          ].map((link) => {
            const Icon = link.icon;
            return (
              <Card key={link.name} className="bg-slate-900/50 border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer">
                <CardContent className="text-center p-4">
                  <div className={`${link.color} rounded-lg flex items-center justify-center mx-auto mb-2 w-12 h-12`}>
                    <Icon className="text-white h-6 w-6" />
                  </div>
                  <p className="text-white font-medium text-sm">
                    {link.name}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Volume 24h</p>
                <p className="text-white font-bold text-xl">$2.4M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Utilisateurs Actifs</p>
                <p className="text-white font-bold text-xl">12.5K</p>
              </div>
              <Wallet className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">TVL Total</p>
                <p className="text-white font-bold text-xl">$45.2M</p>
              </div>
              <Coins className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Récompenses</p>
                <p className="text-white font-bold text-xl">8.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Explicit default export
export default ComprehensiveDashboard;
