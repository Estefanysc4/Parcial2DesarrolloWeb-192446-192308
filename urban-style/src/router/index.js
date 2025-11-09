import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProductView from "../views/ProductView.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginView },
  {
    path: "/dashboard",
    component: DashboardView,
    children: [
      { path: "productos", component: ProductView },
    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔒 Protección de rutas
router.beforeEach((to, from, next) => {
  const usuario = localStorage.getItem("usuario");
  if (to.meta.requiresAuth && !usuario) {
    next("/login");
  } else {
    next();
  }
});

export default router;
