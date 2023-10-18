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
import FilterMenu from 'vue-material-design-icons/FilterMenu.vue'
import CheckCircleOutline from 'vue-material-design-icons/CheckCircleOutline.vue'
import CloseCircleOutline from 'vue-material-design-icons/CloseCircleOutline.vue'
import AlertCircleOutline from 'vue-material-design-icons/AlertCircleOutline.vue'
import menu from 'vue-material-design-icons/Menu.vue'
import PlaylistPlus from 'vue-material-design-icons/PlaylistPlus.vue'
import Eye from 'vue-material-design-icons/Eye.vue'
import EyeOff from 'vue-material-design-icons/EyeOff.vue'
import MenuUp from 'vue-material-design-icons/MenuUp.vue'
import MenuDown from 'vue-material-design-icons/MenuDown.vue'

export default {
    install(app) {
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
        app.component('FilterMenu', FilterMenu)
        app.component('CheckCircleOutline', CheckCircleOutline)
        app.component('CloseCircleOutline', CloseCircleOutline)
        app.component('AlertCircleOutline', AlertCircleOutline)
        app.component('menuIcon', menu)
        app.component('PlaylistPlus', PlaylistPlus)
        app.component('Eye', Eye)
        app.component('EyeOff', EyeOff)
        app.component('MenuDown', MenuDown)
        app.component('MenuUp', MenuUp)
    }
}
