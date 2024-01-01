export default {
    props : ['data'],
    template: `
    <div>
            <div class="container p-5 bg-light">
                <form class="p-3">
                <h3 class="text-center mb-3">Register</h3>                 
                    <div class="row mb-3">
                        <label for="username" class="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" autocomplete="new-password" id="username" required v-model="cred.username">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input type="email" class="form-control" autocomplete="new-password" id="email" required v-model="cred.email">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="password" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                        <input type="password" autocomplete="new-password" class="form-control" id="password" required v-model="cred.password">
                        </div>
                    </div>
                    <fieldset class="row mb-3">
                        <legend class="col-form-label col-sm-2 pt-0">Who are you</legend>
                        <div class="col-sm-10">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="gridRadios1" value="seller" v-model="cred.role">
                                <label class="form-check-label" for="gridRadios1">
                                Seller
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="gridRadios2" value="buyer" v-model="cred.role">
                                <label class="form-check-label" for="gridRadios2">
                                Customer
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <div class="mb-3 text-warning">
                        {{ this.info }}
                    </div>
                    <div class="mb-3 text-danger">
                        {{ this.error }}
                    </div>
                    <div class="col-12 mb-3 d-flex justify-content-center">
                        <button type="submit" @click="register" class="btn btn-outline-primary">Register</button>
                    </div>
                </form>
        </div>
        <div class='d-flex justify-content-center'>
            <form class="p-5 bg-light">
                <h3 class="text-center mb-5">Register</h3>
                <div class="mb-3">
                    <label for="user-username" class="form-label">Username</label>
                    <input type="text" class="form-control" autocomplete="new-password" id="user-username" placeholder="Foo Bar" aria-describedby="emailHelp" required v-model="cred.username">
                </div>
                <div class="mb-3">
                    <label for="user-email" class="form-label">Email address</label>
                    <input type="email" class="form-control" autocomplete="new-password" id="user-email" placeholder="abc@example.com" aria-describedby="emailHelp" required v-model="cred.email">
                </div>
                <div class="mb-3">
                    <label for="user-password" class="form-label">Password</label>
                    <input type="password" class="form-control" autocomplete="new-password" id="user-password" v-model="cred.password" required>
                </div>
                <label for="roleForm" class="form-label">Who are you</label>
                <div class="ms-5 mb-2" id="roleForm">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="flexRadioDefault1" value="seller" v-model="cred.role">
                        <label class="form-check-label" for="flexRadioDefault1">
                            Seller
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="flexRadioDefault2" checked value="buyer" v-model="cred.role">
                        <label class="form-check-label" for="flexRadioDefault2">
                            Customer
                        </label>
                    </div>
                </div>
                <div class="mb-3 text-primary">
                    {{ this.info }}
                </div>
                <div class="mb-3 text-danger">
                    {{ this.error }}
                </div>
                <div class="mb-3 d-flex justify-content-center">
                    <button type="submit" class="btn btn-outline-primary" @click="register">Register</button>
                </div>
            </form>
        </div> 
    </div>
    `,
    data() {
        return {
            cred: {
                email : null,
                password: null,
                username: null,
                role: null,
            },
            info: null,
            error : null
        }
    },
    methods: {
        async register(){
            // console.log(this.cred.role)
            if (this.cred.email && this.cred.password && this.cred.username && this.cred.role){
                
                const res = await fetch('/user-register',{
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify(this.cred),
                })
                const data = await res.json().catch(err => this.error = err);
    
                if (res.ok) {
                    if (data.info) {this.info = data.info}
                    else {this.$router.push({path: '/login'})}
                }
                else {
                    this.error = data.message;
                }
            }
            else{
                this.error = 'Please enter valid credentials'
            }
            
        }
    },
}