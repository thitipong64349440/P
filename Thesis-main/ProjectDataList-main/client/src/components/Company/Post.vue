<template>
    <div class="hero_area">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="../assets/hero-bg.png" alt="">
            </div>
        </div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <button1 v-on:click="navigateTo('/indexs/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a></button1>
        <div2 style="display:flex; align-items:center; justify-content:center;">
            <div class="form2">
                <span3>
                    <h1>โพสความต้องการ</h1>
                </span3>
                <form class="post-form" v-on:submit.prevent="createPost">
                    <div class="screen-2">
                        <input class="product" type="text" placeholder="ชื่อสินค้า *" v-model="postC.product_name"
                            required>
                        <input class="quantity" type="text" placeholder="จำนวน" v-model="postC.quantity">
                        <Multiselect class="multiselect" v-model="selectedPurposes" :options="purposeOptions"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                            :hide-selected="true" :searchable="true" placeholder="เลือกจุดประสงค์" label="text" track-by="value" />
                        <p></p>
                        <Multiselect class="multiselect" v-model="selectedCategorys" :options="categoryOptions"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                            :hide-selected="true" :searchable="true" placeholder="เลือกหมวดหมู่" label="text" track-by="value" />
                        <textarea class="detail" placeholder="รายละเอียด" v-model="postC.detail"></textarea>
                        <a type="text" v-bind="postC.company_name = person.company_name"></a>
                        <div class="button-center">
                            <button type="submit">โพสความต้องการ</button>
                        </div>
                    </div>
                </form>
            </div>
        </div2>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import Multiselect from 'vue-multiselect'
export default {
    components: {
        Multiselect
    },
    data() {
        return {
            postC: {
                company_name: '',
                product_name: '',
                purpose: [],
                category: [],
                detail: '',
                quantity: '',
            },
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
            purposeOptions: [
                { text: 'งานทั่วไป', value: 'งานทั่วไป' },
                { text: 'เล่นเกมและ eSports', value: 'เล่นเกมและ eSports' },
                { text: 'กราฟิกดีไซน์และตัดต่อวิดีโอ', value: 'กราฟิกดีไซน์และตัดต่อวิดีโอ' },
                { text: 'สถาปัตยกรรมและวิศวกรรม', value: 'สถาปัตยกรรมและวิศวกรรม' },
                { text: 'พัฒนาซอฟต์แวร์และการวิเคราะห์ข้อมูล', value: 'พัฒนาซอฟต์แวร์และการวิเคราะห์ข้อมูล' },
                { text: 'งานวิจัยและการประมวลผลหนัก', value: 'งานวิจัยและการประมวลผลหนัก' }
            ],
            categoryOptions: [
                { text: 'คอมพิวเตอร์ครบเซ็ต', value: 'คอมพิวเตอร์ครบเซ็ต' },
                { text: 'แป้นพิมพ์', value: 'แป้นพิมพ์' },
                { text: 'เมาส์', value: 'เมาส์' },
                { text: 'เครื่องพิมพ์', value: 'สแกนเนอร์' },
                { text: 'ไมโครโฟน', value: 'ไมโครโฟน' },
                { text: 'กล้องเว็บแคม', value: 'กล้องเว็บแคม' },
                { text: 'จอยเกม', value: 'จอยเกม' },
                { text: 'CPU', value: 'CPU' },
                { text: 'GPU', value: 'GPU' },
                { text: 'จอภาพ', value: 'จอภาพ' },
                { text: 'ลำโพง', value: 'ลำโพง' },
                { text: 'หูฟัง', value: 'หูฟัง' },
                { text: 'HDD', value: 'HDD' },
                { text: 'SSD', value: 'SSD' },
                { text: 'การ์ดหน่วยความจํา', value: 'การ์ดหน่วยความจํา' },
                { text: 'Power Supply', value: 'Power Supply' },
                { text: 'เครื่องพิมพ์ 3D', value: 'เครื่องพิมพ์ 3D' },
                { text: 'แผ่นรองเมาส์', value: 'แผ่นรองเมาส์' },
                { text: 'ฮับ USB', value: 'ฮับ USB' },
                { text: 'โน๊ตบุ๊ก', value: 'โน๊ตบุ๊ก' },
                { text: 'แท่นวางโน๊ตบุ๊ก', value: 'แท่นวางโน๊ตบุ๊ก' },
                { text: 'เมนบอร์ด', value: 'เมนบอร์ด' },
            ],
            selectedPurposes: [],
            selectedCategorys: [],
        }
    },
    async created() {
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
    },
    methods: {
        async createPost() {
            this.postC.purpose = this.selectedPurposes.map(p => p.text).join(',')
            this.postC.category = this.selectedCategorys.map(c => c.text).join(',')
            try {
                await PostCService.post(this.postC)
                this.$router.push({
                    name: 'postC-show'
                })
            } catch (err) {
                console.log(err)
            }
        },
        navigateTo(route) {
            this.$router.push(route)
        }
    },
}
</script>
<style scoped>
.multiselect {
    width: 100%;
    /* Set width to fit the container */
    margin-bottom: 10px;
    /* Space below the component */
}

.detail {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    /* Space below the textarea */
}

textarea {
    resize: vertical;
    /* Allow resizing only vertically */
}

a {
    display: block;
    /* Ensure the anchor is displayed properly */
    margin-top: 10px;
    /* Add margin to separate it from other elements */
}
@media (max-width: 768px) {
    span3 h1 {
        font-size: 1.2rem;
    }

    .form2 {
        padding: 15px;
    }

    .button-center button {
        width: 100%;
    }
    .post-form input,
    .post-form textarea,
    .post-form .multiselect {
        width: 100%; 
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 0.9rem;
    }
}
</style>