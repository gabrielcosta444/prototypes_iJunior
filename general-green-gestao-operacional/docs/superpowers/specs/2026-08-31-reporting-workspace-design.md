# Central de relatórios — design aprovado

## Objetivo

Transformar a seção de relatórios em uma central de trabalho que permita ao gestor localizar documentos, administrar modelos reutilizáveis, consolidar atividades aprovadas, conferir uma prévia e distribuir uma versão final preservável ao cliente.

## Escopo desta implementação

- Evoluir a listagem administrativa para uma central com as abas `Relatórios` e `Modelos`.
- Permitir busca e filtros por cliente, projeto e status.
- Exibir estados operacionais, versão, modelo, responsável e canal de disponibilização.
- Criar um fluxo guiado de geração: origem, modelo, conteúdo, conferência e distribuição.
- Permitir ativar, ocultar e reorganizar blocos controlados pela plataforma.
- Reutilizar modelos associados a cliente, projeto ou tipo de serviço.
- Apresentar prévia com identificação, indicadores, produção diária, equipe, clima, evidências, observações, localização e validação.
- Representar a geração do PDF, a disponibilização no portal e o envio por e-mail como ações do protótipo.
- Melhorar a consulta de relatórios aprovados no portal do cliente.

## Limites

- O protótipo continua usando dados locais, sem persistência remota.
- Não haverá editor totalmente livre de páginas, fontes ou componentes.
- O cliente externo não cria nem altera modelos.
- Não haverá assinatura digital, inteligência artificial, geoprocessamento ou medição automática.
- Apenas informações identificadas como aprovadas podem alimentar a geração.

## Arquitetura de interface

Os tipos e dados simulados ficam centralizados em `src/domain/types.ts` e `src/data/mockData.ts`. As páginas administrativas consomem esses dados e mantêm apenas estado efêmero de interface. O módulo de relatórios usa componentes visuais próprios, estilizados em `src/styles/reports.css`, sem acrescentar dependências.

## Critérios de aceite

1. A central permite alternar entre relatórios e modelos.
2. A busca e os filtros reduzem os relatórios visíveis.
3. A listagem exibe status, versão, modelo, aprovação e disponibilização.
4. O construtor apresenta as cinco etapas e impede avançar sem origem válida.
5. O gestor consegue selecionar um modelo, ligar/desligar blocos e alterar a ordem dos blocos permitidos.
6. A conferência informa que os dados vieram de atividades aprovadas e sinaliza a integridade da composição.
7. A prévia representa os principais blocos do relatório real de roçagem/lavagem.
8. O portal do cliente permite buscar, filtrar, visualizar e baixar apenas documentos aprovados.
9. A interface permanece utilizável em larguras menores.

