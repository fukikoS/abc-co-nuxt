<script setup lang="ts">
usePageMeta({
  title: 'Contact | ABC Co.',
  description: 'ABC Co.のお問い合わせページです。',
})
</script>

<template>
  <main class="container">
    <PageHeader
      subtitle="Contact"
      title="お問い合わせ"
      description="サービスや採用に関するご質問など、お気軽にお問い合わせください。"
    />
    <form
      name="contact"
      method="POST"
      action="/contact/thanks"
      data-netlify="true"
      netlify-honeypot="bot-field"
      class="flex flex-col gap-6 bg-white p-6 md:px-10 md:py-12 rounded-2xl mt-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p class="hidden">
        <label>Do not fill this out if you are human: <input name="bot-field" /></label>
      </p>

      <div class="flex flex-col gap-1.5">
        <label for="name" class="text-sm font-medium text-gray-700">
          お名前 <span class="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="山田 太郎"
          required
          autocomplete="name"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-sm font-medium text-gray-700">
          メールアドレス <span class="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="example@email.com"
          required
          autocomplete="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="inquiry_subject" class="text-sm font-medium text-gray-700">
          件名 <span class="text-red-500">*</span>
        </label>
        <input
          id="inquiry_subject"
          type="text"
          name="inquiry_subject"
          placeholder="お問い合わせの件名"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="message" class="text-sm font-medium text-gray-700">
          お問い合わせ内容 <span class="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="お問い合わせ内容をご記入ください"
          required
          rows="8"
          maxlength="1000"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition resize-none"
        ></textarea>
      </div>

      <p class="text-xs text-gray-600 text-center">
        送信前に
        <NuxtLink to="/privacypolicy" class="underline decoration-gray-400 underline-offset-2 hover:text-gray-900">
          プライバシーポリシー
        </NuxtLink>
        をご確認ください。
      </p>

      <div>
        <button type="submit" class="btn-primary mx-auto px-12!">
          送信する
        </button>
      </div>

    </form>
  </main>
</template>

<style scoped>

</style>