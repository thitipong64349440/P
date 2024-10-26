<template>
    <div class="hero_area">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="../assets/hero-bg.png" alt="">
            </div>
        </div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <button1 v-on:click="navigateTo('/postC/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a></button1>
        <h1>
            <span>แก้ไขข้อมูล</span>
        </h1>

        <form v-on:submit.prevent="editPostC">
            <div class="flexbox">
                <!-- ส่วนข้อมูลสินค้า -->
                <div class="item3">
                    <div class="content3">
                        <div class="text">
                            <label>ชื่อสินค้า:</label>
                            <input type="text" v-model="postC.product_name">

                            <label>จุดประสงค์:</label>
                            <Multiselect class="multiselect1" v-model="selectedPurposesComputed"
                                :options="purposeOptions" :multiple="true" :close-on-select="false"
                                :clear-on-select="false" :preserve-search="true" :hide-selected="true"
                                :searchable="true" placeholder="เลือกจุดประสงค์" label="text" track-by="value"
                                required />

                            <label>หมวดหมู่:</label>
                            <Multiselect class="multiselect1" v-model="selectedCategorysComputed"
                                :options="categoryOptions" :multiple="true" :close-on-select="false"
                                :clear-on-select="false" :preserve-search="true" :hide-selected="true"
                                :searchable="true" placeholder="เลือกหมวดหมู่" label="text" track-by="value" required />

                            <label>จำนวน:</label>
                            <input type="text" v-model="postC.quantity">

                            <label>รายละเอียด:</label>
                            <textarea v-model="postC.detail"></textarea>
                        </div>
                    </div>
                </div>

                <!-- ส่วนแสดงข้อมูล -->
                <div class="item3">
                    <div class="content3">
                        <div class="text">
                            <label>ชื่อสินค้า:</label>
                            <span>{{ postC.product_name }}</span>

                            <label>จุดประสงค์:</label>
                            <span>{{ postC.purpose }}</span>

                            <label>ประเภท:</label>
                            <span>{{ postC.category }}</span>

                            <label>จำนวน:</label>
                            <span>{{ postC.quantity }}</span>

                            <label>รายละเอียด:</label>
                            <span>{{ postC.detail }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="button-center">
                <button type="submit">ยืนยันการแก้ไข</button>
            </div>
        </form>
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
        try {
            let personId = this.$route.params.personId
            this.person = (await PersonService.show(personId)).data
            let postCId = this.$route.params.postCId
            this.postC = (await PostCService.show(postCId)).data
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async editPostC() {
            this.postC.purpose = this.selectedPurposes.map(p => p.text).join(',')
            this.postC.category = this.selectedCategorys.map(c => c.text).join(',')
            try {
                await PostCService.put(this.postC)
                this.$router.push({
                    name: 'postC-show'
                })
            } catch (err) {
                console.log(err)
            }
        },
        navigateTo(route) {
            this.$router.push(route)
        },
    },
    computed: {
        selectedPurposesComputed: {
            get() {
                return this.selectedPurposes;
            },
            set(value) {
                this.selectedPurposes = value;
                this.postC.purpose = value.map(option => option.value).join(", ");
            }
        },
        selectedCategorysComputed: {
            get() {
                return this.selectedCategorys;
            },
            set(value) {
                this.selectedCategorys = value;
                this.postC.category = value.map(option => option.value).join(", ");
            }
        }
    },
    mounted() {
        PostCService.show(this.$route.params.postCId).then(response => {
            const postCData = response.data
            this.postC.purpose = postCData.purpose
            this.postC.category = postCData.category
            this.selectedPurposes = postCData.purpose.split(',').map(purpose => ({ value: purpose, text: purpose }))
            this.selectedCategorys = postCData.category.split(',').map(category => ({ value: category, text: category }))
        })
    }
}
</script>
<style>
.hero_area {
    padding: 10px;
}

.item3 {
    margin-bottom: 15px;
}

h1 span {
    color: #ffffff;
}

.content3 {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.text {
    display: flex;
    flex-direction: column;
}

.text span {
    margin-bottom: 10px;
    font-weight: 100;
    font-size: 15px;
}

.text label {
    font-size: 17px;
}


input,
textarea,
.multiselect1 {
    width: 100%;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

/* Media queries สำหรับหน้าจอเล็ก */
@media (max-width: 767px) {
    .text {
        font-size: 14px;
    }
}
</style>