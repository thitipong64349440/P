<template>
    <div class="about_section">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/indexs/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
        <h1>
            <span2>ร้านค้า</span2>
        </h1>
        <div class="hr" v-for="shop in shops" v-bind:key="shop.id">
            <div style="margin-left: 25%;">
                <a1 style="font-weight: 600; font-size: 40px">{{ shop.shop_name }}</a1>
            </div>
            <div class="text_shop">
                <div class="col-md-2 col-lg-3">
                    <img style="margin-bottom:5px;" :src="BASE_URL + shop.thumbnail" alt="thumbnail">
                </div>
                <div class="col-md-2 col-lg-2"><a>ชื่อสินค้า :</a>
                    <a1>{{ shop.product_name }}</a1>
                </div>
                <div class="col-md-2 col-lg-2"><a>จำนวน :</a>
                    <a1>{{ shop.quantity }}</a1>
                </div>
                <div class="col-md-3 col-lg-4"><a>ราคา :</a>
                    <a1>{{ shop.price }}</a1>
                </div>
            </div>
            <div class="button_shop">
                <button v-on:click="navigateTo('/shop/detail/' + person.id + '/' + shop.id)">ดูรายละเอียด</button>
                <button class="de" v-on:click="deleteShop(shop)">ลบข้อมูล</button>
            </div>
            <hr>
            <hr>
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
            postC: null,
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
        navigateTo(route) {
            this.$router.push(route)
        }
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


    catch(error) {
        console.log(error)
    }
}
</script>
<style scoped>
.button_shop .de{
    box-shadow: 0 4px 20px 5px rgba(250, 41, 41, 0.5);
    border-bottom: 1px solid black;
}
</style>
