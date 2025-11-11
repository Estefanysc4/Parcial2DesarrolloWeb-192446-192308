<template>
  <div class="d-flex">
    <SidebarComponent />
    <div class="flex-grow-1">
      <NavbarComponent />
      <main class="p-4">
        <router-view />
      </main>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import SidebarComponent from '../components/SidebarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  components: { NavbarComponent, SidebarComponent, FooterComponent }
}
</script>
