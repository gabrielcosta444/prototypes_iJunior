# Allebras | Central de Documentos — Especificação do Protótipo

## Objetivo

Criar um protótipo visual de alta fidelidade, navegável e otimizado para uma reunião comercial. A experiência deve permitir que o cliente compreenda rapidamente como a Allebras centraliza a captura, validação, deduplicação, classificação, organização, arquivamento e rastreabilidade de documentos.

O protótipo demonstra o produto e seus fluxos, mas não implementa backend, autenticação real, persistência externa, upload efetivo ou integrações reais.

## Público e narrativa

O protótipo atende dois perfis simulados:

- Administrador Allebras, com visão completa da operação documental.
- Fornecedor, com acesso restrito aos documentos da própria empresa.

A apresentação deve seguir uma narrativa simples: muitas fontes alimentam uma camada única de orquestração, que trata documentos automaticamente e os arquiva com controle e rastreabilidade.

## Abordagem técnica

Aplicação de página única em React, TypeScript e Vite, com rotas locais, dados fictícios centralizados e estado em memória. A navegação deve funcionar sem serviços externos. Ícones lineares serão fornecidos por uma biblioteca de ícones; gráficos serão implementados com SVG ou biblioteca leve compatível com o projeto.

O protótipo será otimizado para desktop em 1440 px e adaptará sidebar, grades, tabelas e painéis para larguras menores.

## Direção visual

- Fundo geral off-white ou cinza azulado muito claro.
- Superfícies brancas, bordas discretas e sombras suaves.
- Azul corporativo como cor primária; ciano como apoio.
- Verde para sucesso, âmbar para atenção, vermelho para erro e violeta/cinza para duplicidade.
- Tipografia Inter ou equivalente.
- Alta densidade informacional com hierarquia visual clara.
- Ícones lineares, raios moderados e animações curtas e discretas.
- Sem ilustrações B2C, gradientes chamativos ou decoração sem função.

O logo será uma assinatura tipográfica provisória “Allebras” com símbolo geométrico simples e o descritor “Central de Documentos”.

## Arquitetura da interface

### Shell administrativo

Sidebar persistente com Visão Geral, Documentos, Pendências, Fornecedores, Regras, Integrações, Auditoria e Configurações. O rodapé exibe Gabriel Martins, perfil Administrador e menu de conta. O conteúdo possui cabeçalho contextual e área de trabalho responsiva.

### Shell do fornecedor

Versão simplificada, identificada como Morganite Brasil, com Visão Geral, Enviar Documento, Meus Documentos, Pendências e Minha Empresa. Deve parecer parte do mesmo produto, mas com escopo e densidade reduzidos.

## Telas e prioridade

### 1. Login

Composição dividida entre formulário de acesso e painel de ecossistema integrado. O painel mostra o fluxo Documentos → Processamento → Classificação → SharePoint e as fontes Outlook, Nomus ERP, NF-e, CT-e e NFS-e. O login aceita qualquer credencial visualmente válida e conduz ao dashboard.

### 2. Dashboard administrativo

Tela de maior impacto, com quatro KPIs, gráfico de volume em 30 dias, distribuição por origem, status de processamento, saúde das integrações, pendências recentes e representação compacta do pipeline operacional. Os dados e números seguem o briefing.

### 3. Central de Documentos

Pesquisa, filtros, botão de adição e tabela densa com os documentos fornecidos. Filtros e busca atualizam a lista em memória. Linhas possuem hover, status coloridos e ações. O documento NF-e 000145829 abre a tela de detalhe.

### 4. Detalhe do documento

Cabeçalho com fornecedor, status e pipeline Recebido → Validado → Classificado → Arquivado. Abas de Visão geral, Arquivos, Processamento e Histórico. A visão geral combina dados fiscais, classificação, origem, consolidação no Nomus e card destacado de arquivamento no SharePoint.

### 5. Histórico de processamento

A aba Histórico apresenta timeline vertical com horários, eventos e resultado final “Processamento concluído em 7 segundos”. A animação de entrada reforça a sensação de automação sem retardar a demonstração.

### 6. Pendências e resolução

KPIs, filtros e tabela de exceções. “Resolver” abre drawer com contexto, dados encontrados, seleção de categoria e opção marcada para transformar a decisão manual em regra futura. Ao confirmar, o protótipo exibe sucesso, atualiza o documento para concluído e oferece acesso à regra criada.

### 7. Regras e nova regra

Tabela com prioridade visual, condições, categoria, aplicações e status. A tela de nova regra usa um rule builder com seletores SE/ENTÃO. A regra Morganite — Matéria-prima aparece após o fluxo de resolução.

### 8. Integrações

Cards grandes para Nomus, Outlook, NF-e/SEFAZ, CT-e, NFS-e Nacional e SharePoint. Cada card comunica status, sincronização, volume e ação contextual. Uma timeline de atividade recente fecha a tela. “Sincronizar agora” mostra estado de carregamento e confirmação visual.

### 9. Fornecedores

KPIs e tabela com empresas, contatos, documentos, pendências e status. Menus de linha demonstram as ações disponíveis sem executar operações permanentes.

### 10. Portal do fornecedor e upload

Dashboard simplificado da Morganite Brasil, documentos recentes, aviso de pendências e CTA de upload. A tela de envio simula drag-and-drop, mostra um XML previamente carregado, dados extraídos e formulário complementar. O envio passa por processamento curto e termina em estado de sucesso.

### 11. Duplicidade

Modal demonstrativo acionável pelo upload ou por uma ação contextual. Explica que a NF-e 000145829 já existe, compara origem inicial e nova origem e deixa claro que apenas o histórico será atualizado.

### 12. Auditoria

Filtros e tabela/timeline com usuário, ação, data, horário e registro afetado, utilizando os eventos fornecidos.

### 13. Configurações

Tela de apoio com preferências visuais plausíveis para nomenclatura, notificações e perfil. Não haverá configuração funcional de infraestrutura.

## Fluxos demonstráveis

1. Login → Dashboard → Documentos → Detalhe → Histórico.
2. Dashboard → Pendências → Resolver → Criar regra → Documento concluído.
3. Dashboard → Integrações → detalhes visuais de Nomus, Outlook e SEFAZ.
4. Alternar para Portal do Fornecedor → Enviar Documento → Processamento → Sucesso.
5. Exibir modal de documento duplicado e compreender a deduplicação.

## Estados e interações

- Hovers em cards, botões e linhas.
- Dropdowns de filtros e menus contextuais.
- Drawer de resolução de pendência.
- Modal de duplicidade.
- Tooltips em ícones menos óbvios.
- Skeletons ou spinner curto em sincronização e envio.
- Toasts para sucesso e feedback de ações.
- Abas, paginação e busca funcionais em memória.
- Transições rápidas, respeitando preferência por movimento reduzido.

## Dados

Todo o conteúdo será em português do Brasil. Os dados usarão NF-e, NFS-e, CT-e, XML, CNPJ, CFOP, pedidos, fornecedores, datas brasileiras e valores em reais. Não haverá Lorem Ipsum. O domínio permanecerá estritamente documental, sem funções financeiras, contábeis ou de emissão fiscal.

## Componentes principais

- `AppShell` e `SupplierShell` para estrutura e navegação.
- `PageHeader`, `MetricCard`, `StatusBadge` e `DataTable` para padrões recorrentes.
- `Pipeline`, `IntegrationCard`, `Timeline` e componentes de gráfico para a narrativa operacional.
- `ResolutionDrawer`, `DuplicateModal`, `Toast` e `SelectMenu` para interações.
- Arquivos separados de rotas, dados simulados e utilitários de formatação.

## Qualidade e verificação

O protótipo será validado por build de produção, checagem estática disponível no projeto e testes dos comportamentos essenciais: login, navegação, abertura do detalhe, troca de aba, resolução de pendência, criação de regra, sincronização e envio pelo fornecedor. Também será feita verificação visual em navegador nos principais fluxos e em largura desktop.

## Fora do escopo

- Backend, banco de dados ou API.
- Autenticação e autorização reais.
- Integrações reais com Nomus, Outlook, SEFAZ, NFS-e ou SharePoint.
- Upload, parsing ou armazenamento real de arquivos.
- Persistência após recarregar a página.
- Cobertura funcional de produção ou requisitos legais/fiscais.

