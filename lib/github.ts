import { Octokit } from "octokit";

export interface Project {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
  createdAt: string;
}

const USERNAME = "IamNishant51";

let cachedProjects: Project[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 3600_000;

export async function getGithubProjects(): Promise<Project[]> {
  const now = Date.now();
  if (cachedProjects && now - cacheTimestamp < CACHE_TTL) {
    return cachedProjects;
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    const { data } = await octokit.rest.repos.listForUser({
      username: USERNAME,
      sort: "updated",
      direction: "desc",
      per_page: 100,
    });

    const projects: Project[] = data
      .filter((r) => !r.fork && !r.archived && !r.private)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description || "",
        url: r.html_url,
        stars: r.stargazers_count ?? 0,
        forks: r.forks_count ?? 0,
        language: r.language ?? null,
        topics: r.topics || [],
        updatedAt: r.updated_at || "",
        createdAt: r.created_at || "",
      }));

    cachedProjects = projects;
    cacheTimestamp = now;
    return projects;
  } catch {
    return cachedProjects || [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getGithubProjects();
  return all.slice(0, 4);
}
