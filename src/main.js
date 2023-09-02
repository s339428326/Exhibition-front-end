import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 註冊bootstrap 與 bootstrap-Vue
import 'bootstrap'
import BootstrapVue3 from 'bootstrap-vue-next'

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/scss/vendors/bootstrap/_bootstrap.scss'
import './assets/scss/styles.scss'

// 註冊pinia
import { createPinia } from 'pinia'

//使用 VeeValidate 表單驗證工具
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
//VeeValidate  多國語系
import { localize, setLocale } from '@vee-validate/i18n'
// 引入中文繁體檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

//icons
import Heart from 'vue-material-design-icons/Heart.vue'
import Cart from 'vue-material-design-icons/Cart.vue'
import DeleteCircle from 'vue-material-design-icons/DeleteCircle.vue'
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue'
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue'
import Magnify from 'vue-material-design-icons/Magnify.vue'
import Close from 'vue-material-design-icons/Close.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import Star from 'vue-material-design-icons/Star.vue'
import StarHalfFull from 'vue-material-design-icons/StarHalfFull.vue'

//datepicker
import Datepicker from 'vuejs3-datepicker'
const app = createApp(App)

app.use(router)
app.use(BootstrapVue3)
app.use(createPinia())

//將 AllRules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate
Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule])
})

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
    generateMessage: localize({ zh_TW: zhTW }),
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid'
    },
    validateOnInput: true
})
setLocale('zh_TW')

// 掛載 Global 的 VeeValidate 元件
app.component('VeeField', Field)
app.component('VeeForm', Form)
app.component('ErrorMessage', ErrorMessage)

//icons components
app.component('HeartIcon', Heart)
app.component('CartIcon', Cart)
app.component('DeleteCircleIcon', DeleteCircle)
app.component('HeartOutlineIcon', HeartOutline)
app.component('CloseIcon', Close)
app.component('AccountCircle', AccountCircle)
app.component('Magnify', Magnify)
app.component('ChevronRight', ChevronRight)
app.component('ChevronLeft', ChevronLeft)
app.component('Star', Star)
app.component('StarHalfFull', StarHalfFull)

app.component('Datepicker', Datepicker)

app.mount('#app')
