# 🤝 JobMatch

O **JobMatch** é uma plataforma inclusiva desenvolvida como ação de extensão universitária na **Universidade de Fortaleza (UNIFOR)**. O objetivo central do projeto é conectar estudantes a oportunidades de emprego e estágio de forma democrática, transparente e ágil, eliminando barreiras digitais no acesso ao mercado de trabalho.

---

## 🎯 Foco Central: Acessibilidade e Inclusão Social

Diferente de sistemas convencionais, o JobMatch foi projetado sob a premissa de que a tecnologia deve ser inclusiva. Toda a interface foi otimizada para garantir o cumprimento das diretrizes de acessibilidade e usabilidade:
* **Contraste e Cores:** Paleta de cores refatorada com Tailwind CSS para garantir legibilidade ideal (WCAG), aplicando fundos escuros institucionais (`bg-[#0D1F3D]`) adaptáveis para dispositivos móveis.
* **Navegação Resiliente:** Arquitetura híbrida com cache local estático para listagem de vagas, permitindo que usuários de periferias com redes móveis instáveis (3G/4G) naveguem instantaneamente sem perda de dados ou lentidão.
* **Layout Responsivo:** Componentização em React que se adapta perfeitamente a computadores e smartphones de telas pequenas.

---

## 🛠️ Tecnologias Utilizadas

* **Front-End:** React.js, Vite, Tailwind CSS.
* **Banco de Dados & Autenticação:** Supabase.
* **Hospedagem & Infraestrutura:** Vercel.
* **Monitoramento:** Sentry (Bugs) e Uptime Robot (Disponibilidade).

---

## 🚀 Pipeline de CI/CD e Infraestrutura

A plataforma conta com uma esteira de automação contínua integrada diretamente via Webhook do GitHub com a nuvem da Vercel. Cada incremento de código na branch `main` dispara automaticamente o processo de build limpo.

**Fluxo de Integração:**
`[Desenvolvedor]` ── git push ──> `[GitHub (main)]` ── Webhook ──> `[Esteira Vercel]` ──> `[Produção (Ready)]`

### 🛡️ Protocolo de Rollback Instantâneo
Para garantir alta disponibilidade e resiliência, a infraestrutura foi configurada com uma política de mitigação de danos de zero *downtime*. Caso alguma falha crítica seja identificada em produção, o time de DevOps consegue acionar o **Instant Rollback** no console da Vercel, revertendo o tráfego para a última versão estável homologada em **menos de 5 segundos**.

---

## 📊 Performance e Resultados (Métricas Reais)

Após uma detalhada auditoria e inspeção de rede (DevTools), o código passou por refatorações estruturais (como aplicação de *Lazy Loading* e persistência local), resultando em uma evolução drástica monitorada pelo **Google Lighthouse**:

| Métrica de Performance | Baseline Inicial | Pós-Otimização | Impacto Prático |
| :--- | :---: | :---: | :--- |
| **Score de Performance** | 59 / 100 | **97 / 100** | Zona de Excelência Máxima |
| **Total Blocking Time (TBT)** | 6.260 ms | **< 150 ms** | Eliminação de travamentos de CPU |
| **Latência Crítica de Rede** | 7.518 ms | **0 ms** | Resposta instantânea em memória |

---

## 📈 Indicadores de Sucesso (KPIs) e Monitoramento

A sustentabilidade do projeto no pós-lançamento é vigiada de forma contínua através de três pilares operacionais:
1. **Sucesso Social:** Monitoramento de taxas de conversão de candidaturas inclusivas (>85%) e tempo médio de retorno de recrutadores (<7 dias).
2. **Estabilidade Técnica (Sentry):** Captura em tempo real de falhas no front-end com notificações diretas via e-mail/Telegram para o time de correção.
3. **Disponibilidade (Uptime Robot):** Checagens automatizadas a cada 5 minutos na URL de produção para prevenção de quedas de serviço.

---

## 👥 Desenvolvedores e Membros do Grupo
* Projeto desenvolvido como Ação de Extensão Acadêmica por alunos da **Universidade de Fortaleza (UNIFOR)**, Grupo 20.

- **Hevlina Karoll Lima Reis** (Matrícula: 2425124)
- **Francisco Erasmo Pires Abreu** (Matrícula: 2415473)
- **Ana Beatriz da Silva de Oliveira** (Matrícula: 2425104)
- **Levi Martins Marques** (Matrícula: 2425085)
- **Higor Reis de Sátiro** (Matrícula: 2425093)
- **Mayra Ribeiro da Silva** (Matrícula: 2425026)