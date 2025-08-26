import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface SettingsEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

const SettingsEditor: React.FC<SettingsEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    companyName: 'طوق للتقسيط',
    address: 'الرياض، المملكة العربية السعودية',
    email: 'info@touq.sa',
    copyright: '© 2025 طوق للتقسيط. جميع الحقوق محفوظة'
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
        if (data.settings) {
          setFormData(data.settings);
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
        settings: formData,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ الإعدادات العامة بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="settings">
      <div className="card-header">
        <h5><i className="fas fa-cog me-2"></i>الإعدادات العامة</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">اسم الشركة في Footer</label>
            <input
              type="text"
              className="form-control"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="أدخل اسم الشركة"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">العنوان</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="أدخل العنوان"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label className="form-label">البريد الإلكتروني</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="أدخل البريد الإلكتروني"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">حقوق النشر</label>
            <input
              type="text"
              className="form-control"
              name="copyright"
              value={formData.copyright}
              onChange={handleInputChange}
              placeholder="أدخل نص حقوق النشر"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ الإعدادات العامة'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsEditor;
