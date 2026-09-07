import {
  useEffect,
  useMemo,
  useState,
} from 'react'

function calcularVagasPorPagina() {
  const altura = window.innerHeight

  if (altura >= 1100) return 12
  if (altura >= 900) return 9

  return 8
}

export function useFiltrosVagas(vagas) {
  const [busca, setBusca] = useState('')

  const [
    empresasSelecionadas,
    setEmpresasSelecionadas,
  ] = useState([])

  const [
    statusSelecionados,
    setStatusSelecionados,
  ] = useState([])

  const [paginaAtual, setPaginaAtual] =
    useState(1)

  const [
    vagasPorPagina,
    setVagasPorPagina,
  ] = useState(calcularVagasPorPagina)

  useEffect(() => {
    function atualizarQuantidadePorPagina() {
      setVagasPorPagina(
        calcularVagasPorPagina()
      )

      setPaginaAtual(1)
    }

    window.addEventListener(
      'resize',
      atualizarQuantidadePorPagina
    )

    return () => {
      window.removeEventListener(
        'resize',
        atualizarQuantidadePorPagina
      )
    }
  }, [])

  const empresas = useMemo(() => {
    return [
      ...new Set(
        vagas.map(
          ({ empresa }) => empresa
        )
      ),
    ]
      .filter(Boolean)
      .sort((a, b) =>
        a.localeCompare(b)
      )
  }, [vagas])

  const vagasFiltradas = useMemo(() => {
    const termo =
      busca.trim().toLowerCase()

    return vagas.filter((vaga) => {
      const empresa =
        vaga.empresa?.toLowerCase() ?? ''

      const nomeVaga =
        vaga.vaga?.toLowerCase() ?? ''

      const correspondeBusca =
        !termo ||
        empresa.includes(termo) ||
        nomeVaga.includes(termo)

      const correspondeEmpresa =
        !empresasSelecionadas.length ||
        empresasSelecionadas.includes(
          vaga.empresa
        )

      const correspondeStatus =
        !statusSelecionados.length ||
        statusSelecionados.includes(
          vaga.status
        )

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
    Math.ceil(
      vagasFiltradas.length /
        vagasPorPagina
    )
  )

  const paginaAtualValida = Math.min(
    paginaAtual,
    totalPaginas
  )

  const vagasPaginadas = useMemo(() => {
    const inicio =
      (paginaAtualValida - 1) *
      vagasPorPagina

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

  function alterarEmpresas(
    novasEmpresas
  ) {
    setEmpresasSelecionadas(
      novasEmpresas
    )

    setPaginaAtual(1)
  }

  function alterarStatus(
    novosStatus
  ) {
    setStatusSelecionados(
      novosStatus
    )

    setPaginaAtual(1)
  }

  function alterarPagina(pagina) {
    setPaginaAtual(pagina)
  }

  function limparFiltros() {
    setBusca('')
    setEmpresasSelecionadas([])
    setStatusSelecionados([])
    setPaginaAtual(1)
  }

  function voltarParaPrimeiraPagina() {
    setPaginaAtual(1)
  }

  return {
    busca,
    empresas,
    empresasSelecionadas,
    statusSelecionados,

    vagasFiltradas,
    vagasPaginadas,

    paginaAtual: paginaAtualValida,
    totalPaginas,
    vagasPorPagina,

    alterarBusca,
    alterarEmpresas,
    alterarStatus,
    alterarPagina,

    limparFiltros,
    voltarParaPrimeiraPagina,
  }
}