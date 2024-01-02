
export default {
    props : ['data'],
    template: `
    <div>
        <p>
            
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
