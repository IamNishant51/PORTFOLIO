import { MetadataRoute } from 'next'
import { getProjectSlugs } from '@/lib/projects-data'
import { getBlogSlugs } from '@/lib/blog-data'

const CANONICAL_URL = 'https://nishantunavane.qzz.io'

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()
    const projectPages = getProjectSlugs().map((slug) => ({
        url: `${CANONICAL_URL}/projects/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))
    const blogPages = getBlogSlugs().map((slug) => ({
        url: `${CANONICAL_URL}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))
    return [
        { url: CANONICAL_URL, lastModified: now, changeFrequency: 'monthly' as const, priority: 1 },
        { url: `${CANONICAL_URL}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
        { url: `${CANONICAL_URL}/projects`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
        { url: `${CANONICAL_URL}/skills`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${CANONICAL_URL}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
        { url: `${CANONICAL_URL}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
        ...projectPages,
        ...blogPages,
    ]
}
