import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <section id="privacy" className="privacy-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2>سياسة الخصوصية</h2>
            </div>
            
            <div className="privacy-content">
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <div className="privacy-item">
                    <h4>
                      <i className="fas fa-lock ms-2"></i>
                      حماية البيانات
                    </h4>
                    <p>
                      نحن في طوق للتقسيط نلتزم بحماية خصوصية عملائنا وبياناتهم الشخصية. جميع المعلومات التي تقدمها محمية بأعلى مستويات الأمان والتشفير.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="privacy-item">
                    <h4>
                      <i className="fas fa-user-shield ms-2"></i>
                      استخدام المعلومات
                    </h4>
                    <p>
                      نستخدم معلوماتك فقط لتقديم خدماتنا وتحسين تجربتك معنا. لا نشارك بياناتك مع أطراف ثالثة دون موافقتك المسبقة.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="privacy-item">
                    <h4>
                      <i className="fas fa-eye-slash ms-2"></i>
                      السرية التامة
                    </h4>
                    <p>
                      جميع معاملاتك المالية والشخصية محاطة بالسرية التامة ومحمية بموجب القوانين السعودية لحماية البيانات.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="privacy-item">
                    <h4>
                      <i className="fas fa-balance-scale ms-2"></i>
                      الشفافية
                    </h4>
                    <p>
                      نؤمن بالشفافية الكاملة في جميع خدماتنا وسياساتنا. يمكنك الاطلاع على تفاصيل سياسة الخصوصية كاملة عند التسجيل.
                    </p>
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

export default PrivacyPolicy;
