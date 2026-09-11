# Plantas e Mapas — Design

## Objetivo

Adicionar ao painel administrativo um fluxo nativo para cadastrar PDFs de plantas técnicas, pintar áreas com um pincel semitransparente e calcular a área real coberta por status usando escala nominal ou calibração manual.

## Arquitetura

A seção terá uma listagem em `/admin/plants` e um editor em `/admin/plants/:id`. O estado do protótipo ficará em um `PlantsProvider`, persistido no navegador; metadados, sessões, strokes e o PDF em data URL serão reidratados ao recarregar a aplicação. A solução não altera o arquivo PDF original.

O PDF será renderizado por `react-pdf`/PDF.js. Uma `Stage` de `react-konva`, com as mesmas dimensões lógicas da página renderizada, ficará sobre o PDF. Os strokes serão persistidos com pontos e largura normalizados entre 0 e 1, portanto zoom, pan e redimensionamento afetarão somente a projeção visual.

## Modelo de dados

- `PlantMap`: cadastro, escala, PDF, dimensões por página, calibração, sessões e strokes.
- `PaintSession`: data, responsável, status/cor, OS, atividade, projeto e visibilidade.
- `PaintStroke`: página, ferramenta, pontos normalizados, largura normalizada, status, cor, opacidade, data, usuário e sessão.
- `Calibration`: dois pontos normalizados, distância real e metros por point da página PDF.

## Editor

A barra superior terá mover, pincel, borracha, tamanho, status/cor, undo/redo, zoom, ajuste, paginação, calibração, exportação e salvar. Pincel e borracha registrarão um único stroke ao final de cada gesto. O painel lateral mostrará resumo por status, dados da sessão ativa e camadas/sessões com controle de visibilidade.

O zoom será aplicado igualmente ao PDF e ao canvas. Pan será feito pelo viewport rolável no modo mover. Atalhos `Ctrl+Z` e `Ctrl+Shift+Z` controlarão o histórico local do editor.

## Cálculo de área

Uma máscara raster normalizada e de resolução fixa será recalculada apenas ao concluir um stroke ou alterar visibilidade. Cada stroke pinta códigos de status na máscara em ordem cronológica; a borracha zera a máscara. Isso garante união sem dupla contagem e a regra “último status prevalece”.

A fração coberta é convertida para a área em points² da página. Sem calibração, usa `0,0254 / 72 * escala`; com calibração, usa a distância real dividida pela distância entre os dois pontos em coordenadas PDF. O resumo retorna m² e hectares por status e no total, independentemente do zoom.

## Cadastro e persistência

O modal de cadastro validará nome, UFV, PDF e escala predefinida ou personalizada. A listagem exibirá nome, UFV, projeto, escala, importação, área marcada e atualização, com abrir, editar e excluir. O protótipo usará armazenamento local com tratamento de erro de quota; a fronteira do provider permitirá trocar por API posteriormente.

## Exportação

“Exportar visualização” comporá o canvas do PDF com a camada Konva visível e baixará um PNG da página atual. O PDF original permanece intocado e a ação já fornece a representação reutilizável por relatórios.

## Testes

Testes unitários cobrirão conversão por escala/calibração, sobreposição, precedência de status, borracha e independência de zoom. Testes de interface cobrirão rota/sidebar, cadastro, validação, editor e persistência básica. A validação final inclui testes, typecheck, build e inspeção visual em navegador.
