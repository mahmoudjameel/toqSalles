import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

interface Review {
  text: string;
  name: string;
  city: string;
  avatar: string;
}

const CustomerReviews: React.FC = () => {
  const { websiteData, loading } = useWebsite();

  // Use data from context or fallback to defaults
  const reviews: Review[] = websiteData.reviews?.reviews?.map(review => ({
    text: review.text,
    name: review.name,
    city: review.city,
    avatar: review.name.charAt(0)
  })) || [
    {
      text: "تجربة رائعة مع طوق للتقسيط! حصلت على iPhone جديد بتقسيط سهل وميسر. الموافقة كانت فورية والخدمة ممتازة. أنصح الجميع بالتجربة!",
      name: "أحمد محمد",
      city: "موظف - الرياض",
      avatar: "أ"
    },
    {
      text: "أفضل خدمة تقسيط جربتها! حصلت على لابتوب جديد بخصم كبير وتقسيط مريح وسهل. فريق العمل متعاون جداً والخدمة سريعة.",
      name: "سارة أحمد",
      city: "مهندسة - جدة",
      avatar: "س"
    },
    {
      text: "طوق للتقسيط غير حياتي! حصلت على جميع الأجهزة المنزلية بتقسيط ممتاز. الأسعار منافسة والخصومات كبيرة. شكراً لكم!",
      name: "محمد علي",
      city: "مدير - الدمام",
      avatar: "م"
    },
    {
      text: "خدمة عملاء ممتازة! فريق طوق للتقسيط ساعدني في اختيار أفضل الأجهزة بأسعار مناسبة. التقسيط سهل والموافقة سريعة.",
      name: "فاطمة حسن",
      city: "معلمة - المدينة",
      avatar: "ف"
    },
    {
      text: "أفضل تجربة تقسيط! حصلت على Samsung Galaxy بتقسيط مريح وسهل. الأسعار منافسة والخدمة احترافية. أنصح الجميع!",
      name: "خالد عبدالله",
      city: "طبيب - أبها",
      avatar: "خ"
    },
    {
      text: "طوق للتقسيط منصة موثوقة وممتازة! حصلت على iPad بتقسيط سهل. الموافقة فورية والخدمة سريعة. شكراً لكم!",
      name: "نورا سعد",
      city: "طالبة - تبوك",
      avatar: "ن"
    }
  ];

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2 className="reviews-title">
                <i className="fas fa-star ms-2"></i>
                {websiteData.reviews?.title || 'آراء عملائنا الكرام'}
              </h2>
              <p className="reviews-description">
                {websiteData.reviews?.description || 'اكتشف ما يقوله عملاؤنا عن تجربتهم مع طوق للتقسيط'}
              </p>
            </div>
            
            <div className="row">
              {reviews.map((review, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div className="review-card">
                    <div className="review-text">
                      "{review.text}"
                    </div>
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">{review.avatar}</div>
                      <div className="reviewer-details">
                        <h5 className="review-name">{review.name}</h5>
                        <p className="review-city">{review.city}</p>
                        <div className="rating">
                          <i className="fas fa-star star"></i>
                          <i className="fas fa-star star"></i>
                          <i className="fas fa-star star"></i>
                          <i className="fas fa-star star"></i>
                          <i className="fas fa-star star"></i>
                        </div>
                      </div>
                    </div>
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

export default CustomerReviews;
