import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useWebsite } from '../context/WebsiteContext';

const SitemapGenerator: React.FC = () => {
  const { websiteData } = useWebsite();
  
  const baseUrl = 'https://toq.sa';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Generate sitemap XML content
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/admin</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.1</priority>
  </url>
</urlset>`;

  return (
    <Helmet>
      {/* Sitemap link */}
      <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      
      {/* Structured data for sitemap */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "خريطة الموقع",
          "description": "جميع صفحات موقع طوق للتقسيط",
          "url": `${baseUrl}/sitemap.xml`,
          "numberOfItems": 2,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "url": baseUrl,
              "name": "الصفحة الرئيسية"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "url": `${baseUrl}/admin`,
              "name": "لوحة التحكم"
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SitemapGenerator;
