// app/components/GitHubSection.tsx (Server Component)
import { Octokit } from "octokit";
import { Star, GitFork, ArrowUpRight } from "lucide-react";

async function getPinnedRepos() {
    // In a real scenario, use GITHUB_TOKEN. Without token, unauthenticated rate limits apply.
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });

    try {
        // Getting user's public repos as proxy for pinned since Pinned requires GraphQL or complex scraping
        const { data } = await octokit.request('GET /users/nishant/repos', {
            sort: 'pushed',
            direction: 'desc',
            per_page: 6
        });
        return data;
    } catch (error) {
        console.error("Github fetch error", error);
        // Fallback data for demo if API fails
        return Array(6).fill(null).map((_, i) => ({
            id: i,
            name: `Project-Beta-${i}`,
            description: "A high-performance experimental web application.",
            stargazers_count: 120 + i * 10,
            forks_count: 12 + i,
            language: ["TypeScript", "Rust", "Go"][i % 3],
            html_url: "#"
        }));
    }
}

export default async function GitHubSection() {
    const repos = await getPinnedRepos();

    return (
        <section className="py-16 sm:py-24 md:py-32 w-full bg-black text-white relative z-10 px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 sm:mb-12 md:mb-16 border-b border-white/20 pb-6 sm:pb-8 md:pb-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.85] tracking-tight">
                        OPEN SOURCE <br />
                        <span className="text-gray-500">LABORATORY</span>
                    </h2>
                    <div className="hidden sm:block text-left sm:text-right mt-4 sm:mt-0">
                        <p className="text-xs sm:text-sm opacity-60 max-w-xs">
                            Exploring the bleeding edge of web technology.
                            <br />Contributions to the ecosystem.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {repos.map((repo: any, i: number) => (
                        <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                group relative p-5 sm:p-6 md:p-8 bg-white/5 border border-white/10 backdrop-blur-sm 
                hover:bg-white/10 transition-colors duration-500 overflow-hidden
                ${i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 h-[200px] sm:h-[280px] lg:h-[400px] flex flex-col justify-between" : "h-[180px] sm:h-[200px] md:h-[250px] flex flex-col justify-between"}
              `}
                        >
                            {/* Noise Texture on Card */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

                            <div className="relative z-10 w-full flex justify-between items-start">
                                <div className="bg-white/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider backdrop-blur-md">
                                    {repo.language || "Code"}
                                </div>
                                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>

                            <div className="relative z-10 w-full">
                                <h3 className={`font-bold mb-1 sm:mb-2 uppercase ${i === 0 ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl" : "text-base sm:text-lg md:text-xl"}`}>
                                    {repo.name}
                                </h3>
                                <p className="text-xs sm:text-sm opacity-60 line-clamp-2 max-w-[90%]">
                                    {repo.description || "No description provided."}
                                </p>

                                <div className="flex gap-4 sm:gap-6 mt-3 sm:mt-4 md:mt-6 opacity-40 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] sm:text-xs">
                                    <span className="flex items-center gap-1 sm:gap-2">
                                        <Star size={12} className="sm:w-[14px] sm:h-[14px]" /> {repo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1 sm:gap-2">
                                        <GitFork size={12} className="sm:w-[14px] sm:h-[14px]" /> {repo.forks_count}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
