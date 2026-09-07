import './App.css'

import Auth from './components/Auth/Auth'
import UpdatePassword from './components/Auth/UpdatePassword'
import JobDashboard from './components/JobDashboard/JobDashboard'

import { useAuth } from './hooks/useAuth'

function App() {
  const {
    sessao,
    verificandoSessao,
    saindo,

    recuperandoSenha,

    nomeUsuario,

    logout,
    finalizarRecuperacaoSenha,
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

  if (recuperandoSenha) {
    return (
      <UpdatePassword
        onSuccess={
          finalizarRecuperacaoSenha
        }
      />
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