
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForumPosts from "./ForumPosts";
import NewPostForm from "./NewPostForm";
import { ForumPost } from "../credit/types";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SocialModule() {
  const [activeTab, setActiveTab] = useState("forum");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['forum-posts', activeCategory],
    queryFn: async (): Promise<ForumPost[]> => {
      let query = supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (activeCategory) {
        query = query.eq('category', activeCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
  
  return (
    <div className="space-y-4 md:space-y-6 px-3 md:px-0">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Communauté</h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed px-2 md:px-0">
          Échangez avec d'autres utilisateurs et restez informé des dernières actualités
        </p>
        <div className="mt-2 text-xs md:text-sm text-yellow-400 px-2 md:px-0">
          👥 Construisez des relations et partagez des connaissances avec la communauté Veegox
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-1 h-auto p-1' : 'grid-cols-3'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="forum"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "💬 Forum" : "Forum"}
          </TabsTrigger>
          <TabsTrigger 
            value="newpost"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "✍️ Créer" : "Créer un post"}
          </TabsTrigger>
          <TabsTrigger 
            value="myposts"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "📝 Mes posts" : "Mes posts"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="forum" className="mt-4 md:mt-6">
          <ForumPosts 
            posts={posts || []} 
            isLoading={isLoading} 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </TabsContent>
        
        <TabsContent value="newpost" className="mt-4 md:mt-6">
          <NewPostForm onSuccess={() => setActiveTab("forum")} />
        </TabsContent>
        
        <TabsContent value="myposts" className="mt-4 md:mt-6">
          <div className="text-center py-8 md:py-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 max-w-md mx-auto">
              <div className="text-4xl md:text-5xl mb-4">📝</div>
              <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                Mes posts
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Cette fonctionnalité sera disponible prochainement
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
