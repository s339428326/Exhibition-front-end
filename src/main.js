import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 註冊bootstrap 與 bootstrap-Vue
import 'bootstrap'
import BootstrapVue3 from 'bootstrap-vue-next'

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/scss/styles.scss'

// 註冊pinia
import { createPinia } from 'pinia'

//icons
import Heart from 'vue-material-design-icons/Heart.vue'
import Cart from 'vue-material-design-icons/Cart.vue'

const app = createApp(App)

app.use(router)
app.use(BootstrapVue3)
app.use(createPinia())

//icons components
app.component('HeartIcon', Heart)
app.component('CartIcon', Cart)

app.mount('#app')
