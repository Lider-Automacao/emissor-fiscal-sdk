# @liderautomacao/emisor-fiscal-sdk

*A maneira mais simples e eficiente de integrar com a API de Emissão Fiscal.*

## Visão Geral

Este SDK (Software Development Kit) foi projetado para simplificar a interação com a API de Emissão Fiscal da Líder Automação, abstraindo a complexidade das chamadas HTTP e fornecendo um conjunto de métodos e modelos de dados tipados para agilizar o desenvolvimento. Com ele, você pode facilmente consultar e manipular dados de NF-e, NFC-e e NFS-e.

## Tecnologias Utilizadas

- **TypeScript**: Para um código mais seguro, legível e com autocompletar inteligente.
- **Axios**: Para a realização das requisições HTTP para a API.
- **Zod**: Para validação robusta dos dados de entrada e saída, garantindo a integridade das informações.

## Instalação

Para adicionar o SDK ao seu projeto, utilize o `npm` ou outro gerenciador de pacotes de sua preferência:

```bash
npm install @liderautomacao/emisor-fiscal-sdk
```

## Uso

Primeiro, importe e instancie o `EmissorFiscalSDK`, fornecendo as credenciais de acesso à API.

```typescript
import { EmissorFiscalSDK } from '@liderautomacao/emisor-fiscal-sdk';

// Configuração das credenciais
const sdk = new EmissorFiscalSDK({
  chave: 'SEU_TOKEN_DE_AUTENTICACAO',
});
```

Após a inicialização, você pode utilizar os serviços disponíveis para interagir com a API.

### Exemplo: Calculo NFC-e

```typescript
import { EmissorFiscalSDK } from '@liderautomacao/emisor-fiscal-sdk';

const sdk = new EmissorFiscalSDK({
  chave: 'SEU_TOKEN_DE_AUTENTICACAO',
});

async function calcula() {
  try {
    console.log('Calculando NFC-e...');
    const response = await sdk.nfce.calcular({
      // Você pode adiciona os dados da NFC-e
    });

    console.log('Resultado:', response);
  } catch (error) {
    console.error('Ocorreu um erro :', error);
  }
}

calcula();
```

## Recursos Futuros

- [ ] Adicionar suporte a todos os endpoints restantes.
- [ ] Aumentar a cobertura de testes para garantir ainda mais estabilidade.


## Licença

Este projeto está licenciado sob a **Licença MIT**. Veja o arquivo `LICENSE` para mais detalhes.
