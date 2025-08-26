import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const AboutSection: React.FC = () => {
  const { websiteData } = useWebsite();

  return (
    <section id="about" className="benefits-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2 className="about-title">{websiteData.about?.title || 'عن طوق للتقسيط | راحتك أولوية'}</h2>
              <p className="about-description">
                {websiteData.about?.description || 'طوق للتقسيط هي شركة رائدة في مجال التقسيط المريح في المملكة العربية السعودية. نؤمن بأن الحياة يجب أن تكون مريحة وخالية من الضغوط المالية.'}
              </p>
            </div>
            
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="about-card">
                  <div className="about-icon">
                    <i className="fas fa-bullseye"></i>
                  </div>
                  <h3>رؤيتنا</h3>
                  <p>
                    أن نكون الخيار الأول للعملاء في المملكة العربية السعودية عندما يتعلق الأمر بتقسيط الأجهزة والإلكترونيات بأسهل الطرق وأفضل الأسعار.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="about-card">
                  <div className="about-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h3>مهمتنا</h3>
                  <p>
                    تسهيل عملية الحصول على الأجهزة والإلكترونيات من خلال خدمات تقسيط مرنة وبدون تعقيدات، مع تقديم أفضل تجربة عملاء ممكنة.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-5">
              <h3>لماذا طوق للتقسيط؟</h3>
              <div className="row">
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-shield-check"></i>
                    </div>
                    <div className="benefit-text">آمن وموثوق</div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-rocket"></i>
                    </div>
                    <div className="benefit-text">سريع وسهل</div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-headset"></i>
                    </div>
                    <div className="benefit-text">خدمة عملاء متميزة</div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-crown"></i>
                    </div>
                    <div className="benefit-text">أفضل الأسعار</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
