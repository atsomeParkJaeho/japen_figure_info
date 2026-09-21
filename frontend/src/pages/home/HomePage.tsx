import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Layout from '../../components/layout/Layout'

export default function HomePage() {
  const { user, logout } = useAuth()

  return (
    <Layout>
      <div>홈 화면</div>
    </Layout>
  )
}
