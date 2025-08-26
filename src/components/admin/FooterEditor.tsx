import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface FooterEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

const FooterEditor: React.FC<FooterEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    description: 'منصة التقسيط الميسر للأجهزة الإلكترونية والمنزلية في المملكة العربية السعودية. نقدم أفضل الخدمات وأسهل طرق التقسيط لعملائنا الكرام.',
    address: 'الرياض، المملكة العربية السعودية\nشارع الملك فهد، برج طوق للتقسيط',
    quickLinksTitle: 'روابط سريعة',
    servicesTitle: 'خدماتنا',
    contactTitle: 'معلومات الاتصال',
    services: 'تقسيط الجوالات\nتقسيط اللابتوبات\nتقسيط الأجهزة المنزلية\nتقسيط الأجهزة اللوحية\nتقسيط الأجهزة الذكية',
    quickLinks: 'الرئيسية\nعن طوق للتقسيط\nتقديم الطلب\nسياسة الخصوصية\nسياسة الاستبدال'
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
        if (data.footer) {
          setFormData(data.footer);
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
        footer: formData,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ Footer بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="footer">
      <div className="card-header">
        <h5><i className="fas fa-shoe-prints me-2"></i>Footer</h5>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">وصف الشركة في Footer</label>
            <textarea
              className="form-control"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="أدخل وصف الشركة"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">العنوان التفصيلي</label>
            <textarea
              className="form-control"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              placeholder="أدخل العنوان التفصيلي"
            />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">روابط سريعة - العنوان</label>
            <input
              type="text"
              className="form-control"
              name="quickLinksTitle"
              value={formData.quickLinksTitle}
              onChange={handleInputChange}
              placeholder="أدخل عنوان الروابط السريعة"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">الخدمات - العنوان</label>
            <input
              type="text"
              className="form-control"
              name="servicesTitle"
              value={formData.servicesTitle}
              onChange={handleInputChange}
              placeholder="أدخل عنوان الخدمات"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">معلومات الاتصال - العنوان</label>
            <input
              type="text"
              className="form-control"
              name="contactTitle"
              value={formData.contactTitle}
              onChange={handleInputChange}
              placeholder="أدخل عنوان معلومات الاتصال"
            />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">روابط الخدمات</label>
            <textarea
              className="form-control"
              name="services"
              rows={4}
              value={formData.services}
              onChange={handleInputChange}
              placeholder="أدخل روابط الخدمات"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">روابط سريعة</label>
            <textarea
              className="form-control"
              name="quickLinks"
              rows={4}
              value={formData.quickLinks}
              onChange={handleInputChange}
              placeholder="أدخل الروابط السريعة"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ Footer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterEditor;
