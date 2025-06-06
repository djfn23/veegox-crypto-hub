
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ForumPost } from "../credit/types";
import { MessageSquare, ThumbsUp, Clock } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Badge 
          variant={activeCategory === null ? "default" : "outline"} 
          className="cursor-pointer"
          onClick={() => setActiveCategory(null)}
        >
          Tous
        </Badge>
        {categories.map((category) => (
          <Badge 
            key={category}
            variant={activeCategory === category ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">Chargement des posts...</div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:border-primary transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <Badge>{post.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="line-clamp-3 text-sm text-muted-foreground">
                  {post.content}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4 mt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    <span>{post.likes_count}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    <span>{post.comments_count}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Aucun post trouvé</p>
        </div>
      )}
    </div>
  );
}
