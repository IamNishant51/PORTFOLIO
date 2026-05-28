import { MetadataRoute } from 'next'

// Single source of truth — matches layout.tsx and sitemap.ts
const CANONICAL_URL = 'https://nishantunavane.qzz.io'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: `${CANONICAL_URL}/sitemap.xml`,
        host: CANONICAL_URL,
    }
}
