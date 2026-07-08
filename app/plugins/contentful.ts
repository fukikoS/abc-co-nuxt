import { createClient } from 'contentful'

// Contentful CDA（Content Delivery API）クライアントを生成し、
// アプリ全体で `$contentful` として利用できるようにするプラグイン。
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const client = createClient({
    space: config.public.ctfSpaceId,
    accessToken: config.public.ctfCdaAccessToken,
  })

  return {
    provide: {
      contentful: client,
    },
  }
})
