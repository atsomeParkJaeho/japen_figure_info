import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPost } from '../../api/boards'

export default function BoardWritePage() {
  const { boardId } = useParams<{ boardId: string }>()
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!boardId) return
    setError(null)
    try {
      await createPost(boardId, { name, content })
      navigate(`/board/${boardId}/list`)
    } catch {
      setError('게시글 등록에 실패했습니다. 로그인 상태를 확인해주세요.')
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 720 }}>
      <h1 className="h3 mb-4">{boardId} 글쓰기</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="제목"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="form-control"
          placeholder="내용"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {error && <div className="text-danger small">{error}</div>}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            등록
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(`/board/${boardId}/list`)}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  )
}
