import NavBar from './navBar.js'

export default {
    props : ['data'],
    template: `
    <div>
        
        Welcome to Home Page, {{ userRole }}
        <button v-if="userRole==='buyer'" type="submit" class="btn btn-outline-info" @click="goDashboard">Go to Cart</button>
        <button v-else type="submit" class="btn btn-outline-info" @click="goDashboard">Go to Dashboard</button>
    </div>`,
    data() {
        return {
            userRole: localStorage.getItem('role'),
        }
    },
    methods:{
        goDashboard(){
            this.$router.push({ name: 'Dash' })
        }
    },
    components: {
        NavBar
    },
}