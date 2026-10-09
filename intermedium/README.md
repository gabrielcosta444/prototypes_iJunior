# FS Intermedium — protótipo funcional

Protótipo navegável da plataforma FS Intermedium, com ambientes integrados para síndico, prestador e administrador. Todos os dados são fictícios e persistem somente no `localStorage` do navegador.

## Executar

```bash
npm install
npm run dev
```

Abra a URL exibida pelo Vite. Na tela de login, use qualquer senha não vazia e uma das contas:

- `sindico@demo.fs`
- `prestador@demo.fs`
- `admin@demo.fs`

Também é possível entrar diretamente pelos três botões de demonstração.

## Validar

```bash
npm run test:run
npm run typecheck
npm run build
```

## Escopo da demonstração

- busca de prestadores com filtros combinados e regra real de visibilidade;
- perfis, WhatsApp e edição de condomínio;
- cadastro, análise, assinatura e portfólio do prestador;
- aprovação, reprovação, bloqueio, categorias e eventos administrativos;
- estado único compartilhado entre os três ambientes, com opção de restaurar os dados iniciais.

Não há backend, autenticação real, envio de e-mail ou cobrança. As fotografias de demonstração são remotas e dependem de conexão com a internet. O arquivo do Figma não faz parte deste repositório; a interface foi implementada diretamente em React.
