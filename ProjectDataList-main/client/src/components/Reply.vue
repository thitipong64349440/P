<template>
    <div class="full">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div v-if="person && person.type === 'company'">
            <button1 v-on:click="navigateTo('/postC/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
            <h1>
                <span2>ข้อความ</span2>
            </h1>
            <div class="reply">
                <h1>{{ shop.shop_name }}</h1>
                <div class="hr1"></div>
                <div v-for="message in messages" v-bind:key="message.id" v-if="postC.shop_Id === message.shopId && message.personId != person.id">
                    <div class="message_text">
                        <h5 style="color: black;">{{ message.comment }}</h5>
                    </div>
                </div>
                <button v-on:click="navigateTo('/results/' + person.id + '/' + postC.id)">ตอบข้อความ</button>
            </div>
        </div>
        <div v-else-if="person && person.type === 'shop'">
            <button1 v-on:click="navigateTo('/shop/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
            <h1>
                <span2>ข้อความ</span2>
            </h1>
            <div class="reply">
                <h1>{{ postC.company_name }}</h1>
                <div class="hr1"></div>
                <div v-for="message in messages" v-bind:key="message.id" v-if="shop.companyId === message.postCId && message.personId != person.id">
                    <div class="message_text">
                        <h5 style="color: black;">{{ message.comment }}</h5>
                    </div>
                </div>
                <button v-on:click="navigateTo('/result/' + person.id + '/' + shop.id)">ตอบข้อความ</button>
            </div>
        </div>
        <div v-else>
            <button1 v-on:click="navigateTo('/indexs/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import MessageService from '../services/MessageService'
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
                type: ''
            },
            messages: [],
            postC: {
                product_name: '',
                purpose: '',
                category: '',
                detail: '',
                quantity: '',
            },
            shop: {
                shop_name: '',
                shop_img: '',
                product_name: '',
                purpose: '',
                category: '',
                detail: '',
                quantity: '',
                price: '',
            }
        }
    },

    async created() {
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
        let postCId = this.$route.params.postCId
        let shopId = this.$route.params.shopId
        this.postC = (await PostCService.show(postCId)).data
        this.shop = (await ShopService.show(shopId)).data
        this.messages = (await MessageService.index()).data
    },

    methods: {
        navigateTo(route) {
            this.$router.push(route)
        }
    }
}
</script>
<style scoped>
.full {
    width: 100vw;
    height: 150vh;
    background-color: #00204a;
}

.full span2 {
    color: #ffffff;
}

.reply {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
    margin: 50px 25% 0px 25%;
    padding: 20px 0px 50px 0px;
    border-radius: 20px 20px 20px 20px;
}
</style>