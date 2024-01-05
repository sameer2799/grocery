export default {
    props: {
        'data': Object,
        'msg': String
        },
    template: `
    <div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Message</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div v-if="this.success" class="alert alert-success" role="alert">{{ this.success }}</div>
                <div v-if="this.error" class="alert alert-danger" role="alert">{{ this.error }}</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="this.$router.go(0)" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
        <div v-if="this.data.length !== 0">
            <h1 class="m-3">All Your Product Listings</h1>
            <div class="accordion mb-5" id="accordionExample">
                <div v-for="item in this.data" class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <span class="fw-bold">{{ item.product_name }}</span>
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">

                        <div class="card p-0">
                            <div class="card-body">
                                <h5 class="card-title">&#8377;{{ item.price_per_unit }} per {{ item.units }} </h5>
                                <p class="card-text">{{ item.description }}</p>
                                <p class="card-text">Belongs to category = <span class="fw-bold">{{ item.product_category_id }}</span></p>
                                <p class="card-text">Expiry Date = {{ item.expiry_date }}</p>
                                <p class="card-text">Stock = {{ item.stock }}</p>
                            </div>
                            <div class="card-footer text-end">
                                <button @click="publishProduct(item.product_id)" type="button" class="btn btn-outline-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Publish Product</button>
                                
                                <button @click="deleteProduct(item.product_id)" type="button" class="btn btn-outline-danger m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete product</button>
                          </div>
                        </div>

                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div v-else>
            <h3 class="m-3">{{ this.msg }} There is an option for it in the sidebar!</h3>
        </div>
    </div>
    `,
    data() {
        return {
            token: localStorage.getItem('auth-token'),
            editProd: {
                product_id: null,
                product_name: null,
                description: null,

            },
            error: null,
            success: null
        }
    },
    methods: {
        async deleteProduct(id) {
            try {
                const res = await fetch('/api/product', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token
                    },
                    body: JSON.stringify({
                        product_id: id
                    })
                })
                const data = await res.json()
                if (res.ok) {
                    this.error = null
                    this.success = data.info
                } else {
                    this.success = null
                    this.error = data.message
                    if (this.error || this.success) {
                        setTimeout(() => {
                            this.error = null;
                            this.success = null;
                        }, 10000)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        },
        async publishProduct(id) {
            try {
                const res = await fetch('/api/publish/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token
                    },
                    body: JSON.stringify({
                        product_id: id
                    })
                })
                const data = await res.json()
                if (res.ok) {
                    this.error = null
                    this.success = data.info
                } else {
                    this.success = null
                    this.error = data.message
                }
                if (this.error || this.success) {
                    setTimeout(() => {
                        this.error = null;
                        this.success = null;
                    }, 10000)
                }
            } catch (err) {
                console.log(err)
            }
        },
    },
}