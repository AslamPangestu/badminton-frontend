
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'player', component: () => import('pages/Player/Index.vue') },
      { path: 'player/create', component: () => import('pages/Player/Create.vue') },
      { path: 'player/:id', component: () => import('pages/Player/Index.vue') },
      { path: 'player/edit/:id', component: () => import('pages/Player/Edit.vue') },
      // Presence Route
      { path: 'presence', component: () => import('pages/Presence/Index.vue') },
      { path: 'presence/create', component: () => import('pages/Presence/Create.vue') },
      { path: 'presence/:id', component: () => import('pages/Presence/Index.vue') },
      { path: 'presence/edit/:id', component: () => import('pages/Presence/Edit.vue') },
      // Match Route
      { path: 'match', component: () => import('pages/Match/Index.vue') },
      { path: 'match/create', component: () => import('pages/Match/Create.vue') },
      { path: 'match/:id', component: () => import('pages/Match/Index.vue') },
      { path: 'match/edit/:id', component: () => import('pages/Match/Edit.vue') }
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
