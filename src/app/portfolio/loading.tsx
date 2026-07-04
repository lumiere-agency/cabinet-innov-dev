export default function PortfolioLoading() {
  return (
    <main className="flex-1 flex flex-col w-full pt-32 pb-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Skeleton */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block w-40 h-8 rounded-full bg-muted animate-pulse mb-8" />
          <div className="w-3/4 h-16 md:h-20 mx-auto bg-muted rounded-2xl animate-pulse mb-8" />
          <div className="w-2/3 h-6 mx-auto bg-muted rounded-md animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-24 h-10 rounded-full bg-muted animate-pulse" />
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`bg-card rounded-[2.5rem] p-4 border border-border flex flex-col ${i === 0 ? 'lg:col-span-2' : ''}`}>
              <div className={`w-full rounded-[2rem] bg-muted mb-6 animate-pulse ${i === 0 ? 'h-80 lg:h-[28rem]' : 'h-72'}`} />
              <div className="px-4 pb-4">
                <div className="flex gap-5 mb-4">
                  <div className="w-24 h-6 bg-muted rounded animate-pulse" />
                  <div className="w-24 h-6 bg-muted rounded animate-pulse" />
                </div>
                <div className="w-3/4 h-8 bg-muted rounded mb-4 animate-pulse" />
                <div className="space-y-2 mb-6">
                  <div className="w-full h-4 bg-muted rounded animate-pulse" />
                  <div className="w-full h-4 bg-muted rounded animate-pulse" />
                  <div className="w-2/3 h-4 bg-muted rounded animate-pulse" />
                </div>
                <div className="w-32 h-4 bg-muted rounded mt-6 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
