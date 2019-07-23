Esse projeto foi criado para atender ao desafio da empresa `bossabox` (https://www.notion.so/Back-end-0b2c45f1a00e4a849eefe3b1d57f23c6)

## Sobre o projeto

O projeto é um CRUD de ferramentas(tools). Foi usado autenticacão JWT, logo tem um cadastro mínimo de usuário para o mesmo poder inserir novas tools.

## Bônus

Algumas funcionalidades foram adicionadas ao projeto como bônus do desafio, tais como:

### Autenticacão JWT
Foi usado `jsonwebtoken`

### Envio de email
Foi usado `nodemailer`

### Gerenciamento de filas com redis
Foi usado o banco de dados `redis` para gerenciar a fila.
E a fila em si, com `kue`

### Validations
Foi usado `joi` (schema validation) para realizar as validacões

### Exception Handling
Foi usado `express-validation` para manipular as excecões que podem ocorrer na aplicacão

### Sentry
Foi usado `sentry` para gerenciar os erros que ocorrem em producão

## Como executar

**Note: Certificar de ter os dois bancos de dados rodando, mongodb e redis.**
Usar o arquivo `.env` (editar o .env_example como exemplo) para configurar as urls e portas dos bancos

### Configurar o mongodb para armazerar os dados
docker run --name mongonode -p27017:27017 -d -t mongo

Mudar a variável *DB_URL* no arquivo `.env` para o da sua máquina

### Configurar o redis para gerenciar as filas
docker run --name noderedis -p 6379:6379 -d -t redis:alpine

Mudar a variável *REDIS_HOST* e *REDIS_PORT* no arquivo `.env` para a da sua máquina

**Note: Caso não tenha o docker instalado, pode verificar aqui: https://www.docker.com .**

Para executar o projeto back-end, basta executar os seguintes comandos.

### Rodar migrations
Como o projeto está usando JWT e as rotas de `users` precisam de autenticacão, precisamos adicionar o usuário admin ao iniciar o projeto. Para que esse usuário tenha acesso ao sistema e as operacões.

- Primeiro instalar a dependência `migrate-mongoose` globalmente: npm install -g migrate-mongoose
- Para verificar se está listando as migrations: migrate list
- Rodar a migration: migrate run

### `yarn`
- Para instalar as dependências

### `yarn start`
- Para iniciar o servidor na URL padrão (http://localhost:3000)

### `yarn test`
- Para realizar os testes da aplicação (foi utilizado JEST)

### Pegando o token de autenticacão para executar as rotas

## Session

POST {{url}}/sessions
body:
{
	"email": "admin@company.com",
	"password": "123456"
}

return:
{
    "user": {
        "_id": "5d308a6617ec09542d33eec9",
        "name": "Admin",
        "email": "admin@company.com",
        "password": "$2a$08$vt6ekN0oHpze3zTZMR8HdOROTKLDRk/7eHPzDnJumjoHh7qChx85m",
        "createdAt": "2019-07-18T15:04:06.742Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzA4YTY2MTdlYzA5NTQyZDMzZWVjOSIsImlhdCI6MTU2MzQ3MTIzNCwiZXhwIjoxNTYzNTU3NjM0fQ.SnW8G1MrV2dEE00kg3cg2gWIynIH-BoTmtG2OE3VY6Y"
}

### Documentacão das rotas

Para verificar a documentacão completa das rotas, acesse: http://localhost:3000/api-docs

