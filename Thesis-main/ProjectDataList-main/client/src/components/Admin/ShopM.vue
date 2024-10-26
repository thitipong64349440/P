<template>
    <div class="about_section layout_padding5">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/shops/' + person.id + '/' + postC.id)"><a><i
                        class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
        <h1>
            <span2>ร้านค้า</span2>
        </h1>
        <div v-for="shop in shops" v-bind:key="shop.id" v-if="!shop.company_name && !shop.company_Id">
            <div class="box">
                <div class="container1">
                    <div class="row2">
                        <div class="col-md-2 col-lg-2 ">
                            <img style="margin-bottom:5px;" :src="BASE_URL + shop.thumbnail" alt="thumbnail">
                        </div>
                        <div class="col-md-2 col-lg-2 ">
                            <h1>{{ shop.shop_name }}</h1>
                        </div>

                        <div class="col-md-2 col-lg-2 ">
                            <div><a>ชื่อสินค้า:</a>
                                <a1>{{ shop.product_name }}</a1>
                            </div>
                            <div><a>จำนวน:</a>
                                <a1>{{ shop.quantity }}</a1>
                            </div>
                            <div><a>ราคา:</a>
                                <a1>{{ shop.price }}</a1>
                            </div>
                        </div>
                        <div class="col-md-2 col-lg-2 ">
                            <button
                                style="box-shadow: 0 4px 20px 5px rgba(77, 255, 22, 0.5);border-bottom: 1px solid black;"
                                v-on:click="navigateTo('/match/' + person.id + '/' + postC.id + '/' + shop.id)">จับคู่</button>
                        </div>
                        <div class="col-md-2 col-lg-0 ">
                            <button
                                v-on:click="navigateTo('/detailA/' + person.id + '/' + postC.id + '/' + shop.id)">ดูรายละเอียด</button>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>
<script>
import ShopService from '@/services/ShopService'
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
export default {
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
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
            postC: {
                purpose: '',
                category: '',
                detail: '',
                quantity: '',
            },
        }
    },
    // แสดงข้อมูล
    async created() {
        let personId = this.$route.params.personId
        let postCId = this.$route.params.postCId
        this.person = (await PersonService.show(personId)).data
        this.postC = (await PostCService.show(postCId)).data
        this.shops = (await ShopService.index()).data
    },
    methods: {
        create() {
            this.$router.push({ name: 'shop-create' })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        // ลบข้อมูล
        async deleteShop(shop) {
            let result = confirm("want to delete?")
            if (result) {
                try {
                    await ShopService.delete(shop)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.shops = (await ShopService.index()).data
        },
    },
}
</script>
<style scoped></style>
