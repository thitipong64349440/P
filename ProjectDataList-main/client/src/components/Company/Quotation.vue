<template>
    <div class="full">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/results/' + person.id + '/' + postC.id)"><a><i
                        class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
        <h1>
            <span2>ใบเสนอราคา</span2>
        </h1>
        <div class="quotation" id="quotation">
            <form v-on:submit.prevent="createQuotation">
                <div class="header">
                    <div class="store-name">{{ postC.shop_name }}</div>
                    <div class="title">ใบเสนอราคา (Quotation)</div>
                </div>

                <div class="info-section">
                    <div class="left">
                        <div class="info-item">
                            <label>ชื่อหน่วยงาน</label>
                            <div class="underline">{{ person.company_name }}</div>
                        </div>
                        <div class="info-item">
                            <label>ที่อยู่หน่วยงาน</label>
                            <div class="underline">{{ person.address }}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="info-item">
                            <label>เลขที่ใบเสนอราคา</label>
                            <div class="underline"> {{ quatation.quotation_id }}</div>
                        </div>
                        <div class="info-item">
                            <label>วันที่</label>
                            <div class="underline">{{ currentDate }}</div>
                        </div>
                    </div>
                </div>

                <table class="quotation-table">
                    <thead>
                        <tr>
                            <th>ลำดับที่</th>
                            <th>รายละเอียดสินค้า</th>
                            <th>จำนวน</th>
                            <th>ราคา</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- สามารถเพิ่มข้อมูลในส่วนนี้ -->
                        <tr>
                            <td style="text-align: end;">1</td>
                            <td style="text-align: start;">{{ shop.product_name }}</td>
                            <td>{{ shop.quantity }}</td>
                            <td>{{ shop.price }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="footer">
                    <div class="footer-item">สั่งซื้อโดย<p style="color: black;">{{ person.name }}</p>
                    </div>
                    <div class="footer-item">เสนอโดย<p style="color: black;">{{ postC.shop_name }}</p>
                    </div>
                    <div class=""></div>
                </div>
                <a type="text" v-bind="quatation.company_name = person.company_name"></a>
                <a type="text" v-bind="quatation.product_name = shop.product_name"></a>
                <a type="text" v-bind="quatation.quantity = shop.quantity"></a>
                <a type="text" v-bind="quatation.shop_name = shop.shop_name"></a>
                <a type="text" v-bind="quatation.address = person.address"></a>
                <a type="text" v-bind="quatation.price = shop.price"></a>
                <a type="text" v-bind="quatation.name = person.name"></a>
                <a type="text" v-bind="quatation.company_Id = postC.id"></a>
                <a type="text" v-bind="quatation.shop_Id = shop.id"></a>
                <div class="button-center">
                    <button style="margin-top: 90%; margin-bottom: 50px;" type="submit" @click="downloadPDF()"><i
                            class="bi bi-download"></i>Download</button>
                </div>
            </form>
        </div>


    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import QuatationService from '@/services/QuatationService'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
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
            shop: {
                shop_name: '',
                shop_img: '',
                product_name: '',
                purpose: '',
                category: '',
                detail: '',
                quantity: '',
                price: '',
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
            quatation: {
                quotation_id: '',
                company_name: '',
                product_name: '',
                quantity: '',
                shop_name: '',
                shop_Id: '',
                company_Id: '',
                address: '',
                price: '',
                name: ''
            },
            currentDate: null
        }
    },
    // แสดงข้อมูล
    async created() {
        let postCId = this.$route.params.postCId
        this.postC = (await PostCService.show(postCId)).data
        let shopId = this.$route.params.shopId
        this.shop = (await ShopService.show(shopId)).data
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
        this.setCurrentDate();
    },
    mounted() {
        this.generateQuotationNumber();
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
        async refreshData() {
            this.postCs = (await PostCService.index()).data
        },
        async createQuotation() {
            try {
                await QuatationService.post(this.quatation)
            } catch (err) {
                console.log(err)
            }
        },
        downloadPDF() {
            const pdf = new jsPDF();
            const quotationElement = document.getElementById('quotation');
            html2canvas(quotationElement).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save('quotation.pdf');
            });
        },
        generateRandomLetters() {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let result = '';
            for (let i = 0; i < 2; i++) {
                result += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            return result;
        },
        // ฟังก์ชันสำหรับสร้างเลขใบเสนอราคา
        generateQuotationNumber() {
            const date = new Date();
            const year = date.getFullYear().toString().slice(2); // ปี 2 หลัก เช่น '23'
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // เดือน เช่น '09'
            const day = ('0' + date.getDate()).slice(-2); // วันที่ เช่น '18'

            // สุ่มตัวอักษร 2 ตัวแล้วรวมกับเลขที่คำนวณได้
            const quotationNumber = `${this.generateRandomLetters()}${year}${month}${day}`;
            this.quatation.quotation_id = quotationNumber
            return quotationNumber
        },
        setCurrentDate() {
            const date = new Date();
            const day = ('0' + date.getDate()).slice(-2); // ได้วันที่ เช่น '18'
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // ได้เดือน เช่น '09'
            const year = date.getFullYear(); // ได้ปี เช่น '2024'
            this.currentDate = `${day}/${month}/${year}`; // รูปแบบ DD/MM/YYYY
        }
    },
    catch(error) {
        console.log(error)
    }
}
</script>
<style scoped>
.full {
    width: 100vw;
    height: 100vh;
    /* background-color: #00204a; */
}

.full span2 {
    color: #000000;
}

.quotation {
    /* ขนาดสำหรับ A4 */
    width: 210mm;
    height: 297mm;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #fdfde0;
    box-sizing: border-box;
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.store-name {
    font-size: 20px;
    font-weight: bold;
}

.title {
    font-size: 24px;
    margin-top: 5px;
}

.info-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.left,
.right {
    width: 45%;
}

.info-item {
    margin-bottom: 15px;
}

.info-item label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
}

.underline {
    border-bottom: 1px solid black;
    width: 100%;
}

.quotation-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.quotation-table th,
.quotation-table td {
    border: 1px solid black;
    padding: 10px;
    text-align: center;
}

.footer {
    display: flex;
    justify-content: space-between;
}

.footer-item {
    width: 30%;
    text-align: center;
}

.footer-item::after {
    content: '';
    display: block;
    border-bottom: 1px solid black;
    margin-top: 15px;
}

/* จัดเตรียมให้พิมพ์เต็มหน้า A4 */
@media print {
    .quotation {
        margin: 0;
        box-shadow: none;
    }
}
</style>
