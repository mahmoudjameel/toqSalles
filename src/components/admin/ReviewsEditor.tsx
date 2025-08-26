import React, { useState, useEffect } from 'react';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface ReviewsEditorProps {
  db: Firestore;
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface Review {
  text: string;
  name: string;
  city: string;
}

const ReviewsEditor: React.FC<ReviewsEditorProps> = ({ db, showStatus }) => {
  const [formData, setFormData] = useState({
    title: 'آراء عملائنا الكرام',
    description: 'اكتشف ما يقوله عملاؤنا عن تجربتهم مع طوق للتقسيط',
    reviews: [
      {
        text: 'تجربة رائعة مع طوق للتقسيط! حصلت على iPhone جديد بتقسيط سهل وميسر. الموافقة كانت فورية والخدمة ممتازة. أنصح الجميع بالتجربة!',
        name: 'أحمد محمد',
        city: 'الرياض'
      },
      {
        text: 'طوق للتقسيط غير حياتي! حصلت على جميع الأجهزة المنزلية بتقسيط ممتاز. الأسعار منافسة والخصومات كبيرة. شكراً لكم!',
        name: 'سارة أحمد',
        city: 'جدة'
      },
      {
        text: 'خدمة عملاء ممتازة! فريق طوق للتقسيط ساعدني في اختيار أفضل الأجهزة بأسعار مناسبة. التقسيط سهل والموافقة سريعة.',
        name: 'محمد علي',
        city: 'الدمام'
      },
      {
        text: 'طوق للتقسيط منصة موثوقة وممتازة! حصلت على iPad بتقسيط سهل. الموافقة فورية والخدمة سريعة. شكراً لكم!',
        name: 'فاطمة حسن',
        city: 'مكة'
      }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load current content
  useEffect(() => {
    loadCurrentContent();
  }, []);

  const loadCurrentContent = async () => {
    try {
      const docRef = doc(db, 'websiteContent', 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.reviews) {
          setFormData({
            title: data.reviews.title || 'آراء عملائنا الكرام',
            description: data.reviews.description || 'اكتشف ما يقوله عملاؤنا عن تجربتهم مع طوق للتقسيط',
            reviews: data.reviews.reviews || formData.reviews
          });
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

  const handleReviewChange = (index: number, field: keyof Review, value: string) => {
    const newReviews = [...formData.reviews];
    newReviews[index] = {
      ...newReviews[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      reviews: newReviews
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'websiteContent', 'main');
      await setDoc(docRef, {
        reviews: {
          title: formData.title,
          description: formData.description,
          reviews: formData.reviews
        },
        lastUpdated: new Date()
      }, { merge: true });

      showStatus('تم حفظ المراجعات بنجاح!', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="reviews">
      <div className="card-header">
        <h5><i className="fas fa-comments me-2"></i>المراجعات</h5>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-12">
            <label className="form-label">عنوان قسم المراجعات</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="أدخل عنوان قسم المراجعات"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <label className="form-label">وصف قسم المراجعات</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="أدخل وصف قسم المراجعات"
            />
          </div>
        </div>
        
        {/* Review 1 */}
        <div className="row mb-3 review-item">
          <div className="col-md-8">
            <label className="form-label">المراجعة الأولى</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.reviews[0].text}
              onChange={(e) => handleReviewChange(0, 'text', e.target.value)}
              placeholder="أدخل نص المراجعة الأولى"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">اسم المراجع</label>
            <input
              type="text"
              className="form-control"
              value={formData.reviews[0].name}
              onChange={(e) => handleReviewChange(0, 'name', e.target.value)}
              placeholder="أدخل اسم المراجع"
            />
            <label className="form-label mt-2">المدينة</label>
            <input
              type="text"
              className="form-control"
              value={formData.reviews[0].city}
              onChange={(e) => handleReviewChange(0, 'city', e.target.value)}
              placeholder="أدخل المدينة"
            />
          </div>
        </div>
        
        {/* Review 2 */}
        <div className="row mb-3 review-item">
          <div className="col-md-8">
            <label className="form-label">المراجعة الثانية</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.reviews[1].text}
              onChange={(e) => handleReviewChange(1, 'text', e.target.value)}
              placeholder="أدخل نص المراجعة الثانية"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">اسم المراجع</label>
            <input
              type="text"
              className="form-control"
              value={formData.reviews[1].name}
              onChange={(e) => handleReviewChange(1, 'name', e.target.value)}
              placeholder="أدخل اسم المراجع"
            />
            <label className="form-label mt-2">المدينة</label>
            <input
              type="text"
              className="form-control"
              value={formData.reviews[1].city}
              onChange={(e) => handleReviewChange(1, 'city', e.target.value)}
              placeholder="أدخل المدينة"
            />
          </div>
        </div>
        
        {/* Review 3 */}
        <div className="row mb-3 review-item">
          <div className="col-md-8">
            <label className="form-label">المراجعة الثالثة</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.reviews[2].text}
              onChange={(e) => handleReviewChange(2, 'text', e.target.value)}
              placeholder="أدخل نص المراجعة الثالثة"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">اسم المراجع</label>
            <input
              type="text"
              className="form-control"
              value={formData.reviews[2].name}
              onChange={(e) => handleReviewChange(2, 'name', e.target.value)}
              placeholder="أدخل اسم المراجع"
            />
            <label className="form-label mt-2">المدينة</label>
            <input
              type="text"
              className="form-control"
              value={formData.reviews[2].city}
              onChange={(e) => handleReviewChange(2, 'city', e.target.value)}
              placeholder="أدخل المدينة"
            />
          </div>
        </div>
        
        {/* Review 4 */}
        <div className="row mb-3 review-item">
          <div className="col-md-8">
            <label className="form-label">المراجعة الرابعة</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.reviews[3].text}
              onChange={(e) => handleReviewChange(3, 'text', e.target.value)}
              placeholder="أدخل نص المراجعة الرابعة"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">اسم المراجع</label>
            <input
              type="text"
              className="form-control"
              value={formData.reviews[3].name}
              onChange={(e) => handleReviewChange(3, 'name', e.target.value)}
              placeholder="أدخل اسم المراجع"
            />
            <label className="form-label mt-2">المدينة</label>
            <input
              type="text"
              className="form-control"
              value={formData.reviews[3].city}
              onChange={(e) => handleReviewChange(3, 'city', e.target.value)}
              placeholder="أدخل المدينة"
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
            {isLoading ? 'جاري الحفظ...' : 'حفظ المراجعات'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsEditor;
