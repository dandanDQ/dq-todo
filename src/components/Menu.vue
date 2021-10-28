<template>
  <div class="dq-menu">
    <div class="menu-item">
      <router-link to="/">象限</router-link>
    </div>
    <div class="menu-item">
      <router-link to="/todo-list">清单</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DQMenu',
};
</script>
<style lang="scss">
@font-face {
  font-family: miaomiao;
  src: url('../assets/FZSJ-MIAOMM.TTF')
}

.dq-menu {
  --menu-size: 80px;
  width: var(--menu-size);
  display: flex;
  flex-direction: column;
  font-family: miaomiao;
  font-weight: 700;
  .menu-item {
    background: #fff;
    height: var(--menu-size);
    line-height: var(--menu-size);
    text-align: center;
    border-radius: 10%;
    margin-bottom: 10px;
    box-shadow: 0 0 6px rgb(206, 206, 206);
    a {
      text-decoration: none;
      color: rgb(0, 0, 0);
    }
  }
}
</style>
