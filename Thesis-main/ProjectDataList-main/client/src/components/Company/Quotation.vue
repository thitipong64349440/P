<template>
    <div class="full QC">
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
                    <div class="company-info">
                        <h2>{{ postC.shop_name }}</h2>
                        <p>เลขที่ผู้เสียภาษี: <a></a>{{ taxS_Id }}</p>
                    </div>
                    <div class="quotation-title">
                        <h3>Quotation</h3>
                        <p>ใบเสนอราคา</p>
                        <p>{{ quatation.quotation_id }}</p>
                    </div>
                </div>

                <div class="info-section">
                    <div class="left">
                        <p><strong>ชื่อหน่วยงาน:</strong> {{ person.company_name }}</p>
                        <p><strong>เลขผู้เสียภาษี:</strong> {{ taxId }}</p>
                        <p><strong>ที่อยู่:</strong> {{ person.address }}</p>
                    </div>
                    <div class="right">
                        <p><strong>วันที่:</strong> {{ currentDate }}</p>
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
                            <td>{{ shop.product_name }}</td>
                            <td>{{ shop.quantity }}</td>
                            <td>{{ formattedPrice }}</td>
                            <td>{{ totalPrice.toLocaleString() }}</td>
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
                        <div class="summary-row"><span>รวมเป็นเงิน:</span><span>{{ totalPrice.toLocaleString() }}</span>
                        </div>
                        <div class="summary-row"><span>จำนวนภาษีมูลค่าเพิ่ม 7%:</span><span>{{
                            vatAmount.toLocaleString()
                                }}</span></div>
                        <div class="summary-row total"><span>จำนวนเงินรวมทั้งสิ้น:</span><span>{{
                            totalWithVat.toLocaleString() }}</span></div>
                    </div>
                </div>
                <div class="footer2">
                    <div class="footer-item">สั่งซื้อโดย<p style="color: black;">{{ person.name }}</p>
                    </div>
                    <div class="footer-item">เสนอโดย<p style="color: black;">{{ postC.shop_name }}</p>
                    </div>
                    <div class=""></div>
                </div>
                <div class="button-center">
                    <div class="not">
                        <div v-bind="quatation.company_name = person.company_name"></div>
                        <div v-bind="quatation.product_name = shop.product_name"></div>
                        <div v-bind="quatation.quantity = shop.quantity"></div>
                        <div v-bind="quatation.shop_name = shop.shop_name"></div>
                        <div v-bind="quatation.address = person.address"></div>
                        <div v-bind="quatation.price = shop.price"></div>
                        <div v-bind="quatation.name = person.name"></div>
                        <div v-bind="quatation.company_Id = postC.id"></div>
                        <div v-bind="quatation.shop_Id = shop.id"></div>
                        <div v-bind="quatation.taxC_Id = taxId"></div>
                        <div v-bind="quatation.taxS_Id = taxS_Id"></div>
                        <div v-bind="quatation.money = totalPrice.toLocaleString()"></div>
                        <div v-bind="quatation.tax = vatAmount.toLocaleString()"></div>
                        <div v-bind="quatation.amount_money = totalWithVat.toLocaleString()"></div>
                    </div>
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
                name: '',
                taxC_Id: '',
                taxS_Id: '',
                money: '',
                tax: '',
                amount_money: '',
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
        this.generateTaxId();
        this.generateRandomNumber();
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
        },
        generateRandomNumber() {
            // สร้างเลขสุ่มในแต่ละส่วนตามความยาวที่ต้องการ
            const part1 = Math.floor(Math.random() * 10); // สุ่มเลข 1 หลัก (0-9)
            const part2 = String(Math.floor(Math.random() * 10000)).padStart(4, '0'); // สุ่มเลข 4 หลัก (0000-9999)
            const part3 = String(Math.floor(Math.random() * 100000)).padStart(5, '0'); // สุ่มเลข 5 หลัก (00000-99999)
            const part4 = String(Math.floor(Math.random() * 100)).padStart(2, '0'); // สุ่มเลข 2 หลัก (00-99)
            const part5 = Math.floor(Math.random() * 10); // สุ่มเลข 1 หลัก (0-9)

            // รวมแต่ละส่วนเข้าด้วยกันโดยมี "-" คั่นกลาง
            this.taxS_Id = `${part1}-${part2}-${part3}-${part4}-${part5}`;
        },
        padNumber(number, length) {
            return number.toString().padStart(length, '0');
        },
        generateTaxId() {
            let newNumber;
            do {
                newNumber = this.createTaxId();
            } while (newNumber === this.previousNumber); // เช็คไม่ให้เลขซ้ำ

            this.previousNumber = newNumber; // เก็บเลขที่สุ่มล่าสุด
            this.taxId = newNumber;
        },
        createTaxId() {
            const part1 = '0'; // เลขหลักแรก
            const part2 = String(Math.floor(Math.random() * 100000)); // สุ่ม 5 หลัก (00000-99999)
            const part3 = String(Math.floor(Math.random() * 100000)); // สุ่ม 5 หลัก (00000-99999)
            return `${part1}${part2.padStart(5, '0')}${part3.padStart(5, '0')}`; // รวมเลข
        }
    },
    computed: {
        formattedPrice() {
            return this.shop.price.toLocaleString();
        },
        totalPrice() {
            return this.shop.quantity * this.shop.price;
        },
        vatAmount() {
            return this.totalPrice * 0.07;
        },
        totalWithVat() {
            return this.totalPrice + this.vatAmount;
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

/* Responsive adjustments */
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

    .QC {
        background-color: #ffffff;
        span2 {
            color: #000000;
        }
    }
}

@media print {
    .quotation {
        width: 210mm;
        height: 297mm;
        margin: 0;
        border: none;
    }
}
</style>
