# Aplicação para gerenciar alunos

A escola Lógica Sempre precisa de um módulo em seu sistema para gerenciar seus alunos. Sendo assim as seguintes funcionalidades precisarão ser desenvolvidas

- Cadastrar aluno contendo:
  - codigo, *string*
	- nome, *string*
	- sobrenome, *string*
	- email, *string*
	- notas, sendo um array de números, de 3 posições
	- ativo, *boolean* // padrão true
- Remover aluno pelo codigo
- Buscar um aluno especifico pelo codigo
- Retornar a lista completa de alunos
- Calcular a media do aluno
- Desativar aluno
- Retornar a lista apenas com alunos ativos
- Retornar a lista apenas com alunos inativos
- Retornar os alunos que estão com a média esperada
- Alunos que estão abaixo da média esperada

## Informações importantes:

- A média da escola é 6
- Não cadastrar alunos duplicados (codigo/nome/email)
- Não cadastrar alunos que não contenham todos os dados, incluindo as 3 notas
- Não mostrar no console mensagens de erro genéricas (padrões do navegador)
- O nome do aluno não deve conter espaço extra no começo ou no fim
- Você mesmo irá gerar os dados para realizar o projeto e apresentar os dados necessários para rodar o projeto
- O projeto poderá ser executado no console do navegador, no html ou utilizando alertas e prompts
