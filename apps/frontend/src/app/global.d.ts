// This tells TypeScript we're augmenting the global Window interface
declare global {
  interface Window {
    gtag?: (event: string, action: string, params: object) => void;
  }
}

// An empty export is needed to treat this file as a module.
export {};