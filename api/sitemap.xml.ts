import type { VercelRequest, VercelResponse } from '@vercel/node';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Homepage -->
  <url>
    <loc>https://cropsdoctor.vercel.app/</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Disease Detector Tool -->
  <url>
    <loc>https://cropsdoctor.vercel.app/detect</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  
  <!-- Fertilizer Calculator Tool -->
  <url>
    <loc>https://cropsdoctor.vercel.app/fertilizer</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
  
  <!-- Pesticide Calculator Tool -->
  <url>
    <loc>https://cropsdoctor.vercel.app/pesticide</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
  
  <!-- Soil Fertility Analysis Tool -->
  <url>
    <loc>https://cropsdoctor.vercel.app/soil-fertility</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  
  <!-- Weather Forecast Tool -->
  <url>
    <loc>https://cropsdoctor.vercel.app/weather</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>
  
  <!-- Download Pages -->
  <url>
    <loc>https://cropsdoctor.vercel.app/download</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  
  <url>
    <loc>https://cropsdoctor.vercel.app/download/android</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
  
  <url>
    <loc>https://cropsdoctor.vercel.app/download/pwa</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  
  <url>
    <loc>https://cropsdoctor.vercel.app/app-features</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
  
  <!-- User Features -->
  <url>
    <loc>https://cropsdoctor.vercel.app/dashboard</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.70</priority>
  </url>
  
  <url>
    <loc>https://cropsdoctor.vercel.app/history</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.65</priority>
  </url>
  
  <!-- Information Pages -->
  <url>
    <loc>https://cropsdoctor.vercel.app/training</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.50</priority>
  </url>
  
  <url>
    <loc>https://cropsdoctor.vercel.app/whitepaper</loc>
    <lastmod>2026-01-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.45</priority>
  </url>

</urlset>`;

export default function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).send(sitemap);
}
