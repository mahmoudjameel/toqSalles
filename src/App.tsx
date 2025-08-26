import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { WebsiteProvider } from './context/WebsiteContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CustomerReviews from './components/CustomerReviews';
import MovingText from './components/MovingText';
import BannerSection from './components/BannerSection';
import StatsSection from './components/StatsSection';
import BenefitsSection from './components/BenefitsSection';
import AboutSection from './components/AboutSection';
import PrivacyPolicy from './components/PrivacyPolicy';
import ReturnPolicy from './components/ReturnPolicy';
import OrderForm from './components/OrderForm';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import AdminPanel from './pages/AdminPanel';
import SEOManager from './components/SEOManager';
import FAQ from './components/FAQ';
import GoogleAnalytics from './components/GoogleAnalytics';
import './styles/App.css';

function App() {
  return (
    <HelmetProvider>
      <WebsiteProvider>
        <Router>
          <div className="App">
                                    <GoogleAnalytics measurementId="G-L2NW4MN4ZW" />
                        <SEOManager />
                        <Navigation />
                        
                        <Routes>
                          <Route path="/" element={
                            <>
                  <HeroSection />
                  <CustomerReviews />
                  <MovingText />
                  <BannerSection />
                  <StatsSection />
                  <BenefitsSection />
                  <AboutSection />
                  <PrivacyPolicy />
                  <ReturnPolicy />
                  <OrderForm />
                  <FAQ />
                  <CTASection />
                  <Footer />
                  <WhatsAppFloat />
                </>
              } />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </Router>
      </WebsiteProvider>
    </HelmetProvider>
  );
}

export default App;
