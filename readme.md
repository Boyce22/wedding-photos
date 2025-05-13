
# 📸 Aplicativo de Compartilhamento de Fotos para Eventos

Este projeto permite que participantes de eventos compartilhem suas fotos de forma simples e segura, utilizando uma interface amigável e armazenamento em nuvem via MEGA.

## 🚀 Funcionalidades

* Captura de fotos diretamente do dispositivo
* Upload de uma ou múltiplas fotos para a nuvem (MEGA)
* Criação automática de pastas organizadas por nome e data
* Interface intuitiva e moderna para compartilhamento de imagens

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React, Next.js, Tailwind CSS
* **Backend:** Next.js API Routes

## 📂 Estrutura do Projeto

```
📁 event-photos
│-- 📂 components
│   │-- 📄 user-form.tsx
│-- 📂 api
│   │-- 📄 upload.ts (Gerencia uploads para MEGA)
│-- 📄 app.tsx (Componente principal)
│-- 📄 README.md
```

## 🔧 Configuração e Instalação

### 1️⃣ Clone o repositório:

```bash
$ git clone https://github.com/seu-usuario/seu-repositorio.git
$ cd seu-repositorio
```

### 2️⃣ Instale as dependências:

```bash
$ npm install
# ou
$ yarn install
```

### 3️⃣ Configure as variáveis de ambiente:

Crie um arquivo `.env.local` na raiz do projeto e adicione:

```env
EMAIL_MEGA_NZ=seu_email@exemplo.com
PASSWORD_MEGA_NZ=sua_senha
```

### 4️⃣ Inicialize o servidor:

```bash
$ npm run dev
# ou
$ yarn dev
```

Acesse no navegador: `http://localhost:3000`

## 📤 Como Usar

1. Acesse a aplicação.
2. Tire uma foto ou selecione imagens da galeria.
3. Confirme e clique em "Enviar Foto".
4. As fotos serão armazenadas com segurança e organizadas automaticamente.

## 📄 Licença

Este projeto está licenciado sob a **AGPL-3.0**. Consulte o arquivo `LICENSE` para mais informações.

---

📷 Ideal para casamentos, aniversários, confraternizações e outros eventos onde cada memória importa.

---
