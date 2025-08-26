import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface SocialMediaEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface Platform {
  name: string;
  icon: string;
  text: string;
  link: string;
  status: 'active' | 'inactive';
}

const SocialMediaEditor: React.FC<SocialMediaEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    title: 'تواصل معنا على وسائل التواصل الاجتماعي',
    style: 'horizontal',
    size: 'medium',
    color: '#3A6F8F',
    bgColor: '#F7F5F0',
    platforms: [
      { name: 'whatsapp', icon: 'fab fa-whatsapp', text: 'واتساب', link: 'https://wa.me/972592799888', status: 'active' },
      { name: 'twitter', icon: 'fab fa-twitter', text: 'تويتر', link: 'https://twitter.com/touq_installment', status: 'active' },
      { name: 'instagram', icon: 'fab fa-instagram', text: 'انستغرام', link: 'https://instagram.com/touq_installment', status: 'active' },
      { name: 'snapchat', icon: 'fab fa-snapchat', text: 'سناب شات', link: 'https://snapchat.com/add/touq_installment', status: 'active' },
      { name: 'facebook', icon: 'fab fa-facebook', text: 'فيسبوك', link: 'https://facebook.com/touq.installment', status: 'active' },
      { name: 'youtube', icon: 'fab fa-youtube', text: 'يوتيوب', link: 'https://youtube.com/@touq_installment', status: 'active' },
      { name: 'linkedin', icon: 'fab fa-linkedin', text: 'لينكد إن', link: 'https://linkedin.com/company/touq-installment', status: 'active' },
      { name: 'tiktok', icon: 'fab fa-tiktok', text: 'تيك توك', link: 'https://tiktok.com/@touq_installment', status: 'active' },
      { name: 'telegram', icon: 'fab fa-telegram', text: 'تليجرام', link: 'https://t.me/touq_installment', status: 'active' }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCurrentContent();
  }, []);

  const loadCurrentContent = async () => {
    try {
      const docRef = doc(db, 'websiteContent', 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.socialMedia) {
          setFormData(data.socialMedia);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showStatus('خطأ في تحميل المحتوى', 'error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlatformChange = (index: number, field: keyof Platform, value: string) => {
    const newPlatforms = [...formData.platforms];
    newPlatforms[index] = {
      ...newPlatforms[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      platforms: newPlatforms
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'websiteContent', 'main');
      await setDoc(docRef, {
        socialMedia: formData,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ وسائل التواصل الاجتماعي بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="social-media">
      <div className="card-header">
        <h5><i className="fas fa-share-alt me-2"></i>وسائل التواصل الاجتماعي</h5>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-12">
            <label className="form-label">عنوان قسم وسائل التواصل</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="أدخل عنوان قسم وسائل التواصل"
            />
          </div>
        </div>
        
        {formData.platforms.map((platform, index) => (
          <div key={index} className="row mb-3 social-media-item">
            <div className="col-md-2">
              <label className="form-label">أيقونة {platform.name}</label>
              <select
                className="form-select"
                value={platform.icon}
                onChange={(e) => handlePlatformChange(index, 'icon', e.target.value)}
              >
                <option value="fab fa-whatsapp">📱 WhatsApp</option>
                <option value="fab fa-twitter">🐦 Twitter</option>
                <option value="fab fa-instagram">📸 Instagram</option>
                <option value="fab fa-snapchat">👻 Snapchat</option>
                <option value="fab fa-facebook">📘 Facebook</option>
                <option value="fab fa-youtube">📺 YouTube</option>
                <option value="fab fa-linkedin">💼 LinkedIn</option>
                <option value="fab fa-tiktok">🎵 TikTok</option>
                <option value="fab fa-telegram">📬 Telegram</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">نص {platform.name}</label>
              <input
                type="text"
                className="form-control"
                value={platform.text}
                onChange={(e) => handlePlatformChange(index, 'text', e.target.value)}
                placeholder="أدخل النص"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">رابط {platform.name}</label>
              <input
                type="text"
                className="form-control"
                value={platform.link}
                onChange={(e) => handlePlatformChange(index, 'link', e.target.value)}
                placeholder="أدخل الرابط"
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">الحالة</label>
              <select
                className="form-select"
                value={platform.status}
                onChange={(e) => handlePlatformChange(index, 'status', e.target.value)}
              >
                <option value="active">مفعل</option>
                <option value="inactive">معطل</option>
              </select>
            </div>
          </div>
        ))}
        
        <div className="row mt-4">
          <div className="col-md-6">
            <label className="form-label">نمط العرض</label>
            <select
              className="form-select"
              name="style"
              value={formData.style}
              onChange={handleInputChange}
            >
              <option value="horizontal">أفقي (صف واحد)</option>
              <option value="vertical">عمودي (عمود واحد)</option>
              <option value="grid">شبكة (2×2)</option>
              <option value="circular">دائري</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">حجم الأيقونات</label>
            <select
              className="form-select"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
            >
              <option value="small">صغير (16px)</option>
              <option value="medium">متوسط (24px)</option>
              <option value="large">كبير (32px)</option>
              <option value="xlarge">كبير جداً (48px)</option>
            </select>
          </div>
        </div>
        
        <div className="row mt-3">
          <div className="col-md-6">
            <label className="form-label">لون الأيقونات</label>
            <input
              type="color"
              className="form-control form-control-color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">لون الخلفية</label>
            <input
              type="color"
              className="form-control form-control-color"
              name="bgColor"
              value={formData.bgColor}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="text-center mt-4">
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={isLoading}
          >
            <i className="fas fa-save me-2"></i>
            {isLoading ? 'جاري الحفظ...' : 'حفظ وسائل التواصل الاجتماعي'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaEditor;
