/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TOKEN_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
