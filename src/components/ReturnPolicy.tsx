import React from 'react';

const ReturnPolicy: React.FC = () => {
  const returnPolicies = [
    {
      icon: 'fas fa-undo',
      title: '14 يوم',
      description: 'فترة إرجاع مجانية لمدة 14 يوم من تاريخ الاستلام مع إمكانية الاستبدال',
      color: 'linear-gradient(45deg, #10B981, #059669)'
    },
    {
      icon: 'fas fa-truck-fast',
      title: 'شحن مجاني',
      description: 'شحن مجاني للإرجاع والاستبدال لجميع أنحاء المملكة العربية السعودية',
      color: 'linear-gradient(45deg, #F59E0B, #D97706)'
    },
    {
      icon: 'fas fa-award',
      title: 'ضمان الجودة',
      description: 'ضمان شامل على جميع المنتجات مع خدمة صيانة مجانية لمدة عام كامل',
      color: 'linear-gradient(45deg, #EF4444, #DC2626)'
    }
  ];

  const returnTerms = [
    'المنتج في حالته الأصلية مع العبوة والملحقات',
    'عدم وجود خدوش أو أضرار ناتجة عن الاستخدام',
    'إحضار فاتورة الشراء الأصلية',
    'التواصل مع خدمة العملاء قبل الإرجاع'
  ];

  return (
    <section id="return-policy" className="return-policy-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2>سياسة الاستبدال والاسترجاع</h2>
              <p>نحن نضمن لك تجربة شراء آمنة ومريحة</p>
            </div>
            
            <div className="row">
              {returnPolicies.map((policy, index) => (
                <div key={index} className="col-lg-4 mb-4">
                  <div className="return-policy-card">
                    <div 
                      className="return-policy-icon"
                      style={{ background: policy.color }}
                    >
                      <i className={policy.icon}></i>
                    </div>
                    <h4>{policy.title}</h4>
                    <p>{policy.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="return-terms">
              <h4>شروط الإرجاع:</h4>
              <ul>
                {returnTerms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy;
