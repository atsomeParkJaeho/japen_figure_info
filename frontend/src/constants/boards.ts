export const BOARD_IDS = {
  notice: 'notice',
  free: 'free',
} as const

export type BoardId = (typeof BOARD_IDS)[keyof typeof BOARD_IDS]

export const BOARD_LABELS: Record<BoardId, string> = {
  notice: '공지사항',
  free: '자유게시판',
}
