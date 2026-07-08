<script setup lang="ts">
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

// パーティクルはヒーローのテキストアニメーション完了後にふわっと登場させる。
// それまでは非表示（0）にしておく。
const particlesOpacity = ref(0)
// テキストアニメーションが完了して登場済みかどうか
const particlesRevealed = ref(false)

// スクロールに応じてパーティクルの不透明度を制御する。
// ビューポート中央がページ中央に達したあたりで完全に消えるようにする。
const updateParticlesOpacity = () => {
  // 登場前はスクロールによる制御を行わない（非表示のまま維持する）
  if (!particlesRevealed.value) return
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const fadeEnd = maxScroll / 2
  if (fadeEnd <= 0) {
    particlesOpacity.value = 1
    return
  }
  particlesOpacity.value = Math.max(0, 1 - window.scrollY / fadeEnd)
}

onMounted(() => {
  updateParticlesOpacity()
  window.addEventListener("scroll", updateParticlesOpacity, { passive: true })
  window.addEventListener("resize", updateParticlesOpacity)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateParticlesOpacity)
  window.removeEventListener("resize", updateParticlesOpacity)
})

onMounted(() => {
  const split = SplitText.create(".hero__title-text", { type: "chars" })
  const subtitleChars = gsap.utils.toArray<HTMLElement>(".hero__subtitle")
    .flatMap((el) => SplitText.create(el, { type: "chars" }).chars)

  // ドットを画面右端から登場させるため、定位置から画面右端までの距離を算出する
  const dot = document.querySelector<HTMLElement>(".hero__title-dot")
  const dotOffset = dot ? window.innerWidth - dot.getBoundingClientRect().left : 600

  gsap.timeline({
    // テキストアニメーションがすべて完了したら、パーティクルをふわっと登場させる
    onComplete: () => {
      particlesRevealed.value = true
      particlesOpacity.value = 1
    },
  })
  // アニメーション実行前の一瞬の「ちらつき」を防ぐ
  .set(".hero__content", { autoAlpha: 1 })
  .from(split.chars, {
    opacity: 0,
    y: -300,
    stagger: 0.05,
    duration: 1,
    ease: "bounce.out",
  })
  .from(".hero__title-dot", {
    x: dotOffset,
    duration: 1.2,
    ease: "none",
  })
  .from(".hero__title-dot", {
    y: -300,
    duration: 1.2,
    ease: "bounce.out",
  }, "<")
  .from(subtitleChars, {
    opacity: 0,
    stagger: 0.05,
    duration: 1,
    ease: "power2.out",
  })
})

const particleOptions = {
  fullScreen: {
    enable: true,
  },
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      value: ["#8fffc3", "#3ddc97", "#c7ffe1"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: { min: 10, max:80 },
    },
    links: {
      enable: false,
      // distance: 150,
      // color: "#ddd",
      // opacity: 0.4,
      // width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "out",
      },
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: false,
        mode: "repulse",
      },
      onClick: {
        enable: false,
        mode: "push",
      },
      resize: false,
    },
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
    },
  },
  detectRetina: true,
};

</script>

<template>
  <section class="hero relative text-center h-[calc(100vh-65px)] grid place-items-center overflow-hidden">
    <!-- ヒーロー背景のパーティクル。コンテンツの背面に敷く -->
    <ClientOnly>
      <vue-particles
        id="tsparticles"
        class="hero__particles fixed inset-0 -z-10"
        :style="{ opacity: particlesOpacity, transition: 'opacity 2s ease-out' }"
        :options="particleOptions"
      ></vue-particles>
    </ClientOnly>
    <!-- キャッチフレーズ -->
    <div class="hero__content relative z-10 -top-5">
      <h1 class="hero__title text-7xl sm:text-9xl font-bold font-montserrat"><span class="hero__title-text text-main-green">ABC Co</span><span class="hero__title-dot inline-block">.</span></h1>
      <p class="hero__subtitle text-2xl font-bold mt-5 md:hidden">あたらしい一歩を、<br>あなたといっしょに。</p>
      <p class="hero__subtitle text-2xl font-bold mt-5 hidden md:block">あたらしい一歩を、あなたといっしょに。</p>
    </div>
  </section>
</template>

<style scoped>
/* JS(GSAP) が初期状態を設定するまでの一瞬のちらつきを防ぐため、初期は非表示にする */
.hero__content {
  visibility: hidden;
}
</style>