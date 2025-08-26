import React, { useEffect } from 'react';

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  useEffect(() => {
    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_dimension1': 'user_type',
          'custom_dimension2': 'page_section'
        }
      });
    `;
    document.head.appendChild(script2);

    // Track page views
    const trackPageView = () => {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_referrer: document.referrer
        });
      }
    };

    // Track initial page view
    trackPageView();

    // Track navigation changes
    const observer = new MutationObserver(() => {
      if (document.title) {
        trackPageView();
      }
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true
    });

    // Track user interactions
    const trackUserInteraction = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        const text = target.textContent?.trim();
        const href = (target as HTMLAnchorElement).href;
        
        if (window.gtag) {
          window.gtag('event', 'click', {
            event_category: 'engagement',
            event_label: text || href,
            value: 1
          });
        }
      }
    };

    document.addEventListener('click', trackUserInteraction);

    // Track form submissions
    const trackFormSubmission = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.tagName === 'FORM') {
        if (window.gtag) {
          window.gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: form.id || 'contact_form',
            value: 1
          });
        }
      }
    };

    document.addEventListener('submit', trackFormSubmission);

    // Track scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track at 25%, 50%, 75%, 100%
        if (scrollPercent >= 25 && maxScroll < 50) {
          if (window.gtag) {
            window.gtag('event', 'scroll', {
              event_category: 'engagement',
              event_label: '25%',
              value: 25
            });
          }
        } else if (scrollPercent >= 50 && maxScroll < 75) {
          if (window.gtag) {
            window.gtag('event', 'scroll', {
              event_category: 'engagement',
              event_label: '50%',
              value: 50
            });
          }
        } else if (scrollPercent >= 75 && maxScroll < 100) {
          if (window.gtag) {
            window.gtag('event', 'scroll', {
              event_category: 'engagement',
              event_label: '75%',
              value: 75
            });
          }
        } else if (scrollPercent >= 100) {
          if (window.gtag) {
            window.gtag('event', 'scroll', {
              event_category: 'engagement',
              event_label: '100%',
              value: 100
            });
          }
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth);

    // Track time on page
    let startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'page_load',
          value: timeOnPage,
          event_category: 'engagement'
        });
      }
    };

    // Track when user leaves page
    window.addEventListener('beforeunload', trackTimeOnPage);

    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener('click', trackUserInteraction);
      document.removeEventListener('submit', trackFormSubmission);
      window.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, [measurementId]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
