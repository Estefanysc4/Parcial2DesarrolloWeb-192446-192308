<template>
  <div class="login-container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%;">
      <div class="text-center mb-3">
        <img src="../assets/logo.png" alt="Urban Style" width="80" />
        <h3 class="mt-2 fw-bold">Urban Style</h3>
        <p class="text-muted mb-0">Inicio de sesión</p>
      </div>

      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input
            type="text"
            v-model="user"
            class="form-control"
            placeholder="Ingresa tu usuario"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="btn btn-dark w-100 mt-2">
          🔐 Iniciar Sesión
        </button>
      </form>

      <p class="text-center text-muted mt-3 mb-0" style="font-size: 0.85rem;">
        *Solo con fines educativos*
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const res = await fetch("/usuarios.json");
        const usuarios = await res.json();

        const valido = usuarios.find(
          (u) => u.user === this.user && u.password === this.password
        );

        if (valido) {
          // Guardamos sesión temporal (opcional)
          localStorage.setItem("usuario", this.user);
          this.$router.push("/dashboard/productos");
        } else {
          this.error = "Usuario o contraseña incorrectos.";
        }
      } catch (err) {
        this.error = "Error al cargar usuarios.json";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background: linear-gradient(135deg, #f3f3f3, #e8e8e8);
}

.card {
  border-radius: 15px;
  background-color: white;
}

.btn-dark {
  font-weight: 600;
  letter-spacing: 0.5px;
}

img {
  border-radius: 10px;
}
</style>
