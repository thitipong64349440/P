<template>
    <div class="hero_area">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="./assets/hero-bg.png" alt="">
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
            <a v-if="person && person.type === 'company'" style="color: aqua;" class="active"
                v-on:click="navigateTo('/edit/' + person.id)">{{ person.name }}</a>
            <a v-else-if="person && person.type === 'shop'" style="color: aquamarine;" class="active"
                v-on:click="navigateTo('/edit/' + person.id)">{{ person.name }}</a>
            <a v-else style="color: yellow;" v-on:click="navigateTo('/replyA/' + person.id)" class="active">{{ person.name }}</a>
            <a style="color: red;" v-on:click="logout">Logout</a>
            <a href="javascript:void(0);" class="icon" @click="toggleMenu"><i class="fa fa-bars"></i></a>
        </div>
        <div2 class="EU">
            <div class="edituser" v-if="person && person.type === 'company'">
                <h1>{{ person.company_name }}</h1>
                <div v-if="!isMessaging && hasMatchedMessage(person)">
                    <button4 style="float: right; margin-right: 10px;" @click="toggleMessage">ข้อความจาก Admin</button4>
                </div>
            </div>
            <div class="edituser" v-else>
                <h1>{{ person.shop_name }}</h1>
                <div v-if="!isMessaging && hasMatchedMessage(person)">
                    <button4 style="float: right; margin-right: 10px;" @click="toggleMessage">ข้อความจาก Admin</button4>
                </div>
            </div>
            <form v-if="!isMessaging" v-on:submit.prevent="create">
                <div v-if="!isEditing">
                    <div class="eu">
                        <a>ชื่อ-นามสกุล:</a>
                        <h4>{{ person.name }} {{ person.lastname }}</h4>
                        <p></p>
                        <a>อีเมล:</a>
                        <h4>{{ person.email }}</h4>
                        <p></p>
                        <a>รหัสผ่าน:</a>
                        <h4>{{ maskedPassword }}</h4>
                        <p></p>
                        <a>ที่อยู่:</a>
                        <h4>{{ person.address }}</h4>
                        <p></p>
                        <a>เบอร์ติดต่อ:</a>
                        <h4>{{ person.tel }}</h4>
                    </div>
                </div>
                <div v-if="isEditing">
                    <div class="eu eu1">
                        <a>ชื่อ-นามสกุล:</a>
                        <p></p>
                        <input v-model="person.name" type="text" /><input v-model="person.lastname" type="text" />
                        <p></p>
                        <a>รหัสผ่าน:</a>
                        <p></p>
                        <input v-model="person.password" type="password" />
                        <p></p>
                        <a>ที่อยู่:</a>
                        <p></p>
                        <input v-model="person.address" type="text" />
                        <p></p>
                        <a>เบอร์ติดต่อ:</a>
                        <p></p>
                        <input v-model="person.tel" type="text" />
                    </div>
                </div>
                <div class="button-center">
                    <button @click="toggleEditing">{{ isEditing ? 'Save' : 'Edit' }}</button>
                </div>
            </form>
            <form v-if="isMessaging" v-on:submit.prevent="createMessage">
                <div v-if="person && person.type === 'company'">
                    <div v-for="message in messages" v-bind:key="message.id"
                        v-if="person.company_name === message.company_name && message.type === null && message.personId != person.id">
                        <div class="message_text">
                            <h5 style="color: black; margin-left: 20px;">{{ message.comment }}</h5>
                        </div>
                    </div>
                </div>
                <div v-if="person && person.type === 'shop'">
                    <div v-for="message in messages" v-bind:key="message.id"
                        v-if="person.shop_name === message.shop_name && message.type === null && message.personId != person.id">
                        <div class="message_text">
                            <h5 style="color: black; margin-left: 20px;">{{ message.comment }}</h5>
                        </div>
                    </div>
                </div>
                <div class="message_box" v-if="!isSend">
                    <textarea style="" v-model="message.comment" placeholder="ข้อความ"></textarea>
                    <button style="margin-left: 20px;" type="submit">ส่ง</button>
                </div>
                <div class="message" v-else>
                    <div class="hr1"></div>
                    <div class="message_text">
                        <h3>ส่งข้อความสําเร็จ</h3>
                    </div>
                </div>
            </form>
            <button v-if="isSend" @click="resetMessage">ส่งใหม่</button>
            <button style="float: right; margin: 20px;" v-if="isMessaging" @click="toggleMessage">Back</button>
        </div2>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import MessageService from '@/services/MessageService';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            person: null,
            shops: [],
            postCs: [],
            messages: [],
            message: {
                company_name: '',
                product_name: '',
                comment: '',
                shop_name: '',
                personId: '',
                type: ''
            },
            isEditing: false,
            isMessaging: false,
            isSend: false,
        }
    },
    computed: {
        maskedPassword() {
            return this.person.password.slice(0, 3) + this.person.password.slice(3).replace(/./g, '*');
        }
    },
    async created() {
        this.shops = (await ShopService.index()).data
        this.postCs = (await PostCService.index()).data
        this.messages = (await MessageService.index()).data
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
        },
        toggleEditing() {
            this.isEditing = !this.isEditing
        },
        hasMatchedMessage(person) {
            if (this.person.type === 'company') {
                return this.messages.some(message => message.company_name === person.company_name)
            } else {
                return this.messages.some(message => message.shop_name === person.shop_name)
            }
        },
        toggleMessage() {
            this.isMessaging = !this.isMessaging
        },
        async createMessage() {
            this.message.personId = this.person.id
            // this.message.postCId = this.postC.id
            // this.message.company_name = this.postC.company_name
            // this.message.product_name = this.postC.product_name
            this.message.type = this.person.type
            if (this.person.type === 'company') {
                this.message.company_name = this.person.company_name
            } else {
                this.message.shop_name = this.person.shop_name
            }
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
                postCId: '',
                product_name: '',
                comment: '',
                shop_name: '',
                shopId: '',
                personId: '',
                type: ''
            }
        }
    },
}
</script>
<style>
/* การตั้งค่าสำหรับ div หลัก */
.EU {
    border-radius: 20px;
    margin: 20px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: aliceblue;
    width: 30%;
}

/* การตั้งค่าสำหรับชื่อบริษัทและร้าน */
.edituser h1 {
    font-size: 1.5rem;
    text-align: center;
}

/* การตั้งค่าฟอร์ม */
form {
    width: 100%;
}
form .message_text{
    width: 100%;
    padding: 10px;
    word-wrap: break-word;
        white-space: normal; 
}

.eu a {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
}

/* ปรับขนาดข้อความ */
.eu h4 {
    font-size: 1rem;
    margin-bottom: 10px;
}

/* การตั้งค่ากล่องข้อความ */
.EU textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
}

/* การตั้งค่าข้อความที่ส่งสำเร็จ */
.message_text h3 {
    color: green;
    text-align: center;
}

/* Media Query สำหรับหน้าจอโทรศัพท์ */
@media (max-width: 768px) {
    .EU {
        width: 90%;
    }
    .EU button{
        margin: 0 auto;
        width: 50%;
    }

    textarea {
        margin-left: 0;
        width: 100%;
    }

    .message_box button {
        width: 30%;
        align-self: start;
    }
    form{
        width: 100%;
        /* background-color: aquamarine; */
        padding: 10px;
    }
    form .eu1{
        margin: 0;
        margin-top: 50px;
    }
    form .message_box textarea{
        width: 100%;
    }
    form .message_text{
        word-wrap: break-word;
        white-space: normal;    
    }
}

</style>