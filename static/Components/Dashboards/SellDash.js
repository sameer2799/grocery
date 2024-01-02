import CatList from "./CatList.js"

export default {
    props : ['data'],
    template: `
    <div>
        Welcome to Dashboard, {{ userRole }}
        <button type="submit" class="btn btn-outline-info" @click="goHome">Go to Home</button>
        <cat-list></cat-list>
    </div>`,
    data() {
        return {
            userRole: localStorage.getItem('role'),
        }
    },
    methods:{
        goHome(){
            this.$router.push({ name: 'Home' })
        }
    },
    components: {
        CatList
    }
}