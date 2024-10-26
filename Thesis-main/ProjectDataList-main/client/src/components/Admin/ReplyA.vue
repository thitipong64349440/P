<template>
    <div class="hero_area">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="../assets/hero-bg.png" alt="">
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
            <a style="color: aliceblue;" v-on:click="navigateTo('/indexs/' + person.id)">หน้าหลัก</a>
            <a style="color: yellow;" v-on:click="navigateTo('/replyA/' + person.id)"  class="active">{{ person.name }}</a>
            <a style="color: aliceblue;" v-on:click="logout">Logout</a>
            <a href="javascript:void(0);" class="icon" @click="toggleMenu"><i class="fa fa-bars"></i></a>
        </div>
        <section class="service_section layout_padding">
            <div class="service_container">
                <div class="container ">
                    <div class="row">
                        <div class="col-md-6 ">
                            <div class="box ">
                                <div class="img-box">
                                    <img src="../assets/user.png" alt="">
                                </div>
                                <div class="detail-box">
                                    <h5>
                                        คุยกับหน่วยงานและร้านค้า
                                    </h5>
                                    <p>
                                        การแจ้งเหตุต่างๆ หรือการแนะนำให้กับทางหน่วยงานและร้านค้า
                                    </p>
                                    <button v-on:click="navigateTo('/chatA/' + person.id)">พูดคุย</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 ">
                            <div class="box ">
                                <div class="img-box">
                                    <img src="../assets/online-shop.png" alt="">
                                </div>
                                <div class="detail-box">
                                    <h5>
                                        ประวัติการคุย
                                    </h5>
                                    <p>
                                        ประวัติการคอมเมนต์ของหน่วยงานและร้านค้า
                                    </p>
                                    <button v-on:click="navigateTo('/chatH/' + person.id)">ประวัติการคุย</button>
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
import Api from '@/services/Api'

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
        }
    }
}
</script>