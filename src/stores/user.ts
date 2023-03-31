import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { fetchAccount } from '@/api/user'
import { message } from '@/utils'

const InitValues = {
	username: 'UNKNOWN',
	password: 'UNKNOWN'
}

// this is a setup store
// https://pinia.vuejs.org/core-concepts/#setup-stores
export const useUserStore = defineStore('user', () => {
	const state = reactive({ ...InitValues })

	const accountName = computed(() => state.username)

	async function getAccount() {
		const { code, data: user } = await fetchAccount()
		console.log(code, user)
		if (code !== 0) {
			message.error('获取当前用户信息失败!')
			return
		}
		state.username = user.username
		state.password = user.password
	}

	function $reset() {
		Object.assign(state, InitValues)
	}

	return {
		state,
		accountName,
		$reset,
		getAccount
	}
})
