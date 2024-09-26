<template>
    <div class="about_section layout_padding5">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/postCs/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
        <h1>
            <span2>ร้านค้า</span2>
        </h1>
        <div v-for="shop in sortedShops" v-bind:key="shop.id">
            <div class="box">
                <div class="container1">
                    <div class="row2">
                        <div class="col-md-2 col-lg-2 ">
                            <img style="margin-bottom:5px;" :src="BASE_URL + shop.thumbnail" alt="thumbnail">
                        </div>
                        <div class="col-md-2 col-lg-2 ">
                            <h1>{{ shop.shop_name }}</h1>
                        </div>

                        <div class="col-md-2 col-lg-2 ">
                            <div><a>ชื่อสินค้า:</a>
                                <a1>{{ shop.product_name }}</a1>
                            </div>
                            <div><a>จำนวน:</a>
                                <a1>{{ shop.quantity }}</a1>
                            </div>
                            <div><a>ราคา:</a>
                                <a1>{{ shop.price }}</a1>
                            </div>
                        </div>
                        <div class="col-md-2 col-lg-2 ">
                            <button style="box-shadow: 0 4px 20px 5px rgba(77, 255, 22, 0.5);border-bottom: 1px solid black;"
                                v-on:click="navigateTo('/match/' + person.id + '/' + postC.id + '/' + shop.id)">จับคู่</button>
                        </div>
                        <div class="col-md-2 col-lg-0 ">
                            <button
                                v-on:click="navigateTo('/detailA/' + person.id + '/' + postC.id + '/' + shop.id)">ดูรายละเอียด</button>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>
<script>
import ShopService from '@/services/ShopService'
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
export default {
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
            shops: [],
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
            postC: {
                purpose: '',
                category: '',
                detail: '',
                quantity: '',
            },
        }
    },
    // แสดงข้อมูล
    async created() {
        let personId = this.$route.params.personId
        let postCId = this.$route.params.postCId
        this.person = (await PersonService.show(personId)).data
        this.postC = (await PostCService.show(postCId)).data
        this.shops = (await ShopService.index()).data
    },
    methods: {
        create() {
            this.$router.push({ name: 'shop-create' })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        // ลบข้อมูล
        async deleteShop(shop) {
            let result = confirm("want to delete?")
            if (result) {
                try {
                    await ShopService.delete(shop)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.shops = (await ShopService.index()).data
        },
        priceSimilarity(shopPrice) {
            const minPrice = Math.min(...this.shops.map(shop => shop.price));
            return 1 - ((shopPrice - minPrice) / (Math.max(...this.shops.map(shop => shop.price)) - minPrice));
        },
        calculateSimilarity(postC, shop) {
            const purposeSimilarity = this.exactMatch(postC.purpose, shop.purpose);
            const categorySimilarity = this.exactMatch(postC.category, shop.category);
            const quantitySimilarity = this.quantitySimilarity(postC.quantity, shop.quantity);
            const priceSimilarity = this.priceSimilarity(shop.price);
            return (0.9 * categorySimilarity) + (0.1 * purposeSimilarity) + (0.2 * quantitySimilarity) + (0.1 * priceSimilarity);
        },
        exactMatch(s1, s2) {
            const s1Array = s1.split(',');
            const s2Array = s2.split(',');
            const matches = s1Array.filter(value => s2Array.includes(value.trim()));
            return matches.length;
        },
        quantitySimilarity(q1, q2) {
            const diff = Math.abs(q1 - q2);
            const max = Math.max(q1, q2);
            return 1 - (diff / max);
        },
        jaroWinklerDistance(s1, s2) {
            const m = this.commonPrefixLength(s1, s2);
            const j = this.jaroDistance(s1, s2);
            return j + (0.1 * m * (1 - j));
        },
        jaroDistance(s1, s2) {
            const m = this.matchingChars(s1, s2);
            const k = Math.floor(m / 2);
            let l = 0;
            for (let i = 0; i < s1.length; i++) {
                if (s1[i] === s2[i]) {
                    l++;
                } else if (l < k) {
                    l++;
                }
            }
            return (m / 3) * (1 / s1.length + 1 / s2.length + (l / m));
        },
        commonPrefixLength(s1, s2) {
            let i = 0;
            while (i < s1.length && i < s2.length && s1[i] === s2[i]) {
                i++;
            }
            return i;
        },
        matchingChars(s1, s2) {
            let m = 0;
            for (let i = 0; i < s1.length; i++) {
                if (s2.includes(s1[i])) {
                    m++;
                }
            }
            return m;
        },
        sortShops(shops, postC) {
            return shops.sort((a, b) => {
                const similarityA = this.calculateSimilarity(postC, a);
                const similarityB = this.calculateSimilarity(postC, b);
                return similarityB - similarityA;
            });
        }
        // calculateMatchScore(shop) {
        //     let score = 0
        //     if (shop.category === this.postC.category) {
        //         score += 1
        //     }
        //     const matchingPurposes = shop.purpose.filter(p =>
        //         this.postC.purpose.includes(p)
        //     )
        //     score += matchingPurposes.length
        //     return score
        // }
    },
    computed: {
        sortedShops() {
            return this.sortShops(this.shops, this.postC);
            //     return this.shops.sort((a, b) => {
            //         return this.calculateMatchScore(b) - this.calculateMatchScore(a);
            //     })
            // }
        },


        catch(error) {
            console.log(error)
        }
    }
}
</script>
<style scoped></style>
