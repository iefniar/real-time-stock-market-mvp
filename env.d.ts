/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Adding TypeScript support for .env variable VITE_BACKEND_URL 
interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

