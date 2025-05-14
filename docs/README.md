
# GymFlow Brasil - Sistema de Gestão para Academias

## Configuração do Ambiente

### Pré-requisitos
- Node.js (v16+)
- npm ou yarn ou pnpm
- Conta no Supabase (https://supabase.io)

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

### Configuração do Supabase

1. Crie um novo projeto no Supabase
2. No menu SQL do Supabase, execute o script de migração contido em `src/sql/migrations.sql`
3. Em Authentication > Settings:
   - Habilite o provedor Email/Password
   - Configure o SMTP para envio de e-mails (opcional, mas recomendado)
4. Em Authentication > URL Configuration:
   - Configure a URL de redirecionamento para sua aplicação (ex: `http://localhost:8080/login`)
5. Em Project Settings > API:
   - Copie a URL e a chave anônima para suas variáveis de ambiente

### Iniciando o Projeto

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Construir para produção
npm run build

# Executar versão de produção
npm run serve
```

## Docker Compose (Produção)

Para rodar o projeto em produção utilizando Docker, crie um arquivo `docker-compose.yml` na raiz:

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - VITE_SUPABASE_URL=https://seu-projeto.supabase.co
      - VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

Execute com:

```bash
docker-compose up -d
```

## Observabilidade

O projeto está configurado para exportar métricas compatíveis com Prometheus.
Para visualizar os dashboards de desempenho, configure o Grafana para se conectar
ao endpoint de métricas da aplicação.

## Estrutura Multi-tenant

O sistema isola dados usando o conceito de `academy_id`. Cada usuário está vinculado
a uma academia específica, e todas as operações filtram dados pelo ID da academia do
usuário logado.

## Limites e Considerações

- O plano gratuito do Supabase tem limite de 500MB de armazenamento
- Configure rotinas de backup regulares para seus dados
- A política de segurança (RLS) garante o isolamento entre academias diferentes
