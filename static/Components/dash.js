import AdminDashboard from './Dashboards/AdminDash.js'
import CustDashboard from './Dashboards/CustDash.js'
import SellDashboard from './Dashboards/SellDash.js'
import NavBar from './navBar.js'

export default {
    props : ['data'],
    template: `<div>
        <nav-bar></nav-bar>
        <admin-dashboard v-if="userRole=='admin'"></admin-dashboard>
        <cust-dashboard v-if="userRole=='buyer'"></cust-dashboard>
        <sell-dashboard v-if="userRole=='seller'"></sell-dashboard>
    </div>`,
    data() {
        return {
            userRole: localStorage.getItem('role'),
        }
    },
    components: {
        AdminDashboard,
        CustDashboard,
        SellDashboard,
        NavBar
    }
}