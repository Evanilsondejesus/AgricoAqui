

## Da start no projeto 
```
node server.js
```
## 📚 Biblioteca da API — Descrição das Tecnologias Utilizadas


A API foi desenvolvida com foco em **segurança, organização, escalabilidade e integração com banco de dados**, utilizando as seguintes bibliotecas:

---

### 🔹 Sequelize

ORM (Object-Relational Mapping) para Node.js.

O **Sequelize** permite manipular o banco de dados utilizando JavaScript em vez de escrever SQL puro. Ele facilita:

* Criação e gerenciamento de **models**
* Definição de **relacionamentos** (1:N, N:N)
* Migrations e Seeds
* Validações automáticas
* Consultas otimizadas

Ele torna o código mais organizado, reutilizável e seguro.

---

### 🔹 mysql2

Driver de conexão com banco de dados MySQL.

O **mysql2** é responsável por realizar a conexão entre a aplicação e o banco MySQL.
Ele oferece:

* Alta performance
* Suporte a Promises
* Compatibilidade com Sequelize
* Execução de queries seguras

---

### 🔹 cors

Middleware de segurança para requisições externas.

O **CORS (Cross-Origin Resource Sharing)** permite que a API seja acessada por aplicações front-end hospedadas em outros domínios, controlando quais origens podem consumir a API.

Essencial para integração com React, Vue, Angular ou outros front-ends.

---

### 🔹 dotenv

Gerenciamento de variáveis de ambiente.

O **dotenv** permite armazenar informações sensíveis em um arquivo `.env`, como:

* Senha do banco
* Chave secreta JWT
* Porta do servidor

Isso aumenta a segurança e evita expor dados confidenciais no código.

---

### 🔹 multer

Upload de arquivos.

O **multer** é utilizado para:

* Upload de imagens
* Armazenamento de arquivos no servidor
* Controle de tipo e tamanho de arquivos

Muito útil para APIs que trabalham com cadastro de produtos, fotos de perfil, documentos etc.

---

### 🔹 cookie-parser

Leitura e manipulação de cookies.

O **cookie-parser** permite:

* Ler cookies enviados pelo navegador
* Armazenar tokens de autenticação
* Trabalhar com sessões baseadas em cookies

---

### 🔹 bcrypt

Criptografia de senhas.

O **bcrypt** é utilizado para:

* Gerar hash seguro de senhas
* Comparar senha digitada com hash armazenado
* Proteger credenciais contra vazamentos

Ele adiciona uma camada essencial de segurança na autenticação.

---

### 🔹 express

Framework principal da API.

O **Express** é o núcleo da aplicação.
Responsável por:

* Criar rotas (GET, POST, PUT, DELETE)
* Middleware
* Tratamento de requisições e respostas
* Organização da estrutura da API

É leve, rápido e amplamente utilizado no mercado.

---

### 🔹 jsonwebtoken

Autenticação via Token (JWT).

O **jsonwebtoken (JWT)** é usado para:

* Gerar tokens de autenticação
* Validar usuários logados
* Criar rotas protegidas
* Controlar acesso à API

Permite autenticação stateless (sem sessão no servidor).

---

## 🏗️ Conclusão

Essa combinação de bibliotecas permite que a API seja:

* 🔐 Segura (bcrypt + JWT + dotenv)
* 📦 Organizada (Sequelize + Express)
* 🌍 Integrável com front-end (CORS)
* 📂 Preparada para upload de arquivos (multer)
* 🗄️ Conectada a banco MySQL (mysql2)

É uma base sólida para projetos profissionais e escaláveis.
