import MainComponent from './Components/mainComp.js'
import NavBar from './Components/navBar.js'
import router from './router.js'

const { createApp } = Vue


router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Register' && to.name != 'Ind' && !localStorage.getItem('auth-token') ? true : false ) 
    next({ name: 'Login'})
  else next()
})


const app = createApp({
  template: `
  <div>Hello from vue template index.js
    <nav-bar></nav-bar>
    <main-component></main-component>
  </div>
  `,
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  components: {
    MainComponent,
    NavBar
  }
})
  
app.use(router)

app.mount('#app')
