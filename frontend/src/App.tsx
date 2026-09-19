import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes/routes'
import '../src/css/font.css'
import '../src/css/default.css'

function App() {
  return (
    <Routes>
      {ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  )
}

export default App
