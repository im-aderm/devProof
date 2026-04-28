import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className={`bg-white/5 rounded-xl ${className}`}
    />
  );
}

export function MetricSkeleton() {
  return (
    <div className="bg-surface border border-border p-6 rounded-3xl space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-8 h-8" />
      </div>
      <Skeleton className="w-16 h-8" />
      <div className="flex items-center gap-2">
        <Skeleton className="w-12 h-2" />
        <Skeleton className="w-20 h-2" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-surface border border-border p-8 rounded-3xl space-y-6 h-full">
      <Skeleton className="w-32 h-3" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-10" />
        ))}
      </div>
    </div>
  );
}
