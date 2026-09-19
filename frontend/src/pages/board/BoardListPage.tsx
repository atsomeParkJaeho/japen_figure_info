import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { listPosts, type BoardPost } from '../../api/boards'

export default function BoardListPage() {
  const { boardId } = useParams<{ boardId: string }>()
  const [posts, setPosts] = useState<BoardPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!boardId) return
    setLoading(true)
    setError(null)
    listPosts(boardId)
      .then((res) => setPosts(res.items))
      .catch(() => setError('게시글을 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [boardId])

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 m-0">{boardId} 게시판</h1>
        <Link to={`/board/${boardId}/write`} className="btn btn-primary">
          글쓰기
        </Link>
      </div>

      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>번호</th>
            <th>제목</th>
            <th style={{ width: '20%' }}>작성자</th>
            <th style={{ width: '20%' }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center text-muted py-4">
                불러오는 중...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4} className="text-center text-danger py-4">
                {error}
              </td>
            </tr>
          ) : posts.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-muted py-4">
                등록된 게시글이 없습니다.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.no}>
                <td>{post.no}</td>
                <td className="text-start">
                  <Link to={`/board/${boardId}/view/${post.no}`}>
                    {post.name}
                  </Link>
                </td>
                <td>{post.createUser?.nickname ?? post.createUser?.id}</td>
                <td>{post.cDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
