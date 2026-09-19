import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'
import LoginPage from '../pages/login/LoginPage'
import SignupPage from '../pages/login/SignupPage'
import BoardListPage from '../pages/board/BoardListPage'
import BoardViewPage from '../pages/board/BoardViewPage'
import BoardWritePage from '../pages/board/BoardWritePage'
import { BOARD_IDS } from '../constants/boards'

export interface AppRoute {
  path: string
  element: ReactNode
}

export const ROUTES: AppRoute[] = [
  { path: '/', element: <Navigate to="/home" replace /> },
  { path: '/home', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },

  {
    path: '/board/notice/list',
    element: <BoardListPage boardId={BOARD_IDS.notice} />,
  },
  {
    path: '/board/notice/view/:postId',
    element: <BoardViewPage boardId={BOARD_IDS.notice} />,
  },
  {
    path: '/board/notice/write',
    element: <BoardWritePage boardId={BOARD_IDS.notice} />,
  },

  {
    path: '/board/free/list',
    element: <BoardListPage boardId={BOARD_IDS.free} />,
  },
  {
    path: '/board/free/view/:postId',
    element: <BoardViewPage boardId={BOARD_IDS.free} />,
  },
  {
    path: '/board/free/write',
    element: <BoardWritePage boardId={BOARD_IDS.free} />,
  },
]
