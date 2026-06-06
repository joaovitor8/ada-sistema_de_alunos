# Roadmap: Transformar o "Sistema de Alunos" em projeto fullstack profissional

## Contexto

Hoje o projeto (`app/index.html`, `app/script.js`, `app/style.css`) é uma aplicação
em **JavaScript puro** com CRUD de alunos, **dados apenas em memória** (a variável
global `DBalunos` é perdida ao recarregar a página), sem backend, sem banco, sem
testes, sem build e sem deploy. É uma boa base de lógica (validações, filtros de
aprovados/ativos, cálculo de média), mas para recrutadores parece um exercício de
bootcamp.

O objetivo é **reescrever do zero** como um projeto **fullstack** moderno, que demonstre
as competências que recrutadores de vaga júnior procuram: arquitetura em camadas,
tipagem, API REST, banco relacional, autenticação, segurança, testes, CI/CD e deploy
com demo ao vivo. Decisões definidas com o usuário: foco fullstack, escopo de reescrita
completa, stack à minha recomendação.

> Nota: este arquivo é um **roadmap/recomendação**. A implementação será feita por
> etapas (fases abaixo). Cada fase entrega algo funcional e "commitável" — evite
> tentar fazer tudo de uma vez.

---

## Stack recomendada (e o porquê de cada escolha)

Escolhi o **ecossistema JavaScript/TypeScript** de ponta a ponta. Razões: (1) você já
sabe JS, então a curva é menor; (2) é a stack júnior mais demandada no Brasil; (3)
TypeScript no front e no back mostra maturidade e reduz bugs; (4) permite uma única
linguagem em todo o projeto.

### Frontend
- **React + TypeScript + Vite** — padrão de mercado; Vite dá build rápido e DX moderna.
- **Tailwind CSS + shadcn/ui** — UI bonita e consistente sem reinventar CSS; impressiona visualmente.
- **TanStack Query (React Query)** — cache e sincronização de dados com a API (mostra que você entende estado de servidor).
- **React Hook Form + Zod** — formulários e validação tipada (reaproveita schema do back).
- **React Router** — navegação entre páginas (lista, cadastro, detalhe, login).

### Backend
- **NestJS (Node.js + TypeScript)** — framework opinativo com arquitetura em módulos,
  injeção de dependência e estrutura clara (Controller → Service → Repository). Demonstra
  conhecimento de arquitetura, mais do que Express "solto".
  - *Alternativa mais simples se a curva pesar:* **Express + TypeScript** organizado em camadas.
- **API REST** documentada com **Swagger/OpenAPI** (Nest gera quase de graça).
- **Validação** com `class-validator` + DTOs (ou Zod) — nunca confiar no input do cliente.

### Banco de dados
- **PostgreSQL** — relacional, encaixa bem no domínio (Aluno 1—N Notas/Disciplinas).
- **Prisma ORM** — type-safe, migrations versionadas, ótima DX; previne SQL injection por padrão.
- **Modelo de dados** melhorado (corrige problemas atuais):
  - `Student` (id, codigo único, nome, sobrenome, email único, ativo, timestamps)
  - `Grade`/`Subject` em tabela separada (em vez de array fixo de 4 notas) → permite N notas.
  - `User` (para autenticação: email, senha hasheada, role).
  - Média calculada no backend, paginação e busca server-side.

### Autenticação e autorização
- **JWT** (access token + refresh token), senha com **bcrypt/argon2**.
- **RBAC** simples: `ADMIN` (gerencia alunos) e `PROFESSOR`/`VIEWER` (consulta).
- Guards do Nest protegendo as rotas de escrita.

### Segurança (checklist OWASP-friendly)
- Validação/sanitização de **todo** input (DTOs + Zod).
- Hash de senha (argon2/bcrypt), **nunca** senha em texto puro; segredos em `.env` (com `.env.example` versionado, `.env` no `.gitignore`).
- **Helmet** (headers seguros), **CORS** restrito à origem do front.
- **Rate limiting** (`@nestjs/throttler`) contra brute-force no login.
- ORM (Prisma) previne **SQL injection**; React escapa por padrão contra **XSS**.
- HTTPS no deploy; tokens com expiração curta; sem dados sensíveis em logs.

### Qualidade de código
- **ESLint + Prettier** (padronização) + **Husky + lint-staged** (valida antes do commit).
- **Conventional Commits** (histórico profissional).
- **TypeScript strict** nos dois lados.

### Testes
- **Backend:** Vitest/Jest (unitário nos services) + **Supertest** (integração da API).
- **Frontend:** **React Testing Library** (componentes) + **Playwright** (e2e do fluxo principal).
- Meta realista: cobrir as regras de negócio (validação, média, aprovação) e os caminhos críticos — qualidade > 100% de cobertura.

### DevOps / Deploy
- **Docker + docker-compose** (app + Postgres) → roda com um comando, impressiona.
- **GitHub Actions** (CI): lint → testes → build a cada push/PR, com badge no README.
- **Deploy com demo ao vivo:**
  - Front → **Vercel** (ou Netlify).
  - Back + Postgres → **Railway**/**Render**/**Fly.io** (ou **Neon** para Postgres serverless).
- Link da demo no topo do README = o que mais converte recrutador.

---

## Estrutura de monorepo proposta

```
ada-sistema_de_alunos/
├── apps/
│   ├── web/          # React + Vite + TS (frontend)
│   └── api/          # NestJS + Prisma (backend)
├── packages/
│   └── shared/       # tipos e schemas Zod compartilhados (opcional)
├── docker-compose.yml
├── .github/workflows/ci.yml
├── .env.example
└── README.md         # com badges, screenshots/GIF, link da demo, diagrama
```

> Mais simples (alternativa): dois repositórios ou duas pastas `frontend/` e `backend/`
> sem ferramenta de monorepo. Comece simples; monorepo (pnpm workspaces/Turborepo) é um plus.

---

## Plano de execução por fases (incremental — cada fase é entregável)

**Fase 0 — Fundação e documentação**
- Definir estrutura de pastas, inicializar `apps/api` e `apps/web` com TS.
- Configurar ESLint, Prettier, `.gitignore`, `.env.example`.
- README inicial com escopo, stack e "como rodar".

**Fase 1 — Backend MVP**
- NestJS + Prisma + Postgres (via Docker). Modelo `Student` e migration.
- CRUD completo de alunos (portar as regras de `script.js`: validação, duplicidade por código/email, média, filtros ativos/inativos/aprovados/reprovados) — agora server-side.
- Swagger ativo. Testes dos services + integração das rotas.

**Fase 2 — Frontend MVP**
- React + Vite + Tailwind + shadcn. Páginas: listagem (tabela com busca/paginação), cadastro/edição (React Hook Form + Zod), detalhe do aluno.
- Consumo da API com TanStack Query. Estados de loading/erro/empty.

**Fase 3 — Autenticação e segurança**
- Modelo `User`, login/registro, JWT + refresh, RBAC, hash de senha.
- Guards nas rotas de escrita; rate limiting, Helmet, CORS. Tela de login no front + rotas protegidas.

**Fase 4 — Qualidade e CI/CD**
- Husky + lint-staged + Conventional Commits.
- Playwright (e2e do fluxo: login → cadastrar → listar). GitHub Actions (lint+test+build).

**Fase 5 — Deploy e polish do README**
- docker-compose finalizado. Deploy front (Vercel) + back/db (Railway/Render/Neon).
- README final: badges (CI, licença), screenshots/GIF, **link da demo ao vivo**, diagrama de arquitetura, instruções, decisões técnicas, seção de aprendizados.

---

## Arquivos atuais — destino

- `app/script.js` → serve de **referência das regras de negócio** ao portar para o
  `StudentsService` do backend (validação de campos, duplicidade, média ≥ 6 = aprovado,
  ativar/desativar). Reaproveite a lógica, não o código.
- `app/index.html` / `app/style.css` → substituídos pelo front em React. Pode-se manter
  a pasta `app/` (ou `legacy/`) no histórico para mostrar a evolução, mas o projeto novo
  vive em `apps/`.
- `README.md` → será reescrito (o atual descreve só o exercício original).

---

## Como verificar (ao final da implementação)

1. **Local com um comando:** `docker compose up` sobe API + Postgres; `npm run dev` em `apps/web` sobe o front. App abre, lista alunos vindos do banco real.
2. **Persistência:** cadastrar um aluno, recarregar a página → o aluno continua lá (resolve o problema atual de dados em memória).
3. **API:** abrir o Swagger (`/api/docs`), testar os endpoints; rodar a coleção de testes (`npm test`) — verde no back e no front.
4. **Auth/segurança:** rota de escrita sem token → 401; login com senha errada repetido → rate limit; senha no banco aparece hasheada.
5. **CI:** abrir um PR → GitHub Actions roda lint + testes + build e fica verde (badge no README).
6. **Demo:** acessar o link público (Vercel) e usar o sistema ponta a ponta.

---

## Diferenciais que "atraem o olhar do recrutador" (prioridade)

1. **Demo ao vivo + GIF no topo do README** (maior impacto, menor custo de atenção).
2. README profissional: badges, stack, screenshots, diagrama, "como rodar", decisões técnicas.
3. CI verde + testes + Docker (sinaliza senioridade de processo).
4. Autenticação e segurança bem-feitas (diferencia de 90% dos projetos júnior).
5. Commits semânticos e histórico limpo.