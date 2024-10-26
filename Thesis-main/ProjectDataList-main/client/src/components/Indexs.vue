<template>
    <div class="hero_area">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="./assets/hero-bg.png" alt="">
            </div>
        </div>
        <a class="navbar-brand">
            <span>
                Delcom
            </span>
        </a>
        <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div class="topnav" id="myTopnav">
            <a style="color: aliceblue;" v-on:click="navigateTo('/indexs/' + person.id)" class="active">หน้าหลัก</a>
            <a v-if="person && person.type === 'company'" style="color: aqua;"
                v-on:click="navigateTo('/edit/' + person.id)">{{ person.name }}</a>
            <a v-else-if="person && person.type === 'shop'" style="color: aquamarine;"
                v-on:click="navigateTo('/edit/' + person.id)">{{ person.name }}</a>
            <a v-else style="color: yellow;" v-on:click="navigateTo('/replyA/' + person.id)">{{ person.name }}</a>
            <a style="color: red;" v-on:click="logout">Logout</a>
            <a href="javascript:void(0);" class="icon" @click="toggleMenu"><i class="fa fa-bars"></i></a>
        </div>
        <section class="service_section service_section1 layout_padding">
            <div class="service_container">
                <div class="container ">
                    <div v-if="person && person.type === 'company'">
                        <div class="row">
                            <div class="col-md-6 ">
                                <div class="box ">
                                    <div class="img-box">
                                        <img src="./assets/user.png" alt="">
                                    </div>
                                    <div class="detail-box">
                                        <h5>
                                            โพสความต้องการ
                                        </h5>
                                        <p>
                                            การโพสของหน่วยงานที่ต้องการซื้อสินค้า ที่ตรงกับความต้องการของหน่วยงาน
                                        </p>
                                        <button v-on:click="navigateTo('/post/create/' + person.id)">โพส</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 ">
                                <div class="box ">
                                    <div class="img-box">
                                        <img src="./assets/online-shop.png" alt="">
                                    </div>
                                    <div class="detail-box">
                                        <h5>
                                            ประวัติการโพส
                                        </h5>
                                        <p>
                                            ประวัติการโพสของหน่วยงานที่ต้องการซื้อสินค้า
                                        </p>
                                        <button v-on:click="navigateTo('/postC/' + person.id)">ประวัติการโพส</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="person && person.type === 'shop'">
                        <div class="row">
                            <div class="col-md-6 ">
                                <div class="box ">
                                    <div class="img-box">
                                        <img src="./assets/user.png" alt="">
                                    </div>
                                    <div class="detail-box">
                                        <h5>
                                            โพสสินค้า
                                        </h5>
                                        <p>
                                            การโพสของร้านค้าที่ต้องการขายสินค้า ที่ตรงกับความต้องการของหน่วยงานที่โพส
                                        </p>
                                        <button v-on:click="navigateTo('/shop/post/' + person.id)">โพส</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 ">
                                <div class="box ">
                                    <div class="img-box">
                                        <img src="./assets/online-shop.png" alt="">
                                    </div>
                                    <div class="detail-box">
                                        <h5>
                                            ประวัติการโพส
                                        </h5>
                                        <p>
                                            ประวัติการโพสของร้านค้าที่ขายสินค้า
                                        </p>
                                        <button v-on:click="navigateTo('/shop/' + person.id)">ประวัติการโพส</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="row">
                            <div class="col-md-6 ">
                                <div class="box ">
                                    <div class="img-box">
                                        <img src="./assets/user.png" alt="">
                                    </div>
                                    <div class="detail-box">
                                        <h5>
                                            โพสหน่วยงาน
                                        </h5>
                                        <p>
                                            การโพสของหน่วยงานที่ต้องการซื้อสินค้า ที่ต้องกับความต้องการของหน่วยงานที่โพส
                                        </p>
                                        <button v-on:click="navigateTo('/postCs/' + person.id)">รายละเอียด</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 ">
                                <div class="box ">
                                    <div class="img-box">
                                        <img src="./assets/online-shop.png" alt="">
                                    </div>
                                    <div class="detail-box">
                                        <h5>
                                            โพสร้านค้า
                                        </h5>
                                        <p>
                                            โพสของร้านค้าที่ต้องการขายสินค้าทางคอมพิวเตอร์ที่เป็นจำนวนมาก
                                        </p>
                                        <button v-on:click="navigateTo('/shops/' + person.id)">รายละเอียด</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import { mapState } from 'vuex';

export default {
    data() {
        return {
            person: null,
            shops: [],
            postCs: []
        }
    },
    computed: {
        ...mapState({
            userType: state => state.person.type
        })
    },
    async created() {
        this.shops = (await ShopService.index()).data
        this.postCs = (await PostCService.index()).data
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
    },
    massage: '',
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
        toggleMenu() {
            const checkbox = document.getElementById('myTopnav')
            if (checkbox.className === 'topnav') {
                checkbox.className += ' responsive'
            } else {
                checkbox.className = 'topnav'
            }
        },
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
                name: 'login'
            })
        },

    }
}
</script>
<style>
</style>