
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  category: {
    name: string;
    count: number;
    icon: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-3">{category.icon}</div>
        <h3 className="text-white font-medium text-lg">{category.name}</h3>
        <p className="text-white/60 text-sm">{category.count} tokens</p>
      </CardContent>
    </Card>
  );
}
