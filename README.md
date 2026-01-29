# 🖥️ Home NOC Dashboard

Sistema de monitoramento em tempo real desenvolvido para coletar e visualizar métricas de hardware (CPU, RAM, Temperatura) diretamente de uma máquina local. 

Este projeto une minha experiência como **Operador de NOC** com minhas habilidades de **Desenvolvedor**, criando uma ferramenta de observabilidade customizada para monitoramento de ativos.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Vue 3 (Vite), CSS3 Puro (Vanilla), ECharts (Data Viz).
- **Backend:** Node.js, Express, Socket.io (WebSockets).
- **Monitoramento:** Systeminformation (Acesso a sensores de baixo nível).
- **Infra:** Arquitetura preparada para integração com Docker & InfluxDB.

## 📊 Funcionalidades

- **Live Telemetry:** Transmissão de dados via WebSockets com atualização em tempo real (sem refresh).
- **Custom Data Viz:** Gráficos de linha dinâmicos que mostram a tendência de carga dos últimos 60 segundos.
- **NOC UI:** Interface otimizada para monitoramento contínuo com foco em legibilidade e baixo consumo de recursos.
- **Troubleshooting Ready:** Logs de conexão e tratamento de exceções para sensores bloqueados pelo SO.

## ⚙️ Como executar

1. **Backend:**
   ```bash
   cd server
   npm install
   # Para leitura de temperatura no Windows, execute como Administrador
   node index.js

2. **Frontend:**
    cd ..
    # Na raiz do projeto
    npm install --legacy-peer-deps
    npm run dev

🛠️ Desafios Técnicos Superados
Durante o desenvolvimento, enfrentei o desafio de renderização de componentes Canvas (ECharts) em layouts reativos. A solução foi a implementação de uma arquitetura de CSS fixa para garantir a integridade do DOM width/height, assegurando que os gráficos de telemetria carreguem instantaneamente independente da latência do navegador.

Projeto desenvolvido para fins de estudo e portfólio, unindo conceitos de SRE, Observabilidade e Fullstack Development.

