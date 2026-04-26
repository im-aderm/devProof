"use client";

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-12">
      {/* Hero Skeleton */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="w-48 h-48 rounded-2xl bg-surface-container-high"></div>
        <div className="flex-grow space-y-4 pt-4">
          <div className="h-10 w-64 bg-surface-container-high rounded-lg"></div>
          <div className="h-6 w-full max-w-2xl bg-surface-container-low rounded-lg"></div>
          <div className="h-6 w-1/2 bg-surface-container-low rounded-lg"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-16">
          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-surface-container-low rounded-xl"></div>
            ))}
          </div>
          {/* Content Block Skeleton */}
          <div className="h-64 bg-surface-container-low rounded-2xl"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-surface-container-low rounded-xl"></div>
            ))}
          </div>
        </div>
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-4 space-y-12">
          <div className="h-80 bg-surface-container-low rounded-2xl"></div>
          <div className="h-64 bg-surface-container-low rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
