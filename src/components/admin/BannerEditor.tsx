import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface BannerEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

const BannerEditor: React.FC<BannerEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    title: 'اطلب اللي بخاطرك من طوق للتقسيط',
    subtitle: 'والموافقة فورية إذا كنت',
    highlight: 'سعودي موظف عمرك 20+',
    buttonText: 'للطلب اضغط هنا'
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
        if (data.banner) {
          setFormData(data.banner);
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
        banner: formData,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ البانر بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="banner">
      <div className="card-header">
        <h5><i className="fas fa-bullhorn me-2"></i>قسم البانر</h5>
      </div>
      <div className="card-body">
        <div className="row mb-3">
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
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">النص المميز</label>
            <input
              type="text"
              className="form-control"
              name="highlight"
              value={formData.highlight}
              onChange={handleInputChange}
              placeholder="أدخل النص المميز"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">نص زر الطلب</label>
            <input
              type="text"
              className="form-control"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleInputChange}
              placeholder="أدخل نص زر الطلب"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ البانر'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerEditor;
