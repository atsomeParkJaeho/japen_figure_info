import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPost, type BoardPost } from '../../api/boards'

export default function BoardViewPage() {
  const { boardId, postId } = useParams<{ boardId: string; postId: string }>()
  const [post, setPost] = useState<BoardPost | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!boardId || !postId) return
    setError(null)
    getPost(boardId, postId)
      .then(setPost)
      .catch(() => setError('게시글을 찾을 수 없습니다.'))
  }, [boardId, postId])

  return (
    <div className="container mt-5">
      <h1 className="h3 mb-4">{boardId} 게시글 상세</h1>

      {error ? (
        <div className="text-danger mb-4">{error}</div>
      ) : (
        <div className="border rounded p-4 mb-4">
          <p className="text-muted small mb-1">
            {post?.createUser?.nickname ?? post?.createUser?.id} ·{' '}
            {post?.cDate} {post?.cTime}
          </p>
          <h2 className="h5">{post?.name ?? '불러오는 중...'}</h2>
          <p className="mt-3" style={{ whiteSpace: 'pre-wrap' }}>
            {post?.content}
          </p>
        </div>
      )}

      <Link to={`/board/${boardId}/list`} className="btn btn-outline-secondary">
        목록으로
      </Link>
    </div>
  )
}
