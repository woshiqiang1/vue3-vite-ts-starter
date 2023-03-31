import axios from 'axios'
import type { AxiosResponse } from 'axios'

export interface Response<T = any> {
	code: number
	data: T
	message: string
}

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
	if (config.headers) {
		console.log('interceptors')
	}

	return config
})

axiosInstance.interceptors.response.use(resOnFulfilled, resOnReject)

function resOnFulfilled(res: AxiosResponse) {
	return res.data
}

function resOnReject(error: any) {
	const { response } = error
	if (response?.status === 401) {
		const { location } = response.headers
		window.location.href = `${location}`
	}
	Promise.reject(error)
}

export default axiosInstance
