import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import '~/assets/scss/styles.scss'

// import veeValidate from './plugins/vee-validate'
import datePicker from './plugins/datePicker'
import vueMaterialDesignIcons from './plugins/vue-material-design-icons'

//datepicker
// import Datepicker from 'vuejs3-datepicker'
const app = createApp(App)

//test start
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'

import AllRules from '@vee-validate/rules'
//VeeValidate  多國語系
import { localize, setLocale } from '@vee-validate/i18n'
// 引入中文繁體檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

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

// VeeValidate 元件
app.component('VeeField', Field)
app.component('VeeForm', Form)
app.component('ErrorMessage', ErrorMessage)

//test end

app.use(router)
// app.use(veeValidate)
app.use(datePicker)
app.use(createPinia())
app.use(vueMaterialDesignIcons)

app.mount('#app')

export default app
