import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../api/auth'
import { useAuth } from '../../context/AuthContext'

export default function SignupPage() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login: setSession } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await signup({ id, password, nickname })
      setSession(res.user, res.accessToken)
      navigate('/home')
    } catch {
      setError('회원가입에 실패했습니다. 이미 사용 중인 아이디일 수 있습니다.')
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h1 className="h3 mt-5 mb-4">회원가입</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="아이디 (3자 이상)"
          value={id}
          onChange={(e) => setId(e.target.value)}
          minLength={3}
          required
        />
        <input
          type="password"
          className="form-control"
          placeholder="비밀번호 (8자 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="닉네임 (선택)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {error && <div className="text-danger small">{error}</div>}
        <button type="submit" className="btn btn-primary">
          회원가입
        </button>
      </form>
      <p className="mt-3 small">
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  )
}
