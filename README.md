# 🏠 ProyectoGuate Frontend

Interfaz de búsqueda de propiedades construida con Vue 3, Vite y TailwindCSS.

## 🚀 Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Crear .env.local
cp .env.example .env.local

# 3. Ejecutar servidor de desarrollo
npm run dev

# 4. Build para producción
npm run build

# 5. Preview de build
npm run preview
```

## 📋 Estructura del Proyecto

```
src/
├── main.js                 # Entry point
├── App.vue                 # Componente raíz
├── style.css              # Estilos globales
│
├── application/           # Lógica de aplicación
│   └── use-cases/
│       └── SearchPropertyUseCase.ts
│
├── domain/               # Modelos de negocio
│   └── repositories/
│       └── IPropertyRepository.ts
│
├── infrastructure/       # Adaptadores técnicos
│   └── adapters/
│       └── http/
│           └── PropertyHttpAdapter.ts
│
├── presentation/         # Componentes de UI
│   ├── App.vue
│   ├── components/       # Componentes reutilizables
│   ├── views/           # Vistas de página
│   ├── dialogs/         # Diálogos modales
│   └── lib/             # Funciones auxiliares
│
├── config/              # Configuración
│   └── api.ts          # Endpoints API
│
└── assets/             # Recursos estáticos
```

## 🏗️ Arquitectura

- **Hexagonal**: Separación clara entre capas
- **Componentes**: Vue 3 con `<script setup>`
- **Estilos**: TailwindCSS + componentes UI
- **API**: Integración con backend FastAPI

## 🔗 Variables de Entorno

```env
VITE_API_URL=http://localhost:8000
VITE_API_PREFIX=/api/v1
```

## 📦 Dependencias Principales

- **Vue 3**: Framework progresivo
- **Vite**: Build tool ultrarrápido
- **TailwindCSS**: Utilidades CSS
- **TypeScript**: Type safety

## 🛠️ Desarrollo

```bash
# Lint y fix
npm run lint

# Type check
npm run type-check
```

## 🐳 Docker

```bash
docker build -f Dockerfile -t proyecto-guate-frontend .
docker run -p 5173:80 proyecto-guate-frontend
```

## 📝 Licencia

MIT
