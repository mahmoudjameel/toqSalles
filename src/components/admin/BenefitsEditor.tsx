import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface BenefitsEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface Benefit {
  icon: string;
  text: string;
}

const BenefitsEditor: React.FC<BenefitsEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    title: 'مميزات تجعلك تختارنا',
    benefits: [
      { icon: 'fas fa-smile', text: 'تقسيط مريح وسهل' },
      { icon: 'fas fa-gift', text: 'هدايا مجانية مع كل طلب' },
      { icon: 'fas fa-crown', text: 'أسعار لا تقبل المنافسة' },
      { icon: 'fas fa-mobile-alt', text: 'جميع الأجهزة والمنتجات' }
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
        if (data.benefits) {
          setFormData(data.benefits);
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

  const handleBenefitChange = (index: number, field: keyof Benefit, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = {
      ...newBenefits[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      benefits: newBenefits
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'websiteContent', 'main');
      await setDoc(docRef, {
        benefits: formData,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ المميزات الإضافية بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="benefits">
      <div className="card-header">
        <h5><i className="fas fa-gift me-2"></i>المميزات الإضافية</h5>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-12">
            <label className="form-label">عنوان قسم المميزات</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="أدخل عنوان قسم المميزات"
            />
          </div>
        </div>
        
        {formData.benefits.map((benefit, index) => (
          <div key={index} className="row mb-3 benefit-item">
            <div className="col-md-3">
              <label className="form-label">أيقونة الميزة {index + 1}</label>
              <select
                className="form-select"
                value={benefit.icon}
                onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)}
              >
                <option value="fas fa-smile">😊 ابتسامة</option>
                <option value="fas fa-gift">🎁 هدية</option>
                <option value="fas fa-crown">👑 تاج</option>
                <option value="fas fa-mobile-alt">📱 جوال</option>
                <option value="fas fa-shield-alt">🛡️ درع</option>
              </select>
            </div>
            <div className="col-md-9">
              <label className="form-label">نص الميزة {index + 1}</label>
              <input
                type="text"
                className="form-control"
                value={benefit.text}
                onChange={(e) => handleBenefitChange(index, 'text', e.target.value)}
                placeholder="أدخل نص الميزة"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ المميزات الإضافية'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenefitsEditor;
