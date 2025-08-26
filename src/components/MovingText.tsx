import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const MovingText: React.FC = () => {
  const { websiteData } = useWebsite();

  // Use data from context or fallback to defaults
  const movingTexts = websiteData.movingText?.texts || [
    "✨ طوق للتقسيط تقسيط سهل وميسر ✨",
    "🚀 موافقة فورية 🚀",
    "💎 أسعار لا تقبل المنافسة 💎",
    "🎁 هدايا مجانية 🎁",
    "📱 جميع الأجهزة الإلكترونية 📱",
    "⚡ خدمة عملاء 24/7 ⚡",
    "🔒 أمان وموثوقية تامة 🔒",
    "💳 بدون كفيل أو ضامن 💳"
  ];

  return (
    <section className="moving-text-container">
      <div className="moving-text">
        {movingTexts.map((text, index) => (
          <span key={index} className={index % 2 === 1 ? 'highlight' : ''}>
            {text}
          </span>
        ))}
        {/* تكرار النصوص للحركة المستمرة */}
        {movingTexts.map((text, index) => (
          <span key={`repeat-${index}`} className={index % 2 === 1 ? 'highlight' : ''}>
            {text}
          </span>
        ))}
      </div>
    </section>
  );
};

export default MovingText;
