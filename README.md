# Clínica Frontend

Frontend da aplicação web para gestão de pacientes de uma clínica de saúde integrativa.

A interface foi desenvolvida com foco em simplicidade e usabilidade, permitindo que usuários sem conhecimento técnico consigam gerenciar pacientes de forma rápida e intuitiva.

---

## 📌 Objetivo do projeto

O frontend foi desenvolvido para oferecer uma interface simples e eficiente para gestão de pacientes, substituindo processos manuais por uma experiência digital acessível e organizada.


---

## 🌐 Deploy

A aplicação está disponível em:

👉 https://clinica-frontend-rust.vercel.app

---

## 📌 Funcionalidades

* Visualizar lista de pacientes
* Cadastrar novos pacientes
* Editar informações existentes
* Excluir pacientes
* Navegação simples entre telas (lista, criação e edição)
* Feedback visual de sucesso/erro nas ações

---

## 🛠 Tecnologias utilizadas

* React
* TypeScript
* Vite
* Styled-components
* Axios

---

## ▶️ Como rodar o projeto localmente

### 1. Clonar o repositório

```bash id="y6p2xk"
git clone <https://github.com/Joao0310/clinica-frontend.git>
cd <frontend>
```

### 2. Instalar dependências

```bash id="q4l9sn"
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env id="b8z1rt"
VITE_API_URL=http://localhost:5000
```

> Essa variável define a URL do backend que o frontend irá consumir.

---

### 4. Rodar o projeto

```bash id="f3n7kp"
npm run dev
```

A aplicação estará disponível em:
👉 http://localhost:5173

---

## 🔗 Integração com o backend

O frontend consome a API do backend para realizar todas as operações de CRUD de pacientes.

A URL da API é configurada via variável de ambiente.

### Ambiente local

```bash
VITE_API_URL=http://localhost:5000

---

## 🗂 Estrutura do projeto

```id="u9x3zw"
src/
├── components/   # Componentes reutilizáveis (ex: formulários)
├── pages/        # Páginas principais da aplicação
├── services/     # Comunicação com a API (Axios)
├── types/        # Tipagens TypeScript
├── App.tsx       # Componente principal
└── main.tsx      # Ponto de entrada da aplicação
```

