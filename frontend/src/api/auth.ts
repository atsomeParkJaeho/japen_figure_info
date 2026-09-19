import { apiClient } from './client'

export interface AuthUser {
  no: number
  id: string
  nickname?: string
}

export interface AuthResponse {
  accessToken: string
  user: AuthUser
}

export function signup(data: {
  id: string
  password: string
  nickname?: string
}) {
  return apiClient.post<AuthResponse>('/auth/signup', data).then((r) => r.data)
}

export function login(data: { id: string; password: string }) {
  return apiClient.post<AuthResponse>('/auth/login', data).then((r) => r.data)
}

export function fetchMe() {
  return apiClient.get<AuthUser>('/auth/me').then((r) => r.data)
}
