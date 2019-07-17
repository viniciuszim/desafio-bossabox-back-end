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

## Configurar o mongodb para armazerar os dados
docker run --name mongonode -p27017:27017 -d -t mongo

Mudar a variável *DB_URL* no arquivo `.env` para o da sua máquina

## Configurar o redis para gerenciar as filas
docker run --name noderedis -p 6379:6379 -d -t redis:alpine

Mudar a variável *REDIS_HOST* e *REDIS_PORT* no arquivo `.env` para a da sua máquina

**Note: Caso não tenha o docker instalado, pode verificar aqui: https://www.docker.com .**

Para executar o projeto back-end, basta executar os seguintes comandos.

### `yarn`
- Para instalar as dependências

### `yarn start`
- Para iniciar o servidor na URL padrão (http://localhost:3000)

### `yarn test`
- Para realizar os testes da aplicação (foi utilizado JEST)
