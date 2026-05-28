import { MetadataRoute } from 'next'

// Single source of truth for canonical domain
const CANONICAL_URL = 'https://nishantunavane.qzz.io'

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()
    return [
        {
            url: CANONICAL_URL,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${CANONICAL_URL}/about`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${CANONICAL_URL}/projects`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${CANONICAL_URL}/skills`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${CANONICAL_URL}/contact`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]
    // NOTE: Hash-anchor URLs (/#projects, /#skills, /#contact) are intentionally
    // excluded — crawlers strip URL fragments, making them useless in sitemaps.
}
