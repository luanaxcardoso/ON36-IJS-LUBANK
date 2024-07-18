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

### Herança
A herança permite reutilizar código e estender funcionalidades de forma simples e eficiente, o que é útil para evitar a repetição de código e facilitar a manutenção.

* private: Propriedades ou métodos que devem ser acessíveis apenas dentro da própria classe.
* protected: Propriedades ou métodos que devem ser acessíveis dentro da própria classe e subclasses, mas não fora dessas classes.
* readonly: Propriedades que só podem ser atribuídas durante a inicialização ou no construtor da classe e não podem ser alteradas depois.