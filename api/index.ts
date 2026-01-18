import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Sitemap XML content
const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://cropsdoctor.vercel.app/</loc><lastmod>2026-01-18</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/detect</loc><lastmod>2026-01-18</lastmod><changefreq>weekly</changefreq><priority>0.95</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/fertilizer</loc><lastmod>2026-01-18</lastmod><changefreq>weekly</changefreq><priority>0.90</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/pesticide</loc><lastmod>2026-01-18</lastmod><changefreq>weekly</changefreq><priority>0.90</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/soil-fertility</loc><lastmod>2026-01-18</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/weather</loc><lastmod>2026-01-18</lastmod><changefreq>daily</changefreq><priority>0.85</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/download</loc><lastmod>2026-01-18</lastmod><changefreq>weekly</changefreq><priority>0.95</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/download/android</loc><lastmod>2026-01-18</lastmod><changefreq>weekly</changefreq><priority>0.90</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/download/pwa</loc><lastmod>2026-01-18</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/app-features</loc><lastmod>2026-01-18</lastmod><changefreq>monthly</changefreq><priority>0.80</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/dashboard</loc><lastmod>2026-01-18</lastmod><changefreq>weekly</changefreq><priority>0.70</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/history</loc><lastmod>2026-01-18</lastmod><changefreq>weekly</changefreq><priority>0.65</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/training</loc><lastmod>2026-01-18</lastmod><changefreq>monthly</changefreq><priority>0.50</priority></url>
  <url><loc>https://cropsdoctor.vercel.app/whitepaper</loc><lastmod>2026-01-18</lastmod><changefreq>monthly</changefreq><priority>0.45</priority></url>
</urlset>`;

const ROBOTS_TXT = `User-agent: *
Allow: /
Sitemap: https://cropsdoctor.vercel.app/api/sitemap
Crawl-delay: 1
Disallow: /api/
Disallow: /dashboard/cycle/
Disallow: /trace/`;

// Global flag to track if app is initialized
let isAppInitialized = false;
let expressApp: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // Handle sitemap.xml and robots.txt directly (before Express)
        const url = req.url || '';

        if (url === '/api/sitemap' || url === '/api/sitemap.xml' || url.endsWith('/sitemap.xml') || url.endsWith('/sitemap')) {
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
            return res.status(200).send(SITEMAP_XML);
        }

        if (url === '/api/robots' || url === '/api/robots.txt' || url.endsWith('/robots.txt') || url.endsWith('/robots')) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
            return res.status(200).send(ROBOTS_TXT);
        }

        // Only initialize Express once per cold start
        if (!isAppInitialized) {
            console.log('Initializing serverless function...');

            // Import directly from TypeScript source (Vercel compiles it)
            const serverModule = await import('../server/index.js');

            // Setup the app
            await serverModule.setupApp();
            expressApp = serverModule.app;

            isAppInitialized = true;
            console.log('Serverless function initialized successfully');
        }

        // Forward the request to Express
        expressApp(req, res);
    } catch (error) {
        console.error('Serverless function error:', error);

        // Return detailed error for debugging
        res.status(500).json({
            message: 'Server initialization failed',
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
    }
}

