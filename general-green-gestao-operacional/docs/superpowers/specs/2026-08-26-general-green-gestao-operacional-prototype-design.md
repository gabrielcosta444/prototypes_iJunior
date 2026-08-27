# General Green — Gestão de Operações: especificação do protótipo

## Objetivo

Construir um protótipo visual de alta fidelidade, navegável e independente para demonstrar, em uma reunião comercial, o fluxo completo da operação da General Green: emissão da Ordem de Serviço, execução em campo, funcionamento offline, sincronização, revisão, aprovação, geração de relatório e disponibilização ao cliente.

O protótipo será uma aplicação demonstrativa sem backend, autenticação real ou integrações externas. Todos os dados e estados serão simulados localmente.

## Resultado comercial esperado

Em poucos minutos, o cliente deve compreender que a plataforma substitui WhatsApp, planilhas, documentos e pastas dispersas por uma operação digital centralizada, rastreável e padronizada.

Mensagem central:

> Da Ordem de Serviço à comprovação da execução em campo, toda a operação da General Green em um único lugar.

## Organização do workspace

O workspace será organizado em projetos independentes:

```text
prototipos/
├── allebras-central-documentos/
└── general-green-gestao-operacional/
```

Cada protótipo terá seu próprio `package.json`, código-fonte, testes, assets e build. Não haverá dependência de execução entre os dois projetos.

## Abordagem

O protótipo será implementado como uma SPA em React, TypeScript e Vite. Uma camada de estado demonstrativo controlará transições como criação da OS, execução, modo offline, sincronização, solicitação de correção, aprovação e geração de relatório.

Três experiências serão apresentadas dentro do mesmo projeto:

1. Plataforma desktop do Gestor General Green.
2. Aplicativo mobile do Técnico de Campo, exibido em viewport de 390 × 844 px.
3. Portal desktop simplificado do Cliente.

O projeto será otimizado para apresentação, não para produção. Não serão implementados backend, banco de dados, autenticação real, envio real de arquivos, geolocalização real ou geração real de PDF.

## Direção visual

- Identidade baseada no logotipo enviado pela General Green.
- Verde vivo como destaque de marca e ações principais.
- Verde-floresta para sidebar, navegação e elementos estruturais.
- Fundo off-white e cards predominantemente brancos.
- Cinzas neutros para hierarquia e estados passivos.
- Azul discreto para informação e execução.
- Amarelo e laranja para revisão e atenção.
- Vermelho para devolução ou erro.
- Roxo discreto para pendência de sincronização.
- Tipografia Inter ou Geist, com tamanho base mínimo confortável para apresentação em tela.
- Ícones lineares, badges, gráficos, progress bars, timelines, mapas conceituais e galerias de evidências.
- Sem glassmorphism excessivo, gradientes chamativos ou estética B2C.

O logo será transformado em um asset vetorial local, preservando o bloco verde inclinado e o wordmark branco, para que a demonstração não dependa de rede.

## Navegação do Gestor

Sidebar fixa:

- Visão Geral
- Ordens de Serviço
- Operações
- Projetos
- Clientes & UFVs
- Equipes
- Checklists
- Relatórios
- Histórico
- Usuários
- Configurações

Rodapé com avatar, nome `Lucas Martins` e função `Gestor Operacional`.

## Telas de maior fidelidade

### Login

Login com identidade General Green e composição visual do fluxo `Planejamento → Campo → Validação → Resultado`.

### Dashboard do Gestor

Indicadores de projetos ativos, OS abertas, atividades em revisão e produção do período. Deve incluir operação do dia, planejado versus realizado, avanço por projeto, atividades que precisam de atenção e o pipeline completo da plataforma.

### Ordens de Serviço

Lista de OS com busca, filtros, indicadores, progresso, status e ações. Linhas levam ao detalhe da OS e o botão principal inicia o stepper de criação.

### Nova Ordem de Serviço

Stepper em quatro etapas: Operação, Execução, Procedimento e Revisão. A emissão abre um modal de sucesso e disponibiliza rotas para visualizar a OS ou criar outra.

### Detalhe da OS

Cabeçalho operacional, pipeline de status, produção, tempo, equipe, sincronização e abas de Resumo, Execução, Checklist, Evidências e Histórico.

### Operações

Kanban operacional com Programadas, Em execução, Aguardando sincronização, Aguardando revisão, Devolvidas e Concluídas. Alternância visual entre Kanban e lista.

### Revisão da atividade

Layout de duas colunas com produtividade, tempo, equipe, clima, checklist, galeria de fotos e mapa conceitual. Permite solicitar correção ou aprovar.

### Relatório operacional

Gerador controlado por componentes permitidos e prévia de página A4 com resumo, avanço, gráfico, evidências, localização e checklist.

### Aplicativo mobile

Fluxo completo do técnico: Início → OS → atividade em execução → checklist → produtividade → evidências → offline → sincronização → revisão → envio. Botões serão grandes, textos legíveis e o estado de conectividade permanecerá evidente.

### Portal do Cliente

Experiência simplificada com Visão Geral, Projetos e Relatórios. Exibirá apenas informações aprovadas pela General Green.

## Telas secundárias

Projetos, detalhe do projeto, Clientes & UFVs, Equipes, Checklists, editor de checklist, Histórico, Usuários e Configurações manterão o mesmo padrão visual. Elas serão navegáveis e conterão dados realistas, porém terão menos interações do que os fluxos prioritários.

## Fluxos demonstráveis

### Fluxo do gestor

`Dashboard → Nova Ordem de Serviço → etapas do formulário → Emitir OS → Detalhe da OS`

### Fluxo de campo

`Início mobile → Detalhe da OS → Iniciar atividade → Checklist/Produção/Evidências → Offline → Sincronizar → Enviar para revisão`

### Fluxo de aprovação

`Dashboard/Operações → Revisão → Solicitar correção ou Aprovar → Gerar relatório`

### Fluxo de resultado

`Relatório → Prévia A4 → Disponibilizar → Portal do Cliente → Projeto/Relatório`

## Interações simuladas

- Busca e filtros com feedback visual.
- Navegação por cards, menus e tabelas.
- Stepper da nova OS.
- Troca entre lista e Kanban.
- Abas no detalhe da OS.
- Modais de sucesso, correção e aprovação.
- Atualização demonstrativa da produção.
- Preenchimento de checklist.
- Adição simulada de evidência.
- Alteração entre online e offline.
- Fila e conclusão de sincronização.
- Toasts de confirmação.
- Prévia de relatório.
- Alternância entre ambientes Gestor, Técnico e Cliente por rotas próprias.

## Dados fictícios

Serão utilizados os clientes, UFVs, equipes, serviços e profissionais definidos no briefing. Todos os textos estarão em português brasileiro e não haverá Lorem Ipsum.

## Assets visuais

As evidências fotográficas usarão imagens locais conceituais de usinas solares, vegetação e lavagem de módulos. O mapa será uma composição local estilizada com pin, coordenadas, precisão, data e horário; não haverá dependência de serviço de mapas.

## Fora do escopo

- Backend e banco de dados.
- Autenticação real.
- Integrações externas.
- GPS ou rastreamento real.
- Cálculo automático de área.
- Geoprocessamento avançado.
- Análise automática de imagens.
- Inteligência artificial operacional.
- Assinatura eletrônica.
- Faturamento, financeiro ou emissão fiscal.
- Editor livre de relatórios.
- Geração e armazenamento real de PDF.

## Responsividade

- Desktop principal validado em 1440 px.
- Portal do Cliente validado em desktop.
- Aplicativo do técnico validado em 390 × 844 px.
- O layout administrativo terá comportamento responsivo suficiente para não quebrar em larguras intermediárias, mas a apresentação será otimizada para desktop.

## Validação

Por se tratar de protótipo visual, não será aplicado TDD a cada componente puramente apresentacional. Serão criados testes automatizados para rotas e comportamentos essenciais, além de:

- execução da suíte de testes;
- build de produção;
- verificação visual no navegador;
- verificação de conteúdo e ausência de overlays de erro;
- navegação manual pelos quatro fluxos principais;
- captura das telas prioritárias em desktop e mobile.

## Critérios de conclusão

- Allebras e General Green organizados em pastas independentes.
- Três ambientes acessíveis e coerentes visualmente.
- Quatro fluxos principais demonstráveis de ponta a ponta.
- Dez telas prioritárias com alto refinamento visual.
- Telas secundárias navegáveis e consistentes.
- Identidade General Green aplicada sem dependências externas críticas.
- Dados realistas em português brasileiro.
- Testes essenciais e build concluídos sem falhas.
- Verificação visual em 1440 px e 390 × 844 px.
