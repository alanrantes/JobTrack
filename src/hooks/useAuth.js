import { useEffect, useState } from 'react'

import {
  buscarSessao,
  observarAutenticacao,
  sair,
} from '../services/authService'

function obterNomeUsuario(sessao) {
  const nomeCompleto =
    sessao?.user?.user_metadata?.nome?.trim()

  if (nomeCompleto) {
    return nomeCompleto.split(' ')[0]
  }

  const email = sessao?.user?.email

  if (email) {
    return email.split('@')[0]
  }

  return 'Usuário'
}

export function useAuth() {
  const [sessao, setSessao] = useState(null)

  const [
    verificandoSessao,
    setVerificandoSessao,
  ] = useState(true)

  const [saindo, setSaindo] =
    useState(false)

  const [
    recuperandoSenha,
    setRecuperandoSenha,
  ] = useState(false)

  useEffect(() => {
    async function verificarSessao() {
      const {
        data: { session },
        error,
      } = await buscarSessao()

      if (error) {
        console.error(
          'Erro ao verificar sessão:',
          error
        )
      }

      setSessao(session)
      setVerificandoSessao(false)
    }

    verificarSessao()

    const subscription =
      observarAutenticacao(
        (event, session) => {
          setSessao(session)

          if (
            event === 'PASSWORD_RECOVERY'
          ) {
            setRecuperandoSenha(true)
          }

          setVerificandoSessao(false)
        }
      )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function logout() {
    if (saindo) return false

    setSaindo(true)

    const { error } = await sair()

    if (error) {
      console.error(
        'Erro ao sair:',
        error
      )

      alert(
        'Não foi possível sair da conta.'
      )

      setSaindo(false)

      return false
    }

    setSaindo(false)

    return true
  }

  async function finalizarRecuperacaoSenha() {
    const { error } = await sair()

    if (error) {
      console.error(
        'Erro ao encerrar recuperação:',
        error
      )

      return false
    }

    setRecuperandoSenha(false)

    return true
  }

  return {
    sessao,
    verificandoSessao,
    saindo,

    recuperandoSenha,

    nomeUsuario:
      obterNomeUsuario(sessao),

    logout,
    finalizarRecuperacaoSenha,
  }
}