// Helper functions for طوق للتقسيط

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR'
  }).format(amount);
};

export const formatPhoneNumber = (phone: string): string => {
  // Format Saudi phone number
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('966')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('0')) {
    return `+966${cleaned.slice(1)}`;
  }
  return `+966${cleaned}`;
};

export const generateWhatsAppLink = (phone: string, message: string): string => {
  const formattedPhone = formatPhoneNumber(phone);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const isMobile = (): boolean => {
  return window.innerWidth <= 768;
};
