<template>
  <div class="col-md-4 mb-4">
    <div class="card h-100 shadow-sm">
      <img :src="product.image" class="card-img-top" alt="Imagen del producto" />
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text text-muted">${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product']
}
</script>
