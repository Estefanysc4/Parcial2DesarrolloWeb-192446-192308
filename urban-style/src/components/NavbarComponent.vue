<template>
  <nav class="navbar">
    <h1 class="logo">Tienda Urbana</h1>
    <input
      type="text"
      v-model="searchQuery"
      @input="emitSearch"
      placeholder="Buscar producto..."
      class="search-bar"
    />
    <button @click="$emit('open-cart')" class="cart-btn">
      🛒 <span v-if="count > 0" class="cart-count">{{ count }}</span>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  color: white;
}

.logo {
  margin: 0;
  font-size: 1.4rem;
  color: #00c4ff;
}

.search-bar {
  width: 250px;
  padding: 6px 10px;
  border-radius: 5px;
  border: none;
  outline: none;
}

.cart-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  position: relative;
  cursor: pointer;
}

.cart-count {
  background: #ff4081;
  border-radius: 50%;
  color: white;
  padding: 2px 6px;
  font-size: 0.75rem;
  position: absolute;
  top: -6px;
  right: -10px;
}
</style>
