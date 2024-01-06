export default {
    props : ['data'],
    template: `<div>
        <div class="modal fade" id="checkout" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Checkout</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Enter address</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                        </div>
                        <div class="mb-3">
                            <div class="dropdown" id="exampleFormControlTextarea1">
                                <button class="btn btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select Payment Method
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="#">Card</a></li>
                                    <li><a class="dropdown-item" href="#">Net Banking</a></li>
                                    <li><a class="dropdown-item" href="#">PayPal</a></li>
                                    <li><a class="dropdown-item" href="#">UPI</a></li>
                                    <li><a class="dropdown-item" href="#">Bank Transfer</a></li>
                                    <li><a class="dropdown-item" href="#">Cash on Delivery (COD)</a></li>
                                    <li><a class="dropdown-item" href="#">Cryptocurrency (e.g., Bitcoin, Ethereum)</a></li>
                                    <li><a class="dropdown-item" href="#">Mobile Wallets (e.g., Samsung Pay, Alipay)</a></li>
                                    <li><a class="dropdown-item" href="#">Gift Card</a></li>
                                </ul>
                            </div>
                        </div>
                        Amount to Pay = ""
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Place order</button>
                    </div>
                </div>
            </div>
        </div>

        Welcome to your Cart
        <router-link to="/home"><button type="button" class="btn btn-outline-primary">Home</button></router-link>
        <div class="container mb-5">

        <!--           v-if noproducts-->

        <!--           v-else-->
            <div class="table-responsive">
                <table class="table table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Product Amount</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Banana</td>
                            <td>80</td>
                            <td>2</td>
                            <td>160</td>
                            <td><button type="button" class="btn btn-outline-danger">Remove</button></td>
                        </tr>
                        
                    </tbody>
                    <tfoot>
                        <tr class="align-bottom">
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td class="fw-bold">Total Amount</td>
                            <td class="fw-bold">160</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#checkout">Checkout</button>
        </div>
    </div>`
}