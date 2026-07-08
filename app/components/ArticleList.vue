<script setup lang="ts">
type ArticleListItem = {
	sys: {
		id: string
		createdAt?: string
	}
	metadata?: {
		tags: { sys: { id: string } }[]
	}
	fields: {
		title: string
		slug?: string
		thumbnail?: {
			fields?: {
				title?: string
				file?: {
					url?: string
				}
			}
		}
	}
}

type Props = {
	items: ArticleListItem[]
	resolveTo: (item: ArticleListItem) => string
}

defineProps<Props>()
</script>

<template>
	<ul class="list-none grid gap-3 md:grid-cols-2 items-stretch">
		<li v-for="item in items" :key="item.sys.id">
			<ArticleCard
				:to="resolveTo(item)"
				:title="item.fields.title"
				:date-time="item.sys.createdAt"
				:image-src="item.fields.thumbnail?.fields?.file?.url"
				:image-alt="item.fields.thumbnail?.fields?.title"
			/>
		</li>
	</ul>
</template>
