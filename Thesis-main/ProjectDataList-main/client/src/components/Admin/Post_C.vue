<template>
    <div class="about_section layout_padding5">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <button1 v-on:click="navigateTo('/indexs/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a></button1>
        <h1>
            <span2>โพสหน่วยงาน</span2>
        </h1>
        <div v-for="postC in reversedPostCs" v-bind:key="postC.id">
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
                            <div class="col-md-3 col-lg-3">
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
                            <div class="col-md-1 col-lg-1">
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
                            <div class="col-md-1 col-lg-2">
                                <div class="info_contact">
                                    <h4>
                                        วันที่สร้าง
                                    </h4>
                                    <div class="contact_link_box">
                                        <a>
                                            {{ createdDate(postC.createdAt) }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="su" v-if="postC.shop_name == null">
                                <button  v-on:click="navigateTo('/shops/' + person.id + '/' + postC.id)">จับคู่</button>
                            </div>
                            <div class="sa">
                                <button v-on:click="deletePost_Company(postC)">ลบข้อมูล</button>
                            </div>
                            <div v-for="quatation in quatations" v-bind:key="quatation.id">
                                <div class="su" v-if="postC.id == quatation.company_Id">
                                    <button
                                        v-on:click="navigateTo('/quotationS/' + person.id + '/' + shop.id + '/' + quatation.id)">ใบเสนอราคา</button>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </div>
                </section>
            </div>
            <hr>
        </div>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import QuatationService from '@/services/QuatationService'
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
            shop: {
                id: '',
            },
            quatations: [],
        }
    },
    // แสดงข้อมูล
    async created() {
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
        this.postCs = (await PostCService.index()).data
        let shopId = this.$route.params.shopId
        this.shop = (await ShopService.show(shopId)).data
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
        async refreshData() {
            this.postCs = (await PostCService.index()).data
        },
        createdDate(createdAt) {
            let date = new Date(createdAt)
            return date.toLocaleDateString('en-GB')
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
.su button {
    box-shadow: 0 4px 20px 5px rgba(77, 255, 22, 0.5);
    border-bottom: 1px solid black;
}
.sa button{
    box-shadow: 0 4px 20px 5px rgba(250, 41, 41, 0.5);
    border-bottom: 1px solid black;

}

</style>
