<template>
  <div class="four-quadrant-wrapper">
    <div class="four-quadrant-content">
      <span>四象限时间管理</span>
      <div class="four-quadrant">
        <div
          class="box" 
          v-for="conf in todoList" 
          :key="conf.id" 
          :style="{background: conf.color}" 
          @click="changeSelected(conf)"
          :id="conf.id"
        >
          <span>{{conf.label}}</span>
          <todo-item 
          v-for="(item, idx) in conf.list" 
          :key="idx" :config="item" 
          :idx="idx" 
          :list="conf.list" 
          @del-item="delItem"
          @checked-item="checkedItem"
          @archive-item="archiveItem"
          class="column-item"></todo-item>
        </div>
      </div>
      <div class="add-item" @keyup.enter="addItem">
        <input type="text" placeholder="请输入待办事项" v-model="content">
        <span class="color" @click="changeCur" :style="{background: selectedList.color}"></span>
        <button @click="addItem">+</button>
      </div>
    </div>
    <div class="archive-wrapper">
      <div class="title">任务归档</div>
      <div class="archive-list">
        <div class="box">
          <todo-item 
            v-for="(item, idx) in archiveList" 
            :key="idx" :config="item" 
            :idx="idx" 
            :list="archiveList" 
            @del-item="delItem"
            @checked-item="checkedItem"></todo-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TodoItem from '../components/TodoItem.vue'
import Draggable from '../utils/draggable.js'
const todoList = [
{
  color: '#fee4cb',
  id: 'list10',
  label: '重要不紧急',
  checkedNum: 0,
  rewrite: {
    value: false
  },
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
  checkedNum: 0,
  list: []
},
{
  color: '#dbf6fd',
  id: 'list01',
  label: '不重要紧急',
  checkedNum: 0,
  list: []
},
{
  color: '#ffd3e2',
  id: 'list00',
  label: '不紧急不重要',
  checkedNum: 0,
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
      todoList: [],
      curIdx: 0,
      selectedList: {},
      archiveList: []
    }
  },
  mounted() {
    const fourQuadrant = window.localStorage.getItem('fourQuadrant')
    this.todoList = fourQuadrant ? JSON.parse(fourQuadrant) : todoList;
    const archiveList = window.localStorage.getItem('archiveList')
    this.archiveList = archiveList ? JSON.parse(archiveList) : [];
    this.selectedList = this.todoList[1]

    window.addEventListener("beforeunload",()=>{
        window.localStorage.setItem('fourQuadrant', JSON.stringify(this.todoList))
        window.localStorage.setItem('archiveList', JSON.stringify(this.archiveList))
    })
    this.$nextTick(() => {
      for(const todo of todoList) {
        new Draggable({
          element: document.querySelector(`#${todo.id}`),
          cloneElementClassName: 'clone-column-item',
          draggerClassName: 'dragger'
        });
      }

    })

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
    },
    changeSelected(selected) {
      this.selectedList = selected
    },
    checkedItem(data) {
      data.config.checked = !data.config.checked
    },
    archiveItem(opt) {
      const item = opt.list[opt.idx]
      opt.list.splice(opt.idx, 1);
      console.log(item, 'item', opt, 'opt')
      this.archiveList.push(item)
    },
  },
}
</script>
<style scoped lang="scss">
@font-face {
  font-family: miaomiao;
  src: url('../assets/FZSJ-MIAOMM.TTF')
}
$cardWidth: 1080px;
.four-quadrant-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 12px;
  font-family: miaomiao;
  line-height: 2em;
  width: $cardWidth;
  margin: auto;
  .four-quadrant-content {
    border-radius: 12px;
    background: #fff;
    padding: 12px;
    position: relative;
    .four-quadrant {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      box-sizing: border-box;
      // width: $cardWidth;
      margin: auto;
      .box {
        width: 100%;
        min-height: 260px;
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
  .archive-wrapper {
    border-radius: 12px;
    background: #fff;
    padding: 12px;
    display: flex;
    flex-direction: column;
    .title {
      flex: 0 1 20px;
    }
    .archive-list {
      flex: 1;
    }
    .box {
      width: 100%;
      // min-height: 260px;
      height: 100%;
      border-radius: 8px;
      text-align: center;
      color: #555;
      background: #eeeeee;
      padding: 4px 0;
      box-sizing: border-box;
    }
  }
}
</style>
