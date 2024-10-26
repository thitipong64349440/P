<template>
    <div class="about_section about_sectionES">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/shop/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
        <h1>
            <span2>แก้ไขข้อมูล</span2>
        </h1>
        <form enctype="multipart/form-data" v-on:submit.prevent="editShop" novalidate>
            <div class="dropbox dropbox2">
                <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
                    @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                    accept="image/*" class="input-file">
                <p>
                    ลากไฟล์ลงมาที่นี้<br>หรือคลิกเพื่อค้นหา
                </p>
            </div>
            <div class="pictures-box">
                <ul class="pictures">
                    <div style="justify-content: center; display: flex; align-items: center;"
                        v-if="shop.shop_img != null || shop.shop_img != []">
                        <li v-for="(shop_img, index) in shopImages" :key="index">
                            <img :src="BASE_URL + shop_img" alt="shop_img">
                            <button1 v-on:click="deleteImg(shop_img)">ลบ</button1>
                            <button v-on:click.prevent="useThumbnail(shop_img)">ตั้งรูปหน้าปก</button>
                        </li>
                    </div>
                    <li style="justify-content: center; display: flex; align-items: center;" v-for="picture in pictures"
                        v-bind:key="picture.id">
                        <img style="margin-bottom:5px;" :src="BASE_URL + picture.name" alt="picture image">
                        <button1 class="button1" v-on:click="deletePicture(picture)">ลบ</button1>
                        <button v-on:click.prevent="useThumbnail(picture.name)">ตั้งรูปหน้าปก</button>
                    </li>
                </ul>
            </div>
            <div class="flexbox">
                <div class="item3">
                    <div class="content3">
                        <div class="text">
                            <p>ชื่อสินค้า:</p>
                            <input type="text" v-model="shop.product_name" style="flex: 1;">
                            <p>จุดประสงค์:</p>
                            <Multiselect class="multiselect1" v-model="selectedPurposesComputed"
                                :options="purposeOptions" :multiple="true" :close-on-select="false"
                                :clear-on-select="false" :preserve-search="true" :hide-selected="true"
                                :searchable="true" placeholder=". เลือกจุดประสงค์" label="text" track-by="value"
                                style="flex: 1;" required />
                            <p>ประเภท:</p>
                            <Multiselect class="multiselect1" v-model="selectedCategorysComputed"
                                :options="categoryOptions" :multiple="true" :close-on-select="false"
                                :clear-on-select="false" :preserve-search="true" :hide-selected="true"
                                :searchable="true" placeholder=". เลือกหมวดหมู่" label="text" track-by="value"
                                style="flex: 1;" required />
                            <p>จำนวน:</p>
                            <input type="text" v-model="shop.quantity" style="flex: 1;">
                            <p>ราคา:</p>
                            <input type="text" v-model="shop.price" style="flex: 1;">
                            <p>รายละเอียด:</p>
                            <textarea v-model="shop.detail"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-center">
                <p><button type="submit">ยืนยันการแก้ไข</button></p>
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
                purpose: [],
                category: [],
                detail: '',
                quantity: '',
                price: '',
                shop_img: null,
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
            let shopId = this.$route.params.shopId
            this.shop = (await ShopService.show(shopId)).data
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async editShop() {
            for (let index = 0; index < this.pictures.length; index++) {
                this.pic_name.push(this.pictures[index].name)
            }
            this.shopImages.forEach(shopImage => {
                let found = false
                for (let index = 0; index < this.pic_name.length; index++) {
                    if (this.pic_name[index] == shopImage) {
                        found = true
                        break
                    }
                }
                if (!found) {
                    this.pic_name.push(shopImage)
                }
            })
            this.shop.shop_img = this.pic_name.join(',')
            this.shop.purpose = this.selectedPurposes.map(p => p.text).join(',')
            this.shop.category = this.selectedCategorys.map(c => c.text).join(',')
            try {
                await ShopService.put(this.shop)
                this.$router.push({
                    name: 'shop-show'
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
        async deleteImg(material) {
            let result = confirm("want to delete?")
            if (result) {
                let dataJSON = {
                    "filename": material
                }
                await UploadImage.delete(dataJSON)
                let imgs = this.shop.shop_img.split(',')
                imgs = imgs.filter(img => img !== material)
                this.shop.shop_img = imgs.join(',')
            }
        },
        clearUploadResult: function () {
            setTimeout(() => this.reset(), 5000);
        },

        navigateTo(route) {
            this.$router.push(route)
        },
        useThumbnail(filename) {
            console.log(filename)
            this.shop.thumbnail = filename
        },
    },
    computed: {
        shopImages() {
            return this.shop.shop_img.split(',')
        },
        selectedPurposesComputed: {
            get() {
                return this.selectedPurposes;
            },
            set(value) {
                this.selectedPurposes = value;
                this.shop.purpose = value.map(option => option.value).join(", ");
            }
        },
        selectedCategorysComputed: {
            get() {
                return this.selectedCategorys;
            },
            set(value) {
                this.selectedCategorys = value;
                this.shop.category = value.map(option => option.value).join(", ");
            }
        }
    },
    mounted() {
        ShopService.show(this.$route.params.shopId).then(response => {
            const shopData = response.data
            this.shop.purpose = shopData.purpose
            this.shop.category = shopData.category
            this.selectedPurposes = shopData.purpose.split(',').map(purpose => ({ value: purpose, text: purpose }))
            this.selectedCategorys = shopData.category.split(',').map(category => ({ value: category, text: category }))
        })
    }
}
</script>
<style scoped>
.about_sectionES form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.flexbox {
    width: 50%;
}

.flexbox .multiselect1 {
    width: 100%;
}

.dropbox2 {
    width: 50%;
    border: 2px dashed #ccc;
    padding: 10px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
}

.pictures-box button1,
.pictures-box button {
    background-color: #dc3545;
    border: none;
    margin-top: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    width: 50%;
}

.text input,
.text textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
}

/* การปรับสำหรับหน้าจอโทรศัพท์ */
@media (max-width: 768px) {
    .about_sectionES {
        margin-left: 0;
    }

    .flexbox {
        margin-top: 0px;
        width: 160%;
    }

    .dropbox {
        padding: 10px;
        font-size: 0.9rem;
    }

    .pictures-box img {
        width: 80px;
        height: 80px;
    }

    .pictures-box button1,
    .pictures-box button {
        background-color: #dc3545;
        border: none;
        padding: 5px;
        margin-top: 5px;
        cursor: pointer;
        font-size: 0.8rem;
        display: flex;
        justify-content: center;

    }

    .text input,
    .text textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .button-center button {
        margin-top: -10px;
        width: 100%;
    }

}
</style>