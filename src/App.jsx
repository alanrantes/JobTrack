import { useState } from 'react'

import './App.css'

import Header from './components/Header/Header'
import Filters from './components/Filters/Filters'
import JobsTable from './components/JobsTable/JobsTable'
import JobModal from './components/JobModal/JobModal'

const vagasIniciais = [
  {
    id: 1,
    empresa: 'Wabtec',
    vaga: 'Jr Customer Integration Analyst',
    data: '2026-09-03',
    plataforma: 'LinkedIn',
    link: '',
    status: 'Candidatado',
    proximaEtapa: '',
  },
  {
    id: 2,
    empresa: 'SolvePlan',
    vaga: 'Programa de Estágio — TI',
    data: '2026-09-02',
    plataforma: 'Gupy',
    link: '',
    status: 'Entrevista RH',
    proximaEtapa: 'Entrevista dia 10/09 às 14h',
  },
  {
    id: 3,
    empresa: 'Grupo Zelo',
    vaga: 'Analista de Dados Jr',
    data: '2026-09-01',
    plataforma: 'Indeed',
    link: '',
    status: 'Aguardando retorno RH',
    proximaEtapa: '',
  },
]

function App() {
  const [modalAberto, setModalAberto] = useState(false)
  const [vagas, setVagas] = useState(vagasIniciais)

  function abrirModal() {
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
  }

  function adicionarVaga(novaVaga) {
    setVagas((vagasAtuais) => [
      {
        ...novaVaga,
        id: Date.now(),
      },
      ...vagasAtuais,
    ])

    fecharModal()
  }

  return (
    <main className="app">
      <Header onNewJob={abrirModal} />

      <Filters />

      <JobsTable vagas={vagas} />

      <JobModal
        isOpen={modalAberto}
        onClose={fecharModal}
        onSave={adicionarVaga}
      />
    </main>
  )
}

export default App