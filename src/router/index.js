import { createRouter, createWebHistory } from 'vue-router'
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
            {
                path: '/about',
                name: 'About',
                component: () => import('../views/AboutView.vue')
            },
            {
                path: '/SearchExhibition',
                name: 'SearchExhibition',
                component: () => import('../views/SearchExhibition.vue')
            },
            {
                path: '/ViewExhibition',
                name: 'ViewExhibition',
                component: () => import('../views/ViewExhibition.vue')
            }
        ]
    },
    //Payment Layout
    {
        path: '/payment',
        name: 'Payment',
        component: PaymentLayout,
        redirect: '/payment',
        //add there payment page
        children: []
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
