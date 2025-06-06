
import React, { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { GlassCard } from '@/components/ui/glass-card';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'page' | 'wallet' | 'transaction' | 'token';
  path: string;
  icon?: string;
}

const searchData: SearchResult[] = [
  { id: '1', title: 'Portefeuille', description: 'Gérer vos actifs crypto', category: 'page', path: '/wallet', icon: '💼' },
  { id: '2', title: 'Score de Crédit', description: 'Analyse de crédit DeFi', category: 'page', path: '/credit', icon: '📊' },
  { id: '3', title: 'Staking', description: 'Mettre en stake vos tokens', category: 'page', path: '/staking', icon: '🔒' },
  { id: '4', title: 'DAO', description: 'Gouvernance décentralisée', category: 'page', path: '/dao', icon: '🏛️' },
  { id: '5', title: 'Crowdfunding', description: 'Projets de financement participatif', category: 'page', path: '/crowdfunding', icon: '🚀' },
  { id: '6', title: 'Analyse de Marché', description: 'Analyses et tendances du marché', category: 'page', path: '/market-analysis', icon: '📈' },
  { id: '7', title: 'Exchange', description: 'Échangez vos cryptomonnaies', category: 'page', path: '/exchange', icon: '🔄' },
  { id: '8', title: 'IA Recommandations', description: 'Recommandations personnalisées par IA', category: 'page', path: '/ai-recommendations', icon: '🤖' },
  { id: '9', title: 'Social', description: 'Communauté et discussions', category: 'page', path: '/social', icon: '👥' },
];

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(searchData.slice(0, 6)); // Show recent/popular items
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    setOpen(false);
    setQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-400 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
          <Search className="h-4 w-4" />
          <span>Rechercher...</span>
          <div className="flex items-center space-x-1 ml-auto">
            <kbd className="px-1.5 py-0.5 text-xs bg-white/10 rounded">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-xs bg-white/10 rounded">K</kbd>
          </div>
        </button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl p-0 bg-white/5 backdrop-blur-xl border-white/10">
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <Input
            placeholder="Rechercher dans Veegox..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 bg-transparent text-white placeholder-gray-400 focus:ring-0"
            autoFocus
          />
        </div>
        
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <span className="text-lg">{result.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {result.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {result.description}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {result.category}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Aucun résultat trouvé</p>
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 border-t border-white/10 text-xs text-gray-400">
          <div className="flex items-center justify-between">
            <span>Utilisez ↑↓ pour naviguer</span>
            <span>↵ pour sélectionner</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
