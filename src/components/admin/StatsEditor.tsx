import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface StatsEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface Stat {
  number: string;
  label: string;
}

const StatsEditor: React.FC<StatsEditorProps> = ({ db, showStatus }) => {
  const [stats, setStats] = useState<Stat[]>([
    { number: '0', label: 'دفعة أولى' },
    { number: '36', label: 'شهر تقسيط مريح وسهل' },
    { number: '100%', label: 'ضمان الجودة' }
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
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showStatus('خطأ في تحميل المحتوى', 'error');
    }
  };

  const handleStatChange = (index: number, field: keyof Stat, value: string) => {
    const newStats = [...stats];
    newStats[index] = {
      ...newStats[index],
      [field]: value
    };
    setStats(newStats);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'websiteContent', 'main');
      await setDoc(docRef, {
        stats: stats,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ الإحصائيات بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="stats">
      <div className="card-header">
        <h5><i className="fas fa-chart-bar me-2"></i>الإحصائيات</h5>
      </div>
      <div className="card-body">
        {stats.map((stat, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">الرقم {index + 1}</label>
              <input
                type="text"
                className="form-control"
                value={stat.number}
                onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                placeholder="أدخل الرقم"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">النص {index + 1}</label>
              <input
                type="text"
                className="form-control"
                value={stat.label}
                onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                placeholder="أدخل النص"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ الإحصائيات'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsEditor;
