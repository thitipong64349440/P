<template>
    <div class="full fullRC">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/postC/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
        <h1>
            <span2>สินค้าที่ตามความต้องการ</span2>
        </h1>
        <div v-if="person && person.type === 'company'">
            <div class="textRC">
            <a1>{{ postC.shop_name }}</a1>
        </div>
            <div v-for="shop in shops" v-bind:key="shop.id" v-if="postC.id === shop.companyId">
                <div class="pictures-box1">
                    <div class="pictures">
                        <div v-for="(shop_img, index) in getShopImages(shop)" :key="index">
                            <img :src="BASE_URL + shop_img" alt="shop_img">
                        </div>
                    </div>
                </div>
                <div class="text_detail text_detailRC">
                    <a>ชื่อสินค้า:</a>
                    <a1>{{ shop.product_name }}</a1><br>
                    <p></p>
                    <a>จุดประสงค์:</a>
                    <a1>{{ shop.purpose }}</a1><br>
                    <p></p>
                    <a>ประเภท:</a>
                    <a1>{{ shop.category }}</a1><br>
                    <p></p>
                    <a>รายละเอียด:</a>
                    <a1>{{ shop.detail }}</a1><br>
                    <p></p>
                    <a>จำนวน:</a>
                    <a1>{{ shop.quantity }}</a1><br>
                    <p></p>
                    <a>ราคา:</a>
                    <a1>{{ shop.price }}</a1>
                    <p></p>
                    <div class="button-center">
                        <button style="box-shadow: 0 4px 20px 5px rgba(77, 255, 22, 0.5);border-bottom: 1px solid black;" @click="goToQuotation(shop)">สั่งซื้อ</button>
                        <button style="margin-left: 20px; box-shadow: 0 4px 20px 5px rgba(250, 41, 41, 0.5);border-bottom: 1px solid black;" @click="deleteMatch(postC, shop)">ไม่สนใจ</button>
                    </div>
                </div>
                <!-- <div v-if="!isSend"> -->
                <div class="RC">
                    <br>
                    <form v-if="!isSend" class="messageRC" v-on:submit.prevent="createMessage">
                        <h2>{{ postC.shop_name }}</h2>
                        <a type="text" v-bind="message.shop_name = shop.shop_name"></a>
                        <a type="text" v-bind="message.shopId = shop.id"></a>
                        <div class="hr1"></div>
                        <div class="messageRC_box">
                            <textarea v-model="message.comment" placeholder="ข้อความ"></textarea>
                        </div>
                        <button type="submit">ส่ง</button>
                    </form>
                    <!-- </div> -->
                    <div class=" messageRC" v-else>
                        <h2>{{ postC.shop_name }}</h2>
                        <div class="hr1"></div>
                        <div class="messageRC_text">
                            <h3>ส่งข้อความสําเร็จ</h3>
                        </div>
                        <button @click="resetMessage">ส่งใหม่</button>
                    </div>
                    <br>
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
.fullRC {
    width: 100vw;
    /* height: 170vh; */
    background-color: #00204a;
}

.full span2 {
    color: #ffffff;
}

.text_detailRC a1 {
    font-weight: normal;
    display: block;
    margin-bottom: 10px;
    color: #f9fc44;
}

/* กล่องข้อความ */
/* .message {
    margin-top: 20px;
} */

/* .message_box {
    margin: 10px 0;
} */

.messageRC_text h3 {
    color: green;
    text-align: center;
}

.messageRC {
    background-color: #fff;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 40%;
    padding: 20px 0px 50px 0px;
}

.messageRC_box {
    margin-top: 20px;
}

.messageRC_box textarea {
    width: 500px;
    height: 150px;
    border-radius: 10px;
}

.messageRC_text {
    margin-top: 50px;
    margin-bottom: 50px;
}
.textRC a1{
    font-size: 2.5em;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-left: 20px;
    margin-top: 20px;
    color: #f9fc44;
}

@media (max-width: 768px) {

    .text_detailRC {
        padding: 10px;
        background-color: #033f77;
    }

    .messageRC {
        width: 90%;
        margin-bottom: 20px;
    }
    .RC{
        background-color: #00204a;
    }

    .messageRC_box textarea {
        width: 100%;
    }
    .messageRC button{
        width: 50%;
    }
}
</style>
