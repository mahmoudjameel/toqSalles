import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface MovingTextEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

const MovingTextEditor: React.FC<MovingTextEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    texts: [
      '✨ طوق للتقسيط تقسيط سهل وميسر ✨',
      '🚀 موافقة فورية 🚀',
      '💎 أسعار لا تقبل المنافسة 💎',
      '🎁 هدايا مجانية 🎁',
      '📱 جميع الأجهزة الإلكترونية 📱',
      '⚡ خدمة عملاء 24/7 ⚡',
      '🔒 أمان وموثوقية تامة 🔒',
      '💳 بدون كفيل أو ضامن 💳'
    ],
    speed: 30
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
        if (data.movingText) {
          setFormData(data.movingText);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showStatus('خطأ في تحميل المحتوى', 'error');
    }
  };

  const handleTextChange = (index: number, value: string) => {
    const newTexts = [...formData.texts];
    newTexts[index] = value;
    setFormData(prev => ({
      ...prev,
      texts: newTexts
    }));
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      speed: parseInt(e.target.value)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'websiteContent', 'main');
      await setDoc(docRef, {
        movingText: formData,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ النص المتحرك بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="moving-text">
      <div className="card-header">
        <h5><i className="fas fa-scroll me-2"></i>النص المتحرك</h5>
      </div>
      <div className="card-body">
        {formData.texts.map((text, index) => (
          <div key={index} className="row mb-3">
            <div className="col-12">
              <label className="form-label">النص {index + 1}</label>
              <input
                type="text"
                className="form-control"
                value={text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder={`أدخل النص ${index + 1}`}
              />
            </div>
          </div>
        ))}
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">سرعة الحركة (ثواني)</label>
            <input
              type="number"
              className="form-control"
              value={formData.speed}
              onChange={handleSpeedChange}
              min="10"
              max="60"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ النص المتحرك'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovingTextEditor;
