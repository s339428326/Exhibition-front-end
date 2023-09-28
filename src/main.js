import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import '@/assets/scss/styles.scss'

import veeValidate from './plugins/vee-validate'
import datePicker from './plugins/datePicker'
import vueMaterialDesignIcons from './plugins/vue-material-design-icons'

//datepicker
// import Datepicker from 'vuejs3-datepicker'
const app = createApp(App)

app.use(router)
app.use(veeValidate)
app.use(datePicker)
app.use(createPinia())
app.use(vueMaterialDesignIcons)

app.mount('#app')

export default app
