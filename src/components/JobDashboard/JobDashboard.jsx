import Header from '../Header/Header'
import SummaryCards from '../SummaryCards/SummaryCards'
import Filters from '../Filters/Filters'
import JobsTable from '../JobsTable/JobsTable'
import JobModal from '../JobModal/JobModal'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

import { useVagas } from '../../hooks/useVagas'
import { useFiltrosVagas } from '../../hooks/useFiltrosVagas'

function JobDashboard({
  userId,
  nomeUsuario,
  onLogout,
  saindo,
}) {
  const {
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
  } = useVagas(userId)

  const {
    busca,
    empresas,
    empresasSelecionadas,
    statusSelecionados,

    vagasFiltradas,
    vagasPaginadas,

    paginaAtual,
    totalPaginas,
    vagasPorPagina,

    alterarBusca,
    alterarEmpresas,
    alterarStatus,
    alterarPagina,

    limparFiltros,
    voltarParaPrimeiraPagina,
  } = useFiltrosVagas(vagas)

  async function salvar(vaga) {
    const modoCriacao = !vagaEditando

    const salvou =
      await salvarVaga(vaga)

    if (salvou && modoCriacao) {
      voltarParaPrimeiraPagina()
    }

    return salvou
  }

  return (
    <main className="app">
      <Header
        nome={nomeUsuario}
        onLogout={onLogout}
        logoutLoading={saindo}
      />

      <SummaryCards vagas={vagas} />

      <Filters
        empresas={empresas}
        busca={busca}
        onBuscaChange={alterarBusca}
        empresasSelecionadas={
          empresasSelecionadas
        }
        onEmpresasChange={
          alterarEmpresas
        }
        statusSelecionados={
          statusSelecionados
        }
        onStatusChange={
          alterarStatus
        }
        onClearFilters={
          limparFiltros
        }
        onNewJob={
          abrirNovaVaga
        }
      />

      <JobsTable
        vagas={vagasPaginadas}
        carregando={carregando}
        onEdit={abrirEdicao}
        onDelete={solicitarExclusao}
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onPaginaChange={
          alterarPagina
        }
        totalFiltrado={
          vagasFiltradas.length
        }
        totalVagas={vagas.length}
        vagasPorPagina={
          vagasPorPagina
        }
      />

      {modalAberto && (
        <JobModal
          key={
            vagaEditando?.id ??
            'nova'
          }
          onClose={fecharModal}
          onSave={salvar}
          vagaEditando={
            vagaEditando
          }
        />
      )}

      <ConfirmModal
        isOpen={Boolean(
          vagaParaExcluir
        )}
        title="Excluir candidatura"
        message={
          vagaParaExcluir
            ? `Tem certeza que deseja excluir a vaga "${vagaParaExcluir.vaga}" da ${vagaParaExcluir.empresa}?`
            : ''
        }
        onConfirm={
          confirmarExclusao
        }
        onCancel={
          cancelarExclusao
        }
        loading={excluindo}
      />
    </main>
  )
}

export default JobDashboard