
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Client.vue') },
      { path: 'login', component: () => import('pages/Login/Client.vue') },
      // History Route
      { path: 'history', component: () => import('pages/History/Index.vue') },
      { path: 'history/:id', component: () => import('pages/History/Detail.vue') },
      // Be Referee Route
      { path: 'be-referee', component: () => import('pages/BeReferee/Index.vue') },
      { path: 'be-referee/create', component: () => import('pages/BeReferee/Create.vue') },
      { path: 'be-referee/:id', component: () => import('pages/BeReferee/Detail.vue') },
      { path: 'be-referee/:id/edit', component: () => import('pages/BeReferee/Edit.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Admin.vue') },
      // Player Route
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
