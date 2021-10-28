<template>
  <div class="app-wrapper">
    <div class="menu-wrapper">
      <Menu />
    </div>
    <div class="content-wrapper">
      <router-view></router-view>
    </div> 
  </div>
  
</template>
<script>
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style lang="scss">
body {
  background: #f3f6fd;
}
.app-wrapper {
  display: grid;
  grid-template-columns: 100px 1fr;
}
</style>
