import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface FeaturesEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FeaturesEditor: React.FC<FeaturesEditorProps> = ({ db, showStatus }) => {
  const [features, setFeatures] = useState<Feature[]>([
    { icon: 'fas fa-heart', title: 'تقسيط مريح وسهل', description: 'استرخي واستمتع بالشراء' },
    { icon: 'fas fa-rocket', title: 'موافقة فورية', description: 'خلال دقائق معدودة' },
    { icon: 'fas fa-gem', title: 'أسعار ذهبية', description: 'أفضل الأسعار في السوق' },
    { icon: 'fas fa-star', title: 'خدمة عملاء متميزة', description: 'نحن هنا لمساعدتك' }
  ]);

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
        if (data.features) {
          setFeatures(data.features);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showStatus('خطأ في تحميل المحتوى', 'error');
    }
  };

  const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: value
    };
    setFeatures(newFeatures);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'websiteContent', 'main');
      await setDoc(docRef, {
        features: features,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ المميزات بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="features">
      <div className="card-header">
        <h5><i className="fas fa-star me-2"></i>المميزات</h5>
      </div>
      <div className="card-body">
        {features.map((feature, index) => (
          <div key={index} className="row mb-3 feature-item">
            <div className="col-md-3">
              <label className="form-label">أيقونة الميزة {index + 1}</label>
              <select
                className="form-select"
                value={feature.icon}
                onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
              >
                <option value="fas fa-heart">❤️ قلب</option>
                <option value="fas fa-rocket">🚀 صاروخ</option>
                <option value="fas fa-gem">💎 جوهرة</option>
                <option value="fas fa-star">⭐ نجمة</option>
                <option value="fas fa-shield-alt">🛡️ درع</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">عنوان الميزة {index + 1}</label>
              <input
                type="text"
                className="form-control"
                value={feature.title}
                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                placeholder="أدخل عنوان الميزة"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">وصف الميزة {index + 1}</label>
              <input
                type="text"
                className="form-control"
                value={feature.description}
                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                placeholder="أدخل وصف الميزة"
              />
            </div>
          </div>
        ))}
        
        <div className="text-center mt-4">
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={isLoading}
          >
            <i className="fas fa-save me-2"></i>
            {isLoading ? 'جاري الحفظ...' : 'حفظ المميزات'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesEditor;
