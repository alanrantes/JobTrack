# JobTrack - Controle de Processos Seletivos

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-663399?logo=css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

<p align="justify">O JobTrack surgiu de uma necessidade pessoal durante minha busca por oportunidades: organizar de forma simples as vagas em que me candidatei e acompanhar o andamento de cada processo seletivo. A partir disso, desenvolvi uma plataforma gratuita e acessível para facilitar esse controle, principalmente para quem não utiliza ou não possui acesso a ferramentas como o Excel. </p>

O objetivo é permitir que qualquer pessoa organize suas candidaturas, acompanhe cada etapa e tenha uma visão clara da sua busca por uma nova oportunidade.

**Link:** https://usejobtrack.vercel.app

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

<p align="justify">O JobTrack utiliza o Supabase Authentication para autenticação dos usuários e políticas de Row Level Security (RLS) para controle de acesso aos dados. Cada candidatura é vinculada ao usuário autenticado, permitindo que cada pessoa visualize e gerencie somente as próprias vagas.</p>

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
