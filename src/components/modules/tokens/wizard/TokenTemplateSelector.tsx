
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  features: string[];
  recommended?: boolean;
  badge?: string;
}

interface TokenTemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
}

export default function TokenTemplateSelector({
  templates,
  selectedTemplate,
  onSelectTemplate
}: TokenTemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          Choisissez un Template
        </h3>
        <p className="text-white/70">
          Sélectionnez le type de token qui correspond le mieux à vos besoins
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;
          
          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/50"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      isSelected ? "bg-blue-600" : "bg-white/10"
                    }`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        {template.name}
                        {template.recommended && (
                          <Badge className="bg-green-600 text-white text-xs">
                            Recommandé
                          </Badge>
                        )}
                        {template.badge && (
                          <Badge className="bg-orange-500 text-white text-xs">
                            {template.badge}
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-white/70 text-sm mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="bg-blue-600 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-white font-medium text-sm mb-2">
                      Fonctionnalités incluses:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-white/10 text-white text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full ${
                      isSelected
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border-white/20 text-white hover:bg-white/10"
                    }`}
                    onClick={() => onSelectTemplate(template.id)}
                  >
                    {isSelected ? "Sélectionné" : "Sélectionner"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
