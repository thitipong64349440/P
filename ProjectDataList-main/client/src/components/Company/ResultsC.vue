<template>
    <div class="full">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/postC/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
        <h1>
            <span2>สินค้าที่ตามความต้องการ</span2>
        </h1>
        <div v-if="person && person.type === 'company'">
            <div v-for="shop in shops" v-bind:key="shop.id" v-if="postC.id === shop.companyId">
                <div class="pictures-box1">
                    <div class="pictures">
                        <div v-for="(shop_img, index) in getShopImages(shop)" :key="index">
                            <img :src="BASE_URL + shop_img" alt="shop_img">
                        </div>
                    </div>
                </div>
                <div class="text_detail">
                    <a>ชื่อสินค้า:</a>
                    <a1>{{ shop.product_name }}</a1><br><p></p>
                    <a>จุดประสงค์:</a>
                    <a1>{{ shop.purpose }}</a1><br><p></p>
                    <a>ประเภท:</a>
                    <a1>{{ shop.category }}</a1><br><p></p>
                    <a>รายละเอียด:</a>
                    <a1>{{ shop.detail }}</a1><br><p></p>
                    <a>จำนวน:</a>
                    <a1>{{ shop.quantity }}</a1><br><p></p>
                    <a>ราคา:</a>
                    <a1>{{ shop.price }}</a1>
                    <p></p>
                    <div class="button-center">
                        <button @click="goToQuotation(shop)">สั่งซื้อ</button>
                        <button @click="deleteMatch(postC, shop)">ไม่สนใจ</button>
                    </div>
                </div>
                <div v-if="!isSend">
                    <form class="message" v-on:submit.prevent="createMessage">
                        <h2>{{ postC.shop_name }}</h2>
                        <a type="text" v-bind="message.shop_name = shop.shop_name"></a>
                        <a type="text" v-bind="message.shopId = shop.id"></a>
                        <div class="hr1"></div>
                        <div class="message_box">
                            <textarea v-model="message.comment" placeholder="ข้อความ"></textarea>
                        </div>
                        <button type="submit">ส่ง</button>
                    </form>
                </div>
                <div class="message" v-else>
                    <h2>{{ postC.shop_name }}</h2>
                    <div class="hr1"></div>
                    <div class="message_text">
                    <h3>ส่งข้อความสําเร็จ</h3>
                    </div>
                    <button @click="resetMessage">ส่งใหม่</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import store from '../../store'
import MessageService from '../../services/MessageService'
export default {
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
            postC: {
                id: '',
                product_name: '',
                shop_name: '',
                purpose: '',
                category: '',
                detail: '',
                quantity: '',
            },
            shops: [],
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
            isSend: false
        }
    },
    // แสดงข้อมูล
    async created() {
        let postCId = this.$route.params.postCId
        this.postC = (await PostCService.show(postCId)).data
        this.shops = (await ShopService.index()).data
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
    },
    methods: {
        create() {
            this.$router.push({ name: 'postC-create' })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        // ลบข้อมูล
        async deleteMatch(postC, shop) {
            let result = confirm("want to delete?")
            if (result) {
                try {
                    this.postC.shop_name = null
                    this.postC.shop_Id = null
                    shop.company_name = null
                    shop.companyId = null
                    await PostCService.put(postC)
                    await ShopService.put(shop)
                    this.refreshData()
                    this.navigateTo({ path: '/postC/' + this.person.id })
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.postCs = (await PostCService.index()).data
        },
        getShopImages(shop) {
            return shop.shop_img.split(',');
        },
        goToQuotation(shop) {
            store.commit('toggleButtonVisibility')
            this.$router.push('/quotation/' + this.person.id + '/' + this.postC.id + '/' + shop.id)
        },
        async createMessage() {
            this.message.personId = this.person.id
            this.message.postCId = this.postC.id
            this.message.company_name = this.postC.company_name
            this.message.product_name = this.postC.product_name
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

    catch(error) {
        console.log(error)
    }
}
</script>
<style scoped>
.full {
    width: 100vw;
    height: 160vh;
    background-color: #00204a;
}

.full span2 {
    color: #ffffff;
}
</style>
