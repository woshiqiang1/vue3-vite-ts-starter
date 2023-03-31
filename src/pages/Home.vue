<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const store = useUserStore()

onMounted(() => {
	store.getAccount()

	setTimeout(() => {
		store.$reset()
	}, 3000)
})

const list = [1, 2, 3]
</script>

<template>
	<main>
		<ElButton
			type="primary"
			style="color: 'red'"
			>click</ElButton
		>
		<ElTag>123</ElTag>
		<ElRate />
		<Welcome />
		<div
			v-if="1 === 1"
			v-for:="(item, i) of list"
		>
			{{ item }}
		</div>
	</main>
	<footer :class="$style['footer']">
		{{ store.accountName }}
	</footer>
</template>

<style lang="scss" module>
.footer {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
