import type { VercelRequest, VercelResponse } from '@vercel/node';

const robotsTxt = `# Crop Doctor AI - Sitemap & SEO

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://cropsdoctor.vercel.app/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin/internal pages
Disallow: /api/
Disallow: /dashboard/cycle/
Disallow: /trace/
`;

export default function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).send(robotsTxt);
}
