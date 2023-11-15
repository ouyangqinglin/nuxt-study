// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      env: process.env.NUXT_PUBLIC_NODE_ENV
    }
  },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss']
})
