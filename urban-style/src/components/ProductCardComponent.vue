<template>
  <div class="card h-100">
    <img :src="imageSrc" class="card-img-top" :alt="product.title" style="object-fit: cover; height: 220px;">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text mb-2" v-if="product.priceFormatted">{{ product.priceFormatted }}</p>
      <p class="card-text text-muted small" v-else>US${{ product.price }}</p>
      <p class="card-text text-truncate" v-if="product.description">{{ product.description }}</p>

      <div class="d-flex gap-2 mt-3">
        <button @click="add" class="btn btn-sm btn-primary flex-fill">Agregar</button>
        <button @click="viewDetails" class="btn btn-sm btn-outline-secondary">Ver</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: {
    product: { type: Object, required: true }
  },
  emits: ['add-to-cart', 'view-product'],
  computed: {
    imageSrc() {
      return this.product.localImage || this.product.image
    }
  },
  methods: {
    add() {
      // Emitir el producto tal cual (el padre creará/actualizará la entrada en el carrito)
      this.$emit('add-to-cart', this.product)
    },
    viewDetails() {
      this.$emit('view-product', this.product)
    }
  }
}
</script>

<style scoped>
.card-img-top { background: #f5f5f5; }
</style>
