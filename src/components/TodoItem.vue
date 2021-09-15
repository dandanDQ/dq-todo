<template>
  <div class="todo-item" :class="{'checked-item': checked }">
    <span class="check" @click="checkItem"></span>
    {{config.content}}
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
  data() {
    return {
      checked: false
    }
  },
  mounted() {
    this.checked = this.config.checked || false
  },
  methods: {
    delItem() {
      this.$emit('del-item', {
        idx: this.idx,
        list: this.list
      })
    },
    checkItem() {
      this.checked = !this.checked
      const data = {
        config: this.config,
        checked :this.checked
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
}
</style>
