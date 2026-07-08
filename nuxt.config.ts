import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'ABC Co.',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { name: 'description', content: 'ABC Co.の公式サイトです。' },
        { name: 'title', content: 'ABC Co.の公式サイトです。' },
        { name: 'twitter:title', content: 'ABC Co.の公式サイトです。' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/ogp.png' },
        { property: 'og:title', content: 'ABC Co.の公式サイトです。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://abc-co.com/' },
        { property: 'og:image', content: '/ogp.png' },
        { property: 'og:site_name', content: 'ABC Co.' },
        { property: 'og:description', content: 'ABC Co.の公式サイトです。' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap' },
      ],
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

  runtimeConfig: {
    public: {
      ctfSpaceId: process.env.CTF_SPACE_ID,
      ctfCdaAccessToken: process.env.CTF_CDA_ACCESS_TOKEN,
    },
  },

  modules: [
    '@nuxt/image',
  ],
})