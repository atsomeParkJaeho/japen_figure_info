import { apiClient } from './client'

export interface BoardAuthor {
  no: number
  id: string
  nickname?: string
}

export interface BoardPost {
  no: number
  name: string
  content: string
  boardId: string
  createUserNo: number
  createUser?: BoardAuthor
  cDate: string
  cTime: string
  eDate: string | null
  eTime: string | null
}

export interface BoardListResponse {
  items: BoardPost[]
  total: number
  page: number
  limit: number
}

export function listPosts(boardId: string, page = 1, limit = 20) {
  return apiClient
    .get<BoardListResponse>(`/boards/${boardId}/posts`, {
      params: { page, limit },
    })
    .then((r) => r.data)
}

export function getPost(boardId: string, no: number | string) {
  return apiClient
    .get<BoardPost>(`/boards/${boardId}/posts/${no}`)
    .then((r) => r.data)
}

export function createPost(
  boardId: string,
  data: { name: string; content: string },
) {
  return apiClient
    .post<BoardPost>(`/boards/${boardId}/posts`, data)
    .then((r) => r.data)
}
