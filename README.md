
# GymFlow Brasil - Sistema de Gestão para Academias

Um sistema completo para gestão de academias no Brasil, com módulos para controle de alunos, cobranças automatizadas, contratos e relatórios gerenciais.

## Funcionalidades

- 🔐 **Autenticação segura** com sistema de login e papéis de usuário
- 📊 **Dashboard** com indicadores de performance e gráficos
- 👥 **Gestão de alunos** com cadastro completo e status de contrato
- 💰 **Cobranças automatizadas** via Pix, boleto ou cartão (integração Asaas)
- 📋 **Controle de contratos** com alertas de vencimento
- 📈 **Relatórios detalhados** de faturamento com exportação em CSV/PDF
- ⚙️ **Configurações flexíveis** para dados da academia e integrações

## Tecnologias

- **Frontend**: React + TypeScript + Vite
- **UI/UX**: Tailwind CSS + shadcn/ui components
- **Estado**: TanStack Query
- **Rotas**: React Router Dom
- **Gráficos**: Recharts

## Começando

### Pré-requisitos

- Node.js (v16+)
- npm ou yarn

### Instalação para desenvolvimento local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/gymflow-brasil.git

# Entre no diretório
cd gymflow-brasil

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Implantação com Docker

```bash
# Construa a imagem
docker build -t gymflow-brasil .

# Execute o container
docker run -p 8080:8080 gymflow-brasil
```

### Docker Compose para ambiente completo (frontend + backend)

Crie um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://backend:3000
      
  backend:
    image: gymflow-backend
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/gymflow
      
  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=gymflow
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
volumes:
  postgres_data:
```

Execute com:

```bash
docker-compose up -d
```

## Observabilidade

### Logs e Monitoramento

O sistema está preparado para integração com Prometheus e Grafana:

1. Os logs são estruturados em formato JSON
2. Métricas importantes são expostas em `/metrics`
3. Dashboard Grafana pré-configurados estão disponíveis em `/grafana-dashboards`

### Alertas

Configure alertas de:

- Contratos prestes a vencer
- Falhas em cobranças
- Picos de uso do sistema

## Estrutura Multi-tenant

O sistema é construído com uma arquitetura multi-tenant, permitindo:

- Isolamento de dados entre academias
- Customização de telas e funcionalidades por cliente
- Escalabilidade independente por tenant

## Contribuindo

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
