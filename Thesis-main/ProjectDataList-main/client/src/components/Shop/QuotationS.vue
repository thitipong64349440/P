<template>
    <div class="full QC">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <!-- <button1 v-on:click="navigateTo('/result/' + person.id + '/' + shop.id)"><a><i
                        class="bi bi-caret-left">กลับ</i></a></button1> -->
        <div v-if="person && person.type === 'shop'">
            <button1 v-on:click="navigateTo('/result/' + person.id + '/' + shop.id)"><a><i
                        class="bi bi-caret-left">กลับ</i></a></button1>
        </div>
        <div v-else>
            <button1 v-on:click="navigateTo('/postCs/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
        <h1>
            <span2>ใบเสนอราคา</span2>
        </h1>
        <div class="quotation" id="quotation">
            <div class="header">
                <div class="company-info">
                    <h2>{{ quatation.shop_name }}</h2>
                    <p>เลขที่ผู้เสียภาษี: {{ quatation.taxS_Id }} </p>
                </div>
                <div class="quotation-title">
                    <h3>Quotation</h3>
                    <p>ใบเสนอราคา</p>
                    <p>{{ quatation.quotation_id }}</p>
                </div>
            </div>

            <div class="info-section">
                <div class="left">
                    <p><strong>ชื่อหน่วยงาน:</strong> {{ quatation.company_name }}</p>
                    <p><strong>เลขผู้เสียภาษี:</strong> {{ quatation.taxC_Id }}</p>
                    <p><strong>ที่อยู่:</strong> {{ quatation.address }}</p>
                </div>
                <div class="right">
                    <p><strong>วันที่:</strong> {{ formatDateFromDB(quatation.createdAt) }}</p>
                    <p><strong>การชำระเงิน:</strong> 60 วัน</p>
                </div>
            </div>

            <table class="item-table">
                <thead>
                    <tr>
                        <th>เลขที่</th>
                        <th>รายการ</th>
                        <th>จำนวน</th>
                        <th>ราคา/หน่วย</th>
                        <th>จำนวนเงิน (THB)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{{ quatation.product_name }}</td>
                        <td>{{ quatation.quantity }}</td>
                        <td>{{ quatation.price }}</td>
                        <td>{{ quatation.money }}</td>
                    </tr>
                    <tr>
                        <td style="color: #fdfde0;">2</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style="color: #fdfde0;">3</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <div class="footer">
                <div class="amount-text"></div>
                <div class="summary">
                    <div class="summary-row"><span>รวมเป็นเงิน:</span><span>{{ quatation.money }}</span>
                    </div>
                    <div class="summary-row"><span>จำนวนภาษีมูลค่าเพิ่ม 7%:</span><span>{{ quatation.tax }}</span></div>
                    <div class="summary-row total"><span>จำนวนเงินรวมทั้งสิ้น:</span><span>{{ quatation.amount_money
                            }}</span></div>
                </div>
            </div>
            <div class="footer2">
                <div class="footer-item">สั่งซื้อโดย<p style="color: black;">{{ quatation.name }}</p>
                </div>
                <div class="footer-item">เสนอโดย<p style="color: black;">{{ quatation.shop_name }}</p>
                </div>
                <div class=""></div>
            </div>
        </div>
        <div class="button-center">
            <button style="margin-bottom: 50px;" @click="downloadPDF()"><i class="bi bi-download"></i>Download</button>
        </div>
    </div>
</template>
<script>
import PersonService from '@/services/PersonService'
import PostCService from '@/services/PostCService'
import ShopService from '@/services/ShopService'
import QuatationService from '@/services/QuatationService'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
export default {
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
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
        let quatationId = this.$route.params.quatationId
        this.quatation = (await QuatationService.show(quatationId)).data
        // this.setCurrentDate();
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
        formatDateFromDB(isoDate) {
            const date = new Date(isoDate);
            const day = ('0' + date.getDate()).slice(-2); // เติมเลข 0 ถ้าวันมีแค่หลักเดียว
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // เดือนเริ่มที่ 0 ต้อง +1
            const year = date.getFullYear(); // ปีแบบเต็ม
            return `${day}/${month}/${year}`; // รูปแบบ DD/MM/YYYY
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
    width: 794px;
    height: 1123px;
    padding: 20px;
    background-color: #fdfde0;
    font-family: Arial, sans-serif;
    margin: auto;
    border: 1px solid #ddd;
    box-sizing: border-box;
}

.header {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #008000;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.company-info {
    width: 50%;

    p {
        color: #000;
    }
}

.quotation-title {
    text-align: right;

    p {
        color: #000;
    }
}

.info-section {
    display: flex;
    margin-right: 50px;
    justify-content: space-between;
    margin-bottom: 20px;

    p {
        color: #000;
    }
}

.item-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.item-table th,
.item-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.amount-text {
    font-weight: bold;
    padding-top: 10px;
    width: 60%;
}

.summary {
    width: 50%;
    font-size: 16px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
}

.summary-row.total {
    background-color: #008000;
    color: #fff;
    font-weight: bold;
    padding: 10px;
}

.summary-row span {
    display: inline-block;
}

.summary-row span:first-child {
    text-align: left;
}

.summary-row span:last-child {
    text-align: right;
    width: 100px;
}

.footer2 {
    margin-top: 30px;
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

@media (max-width: 768px) {
    .quotation {
        width: 100%;
        height: 1000px;
    }

    .quotation .company-info {
        p {
            font-size: 15px;
            margin: 3px 0;
        }

        h2 {
            font-size: 1.4rem;
            margin: 5px 0;
        }
    }

    .quotation .quotation-title h3 {
        font-size: 1.4rem;
        margin: 5px 0;
    }

    .quotation .quotation-title p {
        font-size: 15px;
        margin: 3px 0;
    }

    .quotation .info-section {
        margin: 0;
    }

    .info-section .left {
        width: 50%;
    }

    .quotation .item-table {
        font-size: 0.8rem;
    }

    .quotation .summary {
        font-size: 0.9rem;
        width: 70%;
    }
    .QC span2{
        color: #ffffff;
    }
    .QC{
        height: 100%;
    }
}

/* จัดเตรียมให้พิมพ์เต็มหน้า A4 */
@media print {
    .quotation {
        width: 210mm;
        height: 297mm;
        margin: 0;
        border: none;
    }
}
</style>
