export default function BlogLoading() {
  return (
    <div className="bg-[#0f172a] min-h-screen pt-24 pb-20">
      {/* En-tête */}
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center max-w-3xl">
        <div className="inline-block w-40 h-8 rounded-full bg-slate-800 animate-pulse mb-6" />
        <div className="w-3/4 h-12 md:h-16 mx-auto bg-slate-800 rounded-xl animate-pulse mb-6" />
        <div className="w-full h-6 mx-auto bg-slate-800 rounded-md animate-pulse mb-2" />
        <div className="w-2/3 h-6 mx-auto bg-slate-800 rounded-md animate-pulse" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Article à la une (Skeleton) */}
        <div className="mb-16">
          <div className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col lg:flex-row h-auto lg:h-[450px]">
            <div className="w-full lg:w-3/5 h-64 lg:h-full bg-slate-800 animate-pulse" />
            <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-20 h-6 bg-slate-800 rounded-full animate-pulse" />
                <div className="w-16 h-4 bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="w-full h-8 bg-slate-800 rounded mb-4 animate-pulse" />
              <div className="w-5/6 h-8 bg-slate-800 rounded mb-8 animate-pulse" />
              <div className="space-y-2 mb-8">
                <div className="w-full h-4 bg-slate-800 rounded animate-pulse" />
                <div className="w-full h-4 bg-slate-800 rounded animate-pulse" />
                <div className="w-2/3 h-4 bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse" />
                <div>
                  <div className="w-24 h-4 bg-slate-800 rounded mb-1 animate-pulse" />
                  <div className="w-16 h-3 bg-slate-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grille d'articles réguliers (Skeletons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl h-[450px] flex flex-col">
              <div className="h-56 bg-slate-800 animate-pulse" />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-4 bg-slate-800 rounded animate-pulse" />
                  <div className="w-16 h-4 bg-slate-800 rounded animate-pulse" />
                </div>
                <div className="w-full h-6 bg-slate-800 rounded mb-2 animate-pulse" />
                <div className="w-3/4 h-6 bg-slate-800 rounded mb-4 animate-pulse" />
                <div className="space-y-2 mb-6 flex-grow">
                  <div className="w-full h-4 bg-slate-800 rounded animate-pulse" />
                  <div className="w-5/6 h-4 bg-slate-800 rounded animate-pulse" />
                </div>
                <div className="w-24 h-4 bg-slate-800 rounded mt-auto animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
