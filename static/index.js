import MainComponent from './Components/mainComp.js'
import router from './router.js'
import SideBar from './Components/sideBar.js'
import NavBar from './Components/navBar.js'

const { createApp } = Vue


router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Register' && to.name != 'Ind' && !localStorage.getItem('auth-token') ? true : false ) 
    next({ name: 'Login'})
  else next()
})


const app = createApp({
  template: `
  <div>Hello from vue template index.js
    
    <main-component></main-component>
    <side-bar></side-bar>
  </div>
  `,
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  components: {
    NavBar,
    MainComponent,
    SideBar
  }
})
  
app.use(router)

app.mount('#app')
