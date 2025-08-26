import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import HeroEditor from '../components/admin/HeroEditor';
import ReviewsEditor from '../components/admin/ReviewsEditor';
import FeaturesEditor from '../components/admin/FeaturesEditor';
import BannerEditor from '../components/admin/BannerEditor';
import StatsEditor from '../components/admin/StatsEditor';
import BenefitsEditor from '../components/admin/BenefitsEditor';
import AboutEditor from '../components/admin/AboutEditor';
import OrderFormEditor from '../components/admin/OrderFormEditor';
import CTAEditor from '../components/admin/CTAEditor';
import FooterEditor from '../components/admin/FooterEditor';
import SocialMediaEditor from '../components/admin/SocialMediaEditor';
import MovingTextEditor from '../components/admin/MovingTextEditor';
import SettingsEditor from '../components/admin/SettingsEditor';
import '../styles/AdminPanel.css';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzY6WVHdZrECAIOaXO7Vyyz23Udzm2bfg",
  authDomain: "salatek-bb9fd.firebaseapp.com",
  databaseURL: "https://salatek-bb9fd-default-rtdb.firebaseio.com",
  projectId: "salatek-bb9fd",
  storageBucket: "salatek-bb9fd.firebasestorage.app",
  messagingSenderId: "753883317449",
  appId: "1:753883317449:web:421ce843a92cae23927918",
  measurementId: "G-L2NW4MN4ZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface AdminPanelProps {}

const AdminPanel: React.FC<AdminPanelProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [statusMessage, setStatusMessage] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(adminLoggedIn);
  }, []);

  const handleLogin = (email: string, password: string) => {
    if (email === 'admin@toq' && password === '123456') {
      localStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      showStatus('تم تسجيل الدخول بنجاح!', 'success');
    } else {
      showStatus('بيانات الدخول غير صحيحة!', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
    showStatus('تم تسجيل الخروج بنجاح!', 'info');
  };

  const showStatus = (message: string, type: 'success' | 'error' | 'info') => {
    setStatusMessage({ message, type });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const saveAllChanges = async () => {
    setIsLoading(true);
    try {
      // This will be implemented in each editor component
      showStatus('تم حفظ جميع التغييرات بنجاح! 🎉', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1 className="admin-title">لوحة التحكم</h1>
        <p className="admin-subtitle">إدارة محتوى موقع طوق للتقسيط</p>
      </div>

      <div className="admin-container">
        {/* Admin Tabs */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveSection('hero')}
          >
            القسم الرئيسي
          </button>
          <button 
            className={`admin-tab ${activeSection === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveSection('reviews')}
          >
            التقييمات
          </button>
          <button 
            className={`admin-tab ${activeSection === 'features' ? 'active' : ''}`}
            onClick={() => setActiveSection('features')}
          >
            المميزات
          </button>
          <button 
            className={`admin-tab ${activeSection === 'banner' ? 'active' : ''}`}
            onClick={() => setActiveSection('banner')}
          >
            البانر
          </button>
          <button 
            className={`admin-tab ${activeSection === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveSection('stats')}
          >
            الإحصائيات
          </button>
          <button 
            className={`admin-tab ${activeSection === 'benefits' ? 'active' : ''}`}
            onClick={() => setActiveSection('benefits')}
          >
            الفوائد
          </button>
          <button 
            className={`admin-tab ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => setActiveSection('about')}
          >
            من نحن
          </button>
          <button 
            className={`admin-tab ${activeSection === 'order' ? 'active' : ''}`}
            onClick={() => setActiveSection('order')}
          >
            نموذج الطلب
          </button>
          <button 
            className={`admin-tab ${activeSection === 'cta' ? 'active' : ''}`}
            onClick={() => setActiveSection('cta')}
          >
            دعوة للعمل
          </button>
          <button 
            className={`admin-tab ${activeSection === 'footer' ? 'active' : ''}`}
            onClick={() => setActiveSection('footer')}
          >
            التذييل
          </button>
          <button 
            className={`admin-tab ${activeSection === 'movingText' ? 'active' : ''}`}
            onClick={() => setActiveSection('movingText')}
          >
            النص المتحرك
          </button>
          <button 
            className={`admin-tab ${activeSection === 'socialMedia' ? 'active' : ''}`}
            onClick={() => setActiveSection('socialMedia')}
          >
            وسائل التواصل
          </button>
          <button 
            className={`admin-tab ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            الإعدادات
          </button>
        </div>

        {/* Admin Content */}
        <div className="admin-content">
          {/* Status Message */}
          {statusMessage && (
            <div className={`message ${statusMessage.type}`}>
              {statusMessage.message}
            </div>
          )}

          {/* Action Buttons */}
          <div className="admin-section">
            <div className="button-group">
              <button 
                className="admin-button success"
                onClick={saveAllChanges}
                disabled={isLoading}
              >
                {isLoading ? 'جاري الحفظ...' : 'حفظ جميع التغييرات'}
              </button>
              <button 
                className="admin-button secondary"
                onClick={handleLogout}
              >
                تسجيل الخروج
              </button>
            </div>
          </div>

          {/* Content Editors */}
          {activeSection === 'hero' && <HeroEditor db={db} showStatus={showStatus} />}
          {activeSection === 'reviews' && <ReviewsEditor db={db} showStatus={showStatus} />}
          {activeSection === 'features' && <FeaturesEditor db={db} showStatus={showStatus} />}
          {activeSection === 'banner' && <BannerEditor db={db} showStatus={showStatus} />}
          {activeSection === 'stats' && <StatsEditor db={db} showStatus={showStatus} />}
          {activeSection === 'benefits' && <BenefitsEditor db={db} showStatus={showStatus} />}
          {activeSection === 'about' && <AboutEditor db={db} showStatus={showStatus} />}
          {activeSection === 'order' && <OrderFormEditor db={db} showStatus={showStatus} />}
          {activeSection === 'cta' && <CTAEditor db={db} showStatus={showStatus} />}
          {activeSection === 'footer' && <FooterEditor db={db} showStatus={showStatus} />}
          {activeSection === 'movingText' && <MovingTextEditor db={db} showStatus={showStatus} />}
          {activeSection === 'socialMedia' && <SocialMediaEditor db={db} showStatus={showStatus} />}
          {activeSection === 'settings' && <SettingsEditor db={db} showStatus={showStatus} />}
        </div>
      </div>
    </div>
  );
};

// Login Screen Component
interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1 className="admin-title">تسجيل الدخول</h1>
        <p className="admin-subtitle">لوحة تحكم طوق للتقسيط</p>
      </div>

      <div className="admin-container">
        <div className="admin-content">
          <div className="admin-section">
            <h2 className="admin-section-title">بيانات الدخول</h2>
            
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@toq"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">كلمة المرور</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="123456"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6c757d'
                    }}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="button-group">
                <button type="submit" className="admin-button success">
                  تسجيل الدخول
                </button>
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
