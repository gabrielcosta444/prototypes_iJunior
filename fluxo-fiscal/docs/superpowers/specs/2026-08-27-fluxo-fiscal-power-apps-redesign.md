# Fluxo Fiscal — Redesign realista para Power Apps

## Objetivo

Adaptar o protótipo documental existente para representar com honestidade uma interface que possa ser desenvolvida em Microsoft Power Apps Canvas. O resultado continuará adequado a uma reunião comercial, mas não deverá prometer o acabamento de um SaaS totalmente customizado.

O nome do produto passa a ser **Fluxo Fiscal**. **Allebras** permanece apenas como a empresa e o ambiente operacional atendido pelo sistema.

## Decisão de plataforma representada

O protótipo simulará uma Canvas App responsiva construída com:

- controles modernos baseados no Microsoft Fluent 2;
- tema centralizado;
- containers horizontais e verticais de auto-layout;
- formulários modernos;
- galleries para listas operacionais;
- navegação entre telas e painéis simples;
- componentes reutilizáveis para cabeçalho, menu, status e ações.

O protótipo não simulará o editor do Power Apps. Ele representará a aplicação final executada pelo usuário.

## Identidade e nomenclatura

### Produto

- Nome principal: **Fluxo Fiscal**.
- Descrição curta: **Gestão e automação documental**.
- Título do navegador: **Fluxo Fiscal | Gestão Documental**.
- Pasta do projeto: `fluxo-fiscal/`.
- Nome do pacote: `fluxo-fiscal-prototipo`.

### Ambiente

- Contexto da sidebar: **Ambiente Allebras**.
- Login: **Acesse o Fluxo Fiscal**.
- Subtítulo do login: **Gestão centralizada da operação documental**.
- Textos operacionais podem continuar mencionando Allebras quando a empresa for parte da informação, por exemplo “Acompanhe a operação documental da Allebras”.
- E-mails fictícios `@allebras.com.br`, unidades e dados empresariais permanecem válidos.

## Direção visual

### Base Fluent

- Fonte: `Segoe UI`, com fallback para fontes de sistema.
- Cor primária: azul Microsoft/Fluent `#0F6CBD`.
- Azul escuro para navegação: `#0B3A63`.
- Fundo do aplicativo: `#F5F5F5`.
- Superfícies: branco.
- Bordas: `#D1D1D1`.
- Texto principal: `#242424`.
- Texto secundário: `#616161`.
- Sucesso: `#107C10`.
- Atenção: `#F7630C` ou amarelo Fluent claro.
- Erro: `#C50F1F`.

### Escala e legibilidade

- Corpo: 16 px.
- Conteúdo de tabelas e galleries: 14 px ou mais.
- Labels auxiliares: mínimo de 12 px, usados apenas em metadados.
- Títulos de página: 24–28 px.
- Títulos de seção: 18–20 px.
- Botões: 14 px, altura de 40 px.

### Superfícies

- Raios de 4–8 px.
- Sombras removidas da maior parte dos componentes.
- Cards definidos por borda de 1 px e espaçamento interno.
- Sem gradientes decorativos.
- Sem glassmorphism, fundos radiais ou elevações dramáticas.
- Hover discreto por alteração de fundo ou borda.

## Estrutura responsiva

### Desktop

- Sidebar fixa de aproximadamente 232 px.
- Header de 64 px.
- Área principal formada por containers verticais.
- Largura útil sem grandes margens decorativas.
- Conteúdo projetado para 1366–1440 px.

### Tablet e telas menores

- Sidebar recolhível.
- Cards de indicadores quebram de quatro para duas colunas.
- Galleries ocultam campos secundários.
- Formulários mudam de duas colunas para uma.
- Painéis laterais ocupam a tela inteira quando não houver espaço.

## Redesign por área

### Login

- Remover composição visual abstrata de grande impacto.
- Usar tela dividida simples: formulário à esquerda e painel azul institucional à direita.
- Mostrar somente quatro etapas em uma lista vertical: Captura, Validação, Classificação e Arquivamento.
- Exibir nome Fluxo Fiscal e selo Ambiente Allebras.

### Shell administrativo

- Sidebar azul-escura com ícones Fluent lineares.
- Marca Fluxo Fiscal no topo.
- Contexto Ambiente Allebras abaixo da marca.
- Header branco com breadcrumb, busca opcional, notificações e usuário.
- Item selecionado com fundo azul médio e barra lateral simples.

### Dashboard

- Manter quatro indicadores, com cards planos.
- Manter um único gráfico principal de volume.
- Substituir donut sofisticado por barras horizontais ou lista percentual.
- Exibir status do processamento em lista simples.
- Exibir integrações em gallery com status e última sincronização.
- Reduzir o pipeline para uma faixa horizontal com quatro etapas.
- Usar somente conteúdo necessário para decisão operacional.

### Central de documentos

- Manter busca e filtros, usando Text Input, Dropdown e Date Picker visuais.
- Representar a tabela como Gallery/Data table simples.
- Reduzir a quantidade de colunas visíveis: Documento, Fornecedor, Tipo, Emissão, Valor e Status.
- Origem, categoria e unidade ficam disponíveis em painel de detalhes ou expansão da linha.
- Ações ficam em menu de reticências.
- Aumentar a altura das linhas e o tamanho das fontes.

### Detalhe do documento

- Abrir em tela própria.
- Pipeline com quatro etapas e ícones de confirmação.
- Informações fiscais e classificação em containers com labels e valores.
- Abas simples no padrão Fluent.
- Arquivamento no SharePoint em card com borda, sem decoração especial.
- Timeline de processamento em lista vertical simples.

### Pendências

- Indicadores superiores planos.
- Lista em Gallery com motivo, prioridade, fornecedor e ação.
- Resolver pendência em painel lateral ou tela dedicada.
- Rule builder convertido em formulário estruturado “Se / E / Então”, usando dropdowns comuns.

### Regras

- Lista com prioridade numérica, nome, condição resumida, categoria, aplicações e status.
- Remover drag-and-drop real; usar botões mover para cima/baixo ou campo de prioridade, mais viável no Power Apps.
- Nova regra em formulário vertical com seções.

### Integrações

- Cards padronizados, sem animações.
- Duas ou três colunas conforme a largura.
- Status, última sincronização, volume e botão de ação.
- Atividade recente em lista cronológica.

### Fornecedores e portal externo

- Manter portal separado com shell simplificado.
- Usar os mesmos controles e tema Fluent.
- Dashboard externo com indicadores, gallery de documentos e aviso de pendência.
- Upload visual com Add Picture/Attachment conceitual, campos modernos e estados de validação.
- Modal de duplicidade passa a usar diálogo simples do Fluent.

## Interações

- Preservar todas as rotas existentes.
- Preservar os fluxos demonstráveis de login, documentos, pendências, regras, integrações e fornecedor.
- Preservar notificações de sucesso e loading.
- Substituir microinterações sofisticadas por estados de controle: hover, pressed, disabled, selected e loading.
- Menus e filtros devem abrir painéis simples e não menus flutuantes altamente customizados.

## Fora do escopo

- Construção real do aplicativo no Power Apps.
- Fórmulas Power Fx.
- Conexão com Dataverse, SharePoint, Outlook, Nomus ou serviços fiscais.
- Componentes PCF personalizados.
- Replicar limitações ou bugs específicos do editor do Power Apps.
- Mudanças no domínio funcional e nos dados fictícios já aprovados.

## Estratégia de implementação no protótipo React

- Substituir tokens globais e tipografia primeiro.
- Atualizar marca, título, pacote e textos de produto.
- Simplificar os shells administrativo e fornecedor.
- Aplicar componentes Fluent-like compartilhados antes das páginas.
- Redesenhar as cinco telas prioritárias: Dashboard, Documentos, Detalhe, Pendências e Integrações.
- Propagar o padrão às páginas secundárias.
- Manter estado, dados e rotas atuais para reduzir risco funcional.
- Renomear a pasta somente após as alterações internas estarem consistentes.

## Critérios de aceite

- O produto aparece como Fluxo Fiscal em toda a aplicação.
- Allebras aparece apenas como empresa, ambiente, domínio de e-mail ou dado operacional.
- Nenhuma tela importante depende de estética difícil de executar em Canvas App.
- Tabelas e galleries usam fonte legível de no mínimo 14 px.
- Cards são planos, com bordas e poucos efeitos.
- Login, Dashboard, Documentos, Detalhe, Pendências, Integrações e Portal do Fornecedor continuam navegáveis.
- O layout funciona em 1440 px e se reorganiza em larguras menores.
- Testes existentes passam após a atualização de textos e seletores.
- `npm run typecheck`, `npm run test:run` e `npm run build` finalizam com sucesso.
