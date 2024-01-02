import NavBar from './navBar.js'

export default {
    props : ['data'],
    template: `
    <div>
        
        Welcome to Home Page, {{ userRole }}
        <div v-if="userRole==='buyer'" class="container">
            <button type="submit" class="btn btn-outline-info" @click="goDashboard">Go to Cart</button>
        </div>
        <div v-else class="d-flex m-5 p-3">
            <button type="submit" class="btn btn-outline-info" @click="goDashboard">Go to Dashboard</button>
        </div>
        
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