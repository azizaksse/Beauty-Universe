interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => (
  <div className={`bg-secondary rounded-lg animate-pulse ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="bg-card rounded-2xl overflow-hidden border border-border card-3d">
    <Skeleton className="aspect-square" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-1 pt-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-4 h-4 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-6 w-24 mt-2" />
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="aspect-[4/5] rounded-3xl overflow-hidden">
    <Skeleton className="w-full h-full" />
  </div>
);

export const ReviewSkeleton = () => (
  <div className="bg-card rounded-2xl p-6 border border-border card-3d">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="w-5 h-5 rounded-full" />
      ))}
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4 mb-6" />
    <div className="border-t border-border pt-4">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-3 w-16" />
    </div>
  </div>
);

export default Skeleton;
