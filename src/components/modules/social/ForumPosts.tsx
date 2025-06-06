
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ForumPost } from "../credit/types";
import { MessageSquare, ThumbsUp, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ForumPostsProps {
  posts: ForumPost[];
  isLoading: boolean;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

export default function ForumPosts({ 
  posts, 
  isLoading, 
  activeCategory, 
  setActiveCategory 
}: ForumPostsProps) {
  const isMobile = useIsMobile();
  
  const categories = [
    "Actualités", "Tutoriels", "Questions", "Discussions", "Projets"
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
      }
      return `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    }
    if (diffDays < 7) {
      return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    }
    return date.toLocaleDateString();
  };
  
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Categories filter - optimized for mobile */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
        <Badge 
          variant={activeCategory === null ? "default" : "outline"} 
          className={`cursor-pointer min-h-[36px] px-3 md:px-4 text-xs md:text-sm whitespace-nowrap ${
            activeCategory === null ? 'bg-primary/80 text-white' : 'border-white/20 text-white hover:bg-white/10'
          }`}
          onClick={() => setActiveCategory(null)}
        >
          Tous
        </Badge>
        {categories.map((category) => (
          <Badge 
            key={category}
            variant={activeCategory === category ? "default" : "outline"} 
            className={`cursor-pointer min-h-[36px] px-3 md:px-4 text-xs md:text-sm whitespace-nowrap ${
              activeCategory === category ? 'bg-primary/80 text-white' : 'border-white/20 text-white hover:bg-white/10'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      {isLoading ? (
        <div className="text-center py-8 md:py-10">
          <div className="animate-pulse text-white">Chargement des posts...</div>
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-4 md:space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-3 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <CardTitle className="text-base md:text-lg text-white leading-tight pr-2">
                    {post.title}
                  </CardTitle>
                  <Badge className="bg-primary/20 text-primary border-primary/30 self-start text-xs">
                    {post.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="line-clamp-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {post.content}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 text-xs md:text-sm text-muted-foreground border-t border-white/10 pt-4">
                <div className="flex items-center justify-center sm:justify-start space-x-4 w-full sm:w-auto">
                  <div className="flex items-center">
                    <ThumbsUp className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                    <span>{post.likes_count}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                    <span>{post.comments_count}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
                  <Clock className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 md:py-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 max-w-md mx-auto">
            <div className="text-4xl md:text-5xl mb-4">💬</div>
            <h3 className="text-lg md:text-xl font-medium text-white mb-2">
              Aucun post trouvé
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {activeCategory 
                ? `Aucun post dans la catégorie "${activeCategory}"`
                : "Soyez le premier à publier un post !"
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
