
const routes = [
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/search',
    component: () => import('layouts/MyLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Search.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
