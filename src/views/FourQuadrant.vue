<template>
  <div class="four-quadrant-wrapper">
    <span>四象限管理</span>
    <div class="four-quadrant">
      <div class="box color-1">
        <span>重要不紧急</span>
        <todo-item v-for="(item, idx) in list10" :key="idx" :config="item" :idx="idx" :list="list10" @del-item="delItem"></todo-item>
      </div>
      <div class="box color-2">
        <span>重要且紧急</span>
      </div>
      <div class="box color-3">
        <span>不重要紧急</span>
      </div>
      <div class="box color-4">
        <span>不紧急不重要</span>
      </div>
    </div>
    <div class="add-item" @keyup.enter="addItem">
      <input type="text" placeholder="请输入待办事项" v-model="content">
      <button @click="addItem">+</button>
    </div>
  </div>
</template>
<script>
import TodoItem from '../components/TodoItem.vue'
export default {
  name: 'FourQuadrant',
  components: {
    TodoItem
  },
  data(){
    return {
      content: '',
      list10: [
        {
          content: '山有木兮木有枝',
          checked: false,
        },
        {
          content: '明月不谙离恨苦',
          checked: false,
        },
        {
          content: '距离隔不开，思念变成海',
          checked: false,
        }
        ],
      list11: [],
      list01: [],
      list00: []
    }
  },
  methods: {
    addItem(){

      if(!this.content) return
      const item = {
        content: this.content,
        checked: false
      }
      this.list10.push(item)
      this.content = ''
    },
    delItem(opt){
      opt.list.splice(opt.idx, 1)
    }
  }
}
</script>
<style scoped lang="scss">
@font-face {
  font-family: miaomiao;
  src: url('../assets/FZSJ-MIAOMM.TTF')
}
$cardWidth: 620px;
$cardHeight: 500px;
.four-quadrant-wrapper {
  width: $cardWidth;
  margin: auto;
  border-radius: 12px;
  background: #fff;
  font-family: miaomiao;
  line-height: 2em;
  padding: 12px;
  position: relative;
  .four-quadrant {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    box-sizing: border-box;
    width: $cardWidth;
    height: $cardHeight;
    margin: auto;
    .box {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      text-align: center;
      color: #555;

    }
    .color-1 {
      background: #fee4cb;
    }
    .color-2 {
      background: #e9e7fd;
    }
    .color-3 {
      background: #dbf6fd;
    }
    .color-4 {
      background: #ffd3e2;
    }
  }
  .add-item {
    background: #fff;
    border-radius: 15px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #fee4cb;
    margin: 10px 0;
    input {
      border: none;
      height: 40px;
      width: 90%;
      margin-left: 15px;
      border-radius: 15px;
      &:hover, &:focus-visible {
        outline: none;
      }
      
    }
    button {
      border-radius: 50%;
      border: none;
      width: 26px;
      height: 26px;
      &:focus-visible {
        outline: none;
      }
    }
  }
}
</style>
