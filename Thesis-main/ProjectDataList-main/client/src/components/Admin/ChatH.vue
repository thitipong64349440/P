<template>
    <div class="full">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/replyA/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
            <h1>
                <span2>ข้อความ</span2>
            </h1>
            <div class="CH">
            <div class="reply">
                <h1>{{ person.name }}</h1>
                <div class="hr1"></div>
                <div v-for="message in messages" v-bind:key="message.id"
                    v-if="message.personId != person.id && message.postCId === null">
                    <div class="message_text" v-if="message.type === 'company'">
                        <h5 style="color: black;">{{ message.comment }}</h5>
                        <h3 style="color: black;">จาก {{ message.company_name }}</h3>
                    </div>
                    <div class="message_text" v-if="message.type === 'shop'">
                        <h5 style="color: black;">{{ message.comment }}</h5>
                        <h3 style="color: black;">จาก {{ message.shop_name }}</h3>
                    </div>
                </div>
                <button style="margin-bottom: 20px;" v-on:click="navigateTo('/chatA/' + person.id)">ตอบข้อความ</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import MessageService from '@/services/MessageService'
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
            postCs: [],
            shops: []
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
.CH{
    display: flex;
    justify-content: center;
    align-items: center;
}
.reply {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
    width: 30%;
    margin-top: 30px;
    border-radius: 5%;
}
.hr1 {
    margin: 10px 0;
}

.message_text {
    padding: 50px;
    background-color: #f1f1f1;
}

.message_text h5 {
    margin-bottom: 15px;
}

.message_text h3 {
    font-size: 1rem;
}

/* ปรับแต่งสำหรับหน้าจอมือถือ */
@media (max-width: 768px) {
    .reply {
        width: 80%;
        padding: 15px;
        border-radius: 10px;
    }

    h1 {
        font-size: 1.5rem;
    }

    h5 {
        font-size: 1rem;
    }
}
</style>