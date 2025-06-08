
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BLOCKCHAIN_NETWORKS, getMainnetNetworks, getTestnetNetworks, BlockchainNetwork } from '@/lib/blockchain/networks';
import { Globe, Wifi, WifiOff, Activity } from 'lucide-react';

interface NetworkSelectorProps {
  selectedChainId: number;
  onNetworkChange: (chainId: number) => void;
  showTestnets?: boolean;
}

export default function NetworkSelector({ selectedChainId, onNetworkChange, showTestnets = false }: NetworkSelectorProps) {
  const [activeTab, setActiveTab] = useState('mainnet');
  
  const mainnetNetworks = getMainnetNetworks();
  const testnetNetworks = getTestnetNetworks();
  const selectedNetwork = BLOCKCHAIN_NETWORKS[selectedChainId];

  const NetworkCard = ({ network }: { network: BlockchainNetwork }) => {
    const isSelected = network.chainId === selectedChainId;
    
    return (
      <Card 
        className={`cursor-pointer transition-all hover:bg-white/10 ${
          isSelected ? 'bg-purple-600/20 border-purple-400' : 'bg-white/5 border-white/10'
        }`}
        onClick={() => onNetworkChange(network.chainId)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{network.icon}</span>
              <div>
                <h3 className="text-white font-medium">{network.shortName}</h3>
                <p className="text-white/60 text-sm">{network.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={network.testnet ? 'outline' : 'secondary'}>
                {network.testnet ? 'Testnet' : 'Mainnet'}
              </Badge>
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3 text-green-400" />
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Sélection du Réseau Blockchain
        </CardTitle>
        {selectedNetwork && (
          <div className="flex items-center gap-2 text-sm text-white/80">
            <span>Réseau actuel:</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>{selectedNetwork.icon}</span>
              {selectedNetwork.shortName}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mainnet">Mainnet</TabsTrigger>
            <TabsTrigger value="testnet">Testnet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mainnet" className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mainnetNetworks.map((network) => (
                <NetworkCard key={network.chainId} network={network} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="testnet" className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testnetNetworks.map((network) => (
                <NetworkCard key={network.chainId} network={network} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Sélection rapide:</span>
            <Select value={selectedChainId.toString()} onValueChange={(value) => onNetworkChange(parseInt(value))}>
              <SelectTrigger className="w-48 bg-slate-800 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(BLOCKCHAIN_NETWORKS).map((network) => (
                  <SelectItem key={network.chainId} value={network.chainId.toString()}>
                    <div className="flex items-center gap-2">
                      <span>{network.icon}</span>
                      <span>{network.shortName}</span>
                      {network.testnet && <Badge variant="outline" className="text-xs">Test</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
