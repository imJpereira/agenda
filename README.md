# Cadastro

Este é um programa de cadastro de usuários desenvolvido para aprimorar minhas habilidades em Node.js e Express. Embora o design não seja o foco, utilizei modelos prontos do Bootstrap para estilização. É importante ressaltar que os dados dos usuários são armazenados de forma segura, com as senhas passando por um processo de anonimato antes de serem armazenadas no banco de dados MongoDB.

## Como funciona
Esse aplicativo web possui uma página de cadastro, onde você pode cadastrar uma nova conta, ou fazer login caso você já tenha uma conta. Todos os usuários cadastrados são mostrados em uma lista, porém, só usuários logados podem ver essa lista. É um projeto frontend e backend, com foco no backend, utilizando Express.

## Como utilizar
Essa aplicação só funciona no localhost. Por enquanto ela ainda não está disponível para testes públicos por motivos de segurança.

## Notas importantes
* A segurança da senha é feita pelo bcrypt, ou seja, a sua senha não aparece na base de dados

* Esse projeto visa desenvolver minhas habilidades com nodeJS, então sinta-se a vontade para apontar possíveis melhorias no código.
