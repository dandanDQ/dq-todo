<template>
  <div class="app-wrapper">
    <four-quadrant></four-quadrant>
  </div>
  
</template>

<script>
import FourQuadrant from './views/FourQuadrant.vue'

export default {
  name: 'App',
  components: {
    FourQuadrant
  }
}
</script>

<style lang="scss">
body {
  background: #f3f6fd;
}
</style>
