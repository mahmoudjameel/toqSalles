import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface OrderFormEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

const OrderFormEditor: React.FC<OrderFormEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    title: 'تقديم الطلب',
    description: 'اطلب جهازك المفضل الآن واستمتع بأسهل طرق التقسيط',
    buttonText: 'إرسال الطلب على الواتساب',
    successMessage: 'تم إرسال طلبك بنجاح! سيتم فتح الواتساب الآن.',
    whatsappMessageTemplate: 'مرحباً، أريد تقديم طلب تقسيط مع طوق للتقسيط\n\n📋 *تفاصيل الطلب:*\n👤 *الاسم:* [الاسم]\n🆔 *رقم الهوية:* [رقم الهوية]\n📱 *رقم الجوال:* [رقم الجوال]\n💰 *الراتب الشهري:* [الراتب] ريال\n💻 *نوع الجهاز:* [نوع الجهاز]\n📝 *ملاحظات:* [الملاحظات]\n\nأريد معلومات عن شروط التقسيط المتاحة. شكراً لكم! 🚀',
    deviceOptions: 'جوال - iPhone\nجوال - Samsung\nلابتوب\nتابليت\nأجهزة منزلية\nأخرى'
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
        if (data.order) {
          setFormData(data.order);
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
        order: formData,
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ نموذج الطلب بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="order">
      <div className="card-header">
        <h5><i className="fas fa-edit me-2"></i>نموذج الطلب</h5>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-12">
            <label className="form-label">عنوان قسم الطلب</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="أدخل عنوان قسم الطلب"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <label className="form-label">وصف قسم الطلب</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="أدخل وصف قسم الطلب"
            />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">نص زر الإرسال</label>
            <input
              type="text"
              className="form-control"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleInputChange}
              placeholder="أدخل نص زر الإرسال"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">رسالة تأكيد</label>
            <input
              type="text"
              className="form-control"
              name="successMessage"
              value={formData.successMessage}
              onChange={handleInputChange}
              placeholder="أدخل رسالة التأكيد"
            />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">نص رسالة الواتساب</label>
            <textarea
              className="form-control"
              name="whatsappMessageTemplate"
              rows={4}
              value={formData.whatsappMessageTemplate}
              onChange={handleInputChange}
              placeholder="أدخل نص رسالة الواتساب"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">خيارات الأجهزة</label>
            <textarea
              className="form-control"
              name="deviceOptions"
              rows={4}
              value={formData.deviceOptions}
              onChange={handleInputChange}
              placeholder="أدخل خيارات الأجهزة"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ نموذج الطلب'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFormEditor;
