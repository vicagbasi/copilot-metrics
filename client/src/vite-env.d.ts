/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_PATH: string;
    readonly VITE_ENTERPRISE: string;
    // add more variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  