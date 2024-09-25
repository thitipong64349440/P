<template>
  <div class="hero_area">
    <div class="hero_bg_box">
      <div class="bg_img_box">
        <img src="./assets/hero-bg.png" alt="">
      </div>
    </div>
    <a class="navbar-brand">
      <span>
        Delcom
      </span>
    </a>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="topnav" id="myTopnav">
      <a v-on:click="navigateTo('/')" class="active">Home</a>
      <a style="color: aliceblue;" v-on:click="navigateTo('/login')">Login</a>
      <a style="color: aliceblue;" v-on:click="navigateTo('/person/create')">Signup</a>
      <a href="javascript:void(0);" class="icon" @click="toggleMenu">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    <section class="slider_section ">
      <div id="customCarousel1" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="container ">
              <div class="row">
                <div class="col-md-6 ">
                  <div class="detail-box">
                    <h1>
                      welcome <br>
                      Delcom
                    </h1>
                    <p>
                      Delcom เพื่อให้หน่วยซื้อ และร้านค้าขายอุปกรณ์คอมพิวเตอร์ในจำนวน ราคา
                      และคุณภาพตรงตามที่ท่านได้อย่างสมบูรณ์
                      โดยที่ไม่ต้องเสียเวลาค้นหาด้วยตัวเองอีกต่อไป<br>
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="img-box">
                    <img src="./assets/slider-img.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="service_section service_section_h layout_padding">
      <div class="container">
        <div style="margin-bottom: 30px;" class="heading_container">
          <h2 style="margin-top: 20px;">
            วิธีใช้ง่ายๆ
          </h2>
        </div>
        <div class="flexbox10">
          <div class="item10">
            <div class="content10">
              <a>วิธีใช้ง่ายๆ สำหรับหน่วยงาน<br>
                <hr>
                <p></p>
                * เพียงท่านแค่โพสความต้องการของท่าน และรอการตอบรับการจับคู่<br>
                <p></p>
                * เท่านี้ท่านก็จะได้สินค้าตรงกับความต้องการจากท่านมากที่สุด
                และสามารถคอมเมนต์เพื่อสอบถามรายละเอียดต่างๆกับร้านค้าได้อีกด้วย<br>
                <p></p>
                *
                พอตกลงสำเร็จก็จะมีใบเสนอราคาให้ตรวจสอบความถูกต้องแล้วสามารถดาวน์โหลดใบเสนอราคาเพื่อเป็นสัญญาในการซื้อขายครั้งนี้
              </a>
            </div>
          </div>
          <div class="item10">
            <div class="content10">
              <a>สำหรับร้านค้า<br>
                <hr>
                <p></p>
                * โพสสินค้าที่ต้องการขายที่เป็นจำนวนมาก กรอกรายละเอียดต่างๆที่สำคัญลงไป แล้วยืนยันการขาย<br>
                <p></p>
                * และรอการตอบรับจับคู่<br>
                <p></p>
                * เพียงเท่านี้ร้านค้าก็จะได้คอมเมนต์โน้มน้าวให้ทางหน่วยงานสนใจในการซื้อ<br>
                <p></p>
                *
                พอตกลงสำเร็จก็จะมีใบเสนอราคาให้ตรวจสอบความถูกต้องแล้วสามารถดาวน์โหลดใบเสนอราคาเพื่อเป็นสัญญาในการซื้อขายครั้งนี้
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    toggleMenu() {
      const checkbox = document.getElementById('myTopnav')
      if (checkbox.className === 'topnav') {
        checkbox.className += ' responsive'
      } else {
        checkbox.className = 'topnav'
      }
    }
  }
}
</script>
<style>
.method1 {
  background-color: aqua;
  width: 40%;
  float: left;
  border-radius: 20px 20px 20px 20px;

}

.method2 {
  width: 40%;
  float: right;

}

.flexbox10 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  box-sizing: border-box;
  margin: 0px -9px;
}

.item10 {
  box-sizing: border-box;
  width: 50%;
  margin-bottom: 20px;
  padding: 0px 9px;
}

.content10 {
  color: #000000;
  background-color: #a3a4a5;
  font-weight: 600;
  /* text-align: center; */
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  border-radius: 20px 20px 20px 20px;
}
</style>