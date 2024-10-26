<template>
    <div class="about_section">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/indexs/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
        <h1>
            <span2>โพสร้านค้า</span2>
        </h1>
        <div class="hr" enctype="multipart/form-data" v-for="shop in shops" v-bind:key="shop.id"
            v-if="shop.shop_name === person.shop_name">
            <div class="text_shop">
                <div class="col-md-2 col-lg-3">
                    <img style="margin-bottom:5px;" :src="BASE_URL + shop.thumbnail" alt="thumbnail">
                </div>
                <div class="col-md-2 col-lg-3"><a>ชื่อสินค้า :</a>
                    <a1>{{ shop.product_name }}</a1>
                </div>
                <div class="col-md-2 col-lg-1"><a>จำนวน :</a>
                    <a1>{{ shop.quantity }}</a1>
                </div>
                <div class="col-md-3 col-lg-1"><a>ราคา :</a>
                    <a1>{{ shop.price }}</a1>
                </div>
                <div class="col-md-3 col-lg-1" style="margin-right: 70px;"><a>วันที่สร้าง :</a>
                    <a1>{{ createdDate(shop.createdAt) }}</a1>
                </div>
                <div class="col-md-2 col-lg-8" v-if="shop.company_name != null">
                    <button style="box-shadow: 0 4px 20px 5px rgba(77, 255, 22, 0.5);border-bottom: 1px solid black;" class="bg-danger" v-on:click="navigateTo('/result/' + person.id + '/' + shop.id)">ดูข้อมูล
                    </button>
                    <div style="margin-top: 30px;" v-if="hasMatchingMessage(shop)">
                        <button class="bg-danger"
                            v-on:click="navigateTo('/reply/' + person.id + '/' + shop.companyId + '/' + shop.id)">ตอบข้อความ
                        </button>
                    </div>
                </div>
            </div>
            <div class="button_shop">
                <button v-on:click="navigateTo('/shop/edit/' + person.id + '/' + shop.id)">แก้ไขข้อมูล</button>
                <button v-on:click="navigateTo('/shop/detail/' + person.id + '/' + shop.id)">ดูรายละเอียด</button>
                <button style="box-shadow: 0 4px 20px 5px rgba(250, 41, 41, 0.5); border-bottom: 1px solid black;" v-on:click="deletePost_Company(shop)">ลบข้อมูล</button>
            </div>
            <hr>
            <hr>
        </div>
    </div>
</template>
<script>
import ShopService from '@/services/ShopService'
import PersonService from '@/services/PersonService'
import MessageService from '../../services/MessageService'
export default {
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
            error: null,
            uploadError: null,
            currentStatus: null,
            uploadFieldName: "userPhoto",
            uploadedFileNames: [],
            pictures: [],
            pictureIndex: 0,
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
            messages: []
        }
    },
    // แสดงข้อมูล
    async created() {
        this.shops = (await ShopService.index()).data
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
        this.messages = (await MessageService.index()).data
    },
    methods: {
        create() {
            this.$router.push({ name: 'shop-create' })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        // ลบข้อมูล
        async deletePost_Company(shop) {
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
        createdDate(createdAt) {
            let date = new Date(createdAt)
            return date.toLocaleDateString('en-GB')
        },
        hasMatchingMessage(shop) {
            return this.messages.some(message => message.postCId === shop.companyId)
        }
    },
    catch(error) {
        console.log(error)
    },
}
</script>
<style scoped></style>
