import React from 'react';

const Admin: React.FC = () => {
  const stats = [
    { number: '150', label: 'عميل نشط' },
    { number: '89', label: 'طلب معلق' },
    { number: '1.2M', label: 'ريال إجمالي' },
    { number: '4.8', label: 'تقييم متوسط' }
  ];

  const notifications = [
    {
      type: 'info',
      icon: 'fas fa-info-circle',
      message: 'لديك 5 طلبات جديدة تحتاج للمراجعة'
    },
    {
      type: 'warning',
      icon: 'fas fa-exclamation-triangle',
      message: '3 طلبات تحتاج لمعلومات إضافية'
    },
    {
      type: 'success',
      icon: 'fas fa-check-circle',
      message: '12 طلب تمت الموافقة عليه اليوم'
    }
  ];

  return (
    <div className="container">
      <div className="admin-container">
        <div className="admin-header">
          <h1><i className="fas fa-cogs me-3"></i>لوحة التحكم - طوق للتقسيط</h1>
          <p className="mb-0">إدارة الموقع والخدمات</p>
        </div>
        
        <div className="admin-body">
          <div className="admin-section">
            <h3><i className="fas fa-chart-bar me-2"></i>إحصائيات عامة</h3>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="admin-section">
            <h3><i className="fas fa-tasks me-2"></i>إدارة الطلبات</h3>
            <div className="action-buttons">
              <button className="btn btn-admin">
                <i className="fas fa-eye me-2"></i>عرض جميع الطلبات
              </button>
              <button className="btn btn-admin">
                <i className="fas fa-check me-2"></i>الطلبات المعلقة
              </button>
              <button className="btn btn-admin">
                <i className="fas fa-clock me-2"></i>الطلبات الجديدة
              </button>
            </div>
          </div>
          
          <div className="admin-section">
            <h3><i className="fas fa-users me-2"></i>إدارة العملاء</h3>
            <div className="action-buttons">
              <button className="btn btn-admin">
                <i className="fas fa-user-plus me-2"></i>إضافة عميل جديد
              </button>
              <button className="btn btn-admin">
                <i className="fas fa-user-edit me-2"></i>تعديل بيانات العملاء
              </button>
              <button className="btn btn-admin">
                <i className="fas fa-user-check me-2"></i>التحقق من الهوية
              </button>
            </div>
          </div>
          
          <div className="admin-section">
            <h3><i className="fas fa-cog me-2"></i>إعدادات الموقع</h3>
            <div className="action-buttons">
              <button className="btn btn-secondary-admin">
                <i className="fas fa-edit me-2"></i>تعديل المحتوى
              </button>
              <button className="btn btn-secondary-admin">
                <i className="fas fa-image me-2"></i>إدارة الصور
              </button>
              <button className="btn btn-secondary-admin">
                <i className="fas fa-database me-2"></i>النسخ الاحتياطية
              </button>
            </div>
          </div>
          
          <div className="admin-section">
            <h3><i className="fas fa-bell me-2"></i>الإشعارات والتنبيهات</h3>
            {notifications.map((notification, index) => (
              <div key={index} className={`alert alert-${notification.type}`}>
                <i className={`${notification.icon} me-2`}></i>
                {notification.message}
              </div>
            ))}
          </div>
          
          <div className="home-link">
            <a href="/">
              <i className="fas fa-home me-2"></i>العودة للصفحة الرئيسية
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
