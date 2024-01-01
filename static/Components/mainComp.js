
export default {
    props : ['data'],
    template: `
    <div>Hello from Main Component {{ data }}
        <p>
            <router-link to="/about">Go to About</router-link>
            |
            <router-link to="/login">Login Here</router-link>
            |
            <router-link to="/register">Register Here</router-link>
        </p>
        <div>
            <router-view></router-view>
        </div>
    </div>`,
    data() {
        return {
            token: localStorage.getItem('auth-token'),
        }
    },
}
