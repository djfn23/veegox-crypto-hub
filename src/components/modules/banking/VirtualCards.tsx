
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Eye, EyeOff, Settings } from "lucide-react";
import { cryptoBankService } from "@/services/cryptoBankService";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface VirtualCardsProps {
  userId: string;
}

export const VirtualCards = ({ userId }: VirtualCardsProps) => {
  const [showNumbers, setShowNumbers] = useState<{ [key: string]: boolean }>({});
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: virtualCards, isLoading, error } = useQuery({
    queryKey: ['virtual-cards', userId],
    queryFn: () => cryptoBankService.getUserVirtualCards(userId)
  });

  const toggleCardNumber = (cardId: string) => {
    setShowNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const formatCardNumber = (cardNumber: string, show: boolean) => {
    if (!show) {
      return "**** **** **** " + cardNumber.slice(-4);
    }
    return cardNumber.replace(/(.{4})/g, '$1 ').trim();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-900/20 border-red-900">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">Erreur lors du chargement des cartes</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Cartes Virtuelles</h2>
          <p className="text-gray-400">Gérez vos cartes crypto pour les paiements</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Carte
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {virtualCards?.map((card) => (
          <Card key={card.id} className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-700 hover:border-purple-600 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-400" />
                  <CardTitle className="text-white text-base">{card.card_name}</CardTitle>
                </div>
                <Badge className={card.is_active ? "bg-green-500" : "bg-red-500"}>
                  {card.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">NUMÉRO DE CARTE</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleCardNumber(card.id)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    {showNumbers[card.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                </div>
                <p className="text-white font-mono text-lg">
                  {formatCardNumber(card.card_number, showNumbers[card.id])}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Limite quotidienne</p>
                  <p className="text-white font-semibold">
                    {card.daily_limit} MATIC
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Limite de dépense</p>
                  <p className="text-white font-semibold">
                    {card.spending_limit} MATIC
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Expire le</p>
                <p className="text-white text-sm">
                  {new Date(card.expires_at).toLocaleDateString('fr-FR')}
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white">
                  <Settings className="h-3 w-3 mr-1" />
                  Paramètres
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`flex-1 ${card.is_active 
                    ? 'border-red-600 text-red-400 hover:bg-red-600 hover:text-white' 
                    : 'border-green-600 text-green-400 hover:bg-green-600 hover:text-white'
                  }`}
                >
                  {card.is_active ? 'Désactiver' : 'Activer'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {virtualCards?.length === 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-12 text-center">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Aucune carte virtuelle
            </h3>
            <p className="text-gray-400 mb-6">
              Créez votre première carte virtuelle pour commencer à effectuer des paiements
            </p>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Créer une carte
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
