
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = ({ 
  lines = 3, 
  className = "",
  showCard = true 
}: { 
  lines?: number; 
  className?: string;
  showCard?: boolean;
}) => {
  const content = (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 ${i === 0 ? 'w-3/4' : i === lines - 1 ? 'w-1/2' : 'w-full'} bg-white/10`} 
        />
      ))}
    </div>
  );

  if (!showCard) return content;

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardContent className="p-6">
        {content}
      </CardContent>
    </Card>
  );
};

export const StatsLoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-20 bg-white/10" />
              <Skeleton className="h-8 w-16 bg-white/10" />
            </div>
            <Skeleton className="w-10 h-10 rounded-xl bg-white/10" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export const TableLoadingSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 bg-white/10" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} className="h-3 bg-white/10" />
            ))}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
