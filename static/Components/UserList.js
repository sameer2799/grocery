export default {
    props : ['data'],
    template: `
    <div class="modal fade" id="sellermodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Approval</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Seller has been approved!
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
            </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div v-if="this.error" class="d-flex justify-content-center">{{ this.error }}</div>
        <div v-else>
            <div class="container m-3">
                <div class="table-wrapper d-flex flex-wrap">
                    <div class="table-container table-responsive pe-5 flex-fill">
                        <table class="table caption-top table-striped table-hover align-middle">
                        <caption class="fs-3 fw-bold">Pending New Sellers Approvals</caption>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Active</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <div v-if="this.someError" class="fw-bold fst-italic">{{ this.someError }}</div>
                                <div v-else-if="sellers.length === 0" class="fw-bold fst-italic">All Approved!</div>
                                <tr v-else v-for="(seller,index) in sellers">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ seller.username }}</td>
                                    <td>{{ seller.email }}</td>
                                    <td>{{ seller.active }}</td>
                                    <td>{{ seller.role }}</td>
                                    <td> <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#sellermodal" @click="apv_seller(seller.id)">Approve</button> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table-container table-responsive flex-fill">
                        <table class="table caption-top table-striped table-hover align-middle">
                            <caption class="fs-3 fw-bold">Pending New Categories Approvals</caption>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Approved</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <div v-if="this.someError" class="fw-bold fst-italic">{{ this.someError }}</div>
                                <tr v-else v-for="(user,index) in users">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.active }}</td>
                                    <td> <button class="btn btn-outline-success">Approve</button> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <br>
            <div class="container">
                <div class="table-wrapper table-responsive">
                    <h2 class="text-center">Users List</h2>
                    <table class="table table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        <div v-if="this.someError" class="fw-bold fst-italic">{{ this.someError }}</div>
                        <tr v-else v-for="(user,index) in users">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td>{{ user.active }}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            users: {},
            sellers: {},
            someError: null,
            error: null,

        }
    },    
    methods: {
        async apv_seller(id) {
            const res = await fetch('/api/approve/seller', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ id: parseInt(id) })
            });
            const data = await res.json().catch((err) => { this.error = err });
            if (res.ok) {
                
            } else {
                this.someError = data.message;
            }
        }
    },
    async mounted() {
        const res = await fetch('/api/user-list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication-Token': localStorage.getItem('auth-token')
            },
        })
        const data = await res.json().catch((err) => {this.error = err});
        if (res.ok) {
            this.users = data
            this.users = this.users.filter(user => user.role !== 'Admin');
            this.sellers = this.users.filter(user => user.role === 'Seller' && user.active === false);
            
        }
        else {
            this.someError = data.message
        }
    },
}