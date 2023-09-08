//Fix GitHub Page SPA router
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '../components/layout/DefaultLayout.vue'
import PaymentLayout from '../components/layout/PaymentLayout.vue'

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
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // {
            //     path: '/about',
            //     name: 'About',
            //     component: () => import('../views/AboutView.vue')
            // },
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
                path: 'user/information',
                name: 'Information',
                component: () => import('../views/user/UserInfo.vue')
            },
            {
                path: 'user/orderSearch',
                name: 'OrderSearch',
                component: () => import('../views/user/OrderSearch.vue')
            },
            {
                path: 'user/editPassword',
                name: 'EditPassword',
                component: () => import('../views/user/EditPassword.vue')
            },
            {
                path: 'user/favoriteList',
                name: 'FavoriteList',
                component: () => import('../views/user/FavoriteList.vue')
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
                component: () => import('../views/Payment/PaymentView.vue')
            }
        ]
    }
]

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export default router
