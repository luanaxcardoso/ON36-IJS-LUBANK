### Iniciando o projeto com TypeScript
====================
### Para iniciar um projeto com TypeScript, basta executar o comando para criar o arquivo package.json:
````bash
npm init -y
````

### Para criar o tsconfig.json, basta executar o comando:
````bash	
tsc -init
````
### Para compilar seu projeto TypeScript, use o seguinte comando:
````bash
npx tsc
````

### Adicione no package.json, para rodar o projeto com o comando npm start:
````json
"scripts": {
    "start": "node dist/index.js"
  },
````
### Para rodar o projeto, use o seguinte comando:
````bash
npm start
````

## Estrutura:

### Organização
A separação em pastas ajuda a manter o código organizado e modular, facilitando a manutenção e a escalabilidade.

### Uso de Interfaces
O uso de interfaces garante que as classes sigam um contrato bem definido, o que é útil para garantir consistência e facilitar a implementação de testes.

### Encapsulamento
As classes encapsulam dados e comportamentos relacionados, o que ajuda a proteger a integridade dos dados e a implementar regras de negócio de forma mais clara.

### Flexibilidade
A estrutura permite adicionar novas funcionalidades facilmente, como novos tipos de contas ou novos métodos de interação entre clientes e contas.
