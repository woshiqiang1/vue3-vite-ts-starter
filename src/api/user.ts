import http from '@/api'
import type { Response } from '@/api'
import { API_URL } from './constants'

export interface UserInfo {
	username: string
	password: string
}

export function fetchAccount(): Promise<Response<UserInfo>> {
	return http.get(`/mock/api/account`)
}
