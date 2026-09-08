# JobTrack - Controle de Processos Seletivos

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-663399?logo=css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

Aplicação web para organização e acompanhamento de processos seletivos, desenvolvida com React e Supabase.

O sistema permite que cada usuário registre suas candidaturas, acompanhe o andamento dos processos e visualize de forma centralizada informações como empresa, vaga, plataforma, status e próxima etapa.

## Aplicação

Acesse o JobTrack:

https://usejobtrack.vercel.app

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
- registro da plataforma utilizada;
- controle da data de candidatura;
- acompanhamento do status do processo;
- registro da próxima etapa;
- acesso ao link original da vaga.

### Acompanhamento

- total de candidaturas;
- processos em andamento;
- entrevistas;
- aprovações;
- reprovações;
- atualização dos indicadores de acordo com as candidaturas cadastradas.

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

O JobTrack utiliza autenticação do Supabase e políticas de Row Level Security (RLS) no banco de dados.

Cada candidatura é vinculada ao usuário autenticado, garantindo que cada pessoa possa visualizar e gerenciar somente as próprias vagas.

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

## Executando o Projeto

Clone o repositório:

```bash
git clone https://github.com/alanrantes/JobTrack.git
```

Acesse a pasta:

```bash
cd JobTrack
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_KEY=sua_chave_publica_supabase
VITE_LOGO_DEV_KEY=sua_chave_publica_logo_dev
```

Execute o projeto:

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite no terminal.

## Deploy

O frontend está publicado na Vercel e integrado ao repositório do GitHub.

Atualizações enviadas para a branch de produção são automaticamente compiladas e publicadas pela Vercel.

## Objetivo do Projeto

O JobTrack surgiu da necessidade de ter uma ferramenta simples e centralizada para acompanhar candidaturas durante a busca por oportunidades profissionais.

A proposta é facilitar o controle dos processos seletivos sem depender de planilhas, permitindo acompanhar rapidamente onde cada candidatura está e quais são os próximos passos.
