<script setup lang="ts">

usePageMeta({
  title: 'プライバシーポリシー | ABC Co.',
  description: 'ABC Co.のプライバシーポリシーページです。',
})
</script>

<template>
  <main class="container mx-auto w-full max-w-4xl px-4 py-10">
    <PageHeader  subtitle="Privacy Policy" title="プライバシーポリシー" />
    <article class="prose bg-white p-6 md:px-10 md:py-12 mt-8 rounded-2xl prose-neutral max-w-none">
      <p>
        本サイトはポートフォリオ掲載用に制作した架空のコーポレートサイトです。記載されている会社情報、サービス内容はすべてデモ・サンプルとして作成したものであり、実在の企業・団体・サービスとは関係ありません。
      </p>
      <hr />
      <h2>お問い合わせフォームで送信される情報について</h2>
      <p>
        お問い合わせフォームから送信された内容は、フォーム処理サービスとして利用している Netlify Forms に送信されます。
      </p>
      <p>
        送信される主な項目は、お名前、メールアドレス、件名、お問い合わせ内容です。これらの情報は、フォーム動作確認および受信内容の確認のためにのみ利用し、個別の返信は行いません。
      </p>
      <p>
        Netlify Forms における情報の取り扱いについては、<a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Netlify プライバシーポリシー</a>をご確認ください。
      </p>
    </article>
  </main>
</template>