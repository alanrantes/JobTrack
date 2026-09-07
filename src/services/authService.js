import { supabase } from '../lib/supabase'

export async function criarConta({
  nome,
  email,
  senha,
}) {
  return await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: {
        nome,
      },
    },
  })
}

export async function entrar({
  email,
  senha,
}) {
  return await supabase.auth.signInWithPassword({
    email,
    password: senha,
  })
}

export async function sair() {
  return await supabase.auth.signOut()
}

export async function buscarSessao() {
  return await supabase.auth.getSession()
}

export function observarAutenticacao(callback) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session)
    }
  )

  return subscription
}

export async function enviarRecuperacaoSenha(email) {
  return await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: window.location.origin,
    }
  )
}

export async function atualizarSenha(novaSenha) {
  return await supabase.auth.updateUser({
    password: novaSenha,
  })
}