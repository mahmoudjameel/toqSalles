import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const HeroSection: React.FC = () => {
  const { websiteData, loading } = useWebsite();

  // Use data from context or fallback to defaults
  const features = websiteData.features || [
    {
      icon: 'fas fa-heart',
      title: 'تقسيط مريح وسهل',
      description: 'استرخي واستمتع بالشراء'
    },
    {
      icon: 'fas fa-rocket',
      title: 'موافقة فورية',
      description: 'خلال دقائق معدودة'
    },
    {
      icon: 'fas fa-gem',
      title: 'أسعار ذهبية',
      description: 'أفضل الأسعار في السوق'
    },
    {
      icon: 'fas fa-star',
      title: 'خدمة عملاء متميزة',
      description: 'نحن هنا لمساعدتك'
    }
  ];

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Logo and Brand */}
            <div className="logo-container">
              <div className="hero-logo-wrapper">
                <img src="/Test.png" alt="طوق للتقسيط - تقسيط مريح وسهل" className="hero-logo-img" />
              </div>
              <h1 className="brand-title">{websiteData.hero?.title || 'طوق للتقسيط'}</h1>
              <p className="brand-subtitle">{websiteData.hero?.subtitle || 'حلول ذكية لجميع<br />مشاكل التقسيط'}</p>
            </div>
            
            {/* Main Heading */}
            <div className="text-center">
              <h2 className="main-heading">{websiteData.hero?.mainHeading || 'ما تحتاج تعيش حرب نفسية مع راتبك!'}</h2>
            </div>
            
            {/* Features Grid */}
            <div className="row mt-5">
              {features.map((feature, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className={feature.icon}></i>
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
