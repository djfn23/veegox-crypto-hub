
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

interface NewPostFormProps {
  onSuccess?: () => void;
}

type PostFormData = {
  title: string;
  content: string;
  category: string;
};

export default function NewPostForm({ onSuccess }: NewPostFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<PostFormData>();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  
  const createPostMutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Vous devez être connecté pour créer un post");
      
      const { data: post, error } = await supabase
        .from("forum_posts")
        .insert({
          author_id: userData.user.id,
          title: data.title,
          content: data.content,
          category: data.category,
        })
        .select()
        .single();
        
      if (error) throw error;
      return post;
    },
    onSuccess: () => {
      toast.success("Votre post a été créé avec succès!");
      queryClient.invalidateQueries({ queryKey: ["forum-posts"] });
      reset();
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la création du post");
    },
  });
  
  const onSubmit = (data: PostFormData) => {
    createPostMutation.mutate(data);
  };
  
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-4xl mx-auto">
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl md:text-2xl text-white">Créer un nouveau post</CardTitle>
        <CardDescription className="text-sm md:text-base text-gray-400">
          Partagez vos idées, posez des questions ou lancez une discussion
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            {/* Title field */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-white">
                Titre *
              </label>
              <Input
                id="title"
                placeholder="Titre de votre post"
                className="bg-slate-800 border-slate-600 text-white min-h-[44px] text-sm md:text-base"
                {...register("title", { required: "Un titre est requis" })}
              />
              {errors.title && (
                <p className="text-xs text-red-400">{errors.title.message}</p>
              )}
            </div>
            
            {/* Category field */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-white">
                Catégorie *
              </label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white min-h-[44px]">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="Actualités">📰 Actualités</SelectItem>
                  <SelectItem value="Tutoriels">📚 Tutoriels</SelectItem>
                  <SelectItem value="Questions">❓ Questions</SelectItem>
                  <SelectItem value="Discussions">💭 Discussions</SelectItem>
                  <SelectItem value="Projets">🚀 Projets</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-red-400">{errors.category.message}</p>
              )}
            </div>
            
            {/* Content field */}
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium text-white">
                Contenu *
              </label>
              <Textarea
                id="content"
                placeholder="Rédigez le contenu de votre post..."
                rows={isMobile ? 6 : 8}
                className="bg-slate-800 border-slate-600 text-white min-h-[120px] text-sm md:text-base resize-none"
                {...register("content", { required: "Le contenu est requis" })}
              />
              {errors.content && (
                <p className="text-xs text-red-400">{errors.content.message}</p>
              )}
            </div>
          </div>
          
          {/* Form actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button 
              type="button"
              variant="outline"
              size={isMobile ? "lg" : "default"}
              className="border-slate-600 text-white hover:bg-slate-800 w-full sm:w-auto min-h-[44px]"
              onClick={() => reset()}
            >
              Réinitialiser
            </Button>
            <Button 
              type="submit" 
              size={isMobile ? "lg" : "default"}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 w-full sm:w-auto min-h-[44px]"
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? "Publication..." : "Publier le post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
