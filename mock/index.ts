import type { MockHandler } from 'unplugin-mock/types'

export default [
	{
		url: `/mock/api/ping`,
		method: 'get',
		response: () => {
			return {
				code: 0,
				data: 'pong!'
			}
		}
	},
	{
		url: `/mock/api/account`,
		method: 'get',
		response: () => {
			return {
				code: 0,
				data: {
					username: 'Alice',
					password: '123'
				}
			}
		}
	}
] as MockHandler[]
