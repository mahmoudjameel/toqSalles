import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface HeroEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    title: 'طوق للتقسيط',
    subtitle: 'حلول ذكية لجميع مشاكل التقسيط',
    mainHeading: 'ما تحتاج تعيش حرب نفسية مع راتبك!',
    whatsappNumber: '+972592799888'
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load current content
  useEffect(() => {
    loadCurrentContent();
  }, []);

  const loadCurrentContent = async () => {
    try {
      const docRef = doc(db, 'websiteContent', 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.hero) {
          setFormData({
            title: data.hero.title || 'طوق للتقسيط',
            subtitle: data.hero.subtitle || 'حلول ذكية لجميع مشاكل التقسيط',
            mainHeading: data.hero.mainHeading || 'ما تحتاج تعيش حرب نفسية مع راتبك!',
            whatsappNumber: data.whatsappNumber || '+972592799888'
          });
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showStatus('خطأ في تحميل المحتوى', 'error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'websiteContent', 'main');
      await setDoc(docRef, {
        hero: {
          title: formData.title,
          subtitle: formData.subtitle,
          mainHeading: formData.mainHeading
        },
        whatsappNumber: formData.whatsappNumber,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ التغييرات بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="hero">
      <div className="card-header">
        <h5><i className="fas fa-home me-2"></i>الصفحة الرئيسية</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">العنوان الرئيسي</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="أدخل العنوان الرئيسي"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">العنوان الفرعي</label>
            <input
              type="text"
              className="form-control"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="أدخل العنوان الفرعي"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label className="form-label">العنوان الثانوي</label>
            <input
              type="text"
              className="form-control"
              name="mainHeading"
              value={formData.mainHeading}
              onChange={handleInputChange}
              placeholder="أدخل العنوان الثانوي"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">رقم الواتساب</label>
            <input
              type="text"
              className="form-control"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              placeholder="أدخل رقم الواتساب"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;
