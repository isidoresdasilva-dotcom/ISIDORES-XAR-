# ISIDORES & XARÁ — V1

Livraria digital para venda de e-books em Angola.

## O que já funciona nesta V1
- Página inicial usando a imagem enviada como fundo.
- Catálogo de livros.
- Carrinho simples.
- Checkout.
- Opções de pagamento: Multicaixa Express e transferência bancária.
- Área do cliente.
- Pedidos guardados no navegador.
- Painel administrativo de demonstração.
- Confirmação manual de pagamento e liberação da biblioteca.
- SQL inicial para migrar para Supabase.

## Importante antes de publicar
Substitua no checkout os dados de pagamento pelos seus dados reais.
A V1 usa localStorage para demonstração. Para produção, ligue autenticação, banco de dados, Storage privado e RLS no Supabase.

## Como testar
Abra `index.html` no navegador ou publique a pasta no GitHub Pages.
Fluxo:
1. Início → Comprar.
2. Checkout → preencher dados → escolher pagamento.
3. Admin → confirmar pagamento.
4. Minha conta → livro liberado.

## Próxima versão recomendada
V2 com Supabase real, cadastro/login, upload de comprovativo, PDFs privados, URLs de download temporárias, painel de produtos e configuração dos dados bancários.
