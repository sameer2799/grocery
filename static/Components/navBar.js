export default {
    props : ['data'],
    template: `
    <div class="modal fade" id="searchModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Search Results</h5>
          </div>
          <div class="modal-body">
            <div v-if="searchRresults">
              {{ this.searchRresults + "searchRresults" }}
            </div>
            <div v-else>
              {{ this.searchError }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="emptySearch()">Close</button>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="/static/GS_logo.jpg" alt="GS_logo" width="30" height="24" class="d-inline-block align-text-top">
        Grocery
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link text-success" tabindex="-1">Home</router-link>
            </li>
            <li v-if="isLoggedIn & role==='buyer'" class="nav-item">
              <router-link to="/dashboard" class="nav-link text-success" tabindex="-1">Cart</router-link>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link to="/register" class="nav-link text-success" tabindex="-1">Register Now!</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item ms-5 me-5">
              <button class="btn btn-outline-danger" type="button" @click="logout" tabindex="-1">Logout</button>
            </li>
            <li v-else class="nav-item">
              <router-link to="Login" class="nav-link text-success" tabindex="-1">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link me-2 text-success" tabindex="-1">About</router-link>
            </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" id="search" type="search" placeholder="for eg: bananas" aria-label="Search" v-model="searchKey">
          <button class="btn btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#searchModal" @click="search()">Search</button>
        </form>
      </div>
    </div>
  </nav>`,
  data() {
    return {
        role: localStorage.getItem('role'),
        isLoggedIn: localStorage.getItem('auth-token')? true : false,
        searchRresults: "",
        searchKey: null,
        searchError: "",
    }
  },
  methods: {
    search(){
      if (this.searchKey){
        console.log(this.searchKey)
      }
      else{
        this.searchError = "Please enter a search key";
      }
    },
    logout(){
        localStorage.removeItem('auth-token')
        localStorage.removeItem('role')
        this.isLoggedIn = false
        this.$router.push({ name: 'Ind' })
    },
    emptySearch(){
      this.searchKey = null;
      this.searchRresults = "";
      this.searchError = "";
    },
    }
}