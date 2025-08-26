import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const CTASection: React.FC = () => {
  const { websiteData } = useWebsite();

  return (
    <section className="cta-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <h2 className="cta-title">{websiteData.cta?.title || 'طوق للتقسيط مو بس تقسيط!'}</h2>
            <p className="cta-description">
              {websiteData.cta?.description || 'معنا الحياة تصير مريحة، بأسعار منافسة وخدمة متميزة!'}<br/>
              لا تنتظر، تواصل معنا الآن واستمتع بالراحة المطلقة
            </p>
            
            <div className="text-center">
              <a 
                href={`https://wa.me/${websiteData.whatsappNumber?.replace('+', '') || '972592799888'}?text=مرحباً، أريد معلومات عن تقسيط الأجهزة مع طوق للتقسيط`}
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button whatsapp-button"
              >
                <i className="fab fa-whatsapp ms-2"></i>
                {websiteData.cta?.whatsappText || 'تواصل معنا الآن'}
              </a>
            </div>
            
            <div className="row mt-5">
              <div className="col-md-4 mb-3">
                <a 
                  href={`https://wa.me/${websiteData.whatsappNumber?.replace('+', '') || '972592799888'}?text=مرحباً، أريد معلومات عن تقسيط الأجهزة مع طوق للتقسيط`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-button w-100 d-block"
                >
                  <i className="fab fa-whatsapp ms-2"></i>
                  {websiteData.cta?.whatsappText || 'واتساب'}
                </a>
              </div>
              <div className="col-md-4 mb-3">
                <a href={`tel:${websiteData.whatsappNumber || '+972592799888'}`} className="cta-button w-100 d-block">
                  <i className="fas fa-phone ms-2"></i>
                  {websiteData.cta?.callText || 'اتصل بنا'}
                </a>
              </div>
              <div className="col-md-4 mb-3">
                <a 
                  href={`https://wa.me/${websiteData.whatsappNumber?.replace('+', '') || '972592799888'}?text=مرحباً، أريد معلومات عن تقسيط الأجهزة مع طوق للتقسيط`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-button w-100 d-block"
                >
                  <i className="fab fa-whatsapp ms-2"></i>
                  {websiteData.cta?.shopText || 'تسوق الآن'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
