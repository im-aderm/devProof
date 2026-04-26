<body className="font-body-base text-body-base selection:bg-primary/30">
{/* TopNavBar */}
<nav className="sticky top-0 w-full z-50 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-[#1F1F1F] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
<div className="flex justify-between items-center px-6 h-14 w-full max-w-screen-2xl mx-auto">
<div className="flex items-center gap-8">
<span className="text-xl font-bold tracking-tighter text-white">DevProof</span>
<div className="hidden md:flex gap-6">
<a className="font-['Inter'] text-sm tracking-tight font-medium text-indigo-500 border-b border-indigo-500 pb-1" href="#">Analysis</a>
<a className="font-['Inter'] text-sm tracking-tight font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200" href="#">Benchmark</a>
<a className="font-['Inter'] text-sm tracking-tight font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200" href="#">API</a>
<a className="font-['Inter'] text-sm tracking-tight font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200" href="#">Pricing</a>
</div>
</div>
<div className="flex items-center gap-4">
<button className="font-['Inter'] text-sm tracking-tight font-medium text-gray-400 hover:text-white transition-all">Sign In</button>
<button className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full font-['Inter'] text-sm font-semibold active:scale-[0.98] transition-transform">Sign Up Free</button>
</div>
</div>
</nav>
<main className="max-w-7xl mx-auto px-6 py-12 hero-gradient">
{/* Hero Section */}
<section className="flex flex-col md:flex-row gap-12 items-start mb-16">
<div className="relative">
<div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#1F1F1F] shadow-2xl">
<img alt="Ismail Adam" className="w-full h-full object-cover" data-alt="professional portrait of a young man with a confident expression, neutral studio background, soft cinematic lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaTJVqc0GnTkBc0F1Yj147hJoVDJL1FHlYlM7sRXWShMqkCrEASraq1dkMNA5Ci0iUu_YVJxItZkglobPFgaLN7KcWFz4YClH5GKus4wvPmKgHYhQrJtKgibBa4W435orX8KYkCtbb0PZr117PNHDoA7XNE920SnapoJMMGBJdWXinDXu8FgdsCSm8H3-FpwvcL7uXqj2TOu6XSywF5rm-6MiePxxFPaSxyjNjvoaAG-QMYRPDTeJrXUsigb-Lahr4Q2uNhrRBm4Y"/ />
</div>
<div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-full border-4 border-background">
<span className="material-symbols-outlined text-background text-xl" data-weight="fill">verified</span>
</div>
</div>
<div className="flex-1 space-y-6">
<div>
<h1 className="font-h1 text-h1 text-white mb-1">Ismail Adam</h1>
<p className="text-on-surface-variant font-code text-body-base">@im-aderm</p>
</div>
<p className="max-w-2xl text-on-surface text-body-base leading-relaxed">
                    Building scalable product-led software. Passionate about Next.js, Distributed Systems, and AI integration. Currently focusing on making developer tools more intuitive.
                </p>
<div className="flex flex-wrap gap-6 text-sm text-on-surface-variant">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm">location_on</span> Lagos, Nigeria
                    </div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm">group</span> 1.2k Followers · 450 Following
                    </div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm">calendar_today</span> Joined June 2019
                    </div>
</div>
<div className="flex flex-wrap gap-3">
<button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:brightness-110 transition-all">
<span className="material-symbols-outlined text-lg">download</span> Export PDF
                    </button>
<button className="glass-card px-6 py-2 rounded-xl font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all">
<span className="material-symbols-outlined text-lg">share</span> Share Profile
                    </button>
<button className="text-on-surface-variant px-6 py-2 rounded-xl font-medium border border-transparent hover:border-outline-variant transition-all">
                        Analyze Another
                    </button>
</div>
</div>
</section>
{/* Main Headline & Strength Score */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
<div className="md:col-span-8 glass-card p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden">
<div className="absolute top-0 right-0 p-4">
<span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/20 flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-weight="fill">auto_awesome</span> AI Verified
                    </span>
</div>
<h2 className="font-h2 text-h2 text-white leading-tight">
                    Ismail Adam — Full Stack Developer with Strong <span className="text-primary">Product Building Potential</span>
</h2>
<p className="mt-4 text-on-surface-variant max-w-xl">Analysis based on 42 repositories, 1.2k commits, and 148 pull requests across 4 organizations.</p>
</div>
<div className="md:col-span-4 glass-card p-8 rounded-2xl text-center flex flex-col items-center justify-center">
<div className="relative w-32 h-32 flex items-center justify-center mb-4">
<svg className="w-full h-full -rotate-90">
<circle className="text-[#1F1F1F]" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
<circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364" strokeDashoffset="65" strokeWidth="8"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-display text-display text-white">82</span>
<span className="text-xs text-on-surface-variant font-bold">/ 100</span>
</div>
</div>
<p className="text-on-surface font-medium mb-1">Developer Strength Score</p>
<p className="text-xs text-on-surface-variant">Higher than 74% of similar profiles</p>
</div>
</div>
{/* Metrics Row */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
<div className="glass-card p-5 rounded-xl text-center">
<span className="text-xs font-label-caps text-on-surface-variant block mb-2">Top Skill</span>
<span className="text-lg font-bold text-white block">TypeScript</span>
<div className="w-full bg-[#1F1F1F] h-1 mt-3 rounded-full overflow-hidden">
<div className="bg-indigo-500 h-full w-[94%]"></div>
</div>
</div>
<div className="glass-card p-5 rounded-xl text-center">
<span className="text-xs font-label-caps text-on-surface-variant block mb-2">Main Role</span>
<span className="text-lg font-bold text-white block">Full Stack</span>
<span className="text-[10px] text-primary mt-2 block font-bold uppercase tracking-widest">Architectural Focus</span>
</div>
<div className="glass-card p-5 rounded-xl text-center">
<span className="text-xs font-label-caps text-on-surface-variant block mb-2">Consistency</span>
<span className="text-lg font-bold text-white block">78%</span>
<div className="w-full bg-[#1F1F1F] h-1 mt-3 rounded-full overflow-hidden">
<div className="bg-green-500 h-full w-[78%]"></div>
</div>
</div>
<div className="glass-card p-5 rounded-xl text-center">
<span className="text-xs font-label-caps text-on-surface-variant block mb-2">Repo Quality</span>
<span className="text-lg font-bold text-white block">81%</span>
<div className="w-full bg-[#1F1F1F] h-1 mt-3 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[81%]"></div>
</div>
</div>
<div className="glass-card p-5 rounded-xl text-center">
<span className="text-xs font-label-caps text-on-surface-variant block mb-2">Documentation</span>
<span className="text-lg font-bold text-white block">66%</span>
<div className="w-full bg-[#1F1F1F] h-1 mt-3 rounded-full overflow-hidden">
<div className="bg-orange-500 h-full w-[66%]"></div>
</div>
</div>
</div>
{/* AI Summary & Quality Radar */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
<div className="md:col-span-7 glass-card p-8 rounded-2xl">
<h3 className="flex items-center gap-2 text-white font-h2 text-h2 mb-6">
<span className="material-symbols-outlined text-primary">psychology</span> AI Talent Summary
                </h3>
<div className="space-y-4 text-on-surface leading-relaxed">
<p>
                        Ismail demonstrates exceptional proficiency in the **React/Next.js ecosystem**, with a clear talent for building production-ready architectures. His codebases reflect a deep understanding of state management and type safety, often implementing advanced TypeScript patterns that reduce runtime errors.
                    </p>
<p>
                        Analysis of his top 10 repositories reveals a strong **Product Mindset**—he doesn't just write functions; he builds cohesive user journeys. His commit history shows high activity in the early stages of projects, indicating a strong ability to bootstrap from 0 to 1.
                    </p>
<div className="bg-[#1F1F1F]/40 border border-primary/20 p-4 rounded-xl mt-6">
<span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Growth Opportunities</span>
<ul className="text-sm space-y-2 text-on-surface-variant">
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-orange-500 text-sm mt-0.5">warning</span>
                                Documentation coverage is slightly below average (66%); focus on adding more TSDoc/JSDoc comments.
                            </li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-orange-500 text-sm mt-0.5">warning</span>
                                Testing patterns are inconsistent. Integrating Vitest or Playwright across all core repos would boost his quality score significantly.
                            </li>
</ul>
</div>
</div>
</div>
<div className="md:col-span-5 glass-card p-8 rounded-2xl flex flex-col items-center">
<h3 className="text-white font-h2 text-h2 mb-8 self-start">Quality Radar</h3>
<div className="relative w-full aspect-square max-w-[320px]">
<svg className="w-full h-full" viewBox="0 0 100 100">
{/* Hexagon Grid */}
<polygon className="radar-grid" points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"></polygon>
<polygon className="radar-grid" points="50,20 84.6,40 84.6,60 50,80 15.4,60 15.4,40"></polygon>
<polygon className="radar-grid" points="50,40 67.3,50 67.3,70 50,80 32.7,70 32.7,50"></polygon>
{/* Data Shape */}
<polygon className="radar-shape" points="50,10 90,30 85,75 50,85 15,70 20,30"></polygon>
{/* Labels (Positioned manually for SVG space) */}
<text className="font-code uppercase tracking-widest" fill="#908fa0" font-size="3" text-anchor="middle" x="50" y="5">Complexity</text>
<text className="font-code uppercase tracking-widest" fill="#908fa0" font-size="3" text-anchor="start" x="95" y="25">Consistency</text>
<text className="font-code uppercase tracking-widest" fill="#908fa0" font-size="3" text-anchor="start" x="95" y="75">Stack Usage</text>
<text className="font-code uppercase tracking-widest" fill="#908fa0" font-size="3" text-anchor="middle" x="50" y="98">Documentation</text>
<text className="font-code uppercase tracking-widest" fill="#908fa0" font-size="3" text-anchor="end" x="5" y="75">Product Thinking</text>
<text className="font-code uppercase tracking-widest" fill="#908fa0" font-size="3" text-anchor="end" x="5" y="25">Code Breadth</text>
</svg>
</div>
</div>
</div>
{/* Skills Tag Cloud */}
<section className="mb-12">
<h3 className="text-white font-h2 text-h2 mb-6">Verified Skills &amp; Stack</h3>
<div className="flex flex-wrap gap-3">
<div className="glass-card px-4 py-2 rounded-full flex items-center gap-3 border-indigo-500/30">
<span className="w-2 h-2 rounded-full bg-indigo-500"></span>
<span className="text-on-surface font-medium">React</span>
<span className="text-primary font-bold text-xs">94%</span>
</div>
<div className="glass-card px-4 py-2 rounded-full flex items-center gap-3 border-indigo-500/30">
<span className="w-2 h-2 rounded-full bg-indigo-500"></span>
<span className="text-on-surface font-medium">Next.js</span>
<span className="text-primary font-bold text-xs">92%</span>
</div>
<div className="glass-card px-4 py-2 rounded-full flex items-center gap-3">
<span className="w-2 h-2 rounded-full bg-indigo-400"></span>
<span className="text-on-surface font-medium">TypeScript</span>
<span className="text-primary font-bold text-xs">89%</span>
</div>
<div className="glass-card px-4 py-2 rounded-full flex items-center gap-3">
<span className="w-2 h-2 rounded-full bg-indigo-400"></span>
<span className="text-on-surface font-medium">Node.js</span>
<span className="text-primary font-bold text-xs">85%</span>
</div>
<div className="glass-card px-4 py-2 rounded-full flex items-center gap-3">
<span className="w-2 h-2 rounded-full bg-indigo-300"></span>
<span className="text-on-surface font-medium">Tailwind CSS</span>
<span className="text-primary font-bold text-xs">96%</span>
</div>
<div className="glass-card px-4 py-2 rounded-full flex items-center gap-3">
<span className="w-2 h-2 rounded-full bg-indigo-300"></span>
<span className="text-on-surface font-medium">PostgreSQL</span>
<span className="text-primary font-bold text-xs">78%</span>
</div>
<div className="glass-card px-4 py-2 rounded-full flex items-center gap-3">
<span className="w-2 h-2 rounded-full bg-indigo-200"></span>
<span className="text-on-surface font-medium">GraphQL</span>
<span className="text-primary font-bold text-xs">72%</span>
</div>
<div className="glass-card px-4 py-2 rounded-full flex items-center gap-3">
<span className="w-2 h-2 rounded-full bg-indigo-100"></span>
<span className="text-on-surface font-medium">Docker</span>
<span className="text-primary font-bold text-xs">64%</span>
</div>
</div>
</section>
{/* Repository Showcase */}
<section className="mb-12">
<div className="flex justify-between items-end mb-8">
<div>
<h3 className="text-white font-h2 text-h2">Repository Showcase</h3>
<p className="text-on-surface-variant text-sm mt-1">AI-selected highlights based on impact and complexity.</p>
</div>
<button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                    View All Repos <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Repo Card 1 */}
<div className="glass-card p-6 rounded-2xl border-t-2 border-t-indigo-500/50 flex flex-col hover:translate-y-[-4px] transition-all cursor-pointer">
<div className="flex justify-between items-start mb-4">
<span className="bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-indigo-500/20">Best Project</span>
<div className="flex items-center gap-3 text-on-surface-variant">
<span className="flex items-center gap-1 text-xs"><span className="material-symbols-outlined text-sm">star</span> 2.4k</span>
<span className="flex items-center gap-1 text-xs"><span className="material-symbols-outlined text-sm">fork_left</span> 180</span>
</div>
</div>
<h4 className="text-white font-bold text-lg mb-2">SaaS Starter Kit</h4>
<p className="text-on-surface-variant text-sm mb-6 flex-grow">
                        A production-ready Next.js 14 template with Clerk, Prisma, and Stripe integration.
                    </p>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-blue-500"></span>
<span className="text-xs font-code text-on-surface">TypeScript</span>
<span className="text-xs text-on-surface-variant ml-auto">Updated 2d ago</span>
</div>
</div>
{/* Repo Card 2 */}
<div className="glass-card p-6 rounded-2xl flex flex-col hover:translate-y-[-4px] transition-all cursor-pointer">
<div className="flex justify-between items-start mb-4">
<span className="bg-green-500/10 text-green-400 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-500/20">Most Active</span>
<div className="flex items-center gap-3 text-on-surface-variant">
<span className="flex items-center gap-1 text-xs"><span className="material-symbols-outlined text-sm">star</span> 842</span>
</div>
</div>
<h4 className="text-white font-bold text-lg mb-2">AI Chat Widget</h4>
<p className="text-on-surface-variant text-sm mb-6 flex-grow">
                        Embeddable AI assistant for documentation sites powered by OpenAI and Pinecone.
                    </p>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-blue-500"></span>
<span className="text-xs font-code text-on-surface">TypeScript</span>
<span className="text-xs text-on-surface-variant ml-auto">Updated 5h ago</span>
</div>
</div>
{/* Repo Card 3 */}
<div className="glass-card p-6 rounded-2xl flex flex-col hover:translate-y-[-4px] transition-all cursor-pointer">
<div className="flex justify-between items-start mb-4">
<span className="bg-purple-500/10 text-purple-400 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-purple-500/20">Complex Logic</span>
<div className="flex items-center gap-3 text-on-surface-variant">
<span className="flex items-center gap-1 text-xs"><span className="material-symbols-outlined text-sm">star</span> 156</span>
</div>
</div>
<h4 className="text-white font-bold text-lg mb-2">Queue Master</h4>
<p className="text-on-surface-variant text-sm mb-6 flex-grow">
                        A lightweight distributed job queue implementation for Node.js using Redis.
                    </p>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-yellow-500"></span>
<span className="text-xs font-code text-on-surface">JavaScript</span>
<span className="text-xs text-on-surface-variant ml-auto">Updated 12d ago</span>
</div>
</div>
{/* Repo Card 4 */}
<div className="glass-card p-6 rounded-2xl flex flex-col hover:translate-y-[-4px] transition-all cursor-pointer">
<h4 className="text-white font-bold text-lg mb-2">Design System UI</h4>
<p className="text-on-surface-variant text-sm mb-6 flex-grow">
                        Radix UI based component library for high-performance dashboards.
                    </p>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-blue-500"></span>
<span className="text-xs font-code text-on-surface">TypeScript</span>
<span className="text-xs text-on-surface-variant ml-auto">Updated 1mo ago</span>
</div>
</div>
{/* Repo Card 5 */}
<div className="glass-card p-6 rounded-2xl flex flex-col hover:translate-y-[-4px] transition-all cursor-pointer">
<h4 className="text-white font-bold text-lg mb-2">Market Data API</h4>
<p className="text-on-surface-variant text-sm mb-6 flex-grow">
                        FastAPI wrapper for real-time crypto market data with WebSocket support.
                    </p>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-blue-400"></span>
<span className="text-xs font-code text-on-surface">Python</span>
<span className="text-xs text-on-surface-variant ml-auto">Updated 3mo ago</span>
</div>
</div>
{/* Repo Card 6 */}
<div className="glass-card p-6 rounded-2xl flex flex-col hover:translate-y-[-4px] transition-all cursor-pointer">
<h4 className="text-white font-bold text-lg mb-2">DevProof Analytics</h4>
<p className="text-on-surface-variant text-sm mb-6 flex-grow">
                        Internal tool for analyzing GitHub profiles and generating talent reports.
                    </p>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-blue-500"></span>
<span className="text-xs font-code text-on-surface">TypeScript</span>
<span className="text-xs text-on-surface-variant ml-auto">Updated 14h ago</span>
</div>
</div>
</div>
</section>
{/* Activity & Career Fit */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
{/* Heatmap / Activity */}
<div className="md:col-span-8 glass-card p-8 rounded-2xl">
<div className="flex justify-between items-center mb-6">
<h3 className="text-white font-h2 text-h2">Activity Timeline</h3>
<span className="text-xs font-code text-on-surface-variant">1,248 commits in the last year</span>
</div>
<div className="w-full flex flex-wrap gap-1">
{/* Simple Heatmap Generation */}
<div className="grid grid-cols-[repeat(52,1fr)] gap-1 w-full">
{/* We repeat this 52 times for weeks, 7 for days. Just a representative sample */}
<div className="flex flex-col gap-1">
<div className="w-full aspect-square rounded-[1px] bg-primary/10"></div>
<div className="w-full aspect-square rounded-[1px] bg-primary/40"></div>
<div className="w-full aspect-square rounded-[1px] bg-primary/20"></div>
<div className="w-full aspect-square rounded-[1px] bg-primary/10"></div>
<div className="w-full aspect-square rounded-[1px] bg-primary/60"></div>
<div className="w-full aspect-square rounded-[1px] bg-primary/10"></div>
<div className="w-full aspect-square rounded-[1px] bg-primary/10"></div>
</div>
{/* ... many more bars ... */}
<div className="flex flex-col gap-1"><div className="w-full aspect-square rounded-[1px] bg-primary/40"></div><div className="w-full aspect-square rounded-[1px] bg-primary/10"></div><div className="w-full aspect-square rounded-[1px] bg-primary/80"></div><div className="w-full aspect-square rounded-[1px] bg-primary/10"></div><div className="w-full aspect-square rounded-[1px] bg-primary/20"></div><div className="w-full aspect-square rounded-[1px] bg-primary/10"></div><div className="w-full aspect-square rounded-[1px] bg-primary/10"></div></div>
<div className="flex flex-col gap-1"><div className="w-full aspect-square rounded-[1px] bg-primary/10"></div><div className="w-full aspect-square rounded-[1px] bg-primary/10"></div><div className="w-full aspect-square rounded-[1px] bg-primary/10"></div><div className="w-full aspect-square rounded-[1px] bg-primary/40"></div><div className="w-full aspect-square rounded-[1px] bg-primary/100 shadow-[0_0_8px_rgba(128,131,255,0.5)]"></div><div className="w-full aspect-square rounded-[1px] bg-primary/10"></div><div className="w-full aspect-square rounded-[1px] bg-primary/20"></div></div>
{/* Representative Bars */}
<div className="hidden md:flex flex-col gap-1 col-span-49 h-full items-center justify-center opacity-40">
<span className="text-xs font-code">2024 Activity Data Visualized</span>
<div className="w-1/2 h-[1px] bg-[#1F1F1F]"></div>
</div>
</div>
</div>
<div className="flex justify-between items-center mt-4 text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">
<span>Jun 2023</span>
<span>Dec 2023</span>
<span>Jun 2024</span>
</div>
</div>
{/* Career Fit */}
<div className="md:col-span-4 glass-card p-8 rounded-2xl">
<h3 className="text-white font-h2 text-h2 mb-6">Career Fit</h3>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
<span className="text-on-surface font-medium">Product Engineer</span>
<span className="text-primary font-black">98%</span>
</div>
<div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-[#1F1F1F]">
<span className="text-on-surface font-medium">Frontend Engineer</span>
<span className="text-on-surface-variant font-black">92%</span>
</div>
<div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-[#1F1F1F]">
<span className="text-on-surface font-medium">Full Stack Dev</span>
<span className="text-on-surface-variant font-black">88%</span>
</div>
<div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-[#1F1F1F]">
<span className="text-on-surface font-medium">Technical Lead</span>
<span className="text-on-surface-variant font-black">65%</span>
</div>
</div>
</div>
</div>
{/* MLH Readiness & Improvements */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
<div className="md:col-span-4 glass-card p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent">
<h3 className="text-white font-h2 text-h2 mb-4">MLH Readiness</h3>
<div className="text-center py-6">
<div className="text-6xl font-display text-white">76%</div>
<p className="text-primary text-xs font-bold uppercase tracking-widest mt-2">Open Source Potential</p>
</div>
<div className="space-y-3">
<div className="flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> High documentation quality
                    </div>
<div className="flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> Consistent project shipping
                    </div>
<div className="flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-orange-500 text-sm">info</span> Needs more community PRs
                    </div>
</div>
</div>
<div className="md:col-span-8 glass-card p-8 rounded-2xl">
<h3 className="text-white font-h2 text-h2 mb-6">Improvement Checklist</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="flex items-start gap-4 p-4 rounded-xl border border-[#1F1F1F] hover:border-indigo-500/30 transition-colors">
<div className="w-8 h-8 rounded bg-orange-500/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-orange-500 text-lg">science</span>
</div>
<div>
<span className="text-white font-bold block">Add Unit Tests</span>
<span className="text-xs text-on-surface-variant">Your top 3 repos lack 100% test coverage.</span>
</div>
</div>
<div className="flex items-start gap-4 p-4 rounded-xl border border-[#1F1F1F] hover:border-indigo-500/30 transition-colors">
<div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-blue-500 text-lg">description</span>
</div>
<div>
<span className="text-white font-bold block">Improve READMEs</span>
<span className="text-xs text-on-surface-variant">Add contribution guides to public tools.</span>
</div>
</div>
<div className="flex items-start gap-4 p-4 rounded-xl border border-[#1F1F1F] hover:border-indigo-500/30 transition-colors">
<div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-green-500 text-lg">groups</span>
</div>
<div>
<span className="text-white font-bold block">Contribute to OSS</span>
<span className="text-xs text-on-surface-variant">Submit PRs to major libraries you use.</span>
</div>
</div>
<div className="flex items-start gap-4 p-4 rounded-xl border border-[#1F1F1F] hover:border-indigo-500/30 transition-colors">
<div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-purple-500 text-lg">shield</span>
</div>
<div>
<span className="text-white font-bold block">Security Audit</span>
<span className="text-xs text-on-surface-variant">Fix 4 minor vulnerabilities in older repos.</span>
</div>
</div>
</div>
</div>
</div>
{/* Resume & Portfolio Previews */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
<div className="glass-card overflow-hidden rounded-2xl group cursor-pointer">
<div className="p-8 pb-0">
<h3 className="text-white font-h2 text-h2 mb-2">Resume Engine</h3>
<p className="text-on-surface-variant text-sm mb-6">AI-generated CV based on your commit history and skill density.</p>
</div>
<div className="relative h-64 bg-[#141414] border-t border-[#1F1F1F] p-6">
<div className="bg-[#0B0B0B] w-full h-full rounded-t-lg border-x border-t border-[#1F1F1F] p-4 opacity-50 group-hover:opacity-100 transition-opacity">
<div className="w-1/3 h-4 bg-[#1F1F1F] rounded mb-4"></div>
<div className="w-full h-2 bg-[#1F1F1F] rounded mb-2"></div>
<div className="w-full h-2 bg-[#1F1F1F] rounded mb-2"></div>
<div className="w-2/3 h-2 bg-[#1F1F1F] rounded mb-6"></div>
<div className="w-1/2 h-4 bg-[#1F1F1F] rounded mb-4"></div>
<div className="w-full h-2 bg-[#1F1F1F] rounded mb-2"></div>
<div className="w-full h-2 bg-[#1F1F1F] rounded mb-2"></div>
</div>
<div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
<button className="bg-primary text-background font-bold px-8 py-3 rounded-full shadow-2xl active:scale-95 transition-all">Generate Full Resume</button>
</div>
</div>
</div>
<div className="glass-card overflow-hidden rounded-2xl group cursor-pointer">
<div className="p-8 pb-0">
<h3 className="text-white font-h2 text-h2 mb-2">Interactive Portfolio</h3>
<p className="text-on-surface-variant text-sm mb-6">Claim your devproof.io/im-aderm vanity URL and custom theme.</p>
</div>
<div className="relative h-64 bg-indigo-900/10 border-t border-[#1F1F1F] p-6">
<div className="bg-[#0B0B0B] w-full h-full rounded-t-lg border-x border-t border-indigo-500/20 p-8 flex flex-col items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
<div className="w-16 h-16 rounded-full bg-primary/20 mb-4"></div>
<div className="w-32 h-4 bg-primary/20 rounded"></div>
</div>
<div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
<button className="bg-white text-background font-bold px-8 py-3 rounded-full shadow-2xl active:scale-95 transition-all">Claim Portfolio</button>
</div>
</div>
</div>
</div>
</main>
{/* Sticky CTA Banner */}
<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-6">
<div className="bg-primary shadow-[0_20px_60px_rgba(128,131,255,0.4)] rounded-2xl p-4 flex items-center justify-between">
<span className="text-background font-bold text-sm">Turn your GitHub into a professional portfolio</span>
<a className="bg-background text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-125 transition-all" href="#">
                Sign Up Free
            </a>
</div>
</div>
{/* Footer */}
<footer className="w-full mt-20 border-t border-[#1F1F1F] bg-[#0B0B0B]">
<div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 px-8 max-w-7xl mx-auto">
<div className="flex flex-col gap-2 items-center md:items-start">
<span className="text-lg font-black tracking-tighter text-white opacity-50">DevProof</span>
<span className="font-['Inter'] text-xs uppercase tracking-widest text-gray-500">© 2024 DevProof Inc. Engineered for performance.</span>
</div>
<div className="flex gap-8">
<a className="font-['Inter'] text-xs uppercase tracking-widest text-gray-500 hover:text-indigo-500 transition-colors" href="#">Analyze Profile</a>
<a className="font-['Inter'] text-xs uppercase tracking-widest text-gray-500 hover:text-indigo-500 transition-colors" href="#">Changelog</a>
<a className="font-['Inter'] text-xs uppercase tracking-widest text-gray-500 hover:text-indigo-500 transition-colors" href="#">Documentation</a>
<a className="font-['Inter'] text-xs uppercase tracking-widest text-gray-500 hover:text-indigo-500 transition-colors" href="#">Privacy</a>
<a className="font-['Inter'] text-xs uppercase tracking-widest text-gray-500 hover:text-indigo-500 transition-colors" href="#">Status</a>
</div>
</div>
</footer>
</body>