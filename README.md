# NLW Agents

Este projeto é um servidor desenvolvido durante o evento NLW da Rocketseat.

## Tecnologias e Bibliotecas Utilizadas

- **Node.js**
- **TypeScript**
- **Drizzle ORM** (para acesso ao banco de dados)
- **Express** (servidor HTTP)
- **Docker** (opcional, para ambiente de banco de dados)

## Padrões de Projeto

- Estrutura de pastas organizada por domínio (`db`, `http`, `schema`)
- Separação de rotas, schemas e lógica de conexão com o banco
- Uso de variáveis de ambiente para configuração

## Setup e Configuração

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as configurações necessárias (exemplo de variáveis pode ser visto em `src/env.ts`).

### 3. (Opcional) Suba o banco de dados com Docker

```bash
docker-compose up -d
```

### 4. Execute as migrations e seeds

```bash
npx drizzle-kit migrate
npm run db:seed
```

### 5. Inicie o servidor

```bash
npm run dev
```

---

Projeto desenvolvido durante o evento NLW da Rocketseat.
