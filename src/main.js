import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router/index.js'

createApp(App).use(router).use(store).mount('#app')
