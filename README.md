# 🏠 aiPropertySearch - Frontend

Interfaz moderna de búsqueda de propiedades con IA. Construida con Vue 3, Vite y TailwindCSS.

## ✨ Características

- 🤖 Búsqueda por lenguaje natural (traducida a SQL por IA)
- 💻 Interfaz moderna y responsive
- 📊 Visualización de SQL generado
- ⚡ Rendimiento optimizado con Vite
- 🎨 Diseño con TailwindCSS
- 🏗️ Arquitectura hexagonal

## 📦 Stack Tecnológico

- **Vue 3** - Framework JavaScript progresivo
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Utilidades CSS
- **TypeScript** - Type safety
- **Nginx** - Servidor web en producción (Docker)

## 📋 Requisitos

### Para Desarrollo Local
- **Node.js** 18+
- **npm** o **pnpm**

### Para Docker
- **Docker** 20.10+

## 🚀 Instalación

### Opción 1: Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de variables de entorno
cp .env.example .env.local

# 3. Configurar API backend
# Editar .env.local:
VITE_API_URL=http://localhost:8000
VITE_API_PREFIX=/api/v1

# 4. Ejecutar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

### Opción 2: Docker

```bash
# Build de la imagen
docker build -t aipropertyseach-frontend .

# Ejecutar contenedor
docker run -p 80:80 aipropertyseach-frontend
```

El frontend estará disponible en: **http://localhost**

## 📝 Estructura del Proyecto

```
src/
├── main.js                          # Entry point
├── App.vue                          # Componente raíz
├── style.css                        # Estilos globales
│
├── application/                     # Casos de uso (Use Cases)
│   └── use-cases/
│       └── SearchPropertyUseCase.ts # Lógica de búsqueda
│
├── domain/                          # Modelos de negocio
│   └── repositories/
│       └── IPropertyRepository.ts   # Interfaz del repositorio
│
├── infrastructure/                  # Adaptadores técnicos
│   └── adapters/
│       └── http/
│           └── PropertyHttpAdapter.ts  # Adapter HTTP
│
├── presentation/                    # Componentes Vue (UI)
│   ├── App.vue
│   ├── components/
│   │   ├── SearchBar.vue           # Barra de búsqueda
│   │   ├── PropertyList.vue        # Listado de propiedades
│   │   ├── PropertyCard.vue        # Tarjeta de propiedad
│   │   ├── LoadingSpinner.vue      # Indicador de carga
│   │   ├── ErrorPopup.vue          # Popup de errores
│   │   └── ui/                     # Componentes UI reutilizables
│   ├── views/
│   │   └── HomeView.vue            # Vista principal
│   ├── dialogs/
│   │   ├── GenericDialog.vue       # Diálogo genérico
│   │   └── SqlViewerDialog.vue     # Visor de SQL
│   └── lib/
│       └── cn.ts                   # Funciones auxiliares
│
├── config/
│   └── api.ts                      # Configuración de API
│
└── assets/                         # Recursos estáticos
```

## 🔧 Desarrollo

### Comandos Disponibles

```bash
# Servidor de desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview local del build
npm run preview

# Lint (si está configurado)
npm run lint

# Type check (si está configurado)
npm run type-check
```

### Variables de Entorno (.env.local)

```env
# URL del backend API
VITE_API_URL=http://localhost:8000

# Prefijo de la API
VITE_API_PREFIX=/api/v1
```

## 🎯 Ejemplos de Uso

1. **Abre la aplicación** en http://localhost:5173
2. **Escribe en la barra de búsqueda:**
   - "Casas de 3 habitaciones en zona 10"
   - "Departamentos baratos menores a Q100,000"
   - "Propiedades cerca de colegio y parque"
   - "Terrenos grandes en zona 18"
3. **Presiona Enter o haz clic en Buscar**
4. **Visualiza:**
   - La consulta SQL generada
   - Las propiedades encontradas
   - Detalles completos de cada propiedad

## 🏗️ Arquitectura Hexagonal

```
Presentation (Vue Components)
         ↓
Application (Use Cases)
         ↓
Domain (Business Logic)
         ↓
Infrastructure (HTTP Adapter)
         ↓
External (Backend API)
```

Esta arquitectura garantiza:
- ✅ Separación clara de responsabilidades
- ✅ Fácil testing
- ✅ Independencia de frameworks
- ✅ Escalabilidad

## 🔌 Integración con Backend

El frontend se comunica con el backend mediante:

**Endpoint:** `POST /api/v1/search`

**Request:**
```json
{
  "query": "Casas de 3 habitaciones en zona 10"
}
```

**Response:**
```json
{
  "sql": "SELECT * FROM propiedades WHERE habitaciones = 3 AND zona_administrativa LIKE '%zona 10%'",
  "results": [
    {
      "id": 1,
      "titulo": "Casa moderna",
      "precio": 250000,
      "habitaciones": 3,
      "banos": 2,
      "area_m2": 150,
      "ubicacion": "Zona 10, Guatemala",
      "zona_administrativa": "zona 10",
      "amenidades_tipos": "colegio,parque",
      "amenidades_cercanas": "Colegio Maya (2km), Parque Central (1.5km)"
    }
  ]
}
```

## 📦 Dependencias Principales

```json
{
  "vue": "^3.x.x",
  "vite": "^5.x.x",
  "tailwindcss": "^3.x.x",
  "typescript": "^5.x.x"
}
```

Ver `package.json` para lista completa.

## 🐳 Docker

### Build

```bash
docker build -t aipropertyseach-frontend:latest .
```

### Run

```bash
docker run -d \
  --name aipropertyseach-frontend \
  -p 80:80 \
  -e VITE_API_URL=http://localhost:8000 \
  aipropertyseach-frontend:latest
```

### Ver logs

```bash
docker logs -f aipropertyseach-frontend
```

## 🔍 Solución de Problemas

### El frontend no conecta al backend

```bash
# Verificar que el backend está corriendo
curl http://localhost:8000/health

# Verificar la URL en .env.local
cat .env.local | grep VITE_API_URL

# Revisar la consola del navegador (F12)
```

### Puerto 5173 en uso

```bash
# Ver qué proceso usa el puerto
lsof -i :5173

# Usar otro puerto
npm run dev -- --port 3000
```

### Build no funciona

```bash
# Limpiar node_modules
rm -rf node_modules package-lock.json
npm install

# Reconstruir
npm run build
```

## 📊 Performance

- ✅ Code splitting automático con Vite
- ✅ Tree shaking para reducir bundle size
- ✅ Lazy loading de componentes
- ✅ TailwindCSS purged (solo clases usadas)

## 📄 Licencia

MIT

## 🤝 Contacto

**Autor:** Frank Orozco  
**Email:** frank.orozco.11.87@gmail.com

---

**Estado:** ✅ Funcional | Actualmente en desarrollo  
**Última actualización:** Noviembre 2025
