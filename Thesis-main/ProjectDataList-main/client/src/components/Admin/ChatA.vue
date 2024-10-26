<template>
    <div class="full">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/replyA/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
            <h1>
                <span2>ข้อความ</span2>
            </h1>
            <div class="reply">
                <form class="message" v-on:submit.prevent="createMessage">
                    เลือกฝ่ายที่จะติอต่อ
                    <select class="purpose" v-model="selectedUser">
                        <option value="หน่วยงาน">หน่วยงาน</option>
                        <option value="ร้านค้า">ร้านค้า</option>
                    </select>
                    <div v-if="!isSend">
                        <div v-if="selectedUser === 'หน่วยงาน'">
                            <div class="hr1" style="margin: 10px;"></div>
                            เลือกหน่วยงาน<p></p>
                            <select class="purpose" v-model="selectedPostCId">
                                <option v-for="postC in uniquePostCs" v-bind:key="postC.id" v-bind:value="postC.id">{{
                                    postC.company_name }}</option>
                            </select>
                            <div class="message_box">
                                <textarea v-model="message.comment" placeholder="ข้อความ"></textarea>
                            </div>
                            <button type="submit">ส่ง</button>
                        </div>
                        <div v-if="selectedUser === 'ร้านค้า'">
                            <div class="hr1" style="margin: 10px;"></div>
                            เลือกร้านค้า<p></p>
                            <select class="purpose" v-model="selectedShopId">
                                <option v-for="shop in uniqueShops" v-bind:key="shop.id" v-bind:value="shop.id">{{
                                    shop.shop_name }}</option>
                            </select>
                            <div class="message_box">
                                <textarea v-model="message.comment" placeholder="ข้อความ"></textarea>
                            </div>
                            <button type="submit">ส่ง</button>
                        </div>
                    </div>
                    <div class="message" v-else>
                        <div class="hr1"></div>
                        <div class="message_text">
                            <h3>ส่งข้อความสําเร็จ</h3>
                        </div>
                        <button @click="resetMessage">ส่งใหม่</button>
                    </div>
                </form>
                <div class="hr1"></div>
            </div>
        </div>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import MessageService from '@/services/MessageService';
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
            message: {
                company_name: '',
                product_name: '',
                comment: '',
                shop_name: '',
                personId: '',
                type: ''
            },
            postCs: [],
            shops: [],
            selectedUser: '',
            isSend: false,
            selectedPostCId: null,
            selectedShopId: null,
        }
    },

    async created() {
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
        this.postCs = (await PostCService.index()).data
        this.shops = (await ShopService.index()).data
        this.messages = (await MessageService.index()).data
    },

    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
        async createMessage() {
            this.message.personId = this.person.id
            this.message.type = this.person.type
            if (this.selectedUser === 'หน่วยงาน') {
                const selectedPostC = this.uniquePostCs.find(postC => postC.id === this.selectedPostCId)
                if (selectedPostC) {
                    this.message.company_name = selectedPostC.company_name
                }
            } else {
                const selectedShop = this.uniqueShops.find(shop => shop.id === this.selectedShopId)
                if (selectedShop) {
                    this.message.shop_name = selectedShop.shop_name
                }
            }
            try {
                await MessageService.post(this.message)
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
    computed: {
        uniquePostCs() {
            const uniqueNames = new Set();
            return this.postCs.filter(postC => {
                if (!uniqueNames.has(postC.company_name)) {
                    uniqueNames.add(postC.company_name);
                    return true;
                }
                return false;
            })
        },
        uniqueShops() {
            const uniqueNames = new Set();
            return this.shops.filter(shop => {
                if (!uniqueNames.has(shop.shop_name)) {
                    uniqueNames.add(shop.shop_name);
                    return true;
                }
                return false;
            })
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

/* Media Queries สำหรับหน้าจอโทรศัพท์ */
@media (max-width: 767px) {
    button1 {
        font-size: 0.9rem;
        padding: 8px 16px;
    }

    button1 i {
        margin-top: 20px;
        font-size: 1.25rem;
    }

    select.purpose,
    .message_box textarea {
        font-size: 0.9rem;
    }

    button[type="submit"],
    button[type="reset"],
    button[type="button"] {
        font-size: 0.9rem;
        padding: 8px;
    }

    .reply {
        width: 60%;
        padding: 20px;
    }

    .message_box textarea {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
    }

    select.purpose {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 20px;
    }


    .hr1 {
        border-bottom: 1px solid #ccc;
        margin: 10px 0;
    }

    .message_text h3 {
        color: green;
        text-align: center;
        font-size: 20px;
    }
}
</style>