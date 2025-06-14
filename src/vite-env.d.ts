/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_ECOSYSTEM_API_KEY: string
  readonly VITE_VETERAN_APP_URL: string
  readonly VITE_SENTIMENT_SERVICE_URL: string
  readonly VITE_AI_ORCHESTRATION_URL: string
  readonly VITE_ANALYTICS_ENGINE_URL: string
  readonly VITE_API_GATEWAY_URL: string
  readonly VITE_APP_ENV: string
  readonly VITE_APP_REGION: string
  readonly VITE_APP_TYPE: string
  readonly VITE_VAC_CRISIS_LINE: string
  readonly VITE_CANADA_SUICIDE_PREVENTION: string
  readonly VITE_OSISS_SUPPORT_LINE: string
  readonly VITE_VAC_FAMILY_LINE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const __APP_REGION__: string
declare const __APP_TYPE__: string
declare const __BUILD_TIME__: string