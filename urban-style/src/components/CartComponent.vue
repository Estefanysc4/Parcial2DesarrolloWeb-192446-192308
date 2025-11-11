<template>
  <div class="cart-panel p-3">
    <h5 class="mb-3">Carrito</h5>

    <div v-if="items.length === 0" class="text-muted">El carrito está vacío</div>

    <div v-else>
      <div v-for="item in items" :key="item.id" class="d-flex align-items-center mb-3">
        <img :src="item.image" alt="" style="width:64px; height:64px; object-fit:cover; border-radius:6px; margin-right:10px;">
        <div class="flex-fill">
          <div class="fw-semibold">{{ item.title }}</div>
          <div class="small text-muted">{{ formatCOP(item.priceCOP) }}</div>
          <div class="d-flex align-items-center gap-2 mt-2">
            <input type="number" min="1" v-model.number="item.qty" @change="onQtyChange(item)" style="width:72px" />
            <button class="btn btn-sm btn-outline-danger" @click="$emit('remove', item.id)">Eliminar</button>
          </div>
        </div>
      </div>

      <hr />

      <div class="d-flex justify-content-between align-items-center">
        <div class="fw-bold">Total:</div>
        <div class="fs-5 fw-bold">{{ formatCOP(total) }}</div>
      </div>

      <div class="mt-3">
        <button class="btn btn-success w-100" @click="$emit('checkout')">Finalizar compra</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartComponent',
  props: {
    items: { type: Array, required: true } // items [{id, title, priceCOP, qty, image}]
  },
  emits: ['remove', 'update-qty', 'checkout'],
  computed: {
    total() {
      return this.items.reduce((s, it) => s + (it.priceCOP * it.qty), 0)
    }
  },
  methods: {
    formatCOP(amount) {
      try {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount)
      } catch (e) {
        return `COP ${amount.toLocaleString()}`
      }
    },
    onQtyChange(item) {
      if (item.qty < 1) item.qty = 1
      this.$emit('update-qty', { id: item.id, qty: item.qty })
    }
  }
}
</script>

<style scoped>
.cart-panel {
  width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}
</style>
