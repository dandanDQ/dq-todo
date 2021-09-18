<template>
  <div class="todo-item" :class="{'checked-item': config.checked }">
    <span class="check" @click="checkItem"></span>
    <input class="item-input" type="text" v-model="config.content">
    <span class="close" @click="delItem"></span>
  </div>
</template>
<script>
export default {
  name: 'TodoItem',
  props: {
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    idx: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: ()=>{
        return []
      }
    },
  },
  methods: {
    delItem() {
      this.$emit('del-item', {
        idx: this.idx,
        list: this.list
      })
    },
    checkItem() {
      const data = {
        config: this.config,
      }
      this.$emit('checked-item', data)
    }
  }
}
</script>
<style scoped lang="scss">
.todo-item {
  text-align: left;
  padding: 0 10px;
  color: #555;
  border-radius: 4px;
  margin: 6px;
  background: rgba(255, 255, 255, 0.5);
  .close {
    float: right;
    &::before {
      content: '\2716';
      opacity: 0.2;
    }
    &:hover::before {
      opacity: 1;
      color: #ed5a65;
    }
  }
  .check {
    &::before {
      content: '\2713';
      opacity: 0.2;
    }
    &:hover::before {
      color: #1ba784;
      opacity: 1;
    }
  }
  .item-input {
    outline: none;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    font: inherit;
    width: 90%;
  }

}
.checked-item {
  color: rgb(165, 165, 165);
  .check {
    color: #1ba784;
    position: relative;
    &::before {
      content: '\2713';
      opacity: 1;
    }
  }
  .item-input {
    color: rgb(165, 165, 165);
  }
}
</style>
