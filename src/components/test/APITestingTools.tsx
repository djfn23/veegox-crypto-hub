
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAPIIntegration } from '@/hooks/useAPIIntegration';
import { 
  Code, 
  Database, 
  Globe, 
  RefreshCw, 
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export const APITestingTools = () => {
  const { apiStatus, isLoading } = useAPIIntegration();
  const [testResults, setTestResults] = useState<Record<string, any>>({});

  const runConnectivityTest = async (apiName: string) => {
    setTestResults(prev => ({ ...prev, [apiName]: { status: 'testing' } }));
    
    try {
      // Simulate API connectivity test
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isConnected = Math.random() > 0.2; // 80% success rate for demo
      setTestResults(prev => ({ 
        ...prev, 
        [apiName]: { 
          status: isConnected ? 'success' : 'failed',
          timestamp: new Date(),
          latency: Math.floor(Math.random() * 200) + 50
        }
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [apiName]: { 
          status: 'failed',
          timestamp: new Date(),
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'testing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-600">Connecté</Badge>;
      case 'failed':
        return <Badge variant="destructive">Erreur</Badge>;
      case 'testing':
        return <Badge variant="secondary">Test...</Badge>;
      default:
        return <Badge variant="outline">Non testé</Badge>;
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Code className="h-5 w-5 text-green-400" />
          Outils de Test API
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="connectivity" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="connectivity">Connectivité</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connectivity" className="space-y-4">
            <div className="space-y-3">
              {Array.from(apiStatus.entries()).map(([apiName, config]) => {
                const testResult = testResults[apiName];
                return (
                  <div key={apiName} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(testResult?.status)}
                      <div>
                        <p className="text-white font-medium">{config.name}</p>
                        <p className="text-gray-400 text-sm">
                          {testResult?.latency ? `${testResult.latency}ms` : 'Non testé'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(testResult?.status)}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => runConnectivityTest(apiName)}
                        disabled={testResult?.status === 'testing'}
                        className="border-slate-600"
                      >
                        Test
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span className="text-white font-medium">Latence Moyenne</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">
                  {Object.values(testResults).reduce((acc: number, result: any) => 
                    acc + (result?.latency || 0), 0) / Object.keys(testResults).length || 0}ms
                </p>
              </div>
              
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-4 w-4 text-green-400" />
                  <span className="text-white font-medium">Taux de Réussite</span>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {Math.round((Object.values(testResults).filter((result: any) => 
                    result?.status === 'success').length / Object.keys(testResults).length || 0) * 100)}%
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="space-y-2 text-sm font-mono">
                {Object.entries(testResults).map(([api, result]: [string, any]) => (
                  <div key={api} className="text-gray-300">
                    <span className="text-blue-400">[{result.timestamp?.toLocaleTimeString()}]</span>
                    <span className="ml-2">{api}:</span>
                    <span className={`ml-2 ${result.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {result.status}
                    </span>
                    {result.latency && (
                      <span className="text-gray-400 ml-2">({result.latency}ms)</span>
                    )}
                  </div>
                ))}
                {Object.keys(testResults).length === 0 && (
                  <div className="text-gray-500 text-center py-4">
                    Aucun test exécuté pour le moment
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
