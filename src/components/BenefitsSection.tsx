import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const BenefitsSection: React.FC = () => {
  const { websiteData } = useWebsite();

  // Use data from context or fallback to defaults
  const benefits = websiteData.benefits?.benefits || [
    { icon: 'fas fa-smile', text: 'تقسيط مريح وسهل' },
    { icon: 'fas fa-gift', text: 'هدايا مجانية مع كل طلب' },
    { icon: 'fas fa-crown', text: 'أسعار لا تقبل المنافسة' },
    { icon: 'fas fa-mobile-alt', text: 'جميع الأجهزة والمنتجات' }
  ];

  return (
    <section className="benefits-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="text-center mb-5 benefits-title">{websiteData.benefits?.title || 'مميزات تجعلك تختارنا'}</h2>
            
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <div className="benefit-icon">
                  <i className={benefit.icon}></i>
                </div>
                <div className="benefit-text">{benefit.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
