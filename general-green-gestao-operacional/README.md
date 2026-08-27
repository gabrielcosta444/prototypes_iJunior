# General Green — Gestão de Operações

Protótipo visual independente para apresentação comercial. A aplicação demonstra o ciclo completo da operação: planejamento, execução em campo, trabalho offline, sincronização, validação, relatório e consulta pelo cliente.

## Executar

```powershell
npm run dev
```

Abra `http://localhost:5173` no navegador. O login é demonstrativo; basta clicar em **Entrar**.

## Fluxos recomendados para a reunião

- Gestor: Login → Visão Geral → Nova Ordem de Serviço → Operações → Revisão → Relatório.
- Técnico: use **App técnico** no topo → atividade → checklist/evidências → sincronização.
- Cliente: use **Portal do cliente** no topo → projeto → relatórios aprovados.

## Rotas de destaque

- `/admin/dashboard`
- `/admin/orders`
- `/admin/orders/new`
- `/admin/review/2026-0147`
- `/admin/reports/preview`
- `/mobile`
- `/mobile/activity/2026-0148`
- `/mobile/sync`
- `/client/dashboard`

## Validação

```powershell
npm run test:run
npm run typecheck
npm run build
```

O projeto não possui backend, autenticação real ou integrações externas. Todos os dados e transições são simulados para a apresentação.
