import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function HomePage() {
  const { user, logout } = useAuth()

  return (
    <div className="container mt-5">
      <h1 className="h2 mb-4">japen_figure_info</h1>
      {user ? (
        <div className="d-flex flex-column gap-3">
          <p>{user.nickname ?? user.id}님, 환영합니다.</p>
          <button
            className="btn btn-outline-secondary"
            style={{ width: 'fit-content' }}
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="d-flex gap-3">
          <Link to="/login" className="btn btn-primary">
            로그인
          </Link>
          <Link to="/signup" className="btn btn-outline-primary">
            회원가입
          </Link>
        </div>
      )}
    </div>
  )
}
