import { createRouter, createWebHistory } from 'vue-router'
import SignInView from '../views/SignInView.vue'
import Layout from '../layout/Layout.vue'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: SignInView
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/ProductView.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'editProduct/:productId',
          name: 'editProduct',
          component: () => import('../views/ProductDetails.vue'),
          props: true,
        },
        {
          path: 'addProduct/:str',
          name: 'addProduct',
          component: () => import('../views/AddProductView.vue'),
          props: true,
        },
        {
          path: 'edinspactor',
          name: 'edInspactor',
          component: () => import('../views/EDInspactorView.vue'),
          props: true,
        },
      ]
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: () => import('../views/ProductView.vue'),
    // },
    // {
    //   path: '/editProduct/:productId',
    //   name: 'editProduct',
    //   component: () => import('../views/ProductDetails.vue'),
    //   props: true,
    // },
    // {
    //   path: '/addProduct/:str',
    //   name: 'addProduct',
    //   component: () => import('../views/AddProductView.vue'),
    //   props: true,
    // },
    {
      path: '/:pathMatch(.*)*', // Wildcard route
      name: 'notFound',
      component: () => import('../views/ErrorView.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || to.name === 'signup') return next()

  const accessToken = store.getters.getAccessToken
  const isAuthenticated = accessToken !== null && accessToken !== undefined

  if (!isAuthenticated) return next({ name: 'login' })

  if (to.name !== 'home') return next()

  if (from.name === 'home' && to.name === 'editProduct' && to.params.productId) return next({ name: 'editProduct' })

  if (from.name === 'home' && to.name === 'addProduct' && to.params.str) return next({ name: 'addProduct' })

  if (!router.hasRoute(to.name)) return next({ name: 'notFound' })

  next()

})

export default router
