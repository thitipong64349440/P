<template>
  <div class="hero_area hero_areaSU">
    <div class="hero_bg_box">
      <div class="bg_img_box">
        <img src="../assets/hero-bg.png" alt="">
      </div>
    </div>
    <a class="navbar-brand">
      <span>
        Delcom
      </span>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="topnav" id="myTopnav">
      <a style="color: aliceblue;" v-on:click="navigateTo('/')">Home</a>
      <a style="color: aliceblue;" v-on:click="navigateTo('/login')">Login</a>
      <a style="color: aliceblue;" v-on:click="navigateTo('/person/create')" class="active">Signup</a>
      <a href="javascript:void(0);" class="icon" @click="toggleMenu">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    </a>
    <div class="about_section layout_padding">
      <div class="heading_container heading_center">
        <h1>
          Sign<span>up</span>
        </h1>
      </div>
      <div2 style="display:flex; align-items:center; justify-content:center;">
          <form v-on:submit.prevent="create">
            <div class="screen-1">
              <input class="name" type="text" placeholder="name" v-model="person.name">
              <input class="lastname" type="text" placeholder="lastname" v-model="person.lastname">
              <input class="email" type="email" placeholder="email" v-model="person.email" required>
            </div>
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css">
            <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
            <div class="section">
              <div class="container">
                <div class="row full-height justify-content-center">
                  <div class="col-12 text-center align-self-center py-5">
                    <div class="section pb-5 pt-5 pt-sm-2 text-center">
                      <h6><span>หน่วยงาน</span>
                        <span1>ร้านค้า</span1>
                      </h6>
                      <p></p>
                      <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" v-model="person.type"
                        true-value="shop" false-value="company" />
                      <label for="reg-log"></label>
                      <div class="card-3d-wrap mx-auto">
                        <div class="card-3d-wrapper">
                          <div class="card-front" v-if="person.type === 'company'">
                            <div class="center-wrap">
                              <div class="section text-center">
                                <h4 class="mb-4 pb-3">
                                  <l><B>หน่วยงาน</B></l>
                                </h4>
                                <div class="form-group">
                                  <input type="text" class="form-style" name="company" placeholder="companyname"
                                    v-model="person.company_name" required>
                                </div>
                                <div class="form-group mt-2">
                                  <input type="text" class="form-style" placeholder="address" v-model="person.address">
                                </div>
                                <div class="form-group mt-2">
                                  <input type="text" class="form-style" placeholder="telephone" v-model="person.tel">
                                </div>
                                <div class="form-group mt-2">
                                  <input type="password" class="form-style" placeholder="password"
                                    v-model="person.password" required>
                                </div>
                                <button type="submit">Signup</button>
                              </div>
                            </div>
                          </div>
                          <div class="card-back" v-else-if="person.type === 'shop'">
                            <div class="center-wrap">
                              <div class="section text-center">
                                <h4 class="mb-3 pb-3">
                                  <l><B>ร้านค้า</B></l>
                                </h4>
                                <div class="form-group">
                                  <input type="text" class="form-style" name="shop" placeholder="shopname"
                                    v-model="person.shop_name" required>
                                </div>
                                <div class="form-group mt-2">
                                  <input type="text" class="form-style" placeholder="address" v-model="person.address">
                                </div>
                                <div class="form-group mt-2">
                                  <input type="text" class="form-style" placeholder="telephone" v-model="person.tel">
                                </div>
                                <div class="form-group mt-2">
                                  <input type="password" class="form-style" placeholder="password"
                                    v-model="person.password" required>
                                </div>
                                <button type="submit">Signup</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
      </div2>
    </div>
  </div>
</template>
<script>
import PersonService from '@/services/PersonService'
export default {
  data() {
    return {
      person: {
        email: '',
        password: '',
        name: '',
        lastname: '',
        company_name: '',
        shop_name: '',
        address: '',
        tel: '',
        type: 'company'
      }
    }
  },
  methods: {
    toggleMenu() {
      const checkbox = document.getElementById('myTopnav')
      if (checkbox.className === 'topnav') {
        checkbox.className += ' responsive'
      } else {
        checkbox.className = 'topnav'
      }
    },
    async create() {
      try {
        await PersonService.post(this.person)
        this.$router.push({
          path: '/login'
        })
      } catch (err) {
        console.log(err)
      }
    },
    navigateTo(route) {
      this.$router.push(route)
    }
  },
}
</script>
<style>
@media (max-width: 768px) {
  .card-3d-wrap {
    perspective: 1000px;
    max-width: 300px;
    margin: 30px auto;
  }
  form{
    margin-top: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  }
}
</style>