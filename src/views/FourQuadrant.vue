<template>
  <div class="four-quadrant-wrapper">
    <span>四象限管理</span>
    <div class="four-quadrant">
      <div class="box" v-for="conf in todoList" :key="conf.id" :style="{background: conf.color}">
        <span>{{conf.label}}</span>
        <todo-item v-for="(item, idx) in conf.list" :key="idx" :config="item" :idx="idx" :list="conf.list" @del-item="delItem"></todo-item>
      </div>
    </div>
    <div class="add-item" @keyup.enter="addItem">
      <input type="text" placeholder="请输入待办事项" v-model="content">
      <span class="color" @click="changeCur" :style="{background: selectedList.color}"></span>
      <button @click="addItem">+</button>
    </div>
  </div>
</template>
<script>
import TodoItem from '../components/TodoItem.vue'
const todoList = [
{
  color: '#fee4cb',
  id: 'list10',
  label: '重要不紧急',
  list: [
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
},
{
  color: '#e9e7fd',
  id: 'list11',
  label: '重要且紧急',
  list: []
},
{
  color: '#dbf6fd',
  id: 'list01',
  label: '不重要紧急',
  list: []
},
{
  color: '#ffd3e2',
  id: 'list00',
  label: '不紧急不重要',
  list: []
}
]
export default {
  name: 'FourQuadrant',
  components: {
    TodoItem
  },
  data(){
    return {
      content: '',
      todoList,
      curIdx: 0,
      selectedList: todoList[1]
    }
  },
  mounted() {
    
  },
  methods: {
    addItem(){

      if(!this.content) return
      const item = {
        content: this.content,
        checked: false,
      }
      this.selectedList.list.push(item)
      this.content = ''
    },
    delItem(opt){
      opt.list.splice(opt.idx, 1)
    },
    changeCur() {
      let res = (this.curIdx+1) % 4
      this.curIdx = res
      this.selectedList = this.todoList[this.curIdx]
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
      width: 85%;
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
    .color {
      display: inline-block;
      width: 26px;
      height: 26px;
      vertical-align: middle;
      background: brown;
      border-radius: 50%;
      margin-right: 6px;
    }
  }
}
</style>
