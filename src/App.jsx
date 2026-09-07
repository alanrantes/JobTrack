import { useEffect, useMemo, useState } from 'react'

import './App.css'

import Header from './components/Header/Header'
import SummaryCards from './components/SummaryCards/SummaryCards'
import Filters from './components/Filters/Filters'
import JobsTable from './components/JobsTable/JobsTable'
import JobModal from './components/JobModal/JobModal'
import ConfirmModal from './components/ConfirmModal/ConfirmModal'

import {
  atualizarVaga,
  buscarVagas,
  criarVaga,
  excluirVaga,
} from './services/vagasService'

function calcularVagasPorPagina() {
  const altura = window.innerHeight

  if (altura >= 1100) return 12
  if (altura >= 900) return 9

  return 8
}

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

  const [vagaParaExcluir, setVagaParaExcluir] = useState(null)
  const [excluindo, setExcluindo] = useState(false)

  const [busca, setBusca] = useState('')
  const [empresasSelecionadas, setEmpresasSelecionadas] = useState([])
  const [statusSelecionados, setStatusSelecionados] = useState([])

  const [paginaAtual, setPaginaAtual] = useState(1)
  const [vagasPorPagina, setVagasPorPagina] = useState(
    calcularVagasPorPagina
  )

  useEffect(() => {
    async function carregarVagas() {
      const { data, error } = await buscarVagas()

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

  useEffect(() => {
    function atualizarQuantidadePorPagina() {
      setVagasPorPagina(calcularVagasPorPagina())
      setPaginaAtual(1)
    }

    window.addEventListener('resize', atualizarQuantidadePorPagina)

    return () => {
      window.removeEventListener(
        'resize',
        atualizarQuantidadePorPagina
      )
    }
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
    Math.ceil(vagasFiltradas.length / vagasPorPagina)
  )

  const paginaAtualValida = Math.min(
    paginaAtual,
    totalPaginas
  )

  const vagasPaginadas = useMemo(() => {
    const inicio = (paginaAtualValida - 1) * vagasPorPagina

    return vagasFiltradas.slice(
      inicio,
      inicio + vagasPorPagina
    )
  }, [
    vagasFiltradas,
    paginaAtualValida,
    vagasPorPagina,
  ])

  function alterarBusca(valor) {
    setBusca(valor)
    setPaginaAtual(1)
  }

  function alterarEmpresas(empresasSelecionadasNovas) {
    setEmpresasSelecionadas(empresasSelecionadasNovas)
    setPaginaAtual(1)
  }

  function alterarStatus(statusSelecionadosNovos) {
    setStatusSelecionados(statusSelecionadosNovos)
    setPaginaAtual(1)
  }

  function alterarPagina(pagina) {
    setPaginaAtual(pagina)
  }

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
    const vaga = vagas.find((item) => item.id === id)

    if (vaga) {
      setVagaParaExcluir(vaga)
    }
  }

  function cancelarExclusao() {
    if (excluindo) return

    setVagaParaExcluir(null)
  }

  function limparFiltros() {
    setBusca('')
    setEmpresasSelecionadas([])
    setStatusSelecionados([])
    setPaginaAtual(1)
  }

  async function salvarVaga(vaga) {
    const dados = prepararVagaParaBanco(vaga)

    if (vagaEditando) {
      const { data, error } = await atualizarVaga(
        vagaEditando.id,
        dados
      )

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
      const { data, error } = await criarVaga(dados)

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

  async function confirmarExclusao() {
    if (!vagaParaExcluir) return

    setExcluindo(true)

    const { error } = await excluirVaga(vagaParaExcluir.id)

    if (error) {
      console.error('Erro ao excluir vaga:', error)
      alert('Não foi possível excluir a vaga.')
      setExcluindo(false)
      return
    }

    setVagas((atuais) =>
      atuais.filter((vaga) => vaga.id !== vagaParaExcluir.id)
    )

    setExcluindo(false)
    setVagaParaExcluir(null)
  }

  return (
    <main className="app">
      <Header onNewJob={abrirNovaVaga} />

      <SummaryCards vagas={vagas} />

      <Filters
        empresas={empresas}
        busca={busca}
        onBuscaChange={alterarBusca}
        empresasSelecionadas={empresasSelecionadas}
        onEmpresasChange={alterarEmpresas}
        statusSelecionados={statusSelecionados}
        onStatusChange={alterarStatus}
        onClearFilters={limparFiltros}
      />

      <JobsTable
        vagas={vagasPaginadas}
        carregando={carregando}
        onEdit={abrirEdicao}
        onDelete={solicitarExclusao}
        paginaAtual={paginaAtualValida}
        totalPaginas={totalPaginas}
        onPaginaChange={alterarPagina}
        totalFiltrado={vagasFiltradas.length}
        totalVagas={vagas.length}
        vagasPorPagina={vagasPorPagina}
      />

      <JobModal
        isOpen={modalAberto}
        onClose={fecharModal}
        onSave={salvarVaga}
        vagaEditando={vagaEditando}
      />

      <ConfirmModal
        isOpen={Boolean(vagaParaExcluir)}
        title="Excluir candidatura"
        message={
          vagaParaExcluir
            ? `Tem certeza que deseja excluir a vaga "${vagaParaExcluir.vaga}" da ${vagaParaExcluir.empresa}?`
            : ''
        }
        onConfirm={confirmarExclusao}
        onCancel={cancelarExclusao}
        loading={excluindo}
      />
    </main>
  )
}

export default App