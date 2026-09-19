import type { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout_box">
      <Header/>
      <div className="container">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout