# ISIDORES & XARÁ V1.1

## Estrutura obrigatória
- index.html
- livros.html
- login.html
- conta.html
- checkout.html
- admin.html
- favicon.svg
- css/style.css
- js/app.js
- js/test.js
- images/fundo.jpg
- supabase/database.sql

## Correção do erro 404 do app.js
O HTML usa:
`<script src="js/app.js"></script>`

Logo, no GitHub o arquivo precisa estar exatamente em:
`js/app.js`

Não coloque `app.js` na raiz.

## GitHub Pages
Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.

Aguarde a publicação e abra o endereço do GitHub Pages.

Se houver 404, confira se `js/app.js`, `css/style.css` e `images/fundo.jpg` estão no repositório exatamente com esses nomes e pastas.

V1.1 inclui favicon, estrutura corrigida, catálogo, carrinho, checkout, Multicaixa Express, transferência bancária, área do cliente e painel administrativo de demonstração.
