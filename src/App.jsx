import './App.css'

import Auth from './components/Auth/Auth'
import JobDashboard from './components/JobDashboard/JobDashboard'

import { useAuth } from './hooks/useAuth'

function App() {
  const {
    sessao,
    verificandoSessao,
    saindo,
    nomeUsuario,
    logout,
  } = useAuth()

  if (verificandoSessao) {
    return (
      <main className="auth-loading">
        <div className="app-loader" />

        <span>
          Carregando JobTrack...
        </span>
      </main>
    )
  }

  if (!sessao) {
    return <Auth />
  }

  return (
    <JobDashboard
      userId={sessao.user.id}
      nomeUsuario={nomeUsuario}
      onLogout={logout}
      saindo={saindo}
    />
  )
}

export default App