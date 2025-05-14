
# GymFlow Brasil - Sistema de Gestão para Academias

Um sistema completo de gestão para academias com autenticação via Supabase, frontend em React e backend em NestJS.

## Requisitos

- Node.js 16+
- Docker e Docker Compose (opcional, para desenvolvimento)
- Conta no Supabase

## Configuração

1. Clone o repositório
2. Copie `.env.example` para `.env` e preencha com suas credenciais do Supabase
3. Execute as migrações SQL no console do Supabase (veja `src/sql/migrations.sql`)
4. Configure a autenticação por email no painel do Supabase

## Desenvolvimento

### Com Docker:

```bash
# Inicia todos os serviços
docker-compose up

# Frontend estará disponível em: http://localhost:8080
# Backend estará disponível em: http://localhost:3000
```

### Sem Docker:

```bash
# Instala dependências
npm install

# Inicia o frontend
npm run dev

# Em outro terminal, inicia o backend
npm run start:server
```

## Estrutura do Projeto

- `/src/components`: Componentes React reutilizáveis
- `/src/contexts`: Contextos React, incluindo AuthContext
- `/src/pages`: Páginas da aplicação
- `/src/services`: Serviços de backend
- `/src/guards`: Guards para proteção de rotas no backend
- `/src/controllers`: Controladores para API backend
- `/src/hooks`: Hooks personalizados
- `/src/lib`: Utilitários e configuração do Supabase

## Principais funcionalidades

- Autenticação via e-mail/senha
- Gestão de alunos e planos
- Controle de pagamentos
- Relatórios e dashboard
- Multitenancy (cada academia é isolada)

