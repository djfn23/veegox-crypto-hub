
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <PageLayout
      title="Page Introuvable"
      subtitle="La page que vous recherchez n'existe pas"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-12 text-center">
            {/* 404 Visual */}
            <div className="mb-8">
              <div className="text-8xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                404
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-4">
                Oups ! Page introuvable
              </h1>
              <p className="text-gray-400 leading-relaxed">
                La page que vous cherchez a peut-être été déplacée, supprimée ou n'a jamais existé. 
                Vérifiez l'URL ou utilisez les liens ci-dessous pour naviguer.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Retour à l'accueil
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Page précédente
                </Button>
              </div>

              <div className="pt-4">
                <Button variant="ghost" asChild>
                  <Link to="/help">
                    <Search className="h-4 w-4 mr-2" />
                    Centre d'aide
                  </Link>
                </Button>
              </div>
            </div>

            {/* Helpful Links */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-white font-medium mb-4">Pages populaires</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <Link to="/trading" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Trading
                </Link>
                <Link to="/wallet" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Wallet
                </Link>
                <Link to="/marketplace" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Marketplace
                </Link>
                <Link to="/staking" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Staking
                </Link>
                <Link to="/yield-farming" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Yield Farming
                </Link>
                <Link to="/governance" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Gouvernance
                </Link>
                <Link to="/portfolio" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Portfolio
                </Link>
                <Link to="/analytics" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Analytics
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default NotFound;
