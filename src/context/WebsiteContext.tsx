import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzY6WVHdZrECAIOaXO7Vyyz23Udzm2bfg",
  authDomain: "salatek-bb9fd.firebaseapp.com",
  databaseURL: "https://salatek-bb9fd-default-rtdb.firebaseio.com",
  projectId: "salatek-bb9fd",
  storageBucket: "salatek-bb9fd.firebasestorage.app",
  messagingSenderId: "753883317449",
  appId: "1:753883317449:web:421ce843a92cae23927918",
  measurementId: "G-L2NW4MN4ZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface WebsiteData {
  hero?: {
    title: string;
    subtitle: string;
    mainHeading: string;
  };
  reviews?: {
    title: string;
    description: string;
    reviews: Array<{
      text: string;
      name: string;
      city: string;
    }>;
  };
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  banner?: {
    title: string;
    subtitle: string;
    highlight: string;
    buttonText: string;
  };
  stats?: Array<{
    number: string;
    label: string;
  }>;
  benefits?: {
    title: string;
    benefits: Array<{
      icon: string;
      text: string;
    }>;
  };
  about?: {
    title: string;
    subtitle: string;
    description: string;
  };
  order?: {
    title: string;
    description: string;
    buttonText: string;
    successMessage: string;
    whatsappMessageTemplate: string;
    deviceOptions: string;
  };
  cta?: {
    title: string;
    description: string;
    whatsappText: string;
    callText: string;
    shopText: string;
  };
  footer?: {
    description: string;
    address: string;
    quickLinksTitle: string;
    servicesTitle: string;
    contactTitle: string;
    services: string;
    quickLinks: string;
  };
  socialMedia?: {
    title: string;
    platforms: Array<{
      name: string;
      icon: string;
      text: string;
      link: string;
      status: 'active' | 'inactive';
    }>;
    style: string;
    size: string;
    color: string;
    bgColor: string;
  };
  movingText?: {
    texts: string[];
    speed: number;
  };
  faq?: {
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  settings?: {
    companyName: string;
    address: string;
    email: string;
    copyright: string;
  };
  whatsappNumber?: string;
  lastUpdated?: Date;
}

interface WebsiteContextType {
  websiteData: WebsiteData;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
};

interface WebsiteProviderProps {
  children: ReactNode;
}

export const WebsiteProvider: React.FC<WebsiteProviderProps> = ({ children }) => {
  const [websiteData, setWebsiteData] = useState<WebsiteData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWebsiteData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, 'websiteContent', 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setWebsiteData(docSnap.data() as WebsiteData);
      } else {
        // Set default data if no data exists
        setWebsiteData({
          hero: {
            title: 'طوق للتقسيط',
            subtitle: 'حلول ذكية لجميع مشاكل التقسيط',
            mainHeading: 'ما تحتاج تعيش حرب نفسية مع راتبك!'
          },
          whatsappNumber: '+972592799888'
        });
      }
    } catch (err) {
      console.error('Error loading website data:', err);
      setError('خطأ في تحميل بيانات الموقع');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadWebsiteData();
  };

  useEffect(() => {
    loadWebsiteData();

    // Set up real-time listener for changes
    const docRef = doc(db, 'websiteContent', 'main');
    const unsubscribe = onSnapshot(docRef, (docSnapshot: any) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as WebsiteData;
        setWebsiteData(data);
        setLoading(false);
        setError(null);
      }
    }, (err: any) => {
      console.error('Error listening to website data:', err);
      setError('خطأ في الاستماع لتحديثات الموقع');
    });

    return () => unsubscribe();
  }, []);

  const value: WebsiteContextType = {
    websiteData,
    loading,
    error,
    refreshData
  };

  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
};

export default WebsiteContext;
