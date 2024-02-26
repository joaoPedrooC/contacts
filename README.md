# Descrição

Contacts é uma aplicação em que você consegue cadastrar, editar, excluir e visualizar seus contatos, além de contar com autenticação e autorização.


## Instalação

Ao clonar o repositório, utilize o seguinte comando para instalar as dependêndias do projeto

```bash
$ npm install
```

## Configuração e inicialização da aplicação

1. Crie um novo arquivo .env na raíz do projeto, trazendo as informações do arquivo .env.example para seu novo arquivo
2. Substitua as informações de exemplo da variável "DATABASE_URL", sem alterar o banco de dados
3. Adicione uma SECRET_KEY em .env

para iniciar a aplicação, rode o seguinte comando:

```bash
$ npm run start
```

## Rotas

### Usuário

1. Criação de usuário

**POST /users**

Corpo da requisição

```bash
{
	"name": "João",
	"email": "joao@email.com",
	"password": "senha123",
	"number": "12345678910"
}
```

Resposta (Sucesso)

```bash
{
	"id": "4e2b6c6d-c563-44fb-9575-9a755d56da58",
	"name": "João",
	"email": "joao@email.com",
	"number": "12345678910",
	"createdAt": "2024-02-26T10:58:17.250Z"
}
```

Resposta (Falha)

```bash
{
	"message": "User already exists",
	"error": "Conflict",
	"statusCode": 409
}
```

```bash
{
	"message": "Unauthorized",
	"statusCode": 401
}
```

2. Atualização de usuário

**PATCH /users/:id**

Corpo da requisição

```bash
{
	"name": "Joao",
	"email": "joaoo@email.com",
	"password": "senha321",
	"number": "10987654321"
}
```

> headers: { Authorization: 'Bearer token' }

Resposta (Sucesso)

```bash
{
	"id": "4e2b6c6d-c563-44fb-9575-9a755d56da58",
	"name": "Joao",
	"email": "joaoo@email.com",
	"number": "10987654321",
	"createdAt": "2024-02-26T10:58:17.250Z"
}
```

Resposta (Falha)

```bash
{
	"message": "User with this e-mail or number already exists",
	"error": "Unauthorized",
	"statusCode": 401
}
```

3. Buscar informações de um usuário

**GET /users/:id**

Corpo da requisição

```bash
```

> headers: { Authorization: 'Bearer token' }

Resposta (Sucesso)

```bash
{
	"id": "4e2b6c6d-c563-44fb-9575-9a755d56da58",
	"name": "Joao",
	"email": "joaoo@email.com",
	"number": "10987654321",
	"createdAt": "2024-02-26T10:58:17.250Z"
}
```

Resposta (Falha)

```bash
{
	"message": "You don't have permission to access this",
	"error": "Unauthorized",
	"statusCode": 401
}
```

4. Deletar um usuário

**POST /users/:id**

Corpo da requisição

```bash
```

> headers: { Authorization: 'Bearer token' }

Resposta (Sucesso)

> 204 No Content

Resposta (Falha)

```bash
{
	"message": "You don't have permission to access this",
	"error": "Unauthorized",
	"statusCode": 401
}
```

```bash
{
	"message": "User not found",
	"error": "Not Found",
	"statusCode": 404
}
```

### Contatos

1. Criação de contato

**POST /contacts**

Corpo da requisição

```bash
{
	"name": "contato",
	"email": "contato@email.com",
	"number": "12345678910"
}
```

> headers: { Authorization: 'Bearer token' }

Resposta (Sucesso)

```bash
{
	"id": "9eb7d6cf-8253-4cfa-94f5-6c5e5bb0a097",
	"name": "contato",
	"email": "contato@email.com",
	"number": "12345678910",
	"createdAt": "2024-02-26T11:24:35.953Z",
	"contactOwnerId": "7d25baa7-6bdb-4ace-9e0c-e96dcf800593"
}
```

Resposta (Falha)

```bash
{
	"message": "Unauthorized",
	"statusCode": 401
}
```

2. Atualização de contato

**PATCH /contacts/:id**

Corpo da requisição

```bash
{
	"email": "contato@email.com"
}
```

> headers: { Authorization: 'Bearer token' }

Resposta (Sucesso)

```bash
{
	"id": "9eb7d6cf-8253-4cfa-94f5-6c5e5bb0a097",
	"name": "contato",
	"email": "contato@email.com",
	"number": "12345678910",
	"createdAt": "2024-02-26T11:24:35.953Z",
	"contactOwnerId": "7d25baa7-6bdb-4ace-9e0c-e96dcf800593"
}
```

Resposta (Falha)

```bash
{
	"message": "You don't have permission to access this",
	"error": "Unauthorized",
	"statusCode": 401
}
```

3. Listagem de contatos

**GET /contacts**

Corpo da requisição

```bash
```

> headers: { Authorization: 'Bearer token' }

Resposta (Sucesso)

```bash
[
	{
		"id": "9eb7d6cf-8253-4cfa-94f5-6c5e5bb0a097",
		"name": "contato",
		"email": "contato@email.com",
		"number": "12345678910",
		"createdAt": "2024-02-26T11:24:35.953Z",
		"contactOwnerId": "7d25baa7-6bdb-4ace-9e0c-e96dcf800593"
	}
]
```

Resposta (Falha)

```bash
{
	"message": "Unauthorized",
	"statusCode": 401
}
```

4. Deleção de um contato

**DELETE /contacts/:id**

Corpo da requisição

```bash
```

> headers: { Authorization: 'Bearer token' }

Resposta (Sucesso)

> 204 No Content

Resposta (Falha)

```bash
{
	"message": "You don't have permission to access this",
	"error": "Unauthorized",
	"statusCode": 401
}
```

```bash
{
	"message": "Contact not found",
	"error": "Not Found",
	"statusCode": 404
}
```

### Autenticação

1. Login

**POST /login**

Corpo da requisição

```bash
{
  "email": "joao@email.com",
	"password": "senha123"
}
```

Resposta (Sucesso)

```bash
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlhdCI6MTcwODk0NjY2MSwiZXhwIjoxNzA4OTUwMjYxLCJzdWIiOiI3ZDI1YmFhNy02YmRiLTRhY2UtOWUwYy1lOTZkY2Y4MDA1OTMifQ.5-yCj9JQOXBhIfEK70gKfIsWijnhJqkx5_ETYwZyqhQ",
	"userId": "4e2b6c6d-c563-44fb-9575-9a755d56da58"
}
```

Resposta (Falha)

```bash
{
	"message": "Invalid e-mail or password",
	"error": "Unauthorized",
	"statusCode": 401
}
```

```bash
{
	"message": [
		"email must be an email",
		"email must be a string",
		"password should not be empty",
		"password must be a string"
	],
	"error": "Bad Request",
	"statusCode": 400
}
```