# Sistema de Gerenciamento Escolar

Aplicação web full-stack para gestão escolar: cadastro de alunos, professores,
turmas e disciplinas, lançamento de notas e frequência, com controle de acesso
por papel. Projeto de portfólio — priorizar código limpo, tipado e bem testado.

## Stack

**Frontend**
- React + TypeScript
- Vite (build e dev server)
- Tailwind CSS + shadcn/ui (UI)
- React Hook Form + Zod (formulários e validação)
- TanStack Query (estado de servidor / chamadas à API)

**Backend**
- NestJS + TypeScript
- Prisma (ORM)
- class-validator ou Zod (validação de entrada)
- JWT + bcrypt (autenticação)

**Banco de dados**
- PostgreSQL (rodando via Docker em desenvolvimento)

**Qualidade e infraestrutura**
- ESLint + Prettier
- Vitest/Jest (testes unitários) + Supertest (integração da API)
- Docker + docker-compose
- GitHub Actions (CI)

## Arquitetura

Três camadas separadas:

```
Cliente (React) -> API REST (NestJS) -> ORM (Prisma) -> Banco (PostgreSQL)
```

Regras de arquitetura:
- Toda regra de negócio vive no backend. O frontend nunca calcula nota, média
  ou situação — apenas exibe o que a API retorna.
- O frontend conversa com a API somente via HTTP/JSON, autenticado por JWT.
- Nenhuma query SQL crua: todo acesso ao banco passa pelo Prisma.

## Estrutura de pastas

```
.
├── backend/            # API NestJS
│   ├── prisma/         # schema.prisma, migrations, seed
│   └── src/            # módulos por domínio (aluno, professor, turma, auth...)
├── frontend/           # aplicação React + Vite
│   └── src/
├── docker-compose.yml  # sobe o PostgreSQL local
└── CLAUDE.md
```

## Modelo de domínio

Entidades e relacionamentos principais:
- **Usuario** — credenciais e papel (`ADMIN`, `PROFESSOR`, `ALUNO`).
- **Professor** — vinculado a um Usuario; leciona Disciplinas.
- **Aluno** — vinculado a um Usuario; possui Matriculas.
- **Turma** — agrupa Alunos; contém Disciplinas.
- **Disciplina** — pertence a uma Turma; ministrada por um Professor.
- **Matricula** — liga um Aluno a uma Turma.
- **Nota** — notas por Disciplina e por bimestre (não campos fixos como hoje).
- **Frequencia** — presença/falta por Aluno e Disciplina.

Regras de domínio:
- Média e situação (`APROVADO`, `REPROVADO`, `RECUPERACAO`) são calculadas no
  backend a partir das Notas — nunca no cliente.
- Identificadores são UUID.

## Convenções

- TypeScript em todo o projeto, com `strict: true`. Evitar `any`.
- Validar toda entrada no servidor antes de tocar no banco.
- Variáveis sensíveis em `.env` (nunca commitado). Manter um `.env.example`
  versionado com as chaves, sem valores reais.
- Commits no padrão Conventional Commits: `feat:`, `fix:`, `chore:`, `test:`,
  `docs:`, `refactor:`. Uma unidade funcional por commit, mensagem no imperativo.
- Nomes de variáveis, funções e tabelas em inglês; textos de UI e mensagens de
  domínio em português.

## Segurança (requisitos obrigatórios)

- Senhas sempre com hash (bcrypt/argon2), nunca em texto puro.
- Autenticação via JWT; autorização por papel (RBAC) em cada rota protegida.
- Validação e sanitização de toda entrada.
- CORS configurado, rate limiting e Helmet no backend.
- Nunca logar tokens, senhas ou dados pessoais.
- Nunca confie no Front-End

## Roadmap de construção

Construir em fases. Cada fase termina em estado funcional e é commitada antes de
avançar. Não pular fases.

1. **Backend base** — NestJS + Prisma + PostgreSQL (Docker). Schema de `Aluno`,
   primeira migration, seed com dados de exemplo e CRUD de aluno com validação.
   Cálculo de média movido para o servidor.
2. **Interface inicial** — conectar uma UI ao CRUD de aluno; depois reconstruir
   o frontend em React + Vite + Tailwind (formulário, tabela com busca e
   paginação, notificações no lugar de `alert()`).
3. **Autenticação e papéis** — login com JWT, hash de senha e RBAC
   (`ADMIN`, `PROFESSOR`, `ALUNO`), com testes de autorização.
4. **Expansão do domínio** — Turma, Disciplina, Matricula, Nota por bimestre e
   Frequencia; média ponderada e situação; boletim e dashboard.
5. **Polimento** — ESLint + Prettier, cobertura de testes, Dockerfile, CI no
   GitHub Actions, deploy e README com diagrama de arquitetura e link ao vivo.

> Status atual: iniciando a Fase 1 (backend base).

## Comandos

> Preencher conforme o projeto for sendo criado. Exemplos esperados:

```bash
# Subir o banco de dados local
docker compose up -d

# Backend
cd backend
npm install
npx prisma migrate dev
npm run start:dev

# Frontend
cd frontend
npm install
npm run dev
```

## Regras para o agente

- Use o Plan Mode: apresente um plano antes de mudanças que toquem vários arquivos.
- Faça uma coisa de cada vez, alinhada à fase atual do roadmap.
- Escreva testes para cada nova funcionalidade de backend.
- Nunca commite `.env` nem segredos. Confirme antes de comandos destrutivos
  (apagar dados, resetar o banco, force push).
- Ao concluir um passo funcional, sugira a mensagem de commit no padrão
  Conventional Commits.
- Quando um requisito estiver ambíguo, pergunte em vez de assumir.
