<template>
    <div class="hero_area">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="../assets/hero-bg.png" alt="">
            </div>
        </div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <button1 v-on:click="navigateTo('/shop/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a></button1>
        <h1>
            <span2>โพสหน่วยงาน</span2>
        </h1>
        <div v-if="person && person.type === 'shop'">
            <div v-for="postC in postCs" v-bind:key="postC.id" v-if="shop.id === postC.shop_Id">
                <div class="flexbox">
                    <div class="item3">
                        <div class="content3">
                            <a1>{{ postC.company_name }}</a1>
                            <div class="text">
                                <div style="display: flex; justify-content: flex-start;margin-top: 10px;">
                                    <a style="margin-right: 25px; margin-left: 40%;">ชื่อสินค้า:</a>
                                    <a style="flex: 1; margin-top: 0; height: 35px;">{{ postC.product_name }}</a>
                                </div>
                                <div style="display: flex; justify-content: flex-start;margin-top: 10px;">
                                    <a style="margin-right: 25px; margin-left: 38%;">จุดประสงค์:</a>
                                    <a style="flex: 1; margin-top: 0; height: 35px;">{{ postC.purpose }}</a>
                                </div>
                                <div style="display: flex; justify-content: flex-start;margin-top: 10px;">
                                    <a style="margin-right: 25px; margin-left: 41%;">ประเภท:</a>
                                    <a style="flex: 1; margin-top: 0; height: 35px;">{{ postC.category }}</a>
                                </div>
                                <div style="display: flex; justify-content: flex-start;margin-top: 10px;">
                                    <a style="margin-right: 25px; margin-left: 41.8%;">จำนวน:</a>
                                    <a style="flex: 1; margin-top: 0; height: 35px;">{{ postC.quantity }}</a>
                                </div>
                                <div style="display: flex; justify-content: flex-start;margin-top: 10px;">
                                    <a style="margin-right: 25px; margin-left: 37.1%;">รายละเอียด:</a>
                                    <a style="flex: 1; margin-top: 0; height: 35px;">{{ postC.detail }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-center" v-for="quatation in quatations" v-bind:key="quatation.id" v-if="shop.id == quatation.shop_Id">
                    <button v-on:click="navigateTo('/quotationS/' + person.id + '/' + shop.id + '/' + quatation.id)">สั่งซื้อ</button>
                </div>
                <div v-if="!isSend">
                    <form class="message" v-on:submit.prevent="createMessage">
                        <h2>{{ shop.company_name }}</h2>
                        <a type="text" v-bind="message.company_name = postC.company_name"></a>
                        <a type="text" v-bind="message.postCId = postC.id"></a>
                        <div class="hr1"></div>
                        <div class="message_box">
                            <textarea v-model="message.comment" placeholder="ข้อความ"></textarea>
                        </div>
                        <button type="submit">ส่ง</button>
                    </form>
                </div>
                <div class="message" v-else>
                    <h2>{{ shop.company_name }}</h2>
                    <div class="hr1"></div>
                    <div class="message_text">
                        <h3>ส่งข้อความสําเร็จ</h3>
                    </div>
                    <button @click="resetMessage">ส่งใหม่</button>
                </div>
            </div>
        </div>
        <p></p>
        <hr>
    </div>
</template>
<script>
import store from '../../store'
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import QuatationService from '@/services/QuatationService'
import MessageService from '../../services/MessageService'
export default {
    data() {
        return {
            shop: {
                id: '',
                product_name: '',
                purpose: '',
                category: '',
                detail: '',
                quantity: '',
                price: ''
            },
            postCs: [],
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
            message: {
                company_name: '',
                product_name: '',
                comment: '',
                shop_name: '',
                personId: '',
                type: ''
            },
            quatations:[], 
            isSend: false
        }
    },
    // แสดงข้อมูล
    async created() {
        let shopId = this.$route.params.shopId
        this.shop = (await ShopService.show(shopId)).data
        this.postCs = (await PostCService.index()).data
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
        this.quatations = (await QuatationService.index()).data
    },
    methods: {
        create() {
            this.$router.push({ name: 'postC-create' })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        // ลบข้อมูล
        async deletePost_Company(postC) {
            let result = confirm("want to delete?")
            if (result) {
                try {
                    await PostCService.delete(postC)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async createMessage() {
            this.message.personId = this.person.id
            this.message.shopId = this.shop.id
            this.message.shop_name = this.shop.shop_name
            this.message.product_name = this.shop.product_name
            this.message.type = this.person.type
            try {
                await MessageService.post(this.message)
                // this.$router.push({
                //     path: '/indexs/' + this.person.id
                // })
            } catch (err) {
                console.log(err)
            }
            this.isSend = !this.isSend
        },
        async refreshData() {
            this.shops = (await ShopService.index()).data
        },
        goToQuotation(postC) {
            store.commit('toggleButtonVisibility')
            this.$router.push('/quotation/' + this.person.id + '/' + postC.id + '/' + this.shop.id)
        },
        resetMessage() {
            this.isSend = !this.isSend
            this.message = {
                company_name: '',
                product_name: '',
                comment: '',
                shop_name: '',
                personId: '',
                type: ''
            }
        }
    },
    // computed: {
    //     showButton() {
    //         return store.state.showButton
    //     }
    // },


    catch(error) {
        console.log(error)
    }
}
</script>
<style scoped></style>
