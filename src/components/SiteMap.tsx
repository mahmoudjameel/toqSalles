import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const SiteMap: React.FC = () => {
  const { websiteData } = useWebsite();

  const siteMapData = {
    mainPages: [
      { name: 'الرئيسية', url: '/', description: 'الصفحة الرئيسية لطوق للتقسيط' },
      { name: 'عن طوق للتقسيط', url: '/#about', description: 'تعرف على شركة طوق للتقسيط' },
      { name: 'تقديم الطلب', url: '/#order', description: 'قدم طلب تقسيط جهازك' },
      { name: 'الأسئلة الشائعة', url: '/#faq', description: 'إجابات على الأسئلة الشائعة' },
      { name: 'سياسة الخصوصية', url: '/#privacy', description: 'سياسة الخصوصية' },
      { name: 'سياسة الاستبدال', url: '/#return-policy', description: 'سياسة الاستبدال والاسترجاع' }
    ],
    services: [
      { name: 'تقسيط الجوالات', url: '/#services-phones', description: 'تقسيط جميع أنواع الجوالات' },
      { name: 'تقسيط اللابتوبات', url: '/#services-laptops', description: 'تقسيط اللابتوبات والأجهزة المحمولة' },
      { name: 'تقسيط الأجهزة المنزلية', url: '/#services-home', description: 'تقسيط الأجهزة المنزلية' },
      { name: 'تقسيط الأجهزة اللوحية', url: '/#services-tablets', description: 'تقسيط التابلت والأجهزة اللوحية' },
      { name: 'تقسيط الأجهزة الذكية', url: '/#services-smart', description: 'تقسيط الأجهزة الذكية' }
    ],
    contactInfo: [
      { name: 'واتساب', url: `https://wa.me/${websiteData.whatsappNumber?.replace('+', '') || '966592799888'}`, description: 'تواصل معنا عبر الواتساب' },
      { name: 'الهاتف', url: `tel:${websiteData.whatsappNumber || '+966592799888'}`, description: 'اتصل بنا مباشرة' },
      { name: 'البريد الإلكتروني', url: `mailto:${websiteData.settings?.email || 'info@touq.sa'}`, description: 'راسلنا عبر البريد الإلكتروني' }
    ]
  };

  return (
    <section className="sitemap-section" id="sitemap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2 className="sitemap-title">
                <i className="fas fa-sitemap ms-2"></i>
                خريطة الموقع
              </h2>
              <p className="sitemap-description">
                تصفح جميع صفحات وخدمات موقع طوق للتقسيط
              </p>
            </div>
            
            <div className="row">
              {/* الصفحات الرئيسية */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="sitemap-category">
                  <h3 className="sitemap-category-title">
                    <i className="fas fa-home me-2"></i>
                    الصفحات الرئيسية
                  </h3>
                  <ul className="sitemap-links">
                    {siteMapData.mainPages.map((page, index) => (
                      <li key={index}>
                        <a href={page.url} className="sitemap-link" title={page.description}>
                          {page.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* الخدمات */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="sitemap-category">
                  <h3 className="sitemap-category-title">
                    <i className="fas fa-cogs me-2"></i>
                    خدماتنا
                  </h3>
                  <ul className="sitemap-links">
                    {siteMapData.services.map((service, index) => (
                      <li key={index}>
                        <a href={service.url} className="sitemap-link" title={service.description}>
                          {service.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* معلومات التواصل */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="sitemap-category">
                  <h3 className="sitemap-category-title">
                    <i className="fas fa-phone me-2"></i>
                    معلومات التواصل
                  </h3>
                  <ul className="sitemap-links">
                    {siteMapData.contactInfo.map((contact, index) => (
                      <li key={index}>
                        <a href={contact.url} className="sitemap-link" title={contact.description}>
                          {contact.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* معلومات إضافية */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="sitemap-info">
                  <h4>معلومات الموقع</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>اسم الموقع:</strong> طوق للتقسيط</p>
                      <p><strong>اللغة:</strong> العربية</p>
                      <p><strong>الدولة:</strong> المملكة العربية السعودية</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>آخر تحديث:</strong> {websiteData.lastUpdated ? new Date(websiteData.lastUpdated).toLocaleDateString('ar-SA') : '26 يناير 2025'}</p>
                      <p><strong>عدد الصفحات:</strong> {siteMapData.mainPages.length + siteMapData.services.length}</p>
                      <p><strong>نوع الموقع:</strong> موقع تقسيط إلكتروني</p>
                    </div>
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

export default SiteMap;
