declare global {
    interface Window {
      Telegram?: {
        WebApp: {
          colorScheme: 'light' | 'dark';
          onEvent: (event: string, callback: () => void) => void;
          offEvent: (event: string) => void;
        };
      };
    }
  }
  
  export {};