# JobTrack - Controle de Processos Seletivos

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-663399?logo=css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

Aplicação web para organização e acompanhamento de processos seletivos, desenvolvida com React e Supabase.

O JobTrack permite registrar candidaturas e acompanhar de forma centralizada o andamento de cada processo seletivo, reunindo informações como empresa, vaga, plataforma, status e próxima etapa.

## Funcionalidades

### Autenticação

- criação de conta;
- login e logout;
- recuperação de senha;
- atualização de senha;
- isolamento dos dados por usuário.

### Gerenciamento de Candidaturas

- cadastro de novas vagas;
- edição de candidaturas;
- exclusão de vagas;
- registro da empresa e cargo;
- registro da plataforma de candidatura;
- controle da data de candidatura;
- acompanhamento do status do processo;
- registro da próxima etapa;
- acesso ao link original da vaga.

### Acompanhamento

- total de candidaturas;
- entrevistas;
- processos em andamento;
- aprovações;
- reprovações;
- atualização automática dos indicadores.

### Filtros e Pesquisa

- pesquisa por empresa ou vaga;
- filtro por empresa;
- filtro por status;
- combinação de múltiplos filtros;
- limpeza rápida dos filtros;
- paginação das candidaturas.

### Identificação Visual

- exibição automática das logos das empresas;
- identificação visual das plataformas de candidatura;
- integração com Logo.dev para carregamento das logos.

## Tecnologias

### Frontend

- React
- JavaScript
- Vite
- CSS

### Backend e Banco de Dados

- Supabase
- PostgreSQL
- Supabase Authentication
- Row Level Security (RLS)

### Integrações e Serviços

- Logo.dev
- Vercel

### Versionamento

- Git
- GitHub

## Segurança e Isolamento de Dados

O JobTrack utiliza o Supabase Authentication para autenticação dos usuários e políticas de Row Level Security (RLS) para controle de acesso aos dados.

Cada candidatura é vinculada ao usuário autenticado, permitindo que cada pessoa visualize e gerencie somente as próprias vagas.

## Estrutura do Projeto

```text
src/
├── assets/
├── components/
│   ├── Auth/
│   ├── BrandLogo/
│   ├── ConfirmModal/
│   ├── Filters/
│   ├── Header/
│   ├── JobDashboard/
│   ├── JobModal/
│   ├── JobsTable/
│   ├── SummaryCards/
│   └── UserBar/
├── constants/
├── hooks/
├── lib/
├── services/
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## Deploy

A aplicação está publicada na Vercel e integrada ao repositório do GitHub, com deploy automático da versão de produção.

**Acesse:** https://usejobtrack.vercel.app

## Objetivo do Projeto

O JobTrack surgiu da necessidade de ter uma ferramenta simples e centralizada para acompanhar candidaturas durante a busca por oportunidades profissionais.

A proposta é facilitar o controle dos processos seletivos sem depender de planilhas, permitindo visualizar rapidamente o andamento de cada candidatura e seus próximos passos.
