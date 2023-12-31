import NavBar from './navBar.js'

export default {
    props : ['data'],
    template: `
    <div>
        <nav-bar></nav-bar>
        Welcome to Home Page, {{ userRole }}
        <button type="submit" class="btn btn-outline-info" @click="goDashboard">Go to Dashboard</button>
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