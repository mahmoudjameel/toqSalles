import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const StatsSection: React.FC = () => {
  const { websiteData } = useWebsite();

  // Use data from context or fallback to defaults
  const stats = websiteData.stats || [
    { number: '0', label: 'دفعة أولى' },
    { number: '36', label: 'شهر تقسيط مريح وسهل' },
    { number: '100%', label: 'ضمان الجودة' }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="row">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-4 col-md-4">
              <div className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
