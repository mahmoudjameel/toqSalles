import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface CTAEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

const CTAEditor: React.FC<CTAEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    title: 'طوق للتقسيط مو بس تقسيط!',
    description: 'معنا الحياة تصير مريحة، بأسعار منافسة وخدمة متميزة!',
    whatsappText: 'تواصل معنا الآن',
    callText: 'اتصل بنا',
    shopText: 'تسوق الآن'
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
        if (data.cta) {
          setFormData(data.cta);
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
        cta: formData,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ روابط التواصل بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="cta">
      <div className="card-header">
        <h5><i className="fas fa-phone me-2"></i>روابط التواصل</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">عنوان قسم CTA</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="أدخل عنوان قسم CTA"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">وصف CTA</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="أدخل وصف CTA"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <label className="form-label">نص زر الواتساب</label>
            <input
              type="text"
              className="form-control"
              name="whatsappText"
              value={formData.whatsappText}
              onChange={handleInputChange}
              placeholder="أدخل نص زر الواتساب"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">نص زر الاتصال</label>
            <input
              type="text"
              className="form-control"
              name="callText"
              value={formData.callText}
              onChange={handleInputChange}
              placeholder="أدخل نص زر الاتصال"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">نص زر التسوق</label>
            <input
              type="text"
              className="form-control"
              name="shopText"
              value={formData.shopText}
              onChange={handleInputChange}
              placeholder="أدخل نص زر التسوق"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ روابط التواصل'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTAEditor;
