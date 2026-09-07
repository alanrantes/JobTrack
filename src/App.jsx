import { useEffect, useMemo, useState } from 'react'

import './App.css'

import Header from './components/Header/Header'
import SummaryCards from './components/SummaryCards/SummaryCards'
import Filters from './components/Filters/Filters'
import JobsTable from './components/JobsTable/JobsTable'
import JobModal from './components/JobModal/JobModal'
import { supabase } from './lib/supabase'

const VAGAS_POR_PAGINA = 8

function prepararVagaParaBanco(vaga) {
  return {
    empresa: vaga.empresa,
    vaga: vaga.vaga,
    plataforma: vaga.plataforma,
    data_candidatura: vaga.data,
    link: vaga.link || null,
    status: vaga.status,
    proxima_etapa: vaga.proximaEtapa || null,
  }
}

function App() {
  const [vagas, setVagas] = useState([])
  const [carregando, setCarregando] = useState(true)

  const [modalAberto, setModalAberto] = useState(false)
  const [vagaEditando, setVagaEditando] = useState(null)

  const [busca, setBusca] = useState('')
  const [empresasSelecionadas, setEmpresasSelecionadas] = useState([])
  const [statusSelecionados, setStatusSelecionados] = useState([])

  const [paginaAtual, setPaginaAtual] = useState(1)

  useEffect(() => {
    async function carregarVagas() {
      const { data, error } = await supabase
        .from('vagas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar vagas:', error)
        setCarregando(false)
        return
      }

      setVagas(data ?? [])
      setCarregando(false)
    }

    carregarVagas()
  }, [])

  const empresas = useMemo(
    () =>
      [...new Set(vagas.map(({ empresa }) => empresa))]
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [vagas]
  )

  const vagasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()

    return vagas.filter((vaga) => {
      const correspondeBusca =
        !termo ||
        vaga.empresa.toLowerCase().includes(termo) ||
        vaga.vaga.toLowerCase().includes(termo)

      const correspondeEmpresa =
        !empresasSelecionadas.length ||
        empresasSelecionadas.includes(vaga.empresa)

      const correspondeStatus =
        !statusSelecionados.length ||
        statusSelecionados.includes(vaga.status)

      return (
        correspondeBusca &&
        correspondeEmpresa &&
        correspondeStatus
      )
    })
  }, [vagas, busca, empresasSelecionadas, statusSelecionados])

  const totalPaginas = Math.max(
    1,
    Math.ceil(vagasFiltradas.length / VAGAS_POR_PAGINA)
  )

  const vagasPaginadas = useMemo(() => {
    const inicio = (paginaAtual - 1) * VAGAS_POR_PAGINA

    return vagasFiltradas.slice(
      inicio,
      inicio + VAGAS_POR_PAGINA
    )
  }, [vagasFiltradas, paginaAtual])

  useEffect(() => {
    setPaginaAtual(1)
  }, [busca, empresasSelecionadas, statusSelecionados])

  useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas)
    }
  }, [paginaAtual, totalPaginas])

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

  function limparFiltros() {
    setBusca('')
    setEmpresasSelecionadas([])
    setStatusSelecionados([])
  }

  async function salvarVaga(vaga) {
    const dados = prepararVagaParaBanco(vaga)

    if (vagaEditando) {
      const { data, error } = await supabase
        .from('vagas')
        .update(dados)
        .eq('id', vagaEditando.id)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar vaga:', error)
        alert('Não foi possível atualizar a vaga.')
        return false
      }

      setVagas((atuais) =>
        atuais.map((item) =>
          item.id === vagaEditando.id ? data : item
        )
      )
    } else {
      const { data, error } = await supabase
        .from('vagas')
        .insert(dados)
        .select()
        .single()

      if (error) {
        console.error('Erro ao salvar vaga:', error)
        alert('Não foi possível salvar a vaga.')
        return false
      }

      setVagas((atuais) => [data, ...atuais])
      setPaginaAtual(1)
    }

    fecharModal()
    return true
  }

  async function excluirVaga(id) {
    if (!window.confirm('Tem certeza que deseja excluir esta vaga?')) {
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

    setVagas((atuais) =>
      atuais.filter((vaga) => vaga.id !== id)
    )
  }

  return (
    <main className="app">
      <Header onNewJob={abrirNovaVaga} />

      <SummaryCards vagas={vagas} />

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
        onEdit={abrirEdicao}
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