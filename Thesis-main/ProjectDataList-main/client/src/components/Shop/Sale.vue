<template>
    <div class="hero_area hero_area1">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="../assets/hero-bg.png" alt="">
            </div>
        </div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <button1 class="BS" v-on:click="navigateTo('/indexs/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
        </button1>
        <span3>
            <h1 style="margin-bottom: 30px;">โพสความสินค้า</h1>
        </span3>
        <form enctype="multipart/form-data" class="register-form" v-on:submit.prevent="createSale" novalidate>
            <div class="dropbox dropbox1">
                <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
                    @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                    accept="image/*" class="input-file">
                <p>
                    ลากไฟล์ลงมาที่นี้<br>หรือคลิกเพื่อค้นหา
                </p>
            </div>
            <div class="pictures-box pictures-box1">
                <ul class="pictures pictures1">
                    <li v-for="picture in pictures" v-bind:key="picture.id">
                        <img style="margin-bottom:5px;" :src="BASE_URL + picture.name" alt="picture image">
                        <button1 v-on:click="deletePicture(picture)">ลบ</button1>
                        <button v-on:click.prevent="useThumbnail(picture.name)">ตั้งรูปหน้าปก</button>
                    </li>
                </ul>
            </div>
            <div class="screen-2">
                <input class="product" type="text" placeholder="ชื่อสินค้า *" v-model="shop.product_name" required>
                <input class="quantity" type="text" placeholder="จำนวน" v-model="shop.quantity">
                <Multiselect v-model="selectedPurposes" :options="purposeOptions" :multiple="true"
                    :close-on-select="false" :clear-on-select="false" :preserve-search="true" :hide-selected="true"
                    :searchable="true" placeholder="เลือกจุดประสงค์" label="text" track-by="value" />
                <Multiselect v-model="selectedCategorys" :options="categoryOptions" :multiple="true"
                    :close-on-select="false" :clear-on-select="false" :preserve-search="true" :hide-selected="true"
                    :searchable="true" placeholder="เลือกหมวดหมู่" label="text" track-by="value" />
                <input class="detail" type="text" placeholder="รายละเอียด" v-model="shop.detail">
                <input class="price" type="text" placeholder="ราคา/หน่วย" v-model="shop.price">
                <!-- <input class="discount" type="text" placeholder="ส่วนลดเป็น %" v-model="shop.discount"> -->
                <a type="text" v-bind="shop.shop_name = person.shop_name"></a>
                <div class="button-center">
                    <button type="submit">โพส</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import ShopService from '@/services/ShopService'
import PersonService from '@/services/PersonService'
import UploadImage from '@/services/UploadImage'
import Multiselect from 'vue-multiselect'
const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;
export default {
    components: {
        Multiselect
    },
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
            error: null,
            uploadError: null,
            currentStatus: null,
            uploadFieldName: "userPhoto",
            uploadedFileNames: [],
            pic_name: [],
            pictures: [],
            pictureIndex: 0,
            shop: {
                product_name: '',
                shop_img: '',
                thumbnail: 'null',
                purpose: [],
                category: [],
                detail: '',
                quantity: '',
                price: '',
                discount: '',
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
        wait(ms) {
            return x => {
                return new Promise(resolve => setTimeout(() => resolve(x), ms));
            };
        },
        reset() {
            // reset form to initial state
            this.currentStatus = STATUS_INITIAL
            // this.uploadedFiles = []
            this.uploadError = null
            this.uploadedFileNames = []
        },
        async createSale() {
            for (let index = 0; index < this.pictures.length; index++) {
                this.pic_name.push(this.pictures[index].name)
            }
            this.shop.shop_img = this.pic_name.join(',')
            this.shop.purpose = this.selectedPurposes.map(p => p.text).join(',')
            this.shop.category = this.selectedCategorys.map(c => c.text).join(',')
            try {
                await ShopService.post(this.shop)
                this.$router.push({
                    path: '/indexs/' + this.person.id
                })
            } catch (err) {
                console.log(err)
            }
        },
        async save(formData) {
            // upload data to the server
            try {
                this.currentStatus = STATUS_SAVING
                await UploadImage.upload(formData)
                this.currentStatus = STATUS_SUCCESS

                let pictureJSON = []
                this.uploadedFileNames.forEach(uploadFilename => {
                    let found = false;
                    for (let i = 0; i < this.pictures.length; i++) {
                        if (this.pictures[i].name == uploadFilename) {
                            found = true
                            break
                        }
                    }
                    if (!found) {
                        this.pictureIndex++
                        let pictureJSON = {
                            id: this.pictureIndex,
                            name: uploadFilename
                        }
                        this.pictures.push(pictureJSON)
                    }
                })
                this.clearUploadResult()
            } catch (error) {
                console.log(error)
                this.currentStatus = STATUS_FAILED
            }
        },
        filesChange(fieldName, fileList) {
            // handle file changes
            const formData = new FormData();
            if (!fileList.length) return;
            // append the files to FormData
            Array.from(Array(fileList.length).keys()).map(x => {
                formData.append(fieldName, fileList[x], fileList[x].name);
                this.uploadedFileNames.push(fileList[x].name);
            });
            // save it
            this.save(formData);
        },
        async deletePicture(material) {
            let result = confirm("want to delete?")
            if (result) {
                let dataJSON = {
                    "filename": material.name
                }
                await UploadImage.delete(dataJSON)
                for (var i = 0; i < this.pictures.length; i++) {
                    if (this.pictures[i].id == material.id) {
                        this.pictures.splice(i, 1)
                        this.materialIndex--
                        break
                    }
                }
            }
        },
        clearUploadResult: function () {
            setTimeout(() => this.reset(), 5000);
        },

        navigateTo(route) {
            console.log(route)
            this.$router.push(route)
        },
        useThumbnail(filename) {
            console.log(filename)
            this.shop.thumbnail = filename
        },
    },
}
</script>
<style scoped>
.hero_area1 {
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
}

.register-form {
    align-items: center;
    margin: 0;
    width: 40%;
}

.hero_area1 button1 {
    align-self: start;
}

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

/* Media Queries สำหรับหน้าจอโทรศัพท์ */
@media (max-width: 767px) {
    .hero_area1 {
        height: 150vh;
    }

    .register-form {
        background-color: #6c80f7;
        width: 100%;
    }

    .product,
    .quantity,
    .detail,
    .price {
        width: 100%;
        margin-bottom: 15px;
    }

    span3 h1 {
        font-size: 1.5rem;
    }

    input,
    .multiselect,
    .dropbox1 {
        width: 100%;
        margin-bottom: 15px;
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .dropbox1 p {
        text-align: center;
        font-size: 1rem;
        color: #666;
    }

    .pictures-box1 ul.pictures1 {
        list-style: none;
        padding: 0;
    }

    .pictures-box1 img {
        max-width: 80px;
        height: auto;
        margin-right: 10px;
    }

    .pictures-box1 button1,
    .pictures-box1 button {
        font-size: 0.9rem;
        padding: 5px 10px;
        border: 1px solid #333;
        background-color: #fff;
        cursor: pointer;
    }
}
</style>