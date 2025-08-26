import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const BannerSection: React.FC = () => {
  const { websiteData } = useWebsite();

  return (
    <section className="banner-section">
      <div className="banner-bg"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="banner-content">
              <h2 className="banner-title">{websiteData.banner?.title || 'ما يحتاج تعيش حرب نفسية مع راتبك!'}</h2>
              
              <div className="banner-details">
                <div className="text-center">
                  <p className="banner-subtitle">ولك كاش بيك</p>
                  <div className="banner-number">500 ريال</div>
                  <p className="banner-number-label">يتوقل على<br/>حسابك البنكي</p>
                </div>
                
                <div className="banner-highlight">
                  {websiteData.banner?.subtitle || 'اطلب اللي بخاطرك من طوق للتقسيط'}<br/>
                  {websiteData.banner?.highlight || 'والموافقة فورية إذا كنت'}<br/>
                  <span style={{ color: '#FCD34D', fontWeight: '800' }}>سعودي موظف عمرك 20+</span>
                </div>
              </div>
              
              <div className="banner-cta">
                <a 
                  href={`https://wa.me/${websiteData.whatsappNumber?.replace('+', '') || '972592799888'}?text=مرحباً، أريد معلومات عن تقسيط الأجهزة مع طوق للتقسيط`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-button banner-button"
                >
                  <i className="fab fa-whatsapp ms-2"></i>
                  {websiteData.banner?.buttonText || 'للطلب اضغط هنا'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
