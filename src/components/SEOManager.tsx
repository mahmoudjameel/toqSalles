import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useWebsite } from '../context/WebsiteContext';

interface SEOManagerProps {
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string;
  pageImage?: string;
  pageUrl?: string;
  pageType?: string;
}

const SEOManager: React.FC<SEOManagerProps> = ({
  pageTitle,
  pageDescription,
  pageKeywords,
  pageImage,
  pageUrl,
  pageType = 'website'
}) => {
  const { websiteData } = useWebsite();
  
  // Default values from context or fallbacks
  const defaultTitle = websiteData.hero?.title || "طوق للتقسيط - تقسيط مريح وسهل للأجهزة الإلكترونية";
  const defaultDescription = websiteData.about?.description || "منصة التقسيط الميسر للأجهزة الإلكترونية والمنزلية في المملكة العربية السعودية";
  const defaultKeywords = "تقسيط، جوالات، لابتوبات، أجهزة إلكترونية، السعودية، طوق للتقسيط";
  const defaultImage = "https://toq.sa/Test.png";
  const defaultUrl = "https://toq.sa";

  const finalTitle = pageTitle || defaultTitle;
  const finalDescription = pageDescription || defaultDescription;
  const finalKeywords = pageKeywords || defaultKeywords;
  const finalImage = pageImage || defaultImage;
  const finalUrl = pageUrl || defaultUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="طوق للتقسيط" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="ar" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Hreflang */}
      <link rel="alternate" hrefLang="ar" href={finalUrl} />
      <link rel="alternate" hrefLang="x-default" href={finalUrl} />
      
      {/* Preconnect & DNS Prefetch */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content={pageType} />
      <meta property="og:site_name" content="طوق للتقسيط" />
      <meta property="og:locale" content="ar_SA" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@toq_sa" />
      <meta name="twitter:creator" content="@toq_sa" />
      
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#3A6F8F" />
      <meta name="msapplication-TileColor" content="#3A6F8F" />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" href="/Test.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="طوق للتقسيط" />
      
      {/* Windows Tiles */}
      <meta name="msapplication-TileImage" content="/Test.png" />
      
      {/* Sitemap */}
      <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "طوق للتقسيط",
          "url": finalUrl,
          "logo": finalImage,
          "description": finalDescription,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "SA",
            "addressLocality": "المملكة العربية السعودية"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": websiteData.whatsappNumber || "+966500000000",
            "contactType": "customer service",
            "availableLanguage": "Arabic"
          }
        })}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "طوق للتقسيط",
          "url": finalUrl,
          "description": finalDescription,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${finalUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "خدمة التقسيط",
          "description": "تقسيط الأجهزة الإلكترونية والمنزلية",
          "provider": {
            "@type": "Organization",
            "name": "طوق للتقسيط"
          },
          "areaServed": {
            "@type": "Country",
            "name": "المملكة العربية السعودية"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOManager;
