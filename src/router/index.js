import HomeView from '../views/HomeView.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import Redirect from '../views/Redirect.vue'
import User from '../views/User/User.vue'

import DefaultLayout from '../components/layout/DefaultLayout.vue'
import PaymentLayout from '../components/layout/PaymentLayout.vue'
//Fix GitHub Page SPA router
import { createRouter, createWebHashHistory } from 'vue-router'
import { getUserAuthData } from '../api/auth'
import { useRouter } from 'vue-router'

const isAuth = async (from, to, next) => {
    const rt = useRouter()
    const token = localStorage.getItem('token')
    if (!token) {
        window.alert('憑證消失,請先登入！')
        rt.push({ name: 'Home' })
        return next()
    }
    try {
        const res = await getUserAuthData(token)
        console.log('[isAuth]', res)
        if (res?.error) {
            localStorage.remove('token')
            window.alert('已登入過久,請重新登入！')
            rt.push({ name: 'Home' })
            return next()
        }
        return next()
    } catch (error) {
        rt.replace('/')
        console.log('isAuth 發生錯誤', error)
        return error
    }
}

const routes = [
    //Default Layout
    {
        path: '/',
        name: 'Public',
        component: DefaultLayout,
        redirect: '/',
        children: [
            {
                path: '/',
                name: 'Home',
                component: HomeView
            },
            {
                path: 'searchExhibition',
                name: 'SearchExhibition',
                component: () => import('../views/SearchExhibition.vue')
            },
            {
                path: 'viewExhibition/:id',
                name: 'ViewExhibition',
                component: () => import('../views/ViewExhibition.vue')
            },
            {
                path: 'user/',
                name: 'User',
                redirect: '/user/information',
                component: User,
                children: [
                    {
                        path: 'information',
                        name: 'Information',
                        beforeEnter: isAuth,
                        component: () => import('../views/user/UserInfo.vue')
                    },
                    {
                        path: 'orderSearch',
                        name: 'OrderSearch',
                        beforeEnter: isAuth,
                        component: () => import('../views/user/OrderSearch.vue')
                    },
                    {
                        path: 'editPassword',
                        name: 'EditPassword',
                        beforeEnter: isAuth,
                        component: () => import('../views/user/EditPassword.vue')
                    },
                    {
                        path: 'favoriteList',
                        name: 'FavoriteList',
                        beforeEnter: isAuth,
                        component: () => import('../views/user/FavoriteList.vue')
                    }
                ]
            }
        ]
    },
    //Payment Layout
    {
        path: '/payment',
        name: 'Payment',
        component: PaymentLayout,
        beforeEnter: (from, to, next) => {
            const cartData = JSON.parse(localStorage.getItem('cart'))
            if (!cartData?.length) {
                console.log('block!!!')
                return window.alert('目前購物車沒有物品')
            }
            isAuth(from, to, next)
        },
        //add there payment page
        children: [
            {
                path: 'confirm',
                name: 'OrderConfirm',
                component: () => import('../views/Payment/PaymentView.vue')
            }
        ]
    },
    //Not Found page
    {
        path: '/:catch(.*)',
        name: 'NotFound',
        component: NotFoundPage
    },
    //重新導向頁面
    {
        path: '/redirect',
        name: 'Redirect',
        component: Redirect
    }
]

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export default router
