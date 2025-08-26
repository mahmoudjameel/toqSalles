import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const WhatsAppFloat: React.FC = () => {
  const { websiteData } = useWebsite();

  return (
    <a 
      href={`https://wa.me/${websiteData.whatsappNumber?.replace('+', '') || '966592799888'}?text=مرحباً، أريد معلومات عن تقسيط الأجهزة مع طوق للتقسيط`}
      target="_blank" 
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="تواصل معنا على الواتساب"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppFloat;
