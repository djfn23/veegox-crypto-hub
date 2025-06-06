
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForumPosts from "./ForumPosts";
import NewPostForm from "./NewPostForm";
import { ForumPost } from "../credit/types";

export default function SocialModule() {
  const [activeTab, setActiveTab] = useState("forum");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Communauté</h2>
        <p className="text-gray-400">Échangez avec d'autres utilisateurs et restez informé des dernières actualités</p>
        <div className="mt-2 text-sm text-yellow-400">
          👥 Construisez des relations et partagez des connaissances avec la communauté Veegox
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forum">Forum</TabsTrigger>
          <TabsTrigger value="newpost">Créer un post</TabsTrigger>
          <TabsTrigger value="myposts">Mes posts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="forum" className="mt-6">
          <ForumPosts 
            posts={posts || []} 
            isLoading={isLoading} 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </TabsContent>
        
        <TabsContent value="newpost" className="mt-6">
          <NewPostForm onSuccess={() => setActiveTab("forum")} />
        </TabsContent>
        
        <TabsContent value="myposts" className="mt-6">
          <div className="text-center py-10">
            <p>Mes posts seront disponibles prochainement</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
