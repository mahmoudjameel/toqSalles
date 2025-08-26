import React, { useState } from 'react';
import { useWebsite } from '../context/WebsiteContext';

const OrderForm: React.FC = () => {
  const { websiteData } = useWebsite();
  
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    monthlySalary: '',
    deviceType: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من صحة البيانات
    if (!formData.fullName || !formData.idNumber || !formData.phoneNumber || !formData.monthlySalary || !formData.deviceType) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    // إنشاء رسالة الواتساب
    const whatsappMessage = websiteData.order?.whatsappMessageTemplate || `مرحباً، أريد تقديم طلب تقسيط مع طوق للتقسيط

📋 *تفاصيل الطلب:*
👤 *الاسم:* ${formData.fullName}
🆔 *رقم الهوية:* ${formData.idNumber}
📱 *رقم الجوال:* ${formData.phoneNumber}
💰 *الراتب الشهري:* ${formData.monthlySalary} ريال
💻 *نوع الجهاز:* ${formData.deviceType}
📝 *ملاحظات:* ${formData.notes || 'لا توجد ملاحظات'}

أريد معلومات عن شروط التقسيط المتاحة. شكراً لكم! 🚀`;
    
    // ترميز الرسالة للواتساب
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // إنشاء رابط الواتساب
    const whatsappUrl = `https://wa.me/${websiteData.whatsappNumber?.replace('+', '') || '972592799888'}?text=${encodedMessage}`;
    
    // فتح الواتساب في نافذة جديدة
    window.open(whatsappUrl, '_blank');
    
    // إظهار رسالة تأكيد
    alert(websiteData.order?.successMessage || 'تم إرسال طلبك بنجاح! سيتم فتح الواتساب الآن.');
    
    // إعادة تعيين النموذج
    setFormData({
      fullName: '',
      idNumber: '',
      phoneNumber: '',
      monthlySalary: '',
      deviceType: '',
      notes: ''
    });
  };

  return (
    <section id="order" className="order-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h2 className="order-title">{websiteData.order?.title || 'تقديم الطلب'}</h2>
              <p className="order-description">
                {websiteData.order?.description || 'اطلب جهازك المفضل الآن واستمتع بأسهل طرق التقسيط'}
              </p>
            </div>
            
            <div className="order-form-container">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <label>
                      <i className="fas fa-user ms-2"></i>
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                      required
                    />
                  </div>
                  <div className="col-lg-6 mb-4">
                    <label>
                      <i className="fas fa-id-card ms-2"></i>
                      رقم الهوية *
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                      required
                    />
                  </div>
                  <div className="col-lg-6 mb-4">
                    <label>
                      <i className="fas fa-phone ms-2"></i>
                      رقم الجوال *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                      required
                    />
                  </div>
                  <div className="col-lg-6 mb-4">
                    <label>
                      <i className="fas fa-money-bill-wave ms-2"></i>
                      الراتب الشهري *
                    </label>
                    <input
                      type="number"
                      name="monthlySalary"
                      value={formData.monthlySalary}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                      required
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <label>
                      <i className="fas fa-laptop ms-2"></i>
                      نوع الجهاز المطلوب *
                    </label>
                    <select
                      name="deviceType"
                      value={formData.deviceType}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                      required
                    >
                      <option value="">اختر نوع الجهاز</option>
                      <option value="جوال - iPhone">جوال - iPhone</option>
                      <option value="جوال - Samsung">جوال - Samsung</option>
                      <option value="لابتوب">لابتوب</option>
                      <option value="تابليت">تابليت</option>
                      <option value="أجهزة منزلية">أجهزة منزلية</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>
                  <div className="col-12 mb-4">
                    <label>
                      <i className="fas fa-comment ms-2"></i>
                      ملاحظات إضافية
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="form-control"
                      rows={4}
                      placeholder="اكتب أي ملاحظات أو متطلبات خاصة"
                    ></textarea>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <button type="submit" className="cta-button order-button">
                    <i className="fab fa-whatsapp ms-2"></i>
                    {websiteData.order?.buttonText || 'إرسال الطلب على الواتساب'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
