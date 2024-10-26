<template>
    <div class="about_section about_sectionHC layout_padding5">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <button1 v-on:click="navigateTo('/indexs/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a></button1>
        <h1>
            <span2>โพสหน่วยงาน</span2>
        </h1>
        <div v-for="postC in reversedPostCs" v-bind:key="postC.id" v-if="postC.company_name === person.company_name">
            <div class="footer_container">
                <section class="info_section ">
                    <div class="container">
                        <div class="ggg">
                            <h1>{{ postC.company_name }}</h1>
                        </div>
                        <div class="row1">
                            <div class="col-md-1 col-lg-2 ">
                                <h4>
                                    ชื่อสินค้า:
                                </h4>
                                <p>
                                    {{ postC.product_name }}
                                </p>
                            </div>
                            <div class="col-md-1 col-lg-2 mx-auto">
                                <div class="info_link_box">
                                    <h4>
                                        จุดประสงค์:
                                    </h4>
                                    <div class="info_links">
                                        <a>{{ postC.purpose }}</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1 col-lg-2 ">
                                <h4>
                                    ประเภท:
                                </h4>
                                <div class="info_links">
                                    <a>{{ postC.category }}</a>
                                </div>
                            </div>
                            <div class="col-md-1 col-lg-3 mb-0">
                                <div class="info_contact">
                                    <h4>
                                        รายละเอียด:
                                    </h4>
                                    <div class="contact_link_box">
                                        <a>
                                            {{ postC.detail }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1 col-lg-1 mb-0">
                                <div class="info_contact">
                                    <h4>
                                        จำนวน:
                                    </h4>
                                    <div class="contact_link_box">
                                        <a>
                                            {{ postC.quantity }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1 col-lg-2 mb-0">
                                <div class="info_contact">
                                    <h4>
                                        วันที่สร้าง:
                                    </h4>
                                    <div class="contact_link_box">
                                        <a>
                                            {{ createdDate(postC.createdAt) }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="su">
                                <button
                                    v-on:click="navigateTo('/postC/edit/' + person.id + '/' + postC.id)">แก้ไขข้อมูล</button>
                            </div>
                            <div class="sa">
                                <button style="padding: 10px 20px 10px 20px; box-shadow: 0 4px 20px 5px rgba(250, 41, 41, 0.5);border-bottom: 1px solid black;" v-on:click="deletePost_Company(postC)">ลบข้อมูล</button>
                            </div>
                            <div class="su" v-if="postC.shop_name != null">
                                <button style="box-shadow: 0 4px 20px 5px rgba(77, 255, 22, 0.5);border-bottom: 1px solid black;"
                                    v-on:click="navigateTo('/results/' + person.id + '/' + postC.id)">ดูข้อมูล
                                </button>
                                <div class="si" v-if="hasMatchingMessage(postC)">
                                    <button4
                                        v-on:click="navigateTo('/reply/' + person.id + '/' + postC.id + '/' + postC.shop_Id)">ตอบข้อความ
                                    </button4>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import MessageService from '../../services/MessageService'
export default {
    data() {
        return {
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
            messages: []
        }
    },
    // แสดงข้อมูล
    async created() {
        this.postCs = (await PostCService.index()).data
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
        this.messages = (await MessageService.index()).data
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
        async refreshData() {
            this.postCs = (await PostCService.index()).data
        },
        createdDate(createdAt) {
            let date = new Date(createdAt)
            return date.toLocaleDateString('en-GB')
        },

        hasMatchingMessage(postC) {
            return this.messages.some(message => message.shopId === postC.shop_Id)
        }
    },

    computed: {
        reversedPostCs() {
            return this.postCs.slice().reverse();
        }
    },


    catch(error) {
        console.log(error)
    }
}
</script>
<style scoped>
.si{
    margin: 10px;
}

/* สำหรับหน้าจอขนาดเล็ก */
@media (max-width: 768px) {
    .su, .si {
        display: flex;
        flex-direction: column; 
        align-items: center;
        width: 100%; 
    }

    .su button, .si button4 {
        font-size: 1rem; 
        padding: 12px;
    }
}

</style>
