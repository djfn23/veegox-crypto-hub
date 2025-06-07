
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Vote } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CreateCampaign = () => {
  const [votingEndDate, setVotingEndDate] = useState<Date>();

  return (
    <PageLayout
      title="Créer une Proposition"
      subtitle="Proposez des améliorations pour l'écosystème Veegox"
      icon={<Plus className="h-6 w-6 text-blue-400" />}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Vote className="h-5 w-5 text-blue-400" />
              Nouvelle Proposition de Gouvernance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Titre de la Proposition *</Label>
                <Input 
                  placeholder="Ex: Augmentation des récompenses de staking"
                  className="bg-white/5 border-white/10 text-white mt-2"
                />
              </div>

              <div>
                <Label className="text-gray-300">Type de Proposition *</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white mt-2">
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parameter">Changement de Paramètre</SelectItem>
                    <SelectItem value="upgrade">Mise à Jour Protocole</SelectItem>
                    <SelectItem value="treasury">Gestion du Trésor</SelectItem>
                    <SelectItem value="partnership">Partenariat</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Description Détaillée *</Label>
                <Textarea 
                  placeholder="Décrivez votre proposition en détail..."
                  className="bg-white/5 border-white/10 text-white mt-2 h-32"
                />
              </div>

              <div>
                <Label className="text-gray-300">Justification</Label>
                <Textarea 
                  placeholder="Expliquez pourquoi cette proposition est importante..."
                  className="bg-white/5 border-white/10 text-white mt-2 h-24"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Quorum Requis (%)</Label>
                  <Input 
                    placeholder="Ex: 50"
                    type="number"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Fin du Vote</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full mt-2 justify-start text-left font-normal bg-white/5 border-white/10 text-white",
                          !votingEndDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {votingEndDate ? format(votingEndDate, "PPP") : <span>Sélectionner une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={votingEndDate}
                        onSelect={setVotingEndDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Données d'Exécution (Optionnel)</Label>
                <Textarea 
                  placeholder="Code ou paramètres à exécuter si la proposition passe..."
                  className="bg-white/5 border-white/10 text-white mt-2 h-20 font-mono text-sm"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Format JSON pour les paramètres de smart contract
                </p>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black font-bold text-xs">!</span>
                </div>
                <div>
                  <h4 className="text-yellow-300 font-medium mb-1">Conditions Requises</h4>
                  <ul className="text-yellow-200 text-sm space-y-1">
                    <li>• Minimum 10,000 VEEGOX tokens pour créer une proposition</li>
                    <li>• La proposition sera soumise à un vote de la communauté</li>
                    <li>• Période de vote : 7 jours minimum</li>
                    <li>• Quorum requis : 50% des tokens en circulation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Coût de Création</span>
                <span className="text-white">100 VEEGOX</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Votre Balance</span>
                <span className="text-white">125,000 VEEGOX</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Pouvoir de Vote</span>
                <span className="text-green-400">0.5% du total</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Vote className="h-4 w-4 mr-2" />
              Créer la Proposition
            </Button>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Lignes Directrices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-300 text-sm">
              <p><strong>1. Clarté :</strong> Soyez précis et détaillé dans votre proposition.</p>
              <p><strong>2. Impact :</strong> Expliquez l'impact sur l'écosystème Veegox.</p>
              <p><strong>3. Faisabilité :</strong> Assurez-vous que la proposition est techniquement réalisable.</p>
              <p><strong>4. Communauté :</strong> Considérez l'opinion de la communauté avant de soumettre.</p>
              <p><strong>5. Timing :</strong> Choisissez une période de vote appropriée.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CreateCampaign;
