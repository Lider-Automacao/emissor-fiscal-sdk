# Carta de Correção da NF-e adicionada ao SDK antes da rota existir na API

`GerarCartaCorrecao` já está implementado por completo em `emissor-fiscal-package` (DTOs, use-case de validação, service), mas a API ainda não tem Controller/rota Horse expondo isso via HTTP. Decidimos adicionar os DTOs, use-case e método `NfeService.gerarCartaCorrecao()` no SDK agora mesmo assim, apontando para `/nfe/carta-correcao` (seguindo a convenção `/nfe/{acao}` das demais rotas), para que o trabalho do SDK e da API possam avançar de forma independente.

Até que o Controller seja criado na API com esse path exato, `nfe.gerarCartaCorrecao()` retorna 404.
