import React from 'react';
import { Helmet } from 'react-helmet-async';

const RobotsTxt: React.FC = () => {
  return (
    <Helmet>
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="slurp" content="index, follow" />
      <meta name="duckduckbot" content="index, follow" />
      <meta name="baiduspider" content="index, follow" />
      <meta name="yandexbot" content="index, follow" />
      
      {/* Disallow admin panel */}
      <meta name="robots" content="noindex, nofollow" data-path="/admin" />
      
      {/* Sitemap */}
      <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
    </Helmet>
  );
};

export default RobotsTxt;
