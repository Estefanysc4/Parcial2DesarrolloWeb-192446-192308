<template>
  <div class="container">
    <h2 class="mb-4 text-center">🛍️ Productos Urban Style</h2>

    <div class="row">
      <!-- Lista de productos disponibles -->
      <div class="col-md-8">
        <h4>Catálogo de productos</h4>
        <div class="row">
          <div
            v-for="p in products"
            :key="p.id"
            class="col-md-4 mb-4 d-flex align-items-stretch"
          >
            <div class="card shadow-sm w-100">
              <img
                :src="p.image"
                class="card-img-top"
                alt="Producto"
                style="height: 180px; object-fit: contain;"
              />
              <div class="card-body text-center">
                <h6 class="card-title">{{ p.title }}</h6>
                <p class="card-text text-muted">${{ p.price }}</p>
                <button
                  class="btn btn-dark btn-sm"
                  :disabled="isSelected(p)"
                  @click="selectProduct(p)"
                >
                  {{ isSelected(p) ? '✔ Seleccionado' : 'Seleccionar' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de productos seleccionados -->
      <div class="col-md-4">
        <h4>🧾 Mis seleccionados</h4>
        <div
          v-if="selectedProducts.length === 0"
          class="alert alert-secondary"
        >
          No has seleccionado ningún producto aún.
        </div>

        <ul class="list-group">
          <li
            v-for="(p, index) in selectedProducts"
            :key="p.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{{ p.title }}</span>
            <button
              class="btn btn-sm btn-danger"
              @click="removeProduct(index)"
            >
              🗑️ Quitar
            </button>
          </li>
        </ul>

        <div v-if="selectedProducts.length > 0" class="mt-3 text-center">
          <p><strong>Total:</strong> ${{ totalPrice }}</p>
          <button class="btn btn-success w-100" @click="confirmSelection">
            Confirmar selección
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "../services/apiService";

export default {
  data() {
    return {
      products: [],
      selectedProducts: [],
    };
  },
  async mounted() {
    this.products = await apiService.getProducts();
  },
  computed: {
    totalPrice() {
      return this.selectedProducts
        .reduce((sum, p) => sum + p.price, 0)
        .toFixed(2);
    },
  },
  methods: {
    selectProduct(product) {
      this.selectedProducts.push(product);
    },
    removeProduct(index) {
      this.selectedProducts.splice(index, 1);
    },
    isSelected(product) {
      return this.selectedProducts.some((p) => p.id === product.id);
    },
    confirmSelection() {
      alert("Has confirmado tu selección de productos. 🛍️");
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 0.9rem;
  font-weight: 600;
}
</style>
