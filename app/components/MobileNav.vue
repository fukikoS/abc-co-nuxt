<script setup lang="ts">
import { ref } from 'vue'

interface NavLink {
  href: string
  label: string
}

defineProps<{
  links: NavLink[]
}>()

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <div class="md:hidden flex items-center">
    <!-- ハンバーガーボタン -->
    <button
      @click="toggleMenu"
      class="inline-flex flex-col items-center justify-center w-8 h-8 gap-1.5"
      :aria-label="isOpen ? 'メニューを閉じる' : 'メニューを開く'"
      :aria-expanded="isOpen"
    >
      <span
        class="block w-6 h-0.5 bg-black transition-all duration-300"
        :class="{ 'rotate-45 translate-y-2': isOpen }"
      />
      <span
        class="block w-6 h-0.5 bg-black transition-all duration-300"
        :class="{ 'opacity-0': isOpen }"
      />
      <span
        class="block w-6 h-0.5 bg-black transition-all duration-300"
        :class="{ '-rotate-45 -translate-y-2': isOpen }"
      />
    </button>

    <!-- モバイルメニュー -->
    <Teleport to="body">
      <!-- オーバーレイ -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 bg-black/50 z-40"
          @click="closeMenu"
        />
      </Transition>

      <!-- メニュー -->
      <Transition
        enter-active-class="transition-all duration-300"
        leave-active-class="transition-all duration-300"
        enter-from-class="translate-x-full"
        leave-to-class="translate-x-full"
      >
        <nav
          v-if="isOpen"
          class="fixed top-0 right-0 h-screen w-64 bg-white shadow-lg z-100 overflow-y-auto"
        >
          <div class="p-6">
            <button
              @click="closeMenu"
              class="mb-8 ml-auto block"
              aria-label="メニューを閉じる"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <ul class="space-y-4">
              <li v-for="link in links" :key="link.href">
                <NuxtLink
                  :href="link.href"
                  class="block text-lg font-medium hover:text-teal-800 transition-colors"
                  @click="closeMenu"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>

</style>
