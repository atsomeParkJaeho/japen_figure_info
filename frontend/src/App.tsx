import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import SignupPage from './pages/login/SignupPage'
import BoardListPage from './pages/board/BoardListPage'
import BoardViewPage from './pages/board/BoardViewPage'
import BoardWritePage from './pages/board/BoardWritePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/board/:boardId/list" element={<BoardListPage />} />
      <Route
        path="/board/:boardId/view/:postId"
        element={<BoardViewPage />}
      />
      <Route path="/board/:boardId/write" element={<BoardWritePage />} />
    </Routes>
  )
}

export default App
