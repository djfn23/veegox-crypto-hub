
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Upload, 
  Image as ImageIcon, 
  Zap,
  Eye,
  Settings,
  Coins
} from "lucide-react";

const CreateNFT = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PageLayout
      title="Créer un NFT"
      subtitle="Transformez votre art en token non-fongible"
      icon={<Palette className="h-6 w-6 text-purple-400" />}
      actions={
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Prévisualiser
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Zap className="h-4 w-4 mr-2" />
            Mint NFT
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload & Preview */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-purple-400" />
              Média de votre NFT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              {previewImage ? (
                <div className="space-y-4">
                  <img 
                    src={previewImage} 
                    alt="NFT Preview" 
                    className="max-w-full h-64 object-cover rounded-lg mx-auto"
                  />
                  <Button variant="outline" onClick={() => setPreviewImage(null)}>
                    Changer l'image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-white font-medium mb-2">
                      Glissez votre fichier ici ou cliquez pour parcourir
                    </p>
                    <p className="text-gray-400 text-sm">
                      PNG, JPG, GIF, WebP jusqu'à 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="nft-upload"
                  />
                  <label htmlFor="nft-upload">
                    <Button variant="outline" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Sélectionner un fichier
                    </Button>
                  </label>
                </div>
              )}
            </div>

            {/* Format Selection */}
            <div>
              <Label className="text-gray-300 mb-3 block">Format de fichier</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12 border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Image
                </Button>
                <Button variant="outline" className="h-12 border-gray-500/30 text-gray-400" disabled>
                  <Settings className="h-4 w-4 mr-2" />
                  Vidéo (Bientôt)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NFT Details */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Détails du NFT</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Nom *</Label>
                <Input 
                  placeholder="Nom de votre NFT"
                  className="bg-white/5 border-white/10 text-white mt-2"
                />
              </div>

              <div>
                <Label className="text-gray-300">Collection</Label>
                <Input 
                  placeholder="Choisir une collection"
                  className="bg-white/5 border-white/10 text-white mt-2"
                />
              </div>

              <div>
                <Label className="text-gray-300">Description</Label>
                <Textarea 
                  placeholder="Décrivez votre NFT..."
                  className="bg-white/5 border-white/10 text-white mt-2 h-24"
                />
              </div>

              <div>
                <Label className="text-gray-300">Prix</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    placeholder="0.0"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                    VEEGOX
                  </Button>
                </div>
              </div>
            </div>

            {/* Properties */}
            <div>
              <Label className="text-gray-300 mb-3 block">Propriétés</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Rareté"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Input 
                    placeholder="Légendaire"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Button variant="outline" size="sm">+</Button>
                </div>
              </div>
            </div>

            {/* Royalties */}
            <div>
              <Label className="text-gray-300">Royalties (%)</Label>
              <Input 
                placeholder="2.5"
                className="bg-white/5 border-white/10 text-white mt-2"
              />
              <p className="text-gray-400 text-sm mt-1">
                Pourcentage que vous recevrez sur les ventes secondaires
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mint Settings */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30 mt-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="h-5 w-5 text-purple-400" />
            Paramètres de Mint
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Blockchain</h4>
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                Polygon
              </Badge>
              <p className="text-gray-400 text-sm mt-2">Frais réduits et éco-responsable</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Frais de Mint</h4>
              <p className="text-green-400 font-bold">~0.001 MATIC</p>
              <p className="text-gray-400 text-sm mt-2">≈ $0.001 USD</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Token Standard</h4>
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                ERC-721
              </Badge>
              <p className="text-gray-400 text-sm mt-2">Standard NFT compatible</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Prêt à mint votre NFT ?</p>
                <p className="text-gray-400 text-sm">
                  Vérifiez tous les détails avant de confirmer
                </p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Zap className="h-4 w-4 mr-2" />
                Mint NFT maintenant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default CreateNFT;
