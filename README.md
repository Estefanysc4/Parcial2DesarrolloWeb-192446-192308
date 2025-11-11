# 👕 Urban Style

**Tipo de negocio:** Tienda de ropa urbana online  
**Framework:** Vue.js 3  
**Estilos:** Bootstrap 5.3  
**API externa:** FakeStore API  
**Autores:** [Tu nombre] – [Nombre del compañero si aplica]  
**Año:** 2025  

---

## 🧠 Descripción general del negocio y objetivo de la aplicación

**Urban Style** es una aplicación web desarrollada como parte del **segundo parcial de Desarrollo de Aplicaciones Web**.  
Representa una **tienda de ropa urbana** que permite a los usuarios iniciar sesión, navegar por un catálogo de productos, seleccionar los que deseen y gestionarlos dentro de un panel administrativo (Dashboard).

El objetivo principal de la aplicación es **demostrar el uso de modularización, componentización y consumo de una API externa en Vue 3**, siguiendo buenas prácticas de diseño responsivo con Bootstrap.

---

## 🧩 Implementación de la modularización

El proyecto se organizó de forma modular en las siguientes carpetas:
src/
│
├── components/ → Contiene los componentes reutilizables (Navbar, Sidebar, Footer, ProductCard).
├── views/ → Contiene las vistas principales (LoginView, DashboardView, ProductView).
├── router/ → Configura las rutas con vue-router.
├── services/ → Contiene el servicio apiService.js para consumir la API externa.
└── assets/ → Recursos gráficos como el logo de la tienda.


### 🔹 Componentes
- **NavbarComponent:** Muestra el nombre del negocio y un botón de cierre de sesión.
- **SidebarComponent:** Barra lateral de navegación con enlaces a las vistas.
- **FooterComponent:** Pie de página con derechos reservados.
- **ProductCardComponent:** Tarjeta individual para mostrar un producto (imagen, nombre, precio).

### 🔹 Vistas
- **LoginView:** Vista de inicio de sesión que valida usuarios desde un archivo `usuarios.json`.
- **DashboardView:** Vista principal que contiene el Navbar, Sidebar y área de contenido dinámico.
- **ProductView:** Vista de productos donde se listan, seleccionan y eliminan productos del catálogo.

### 🔹 Rutas (vue-router)
| Ruta | Descripción |
|------|--------------|
| `/login` | Vista de inicio de sesión |
| `/dashboard` | Panel principal |
| `/dashboard/productos` | Vista de productos |
  
Incluye **protección de rutas**: si no hay usuario autenticado, se redirige al login.

---

## 🌐 Ejemplo de consumo de la API externa

Se utilizó la **FakeStore API** para obtener productos reales simulados.

**Archivo:** `src/services/apiService.js`
```js
const API_URL = 'https://fakestoreapi.com/products'

export default {
  async getProducts() {
    const res = await fetch(API_URL)
    return await res.json()
  },
  async deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  }
}
Uso en la vista:
import apiService from "../services/apiService";
export default {
  data() { return { products: [] } },
  async mounted() {
    this.products = await apiService.getProducts();
  }
}

🔄 Ejemplo de comunicación entre componentes

Se implementó la comunicación por medio de props entre ProductView.vue y ProductCardComponent.vue.

En ProductView.vue:
<ProductCardComponent :product="p" />

En ProductCardComponent.vue:
<script>
export default {
  props: ['product']
}
</script>
Esto permite que cada tarjeta reciba los datos del producto desde la vista principal y se renderice dinámicamente.

🤝 Evidencia del trabajo colaborativo
Repositorio público de GitHub:
https://github.com/Estefanysc4/Parcial2DesarrolloWeb-192446-192308

Evidencia de colaboración:

Commits realizados por ambos integrantes.

Ramas utilizadas: main, dev.

Pull requests creados para integrar las funciones del login y del módulo de productos.

🧾 Referencias

Vue.js 3 Documentation

Bootstrap 5.3 Documentation