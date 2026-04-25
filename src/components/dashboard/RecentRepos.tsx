import Link from "next/link";

export default function RecentRepos({ repos }: { repos: any[] }) {
  return (
    <div className="glass-card rounded-xl border-outline-variant/20 overflow-hidden">
      <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
        <h3 className="text-headline-md font-bold text-on-surface">Top Repositories</h3>
        <Link href="/repositories" className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">
          View All
        </Link>
      </div>
      <div className="divide-y divide-outline-variant/10">
        {repos.map((repo) => (
          <div key={repo.id} className="p-6 hover:bg-white/5 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <Link href={`/repositories/${repo.id}`} className="text-on-surface font-bold group-hover:text-primary transition-colors">
                  {repo.name}
                </Link>
                <span className="text-body-sm text-on-surface-variant line-clamp-1">{repo.description || "No description provided."}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">star</span> {repo.stars}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-[10px] font-bold text-on-surface-variant uppercase">
                {repo.language || "Unknown"}
              </span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter italic">
                Last updated {new Date(repo.pushedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
