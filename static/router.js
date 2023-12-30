import Index from './homePage.js'
import LoggedHome from './Components/loghome.js'
import Dash from './Components/dash.js'
import About from './Components/about.js'
import Login from './Components/login.js'

const routes = [
    { path: '/', component: Index, name: 'Ind' },
    { path: '/home', component: LoggedHome, name: 'Home' },
    { path: '/dash', component: Dash, name: 'Dash' },
    { path: '/about', component: About },
    { path: '/login', component: Login, name: 'Login' },
  ]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

export default router
