import { Layout } from './components/Layout'
import { Navigate, Route, Routes} from 'react-router-dom'
import { Login } from './pages/Auth/Login'
import { useAuthStore } from './stores/auth'

/*
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}
*/

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
        </Routes>
      </Layout>
    </>
  )
}

export default App
