import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#home">
          <div className="navbar-logo">
            <img src="/Test.png" alt="طوق للتقسيط - تقسيط مريح وسهل" className="navbar-logo-img" />
            <span className="navbar-brand-text">طوق للتقسيط</span>
          </div>
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#about">عن طوق للتقسيط</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#privacy">سياسة الخصوصية</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#return-policy">سياسة الاستبدال</a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="https://wa.me/966592799888?text=مرحباً، أريد معلومات عن تقسيط الأجهزة مع طوق للتقسيط" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(45deg, #8B5CF6, #6366F1)', 
                  color: 'white !important', 
                  fontWeight: '700'
                }}
              >
                تقديم الطلب
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
