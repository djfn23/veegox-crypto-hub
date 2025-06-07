
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Coins, Zap, Shield, TrendingUp, ChevronRight, Check } from "lucide-react";
import TokenTemplateSelector from "./wizard/TokenTemplateSelector";
import TokenBasicForm from "./wizard/TokenBasicForm";
import TokenAdvancedForm from "./wizard/TokenAdvancedForm";
import TokenReviewForm from "./wizard/TokenReviewForm";

export default function TokenCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    total_supply: "",
    decimals: "18",
    description: "",
    chain_type: "polygon",
    chain_id: 137,
    token_type: "ERC20",
    // Advanced features
    has_tax: false,
    tax_percentage: 0,
    has_burn: false,
    has_pause: false,
    has_mint: false,
    max_supply: "",
    website_url: "",
    logo_url: ""
  });

  const steps = [
    { number: 1, title: "Template", description: "Choisir un modèle" },
    { number: 2, title: "Configuration", description: "Paramètres de base" },
    { number: 3, title: "Avancé", description: "Fonctionnalités" },
    { number: 4, title: "Révision", description: "Vérification et déploiement" }
  ];

  const templates = [
    {
      id: "standard",
      name: "Token Standard",
      description: "ERC-20 basique pour usage général",
      icon: Coins,
      features: ["Transferts", "Approvals", "Métadonnées"],
      recommended: true
    },
    {
      id: "utility",
      name: "Utility Token",
      description: "Token avec fonctionnalités avancées",
      icon: Zap,
      features: ["Burn", "Pause", "Admin Controls"],
      badge: "Populaire"
    },
    {
      id: "governance",
      name: "Governance Token",
      description: "Pour la gouvernance DAO",
      icon: Shield,
      features: ["Voting", "Delegation", "Snapshots"],
      badge: "DAO"
    },
    {
      id: "deflationary",
      name: "Deflationary Token",
      description: "Token avec mécanisme de burn",
      icon: TrendingUp,
      features: ["Auto-burn", "Reflection", "Tax"],
      badge: "DeFi"
    }
  ];

  const progressPercentage = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <TokenTemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        );
      case 2:
        return (
          <TokenBasicForm
            tokenData={tokenData}
            setTokenData={setTokenData}
            selectedTemplate={selectedTemplate}
          />
        );
      case 3:
        return (
          <TokenAdvancedForm
            tokenData={tokenData}
            setTokenData={setTokenData}
            selectedTemplate={selectedTemplate}
          />
        );
      case 4:
        return (
          <TokenReviewForm
            tokenData={tokenData}
            selectedTemplate={selectedTemplate}
            templates={templates}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-white text-xl">
              Création de Token - Étape {currentStep} sur {steps.length}
            </CardTitle>
            <Badge className="bg-blue-600 text-white">
              {Math.round(progressPercentage)}% complété
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step.number < currentStep 
                    ? "bg-green-600 border-green-600 text-white" 
                    : step.number === currentStep
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-white/20 text-white/60"
                }`}>
                  {step.number < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-2 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    step.number <= currentStep ? "text-white" : "text-white/60"
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-white/60">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-white/40 mx-2 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <div className="min-h-[600px]">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Précédent
            </Button>
            
            <div className="flex gap-2">
              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 1 && !selectedTemplate}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Déployer le Token
                  <Zap className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
