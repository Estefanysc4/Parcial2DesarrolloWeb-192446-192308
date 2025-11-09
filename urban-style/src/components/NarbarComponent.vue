<template>
  <nav class="navbar navbar-dark bg-dark px-4 d-flex justify-content-between align-items-center">
    <span class="navbar-brand mb-0 h1">Urban Style</span>

    <div class="d-flex align-items-center gap-3 text-white">
      <span v-if="usuario">👤 {{ usuario }}</span>
      <button class="btn btn-outline-light btn-sm" @click="logout">
        🚪 Cerrar sesión
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      usuario: "",
    };
  },
  mounted() {
    // Recuperar el usuario almacenado al iniciar sesión
    this.usuario = localStorage.getItem("usuario");
  },
  methods: {
    logout() {
      // Elimina el usuario del almacenamiento local
      localStorage.removeItem("usuario");

      // Redirige a la vista de login
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}
</style>
