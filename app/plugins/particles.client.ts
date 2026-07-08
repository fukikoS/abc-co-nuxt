import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

// tsparticles の Vue3 ラッパーをクライアント側で登録する。
// nuxt-particles は Nuxt 4 非対応で無効化されるため、公式ラッパーを直接使う。
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Particles, {
    init: async (engine) => {
      await loadSlim(engine)
    },
  })
})
