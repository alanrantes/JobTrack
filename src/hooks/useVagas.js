import { useEffect, useState } from 'react'

import {
  atualizarVaga,
  buscarVagas,
  criarVaga,
  excluirVaga,
} from '../services/vagasService'

function prepararVagaParaBanco(
  vaga,
  userId
) {
  return {
    user_id: userId,
    empresa: vaga.empresa,
    vaga: vaga.vaga,
    plataforma: vaga.plataforma,
    data_candidatura: vaga.data,
    link: vaga.link || null,
    status: vaga.status,
    proxima_etapa:
      vaga.proximaEtapa || null,
  }
}

export function useVagas(userId) {
  const [vagas, setVagas] = useState([])
  const [carregando, setCarregando] =
    useState(true)

  const [modalAberto, setModalAberto] =
    useState(false)

  const [vagaEditando, setVagaEditando] =
    useState(null)

  const [
    vagaParaExcluir,
    setVagaParaExcluir,
  ] = useState(null)

  const [excluindo, setExcluindo] =
    useState(false)

  useEffect(() => {
    if (!userId) return

    let componenteAtivo = true

    async function carregarVagas() {
      const { data, error } =
        await buscarVagas()

      if (!componenteAtivo) return

      if (error) {
        console.error(
          'Erro ao buscar vagas:',
          error
        )

        setCarregando(false)
        return
      }

      setVagas(data ?? [])
      setCarregando(false)
    }

    carregarVagas()

    return () => {
      componenteAtivo = false
    }
  }, [userId])

  function abrirNovaVaga() {
    setVagaEditando(null)
    setModalAberto(true)
  }

  function abrirEdicao(vaga) {
    setVagaEditando(vaga)
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setVagaEditando(null)
  }

  function solicitarExclusao(id) {
    const vaga = vagas.find(
      (item) => item.id === id
    )

    if (vaga) {
      setVagaParaExcluir(vaga)
    }
  }

  function cancelarExclusao() {
    if (excluindo) return

    setVagaParaExcluir(null)
  }

  async function salvarVaga(vaga) {
    const dados =
      prepararVagaParaBanco(
        vaga,
        userId
      )

    if (vagaEditando) {
      return await salvarEdicao(dados)
    }

    return await salvarNovaVaga(dados)
  }

  async function salvarEdicao(dados) {
    const { data, error } =
      await atualizarVaga(
        vagaEditando.id,
        dados
      )

    if (error) {
      console.error(
        'Erro ao atualizar vaga:',
        error
      )

      alert(
        'Não foi possível atualizar a vaga.'
      )

      return false
    }

    setVagas((atuais) =>
      atuais.map((item) =>
        item.id === vagaEditando.id
          ? data
          : item
      )
    )

    fecharModal()

    return true
  }

  async function salvarNovaVaga(dados) {
    const { data, error } =
      await criarVaga(dados)

    if (error) {
      console.error(
        'Erro ao salvar vaga:',
        error
      )

      alert(
        'Não foi possível salvar a vaga.'
      )

      return false
    }

    setVagas((atuais) => [
      data,
      ...atuais,
    ])

    fecharModal()

    return true
  }

  async function confirmarExclusao() {
    if (!vagaParaExcluir) return

    setExcluindo(true)

    const { error } =
      await excluirVaga(
        vagaParaExcluir.id
      )

    if (error) {
      console.error(
        'Erro ao excluir vaga:',
        error
      )

      alert(
        'Não foi possível excluir a vaga.'
      )

      setExcluindo(false)
      return
    }

    setVagas((atuais) =>
      atuais.filter(
        (vaga) =>
          vaga.id !== vagaParaExcluir.id
      )
    )

    setExcluindo(false)
    setVagaParaExcluir(null)
  }

  return {
    vagas,
    carregando,

    modalAberto,
    vagaEditando,

    vagaParaExcluir,
    excluindo,

    abrirNovaVaga,
    abrirEdicao,
    fecharModal,

    solicitarExclusao,
    cancelarExclusao,

    salvarVaga,
    confirmarExclusao,
  }
}