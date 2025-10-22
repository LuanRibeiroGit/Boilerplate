# Boilerplate - NestJS + Fastify + MongoDB

Este é um boilerplate moderno para desenvolvimento utilizando **NestJS**, **Fastify**, **MongoDB**.  
O objetivo é acelerar a criação de projetos, com uma base sólida, segura e escalável.

---

## 🚀 Tecnologias

### Backend
- [NestJS](https://nestjs.com/) – Framework Node.js moderno para APIs escaláveis
- [Fastify](https://www.fastify.io/) – Servidor web rápido e leve
- [MongoDB](https://www.mongodb.com/) – Banco de dados NoSQL
- [Mongoose](https://mongoosejs.com/) – ODM para modelagem de dados
- JWT Authentication & Refresh Tokens
- Swagger API Documentation

### Ferramentas
- Docker (para containerização)
- Git & GitHub
- Postman (para testes de API)
- VSCode (editor recomendado)

---

## 📦 Estrutura do Projeto

```plaintext
boilerplater
├── package.json
└── src
    ├── app.controller.spec.ts
    ├── app.controller.ts
    ├── app.module.ts
    ├── app.service.ts
    ├── common
    │   ├── filters
    │   │   └── http-exception.filter.ts
    │   └── interceptors
    │       └── discord
    │           ├── discord-logger.interceptor.ts
    │           └── discord.service.ts
    ├── main.ts
    ├── modules
    │   ├── auth
    │   │   ├── auth.controller.spec.ts
    │   │   ├── auth.controller.ts
    │   │   ├── auth.module.ts
    │   │   ├── auth.service.spec.ts
    │   │   ├── auth.service.ts
    │   │   ├── dto
    │   │   ├── guard
    │   │   └── schema
    │   └── users
    │       ├── dto
    │       ├── schema
    │       ├── users.controller.spec.ts
    │       ├── users.controller.ts
    │       ├── users.module.ts
    │       ├── users.schema.ts
    │       ├── users.service.spec.ts
    │       └── users.service.ts
```

⚡ Funcionalidades

**Backend**
- CRUD completo de usuários
- Autenticação JWT com Refresh Tokens
- Hash de senhas com bcrypt
- Proteção de rotas via Guards
- Validação de dados via DTOs
- Swagger para documentação da API

📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/LuanRibeiroGit/Boilerplate.git
```

Entre no diretório do boilerplate:

```bash
cd boilerplate
```

Instale as dependências:

```bash
npm install
```

Configure variáveis de ambiente criando um arquivo `.env`:

```env
Ex: .env.example

```

Execute o projeto:

```bash
npm run start:dev
```

Acesse a API no navegador:

```arduino
http://localhost:3000
```

📄 Documentação da API

usando Swagger, acesse:

```bash
http://localhost:3000/api/docs
```
Ele contém todas as rotas com exemplos de request/response.

🛠 Comandos úteis

| Comando           | Descrição                               |
|-------------------|-----------------------------------------|
| `npm run start`   | Inicia o servidor em produção           |
| `npm run start:dev`| Inicia o servidor em modo de desenvolvimento |
| `npm run build`   | Compila o projeto                       |
| `npm run lint`    | Verifica a formatação do código         |
| `npm run test`    | Executa os testes                       |

💡 Boas práticas incluídas
- Separação de módulos e responsabilidades
- Validação de entrada via DTO
- Tratamento de erros centralizado
- Uso de guards para autenticação
- Suporte a múltiplos ambientes via .env
- Estrutura pronta para escalar novos módulos


🔗 Contato

Luan Ribeiro – GitHub
Email: luansoftwareengineer@gmail.com