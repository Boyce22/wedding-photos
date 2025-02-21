# 📸 Aplicativo de Compartilhamento de Fotos - Casamento Gean & Mirian

Este projeto permite que os convidados compartilhem suas fotos do casamento de Gean e Mirian através de uma interface amigável, com armazenamento seguro na nuvem usando MEGA.

## 🚀 Funcionalidades

- Captura de fotos diretamente do dispositivo
- Upload de uma ou múltiplas fotos para a nuvem (MEGA)
- Criação automática de pastas organizadas por nome e data
- Interface intuitiva e moderna para compartilhamento

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **Armazenamento:** MEGA.nz (megajs)
- **Notificações:** react-hot-toast
- **Gerenciamento de estado:** useState, useRef

## 📂 Estrutura do Projeto

```
📁 wedding-photos
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

### 3️⃣ Configuração das variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto e adicione:
```env
EMAIL_CASAMENTO_NZ=seu_email@exemplo.com
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
4. Sua foto será armazenada com segurança!

## Licença

Este projeto está licenciado sob a **AGPL-3.0**. Veja o arquivo `LICENSE` para mais detalhes.

---
❤️ Obrigado por compartilhar esse momento especial! #GeanEMirian2025


