# 🌸 Hanami Text Formatter

> Formatador de texto premium com alta acessibilidade e design moderno

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Características

- 🎨 **Design System Hanami**: Interface moderna com Poppins, cores vibrantes (#5481FA, #22307F)
- ♿ **Acessibilidade Completa**: ARIA labels em PT-BR, navegação por teclado, focus management
- 🔄 **5 Transformações de Texto**:
  - MAIÚSCULAS
  - minúsculas
  - Primeira Letra em Maiúscula
  - Remover Espaços Extras
  - Limpar Tudo
- 📊 **Estatísticas em Tempo Real**: Palavras, caracteres, tempo de leitura
- 💾 **Persistência Automática**: Salva automaticamente no localStorage
- 🎭 **Animações Suaves**: Framer Motion para transições elegantes
- 📱 **Responsivo**: Mobile-first, funciona em todos os dispositivos
- 🌐 **100% em Português Brasileiro**: Interface e documentação completas

## 🚀 Tech Stack

- **Framework**: React 18.3 + Vite 6.0
- **Language**: TypeScript 5.6 (Strict mode)
- **Styling**: Tailwind CSS 3.4 + shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build**: Vite (ES Modules, Fast HMR)

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ e npm/yarn
- Git

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/hanami-text-formatter.git
cd hanami-text-formatter
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
```

4. **Abra no navegador**

Acesse [http://localhost:5173](http://localhost:5173)

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção em /dist
npm run preview      # Preview do build de produção

# Linting
npm run lint         # Executa ESLint
```

## 📁 Estrutura do Projeto

```
hanami/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── input.tsx    # Com validação
│   │   │   └── toast.tsx    # Notificações
│   │   └── TextEditor.tsx   # Componente principal
│   ├── lib/
│   │   └── utils.ts         # Utilitários (cn)
│   ├── index.css            # Estilos globais + Design System
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Sistema de Design Hanami

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| **Primary** | `#5481FA` | Botões principais, links, focus |
| **Secondary** | `#22307F` | Botões secundários, header gradient |
| **Background** | `#F8FAFF` | Fundo da página |
| **Card** | `#FFFFFF` | Cards e superfícies |

### Tipografia

- **Fonte**: Poppins (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700

### Border Radius

- **Padrão**: 12px (0.75rem)
- Estilo: Soft & Friendly

## ♿ Acessibilidade

### Navegação por Teclado

- **Tab**: Navega entre elementos
- **Enter/Space**: Ativa botões
- **Esc**: Fecha modais

### ARIA Labels

Todos os elementos interativos têm labels descritivos em PT-BR:

```tsx
aria-label="Converter texto para maiúsculas"
aria-label="Editor de texto principal"
aria-describedby="text-stats"
```

### Screen Readers

- Suporte completo para leitores de tela
- Feedback de estado (`role="status"`, `aria-live="polite"`)
- Estrutura semântica HTML5

## 🌐 Deploy

### Vercel (Recomendado)

1. **Instale a CLI do Vercel**

```bash
npm i -g vercel
```

2. **Faça login**

```bash
vercel login
```

3. **Deploy**

```bash
vercel
```

4. **Deploy para produção**

```bash
vercel --prod
```

### Netlify

1. **Instale a CLI do Netlify**

```bash
npm i -g netlify-cli
```

2. **Faça login**

```bash
netlify login
```

3. **Deploy**

```bash
netlify deploy --prod
```

### GitHub Pages

1. **Adicione ao `vite.config.ts`**

```typescript
export default defineConfig({
  base: '/nome-do-repositorio/',
  // ...
})
```

2. **Build e deploy**

```bash
npm run build
npx gh-pages -d dist
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_APP_NAME=Hanami Text Formatter
VITE_APP_VERSION=1.0.0
```

### Otimizações

O projeto já inclui:

- ✅ Code splitting automático (Vite)
- ✅ Tree shaking
- ✅ Minificação
- ✅ Compressão gzip

## 📝 Funcionalidades Futuras

- [ ] Toast Notifications para feedback de cópia
- [ ] Dark Mode
- [ ] Histórico de alterações (Ctrl+Z)
- [ ] Exportar como TXT/DOCX
- [ ] Análise de legibilidade
- [ ] PWA (Progressive Web App)
- [ ] Mais transformações de texto

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para máxima acessibilidade

---

**Hanami Text Formatter** - Formatação de texto com excelência 🌸
