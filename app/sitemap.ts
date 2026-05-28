import { MetadataRoute } from 'next'

// Single source of truth for canonical domain
const CANONICAL_URL = 'https://nishantunavane.qzz.io'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: CANONICAL_URL,
            // Use a fixed date reflecting last meaningful content update
            // Update this manually when you change homepage content
            lastModified: new Date('2025-01-15'),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${CANONICAL_URL}/about`,
            lastModified: new Date('2025-01-15'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${CANONICAL_URL}/projects`,
            lastModified: new Date('2025-01-15'),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ]
    // NOTE: Hash-anchor URLs (/#projects, /#skills, /#contact) are intentionally
    // excluded — crawlers strip URL fragments, making them useless in sitemaps.
}
