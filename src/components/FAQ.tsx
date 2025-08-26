import React, { useState } from 'react';
import { useWebsite } from '../context/WebsiteContext';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { websiteData } = useWebsite();
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Default FAQ items
  const defaultFAQ: FAQItem[] = [
    {
      question: "ما هي شروط التقسيط مع طوق للتقسيط؟",
      answer: "شروط التقسيط بسيطة: أن تكون سعودي الجنسية، عمرك 20 سنة أو أكثر، موظف براتب ثابت، وبدون كفيل أو ضامن."
    },
    {
      question: "كم مدة التقسيط المتاحة؟",
      answer: "نقدم تقسيط لمدة 36 شهر مع دفعة أولى 0 ريال، مما يجعل التقسيط مريح وسهل."
    },
    {
      question: "ما هي الأجهزة المتاحة للتقسيط؟",
      answer: "جميع الأجهزة الإلكترونية: جوالات، لابتوبات، تابلت، أجهزة منزلية، وأجهزة ذكية."
    },
    {
      question: "هل التقسيط آمن وموثوق؟",
      answer: "نعم، نحن شركة مرخصة ومعتمدة في المملكة العربية السعودية، ونضمن لك الأمان والموثوقية التامة."
    },
    {
      question: "كيف يمكنني التواصل معكم؟",
      answer: "يمكنك التواصل معنا عبر الواتساب، الهاتف، أو زيارة موقعنا الإلكتروني. فريق خدمة العملاء متاح 24/7."
    }
  ];

  const faqItems: FAQItem[] = websiteData.faq?.items || defaultFAQ;

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2 className="faq-title">
                <i className="fas fa-question-circle ms-2"></i>
                الأسئلة الشائعة
              </h2>
              <p className="faq-description">
                إجابات على أكثر الأسئلة شيوعاً حول خدمات التقسيط
              </p>
            </div>
            
            <div className="faq-container">
              {faqItems.map((item: FAQItem, index: number) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${openItems.includes(index) ? 'active' : ''}`}
                    onClick={() => toggleItem(index)}
                    aria-expanded={openItems.includes(index)}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <i className={`fas fa-chevron-${openItems.includes(index) ? 'up' : 'down'} faq-icon`}></i>
                  </button>
                  
                  <div
                    id={`faq-answer-${index}`}
                    className={`faq-answer ${openItems.includes(index) ? 'show' : ''}`}
                    aria-hidden={!openItems.includes(index)}
                  >
                    <div className="faq-answer-content">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for FAQ */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map((item: FAQItem) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        })}
      </script>
    </section>
  );
};

export default FAQ;
