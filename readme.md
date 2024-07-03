# Gestão de Despesas em Viagens

Este projeto é um trabalho acadêmico da PUC Minas, desenvolvido para a disciplina de Arquitetura para Aplicações Móveis da pós-graduação em Arquitetura de Software Distribuído. Foi elaborado por Gustavo Gomes Madureira, sob a orientação do Prof. Fernando Manoel Pereira.

## Descrição

O objetivo deste projeto é criar uma aplicação web para a gestão de despesas em viagens. A aplicação permite adicionar, editar e excluir despesas, calcular o valor total das despesas na moeda de origem e na moeda de destino, e armazenar as despesas no `localStorage` do navegador.

## Funcionalidades

- **Adicionar Despesa**: Adicione uma nova despesa especificando a descrição, quantidade, valor, moeda de origem e moeda de destino.
- **Editar Despesa**: Edite uma despesa existente.
- **Excluir Despesa**: Exclua uma despesa existente.
- **Calcular Total**: Calcule o valor total das despesas na moeda de origem e na moeda de destino.
- **Persistência de Dados**: As despesas são armazenadas no `localStorage` do navegador para persistência dos dados.
- **Tabela Responsiva**: A lista de despesas é exibida em uma tabela responsiva.

## Estrutura do Projeto

### HTML

O arquivo `index.html` contém a estrutura da aplicação, incluindo o formulário de entrada de despesas e a tabela para exibição das despesas.

### CSS

O arquivo `styles.css` contém os estilos para a aplicação, garantindo uma interface visual agradável e responsiva.

### JavaScript

O arquivo `script.js` contém a lógica da aplicação, incluindo a manipulação do DOM, validação de formulários, comunicação com a API de taxas de câmbio e persistência de dados no `localStorage`.

## Instruções de Uso

1. Clone o repositório para o seu ambiente local.
2. Abra o arquivo `index.html` no seu navegador.
3. Utilize o formulário para adicionar, editar e excluir despesas.
4. Acompanhe o valor total das despesas na moeda de origem e na moeda de destino.

## Arquitetura do Código

O código está organizado de forma a separar as preocupações de manipulação do DOM, validação de formulários e persistência de dados. A comunicação com a API de taxas de câmbio é feita de forma assíncrona utilizando `fetch`.

### Funções Principais

- `addExpenseToList`: Adiciona uma nova despesa à tabela.
- `updateTotal`: Calcula o valor total das despesas.
- `editExpense`: Permite a edição de uma despesa existente.
- `deleteExpense`: Exclui uma despesa existente.
- `saveExpenseToLocalStorage`: Salva uma despesa no `localStorage`.
- `updateExpenseInLocalStorage`: Atualiza uma despesa no `localStorage`.
- `deleteExpenseFromLocalStorage`: Remove uma despesa do `localStorage`.
- `loadExpensesFromLocalStorage`: Carrega as despesas do `localStorage` ao iniciar a aplicação.
- `validateForm`: Valida o formulário antes de adicionar ou editar uma despesa.
- `showAlert`: Exibe um pop-up de alerta para mensagens e confirmações.

## Observações

Este projeto foi desenvolvido como parte do curso de pós-graduação em Arquitetura de Software na PUC Minas. Todo o conteúdo é de caráter acadêmico e foi desenvolvido para fins de aprendizado e avaliação.
