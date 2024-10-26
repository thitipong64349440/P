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
            <a style="color: aliceblue;" v-on:click="navigateTo('/')">Home</a>
            <a style="color: aliceblue;" v-on:click="navigateTo('/login')" class="active">Login</a>
            <a style="color: aliceblue;" v-on:click="navigateTo('/person/create')">Signup</a>
            <a href="javascript:void(0);" class="icon" @click="toggleMenu">
                <i class="fa fa-bars"></i>
            </a>
        </div>
        <div class="heading_container heading_center about_section1">
            <h1>
                Log<span>in</span>
            </h1>
        </div>
        <div3>
            <form class="form1" v-on:submit.prevent="onLogin">
                <div class="screen-1">
                    <input class="email" type="text" placeholder="email" v-model="email">
                    <input class="password" type="password" placeholder="password" v-model="password">
                    <div class="section text-center">
                        <p><button type="submit">Login</button></p>
                        <p><a v-on:click="navigateTo('/person/create')" class="link">Create</a></p>
                    </div>
                    <div class="error" v-if="error">{{ error }}</div>
                </div>
            </form>
        </div3>
    </div>
</template>
<script>

import LoginService from '@/services/LoginService'
export default {
    data() {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async onLogin() {
            try {
                const response = await LoginService.login({
                    email: this.email,
                    password: this.password
                })

                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.person)

                this.$router.push({
                    path: 'indexs/' + response.data.person.id
                })

            } catch (error) {
                console.log(error)
                this.error = error.response.data.error
                this.email = ''
                this.password = ''

            }
        },
        toggleMenu() {
            const checkbox = document.getElementById('myTopnav')
            if (checkbox.className === 'topnav') {
                checkbox.className += ' responsive'
            } else {
                checkbox.className = 'topnav'
            }
        },
        navigateTo(route) {
            this.$router.push(route)
        }
    }
}
</script>
<style scoped>
.error {
    color: red;
}
</style>