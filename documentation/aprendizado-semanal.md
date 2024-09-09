 ## Aprendizado de TypeScript

 ## Semana 01

### Diagrama de modelagem do banco de dados criado

---

## Semana 02

### POO com Typescript

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

---

## Semana 03
### Criação de um projeto de API RESTful com NestJS

### Implementação de endpoints para CRUD de entidades

- Uso de serviços para encapsular a lógica de negócio
- Uso de injeção de dependências para facilitar a manutenção e testes
- Uso de módulos para organizar o código de forma modular
- Uso de controladores para definir os endpoints da API
    - Cliente
    - Conta
    - Gerente
---
## Semana 04

### Refatoração de código

- Identificar e corrigir problemas de design e implementação
- Melhorar a legibilidade e manutenibilidade do código
- Aplicar boas práticas de programação
- Implementar padrões de design
- Melhorar a eficiência e a escalabilidade do código
- Aplicação dos princípios DRY e KISS
- Foi adicionada Factory Method para a criação de contas
- Foi adicionada a classe ContaPoupanca que herda de Conta e implementa a interface Rendimento mensal
- Foi adicionada a classe ContaCorrente que herda de Conta e implementa a interface Cheque Especial

---

## Semana 05

### Testes automatizados e TDD

- Instalar as dependências do Jest e do ts-jest

```bash	
npm install --save-dev jest @nestjs/testing ts-jest

npx jest --init 
````

- Para rodar os testes       

```bash
npm run test:e2e 
```
ou

```bash
npm test
```

- Implementação de testes unitários e de integração
- Uso de ferramentas como Jest 
- Uso de mocks para simular comportamentos
- Uso de TDD para guiar o desenvolvimento

---

## Semana 06

### Integração da API viacep

- Uso da API viacep para obter informações de endereços a partir de um CEP
- Implementação de um serviço para consumir a API viacep

### instalação do axios para fazer requisições HTTP

```bash
npm install @nestjs/axios
```

### Arquitetura Hexagonal

- Separação de responsabilidades em camadas
- Criação das pastas: adapters, application, domain, documentacion, infrastructure
  
  src/
├── Adapters/
|   ├── 
│   ├──> Controllers/
│   │  
│   ├── 
├── Application/
│   ├── 
│   ├──> DTOs/
│   ├──> Services/ 
├── Domain/
│   ├── enums/
│   ├── factories/
│   ├── interfaces/
│   └── models/
|
|── ----------------------------

---

## Semana 07


