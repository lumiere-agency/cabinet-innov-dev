export default function TeamLoading() {
  return (
    <main className="flex-1 flex flex-col w-full bg-background pt-28 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Skeleton */}
        <div className="max-w-3xl mx-auto text-center mb-24 mt-4">
          <div className="inline-block w-32 h-8 rounded-full bg-muted animate-pulse mb-6" />
          <div className="w-3/4 h-12 md:h-16 mx-auto bg-muted rounded-xl animate-pulse mb-6" />
          <div className="w-full h-6 mx-auto bg-muted rounded-md animate-pulse mb-2" />
          <div className="w-2/3 h-6 mx-auto bg-muted rounded-md animate-pulse" />
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 max-w-md mx-auto">
            <div className="flex-1 min-w-[140px] h-32 rounded-2xl bg-muted animate-pulse" />
            <div className="flex-1 min-w-[140px] h-32 rounded-2xl bg-muted animate-pulse" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto mb-20">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)]">
              <div className="bg-card rounded-[2rem] overflow-hidden border border-border flex flex-col h-full">
                <div className="h-72 md:h-80 bg-muted animate-pulse relative">
                  <div className="absolute top-4 left-4 w-20 h-6 rounded-xl bg-muted-foreground/20" />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="w-3/4 h-8 bg-muted rounded mb-2 animate-pulse" />
                  <div className="w-1/2 h-4 bg-muted rounded mb-6 animate-pulse" />
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="w-full h-4 bg-muted rounded animate-pulse" />
                    <div className="w-full h-4 bg-muted rounded animate-pulse" />
                    <div className="w-2/3 h-4 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between pt-5 border-t border-border">
                    <div className="w-24 h-4 bg-muted rounded animate-pulse" />
                    <div className="flex gap-2">
                      <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
                      <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
