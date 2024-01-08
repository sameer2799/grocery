import NavBar from './navBar.js'
import Customer from './Dashboards/customer.js'

export default {
    props : ['data'],
    template: `
    <div>
        <div v-if="userRole==='buyer'" class="container">
            <div class="m-3 row">
            <div class="col-12">
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">Welcome to the Farmer's Market!</h1>
                        <p class="lead">We provide the best quality products at the best prices!</p>
                    </div>
                </div>
            </div>
            </div>
            <customer></customer>
        </div>
        <div v-if="userRole==='admin'" class="container">
            <div class="m-3 row">
                <div class="col-12">
                    <div class="jumbotron jumbotron-fluid">
                        <div class="container">
                            <h1 class="display-4">Welcome Admin</h1>
                            <p class="lead">Get your work done easily!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-3 row">
                <div class="col-12">
                    <button type="submit" class="btn btn-outline-info" @click="goDashboard">Go to Dashboard</button>
                </div>
            </div>
        </div>
        <div v-if="userRole==='seller'" class="container">
            <div class="m-3 row">
                <div class="col-12">
                    <div class="jumbotron jumbotron-fluid">
                        <div class="container">
                            <h1 class="display-4">Welcome to the Farmer's Market!</h1>
                            <p class="lead">Best platform to sell your best quality products!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-3 row">
                <div class="col-12">
                    <button type="submit" class="btn btn-outline-info" @click="goDashboard">Go to Dashboard</button>
                </div>
            </div>

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
        NavBar,
        Customer
    },
}