import HomeView from '../views/HomeView.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import Redirect from '../views/Redirect.vue'
import ResetPassword from '../views/ResetPassword.vue'
import User from '../views/User/User.vue'
import ChangeEmail from '../views/ChangeEmail.vue'
import ECPayment from '../views/ECPayment.vue'
import AdminMain from '../views/Admin/AdminMain.vue'

import DefaultLayout from '../components/layout/DefaultLayout.vue'
import PaymentLayout from '../components/layout/PaymentLayout.vue'
import AdminDataBoard from '../views/Admin/AdminMain.vue'
import TicketChecker from '../views/Admin/TicketChecker.vue'

//Fix GitHub Page SPA router
import { createRouter, createWebHashHistory } from 'vue-router'
import { authenticateAndGetUserData, changeEmail } from '../api/auth'

import { useAlert } from '../stores/alertSlice'
import { userDataStore } from '../stores/userData'

import Cookies from 'js-cookie'

const isAuth = async (from, to, next) => {
    const user = userDataStore()
    const alertStore = useAlert()

    const token = Cookies.get('token')
    if (!token) {
        alertStore.callAlert({ title: '目前尚未登入！', type: 'error' })
        user.logout()
        return next({ name: 'Home' })
    }

    try {
        const res = await authenticateAndGetUserData(token)
        console.log('[isAuth]', res)
        return next()
    } catch (error) {
        alertStore.callAlert({ title: '已登入過久,請重新登入！', type: 'error' })
        user.logout()
        return next({ name: 'Home' })
    }
}

const routes = [
    //Default Layout
    {
        path: '/changeEmail/:token',
        name: 'ChangeEmail',
        component: ChangeEmail
    },
    {
        path: '/resetPassword/:token',
        name: 'ResetPassword',
        component: ResetPassword
    },
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
                        component: () => import('../views/User/UserInfo.vue')
                    },
                    {
                        path: 'ticket',
                        name: 'Ticket',
                        beforeEnter: isAuth,
                        component: () => import('../views/User/UserTickets.vue')
                    },
                    {
                        path: 'orderSearch',
                        name: 'OrderSearch',
                        beforeEnter: isAuth,
                        component: () => import('../views/User/OrderSearch.vue')
                    },
                    {
                        path: 'editPassword',
                        name: 'EditPassword',
                        beforeEnter: isAuth,
                        component: () => import('../views/User/EditPassword.vue')
                    },
                    {
                        path: 'favoriteList',
                        name: 'FavoriteList',
                        beforeEnter: isAuth,
                        component: () => import('../views/User/FavoriteList.vue')
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
        //add there payment page
        children: [
            {
                path: 'confirm',
                name: 'OrderConfirm',
                component: () => import('../views/Payment/PaymentView.vue'),
                beforeEnter: (from, to, next) => {
                    const alertStore = useAlert()
                    const cartData = JSON.parse(localStorage.getItem('cart'))
                    if (!cartData?.length) {
                        return alertStore.callAlert({
                            title: '目前購物車內沒有商品',
                            type: 'error'
                        })
                    }
                    isAuth(from, to, next)
                }
            }
        ]
    },
    //Ec payment
    {
        path: '/ec-payment',
        name: 'ECPayment',
        component: ECPayment
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
    },
    ,
    {
        path: '/admin',
        name: 'Admin',
        redirect: '/admin/login',
        children: [
            {
                path: 'login',
                name: 'AdminLogin',
                component: () => import('../views/Admin/AdminLogin.vue')
            },
            {
                path: 'main',
                name: 'AdminMain',
                component: AdminMain,
                children: [
                    {
                        path: 'databoard',
                        name: 'DataBoard',
                        component: AdminDataBoard
                    },
                    {
                        path: 'ticketchecker',
                        name: 'TickerChecker',
                        component: TicketChecker
                    }
                ]
            }
        ]
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('../views/TestQR.vue')
    }
]

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export default router
