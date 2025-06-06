
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface NewPostFormProps {
  onSuccess?: () => void;
}

type PostFormData = {
  title: string;
  content: string;
  category: string;
};

export default function NewPostForm({ onSuccess }: NewPostFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PostFormData>();
  const queryClient = useQueryClient();
  
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
    <Card className="border-muted">
      <CardHeader>
        <CardTitle>Créer un nouveau post</CardTitle>
        <CardDescription>
          Partagez vos idées, posez des questions ou lancez une discussion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Titre</label>
              <Input
                id="title"
                placeholder="Titre de votre post"
                {...register("title", { required: "Un titre est requis" })}
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Catégorie</label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actualités">Actualités</SelectItem>
                  <SelectItem value="Tutoriels">Tutoriels</SelectItem>
                  <SelectItem value="Questions">Questions</SelectItem>
                  <SelectItem value="Discussions">Discussions</SelectItem>
                  <SelectItem value="Projets">Projets</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Contenu</label>
              <Textarea
                id="content"
                placeholder="Contenu de votre post"
                rows={8}
                {...register("content", { required: "Le contenu est requis" })}
              />
              {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? "Publication..." : "Publier"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
