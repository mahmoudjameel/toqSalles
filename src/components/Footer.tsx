import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const Footer: React.FC = () => {
  const { websiteData } = useWebsite();

  // Use data from context or fallback to defaults
  const socialMediaPlatforms = websiteData.socialMedia?.platforms?.filter(platform => platform.status === 'active') || [
    { name: 'whatsapp', icon: 'fab fa-whatsapp', text: 'واتساب', link: 'https://wa.me/972592799888' },
    { name: 'twitter', icon: 'fab fa-twitter', text: 'تويتر', link: 'https://twitter.com/touq_installment' },
    { name: 'instagram', icon: 'fab fa-instagram', text: 'انستغرام', link: 'https://instagram.com/touq_installment' },
    { name: 'snapchat', icon: 'fab fa-snapchat', text: 'سناب شات', link: 'https://snapchat.com/add/touq_installment' },
    { name: 'facebook', icon: 'fab fa-facebook', text: 'فيسبوك', link: 'https://facebook.com/touq.installment' },
    { name: 'youtube', icon: 'fab fa-youtube', text: 'يوتيوب', link: 'https://youtube.com/@touq_installment' },
    { name: 'linkedin', icon: 'fab fa-linkedin', text: 'لينكد إن', link: 'https://linkedin.com/company/touq-installment' },
    { name: 'tiktok', icon: 'fab fa-tiktok', text: 'تيك توك', link: 'https://tiktok.com/@touq_installment' },
    { name: 'telegram', icon: 'fab fa-telegram', text: 'تليجرام', link: 'https://t.me/touq_installment' }
  ];

  return (
    <footer className="footer-main">
      <div className="container">
        {/* Main Footer Content */}
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-section">
              <div className="footer-logo mb-3">
                <div className="footer-logo-wrapper">
                  <img src="Test.png" alt="طوق للتقسيط - تقسيط مريح وسهل" className="footer-logo-img" />
                </div>
                <h4 className="footer-brand">طوق للتقسيط</h4>
              </div>
              <p className="footer-description">
                {websiteData.footer?.description || 'منصة التقسيط الميسر للأجهزة الإلكترونية والمنزلية في المملكة العربية السعودية. نقدم أفضل الخدمات وأسهل طرق التقسيط لعملائنا الكرام.'}
              </p>
              <div className="footer-social">
                <h6 className="social-media-title mb-3">{websiteData.socialMedia?.title || 'تواصل معنا على وسائل التواصل الاجتماعي'}</h6>
                <div className="social-media-container social-media-horizontal">
                  {socialMediaPlatforms.map((platform) => (
                    <div key={platform.name} className="social-media-item" data-social-platform={platform.name}>
                      <a href={platform.link} className="social-link" title={platform.text} target="_blank" rel="noopener noreferrer">
                        <div className="social-icon">
                          <i className={platform.icon}></i>
                        </div>
                        <span className="social-text">{platform.text}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-section">
              <h5 className="footer-title">{websiteData.footer?.quickLinksTitle || 'روابط سريعة'}</h5>
              <ul className="footer-links">
                {websiteData.footer?.quickLinks?.split('\n').map((link, index) => (
                  <li key={index}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a></li>
                )) || [
                  <li key="home"><a href="#home">الرئيسية</a></li>,
                  <li key="about"><a href="#about">عن طوق للتقسيط</a></li>,
                  <li key="order"><a href="#order">تقديم الطلب</a></li>,
                  <li key="privacy"><a href="#privacy">سياسة الخصوصية</a></li>,
                  <li key="return-policy"><a href="#return-policy">سياسة الاستبدال</a></li>
                ]}
              </ul>
            </div>
          </div>
          
          {/* Services */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-section">
              <h5 className="footer-title">{websiteData.footer?.servicesTitle || 'خدماتنا'}</h5>
              <ul className="footer-links">
                {websiteData.footer?.services?.split('\n').map((service, index) => (
                  <li key={index}><a href={`#${service.toLowerCase().replace(/\s+/g, '-')}`}>{service}</a></li>
                )) || [
                  <li key="phones"><a href="#services-phones">تقسيط الجوالات</a></li>,
                  <li key="laptops"><a href="#services-laptops">تقسيط اللابتوبات</a></li>,
                  <li key="home"><a href="#services-home">تقسيط الأجهزة المنزلية</a></li>,
                  <li key="tablets"><a href="#services-tablets">تقسيط الأجهزة اللوحية</a></li>,
                  <li key="smart"><a href="#services-smart">تقسيط الأجهزة الذكية</a></li>
                ]}
              </ul>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-section">
              <h5 className="footer-title">{websiteData.footer?.contactTitle || 'معلومات التواصل'}</h5>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>العنوان:</strong>
                    <p>{websiteData.footer?.address?.replace('\n', '<br/>') || 'الرياض، المملكة العربية السعودية<br/>شارع الملك فهد، برج طوق للتقسيط'}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>الهاتف:</strong>
                    <p>{websiteData.whatsappNumber || '+966 11 123 4567'}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong>البريد الإلكتروني:</strong>
                    <p>{websiteData.settings?.email || 'info@touq.sa'}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <strong>ساعات العمل:</strong>
                    <p>الأحد - الخميس: 8 ص - 6 م<br/>الجمعة: 9 ص - 2 م</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="footer-map">
              <h5 className="footer-title text-center mb-3">موقعنا</h5>
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.7!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890"
                  width="100%" 
                  height="300" 
                  style={{ border: 0, borderRadius: '15px' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقع طوق للتقسيط"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">{websiteData.settings?.copyright || '© 2025 طوق للتقسيط. جميع الحقوق محفوظة'}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-bottom-links">
                <a href="#terms">الشروط والأحكام</a>
                <a href="#privacy">سياسة الخصوصية</a>
                <a href="#sitemap">خريطة الموقع</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
