declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: {
        page_title?: string;
        page_location?: string;
        page_referrer?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        name?: string;
      }
    ) => void;
  }
}

export {};
