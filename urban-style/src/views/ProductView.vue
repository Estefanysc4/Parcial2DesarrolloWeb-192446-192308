<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Ropa Urbana</h2>
      <div>
        <button class="btn btn-outline-primary me-2" @click="toggleCart">
          Carrito ({{ cartItemCount }})
        </button>
        <button class="btn btn-outline-secondary" @click="refresh">Actualizar</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-lg-9">
        <div v-if="loading">Cargando productos...</div>
        <div v-else class="row g-3">
          <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCardComponent
              :product="product"
              @add-to-cart="addToCart"
            />
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-3" v-show="cartVisible">
        <CartComponent
          :items="cart"
          @remove="removeFromCart"
          @update-qty="updateQty"
          @checkout="checkout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/apiService'
import ProductCardComponent from '@/components/ProductCardComponent.vue'
import CartComponent from '@/components/CartComponent.vue'

export default {
  name: 'ProductView',
  components: { ProductCardComponent, CartComponent },
  data() {
    return {
      products: [],
      loading: true,
      cart: [], // { id, title, priceCOP, qty, image }
      cartVisible: true
    }
  },
  computed: {
    cartItemCount() {
      return this.cart.reduce((s, it) => s + it.qty, 0)
    }
  },
  async mounted() {
    await this.loadProducts()
    // Intentar restaurar carrito si existe en localStorage
    const saved = localStorage.getItem('cart_v1')
    if (saved) {
      try { this.cart = JSON.parse(saved) } catch (e) { this.cart = [] }
    }
  },
  methods: {
    async loadProducts() {
      this.loading = true
      try {
        const prods = await apiService.getProducts()

        const localImages = [
          'https://i.pinimg.com/736x/89/07/a4/8907a4779b168cad870bbfd520c63531.jpg',
          'https://thefashionglobe.com/wp-content/uploads/2024/10/urban-essential-clothes.jpeg',
          'https://i.pinimg.com/736x/c1/95/0d/c1950d704b1da97e581a2dd74612f9ab.jpg',
          'https://i.pinimg.com/474x/86/38/bd/8638bd2a16366db54299fabce631f97a.jpg',
          'https://i.pinimg.com/736x/8f/bc/58/8fbc58618316dc1310528eee5fe512a4.jpg',
          'https://i.pinimg.com/474x/14/ac/7b/14ac7bd9f2760bf644512a06b08cf4a1.jpg'
        ]

        this.products = prods.map((p, i) => {
          const idx = i % localImages.length
          return { ...p, localImage: localImages[idx] }
        })
      } catch (e) {
        console.error('Error cargando productos', e)
      } finally {
        this.loading = false
      }
    },

    addToCart(product) {
      // Buscar si está en carrito
      const existing = this.cart.find(c => c.id === product.id)
      if (existing) {
        existing.qty += 1
      } else {
        this.cart.push({
          id: product.id,
          title: product.title,
          priceCOP: product.priceCOP || Math.round((product.price || 0) * 4700),
          qty: 1,
          image: product.localImage || product.image
        })
      }
      this.saveCart()
    },

    removeFromCart(id) {
      this.cart = this.cart.filter(i => i.id !== id)
      this.saveCart()
    },

    updateQty({ id, qty }) {
      const item = this.cart.find(i => i.id === id)
      if (item) {
        item.qty = qty
        if (item.qty <= 0) this.removeFromCart(id)
        else this.saveCart()
      }
    },

    toggleCart() {
      this.cartVisible = !this.cartVisible
    },

    saveCart() {
      localStorage.setItem('cart_v1', JSON.stringify(this.cart))
    },

    checkout() {
      // Acción simple de demo: limpiar carrito y mostrar confirmación
      alert(`Gracias por tu compra. Total: ${this.formatCOP(this.cart.reduce((s, i) => s + i.priceCOP * i.qty, 0))}`)
      this.cart = []
      this.saveCart()
    },

    refresh() {
      this.loadProducts()
    },

    formatCOP(amount) {
      try {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount)
      } catch (e) {
        return `COP ${amount.toLocaleString()}`
      }
    }
  }
}
</script>

<style scoped>
/* Ajustes responsivos: el panel del carrito se oculta en pantallas pequeñas si user quiere */
@media (max-width: 992px) {
  .col-lg-3[v-show] { display: none; }
}
</style>
