import { createRouter, createWebHashHistory } from 'vue-router'
import FourQuadrant from '../views/FourQuadrant.vue'
import TodoList from '../views/TodoList.vue'

const routes = [
  { path: '/', component: FourQuadrant },
  { path: '/todo-list', component: TodoList },
]
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
export default router