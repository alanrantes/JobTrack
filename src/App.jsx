import { useEffect, useMemo, useState } from 'react'

import './App.css'

import Header from './components/Header/Header'
import Filters from './components/Filters/Filters'
import JobsTable from './components/JobsTable/JobsTable'
import JobModal from './components/JobModal/JobModal'
import { supabase } from './lib/supabase'

const VAGAS_POR_PAGINA = 8

function App() {
  const [modalAberto, setModalAberto] = useState(false)
  const [vagaEditando, setVagaEditando] = useState(null)
  const [vagas, setVagas] = useState([])
  const [carregando, setCarregando] = useState(true)

  const [busca, setBusca] = useState('')
  const [empresasSelecionadas, setEmpresasSelecionadas] = useState([])
  const [statusSelecionados, setStatusSelecionados] = useState([])

  const [paginaAtual, setPaginaAtual] = useState(1)

  useEffect(() => {
    buscarVagas()
  }, [])

  async function buscarVagas() {
    setCarregando(true)

    const { data, error } = await supabase
      .from('vagas')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar vagas:', error)
      setCarregando(false)
      return
    }

    setVagas(data || [])
    setCarregando(false)
  }

  const empresas = useMemo(() => {
    return [...new Set(vagas.map((vaga) => vaga.empresa))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
  }, [vagas])

  const vagasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()

    return vagas.filter((vaga) => {
      const correspondeBusca =
        !termo ||
        vaga.empresa.toLowerCase().includes(termo) ||
        vaga.vaga.toLowerCase().includes(termo)

      const correspondeEmpresa =
        empresasSelecionadas.length === 0 ||
        empresasSelecionadas.includes(vaga.empresa)

      const correspondeStatus =
        statusSelecionados.length === 0 ||
        statusSelecionados.includes(vaga.status)

      return (
        correspondeBusca &&
        correspondeEmpresa &&
        correspondeStatus
      )
    })
  }, [
    vagas,
    busca,
    empresasSelecionadas,
    statusSelecionados,
  ])

  const totalPaginas = Math.max(
    1,
    Math.ceil(vagasFiltradas.length / VAGAS_POR_PAGINA)
  )

  const vagasPaginadas = useMemo(() => {
    const inicio = (paginaAtual - 1) * VAGAS_POR_PAGINA
    const fim = inicio + VAGAS_POR_PAGINA

    return vagasFiltradas.slice(inicio, fim)
  }, [vagasFiltradas, paginaAtual])

  useEffect(() => {
    setPaginaAtual(1)
  }, [busca, empresasSelecionadas, statusSelecionados])

  useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas)
    }
  }, [paginaAtual, totalPaginas])

  function abrirModalNovaVaga() {
    setVagaEditando(null)
    setModalAberto(true)
  }

  function abrirModalEdicao(vaga) {
    setVagaEditando(vaga)
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setVagaEditando(null)
  }

  function limparFiltros() {
    setBusca('')
    setEmpresasSelecionadas([])
    setStatusSelecionados([])
    setPaginaAtual(1)
  }

  async function salvarVaga(dadosVaga) {
    if (vagaEditando) {
      return atualizarVaga(vagaEditando.id, dadosVaga)
    }

    return adicionarVaga(dadosVaga)
  }

  async function adicionarVaga(novaVaga) {
    const { data, error } = await supabase
      .from('vagas')
      .insert([
        {
          empresa: novaVaga.empresa,
          vaga: novaVaga.vaga,
          plataforma: novaVaga.plataforma,
          data_candidatura: novaVaga.data,
          link: novaVaga.link || null,
          status: novaVaga.status,
          proxima_etapa: novaVaga.proximaEtapa || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Erro ao salvar vaga:', error)
      alert('Não foi possível salvar a vaga.')
      return false
    }

    setVagas((vagasAtuais) => [
      data,
      ...vagasAtuais,
    ])

    setPaginaAtual(1)
    fecharModal()

    return true
  }

  async function atualizarVaga(id, vagaAtualizada) {
    const { data, error } = await supabase
      .from('vagas')
      .update({
        empresa: vagaAtualizada.empresa,
        vaga: vagaAtualizada.vaga,
        plataforma: vagaAtualizada.plataforma,
        data_candidatura: vagaAtualizada.data,
        link: vagaAtualizada.link || null,
        status: vagaAtualizada.status,
        proxima_etapa: vagaAtualizada.proximaEtapa || null,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar vaga:', error)
      alert('Não foi possível atualizar a vaga.')
      return false
    }

    setVagas((vagasAtuais) =>
      vagasAtuais.map((vaga) =>
        vaga.id === id ? data : vaga
      )
    )

    fecharModal()

    return true
  }

  async function excluirVaga(id) {
    const confirmou = window.confirm(
      'Tem certeza que deseja excluir esta vaga?'
    )

    if (!confirmou) {
      return
    }

    const { error } = await supabase
      .from('vagas')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao excluir vaga:', error)
      alert('Não foi possível excluir a vaga.')
      return
    }

    setVagas((vagasAtuais) =>
      vagasAtuais.filter((vaga) => vaga.id !== id)
    )
  }

  return (
    <main className="app">
      <Header onNewJob={abrirModalNovaVaga} />

      <Filters
        empresas={empresas}
        busca={busca}
        onBuscaChange={setBusca}
        empresasSelecionadas={empresasSelecionadas}
        onEmpresasChange={setEmpresasSelecionadas}
        statusSelecionados={statusSelecionados}
        onStatusChange={setStatusSelecionados}
        onClearFilters={limparFiltros}
      />

      <JobsTable
        vagas={vagasPaginadas}
        carregando={carregando}
        onEdit={abrirModalEdicao}
        onDelete={excluirVaga}
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onPaginaChange={setPaginaAtual}
        totalFiltrado={vagasFiltradas.length}
        totalVagas={vagas.length}
        vagasPorPagina={VAGAS_POR_PAGINA}
      />

      <JobModal
        isOpen={modalAberto}
        onClose={fecharModal}
        onSave={salvarVaga}
        vagaEditando={vagaEditando}
      />
    </main>
  )
}

export default App