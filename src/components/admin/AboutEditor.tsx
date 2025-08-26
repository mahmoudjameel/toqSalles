import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AboutEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

const AboutEditor: React.FC<AboutEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    title: 'عن طوق للتقسيط | راحتك أولوية',
    subtitle: 'لماذا طوق للتقسيط؟',
    description: 'طوق للتقسيط هي شركة رائدة في مجال التقسيط المريح في المملكة العربية السعودية. نؤمن بأن الحياة يجب أن تكون مريحة وخالية من الضغوط المالية.'
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
        if (data.about) {
          setFormData(data.about);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showStatus('خطأ في تحميل المحتوى', 'error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        about: formData,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ معلومات الشركة بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="about">
      <div className="card-header">
        <h5><i className="fas fa-info-circle me-2"></i>عن الشركة</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">عنوان القسم</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="أدخل عنوان القسم"
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
          <div className="col-12">
            <label className="form-label">وصف الشركة</label>
            <textarea
              className="form-control"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="أدخل وصف الشركة"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ معلومات الشركة'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;
