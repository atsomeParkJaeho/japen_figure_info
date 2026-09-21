import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="header-main header-classic headroom navbar-light fixed-top navbar-transparent">
      <nav className="navbar navbar-expand-lg">
        <div className="container position-relative">
          {/* Logo */}
          <Link className="navbar-brand header-navbar-brand" to="/home">
            <img src="/logo.png" alt="japen_figure_info" width={75} />
          </Link>
          {/* Logo */}

          {/* Menu */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto">
              {/* TODO: 검색 페이지 구현 후 실제 경로로 연결 예정 */}
              <li className="nav-item">
                <Link className="nav-link" to="/search/bandai">
                  반다이 상품 검색
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search/goodsmile">
                  굿스마일 상품 검색
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search/etc">
                  기타 상품 검색
                </Link>
              </li>
            </ul>
          </div>
          {/* End Menu */}

          <div className="nav align-items-center">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={toggleTheme}
              aria-label="다크 모드 전환"
              title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <Link
              to="/login"
              className="btn btn-sm btn-secondary mb-0 ms-2 text-nowrap d-none d-lg-flex"
            >
              로그인
            </Link>

            {/* Mobile Toggle */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="toggler-icon" />
            </button>
            {/* End Mobile Toggle */}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
