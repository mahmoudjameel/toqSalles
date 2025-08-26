import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useWebsite } from '../context/WebsiteContext';

const ManifestGenerator: React.FC = () => {
  const { websiteData } = useWebsite();
  
  const manifestData = {
    name: websiteData.settings?.companyName || "طوق للتقسيط",
    short_name: "طوق",
    description: websiteData.about?.description || "منصة التقسيط الميسر للأجهزة الإلكترونية",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3A6F8F",
    orientation: "portrait",
    lang: "ar",
    dir: "rtl",
    categories: ["business", "finance", "shopping"],
    icons: [
      {
        src: "/Test.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/Test.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  return (
    <Helmet>
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme Color */}
      <meta name="theme-color" content={manifestData.theme_color} />
      <meta name="msapplication-TileColor" content={manifestData.theme_color} />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" href="/Test.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={manifestData.name} />
      
      {/* Windows Tiles */}
      <meta name="msapplication-TileImage" content="/Test.png" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Structured data for PWA */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": manifestData.name,
          "description": manifestData.description,
          "url": "https://toq.sa",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "description": "تطبيق ويب مجاني للتقسيط"
          }
        })}
      </script>
    </Helmet>
  );
};

export default ManifestGenerator;
