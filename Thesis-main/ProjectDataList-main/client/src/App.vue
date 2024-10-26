<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import './css/bootstrap.css'
import './css/style.css'
import './css/responsive.css'
import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
  name: 'App'
}
</script>
<style>
#app{
  user-select: none;
}
.form1{
  display: flex;
  flex-direction: column;
  justify-content: start;
  position: relative;
  width: 100%;
  gap: 1rem;
  max-width: 32rem;
}
.form2 ,.post-form{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 1rem;
  max-width: 50rem;
  padding: 20px;
  border-radius: 10px 10px 10px 10px;
}
.post-form{
  background-color: #ffffff;
}
div3{
  display: flex;
  align-items: center;
  justify-content: center;
}
h6 span ,h6 span1{
  font-size: 19px;
  padding: 0 30px;
  font-weight: 800;
  text-shadow: 0 0 10px #fff;
}
span1{
  color: #00bbf0;
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked){
display: none;
}
.checkbox:checked + label,
.checkbox:not(:checked) + label{
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #ffffff;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before{
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #54c9ff;
  background-color: #020305;
  font-family: 'unicons';
  content: '\eb4f';
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}
.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}
.card-3d-wrap {
  position: relative;
  width: 700px;
  max-width: 150%;
  height: 620px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 60px;
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position:absolute;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out; 
}
h4{
  color: #000000;
  font-weight: 800;
}
.card-front, .card-back {
  width: 100%;
  height: 100%;
  background-color: #211d6d;
  background-position: bottom center;
  background-image: url('./components/assets/pexels-fauxels-3183150.jpg');
  background-image: linear-gradient(to bottom, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0.35) 30%), url('./components/assets/pexels-fauxels-3183150.jpg');
  position: absolute;
  border-radius: 6px;
  -webkit-transform-style: preserve-3d;
}
.card-back {
  transform: rotateY(180deg);
}
.checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}
.center-wrap{
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}
.form-group{ 
  position: relative;
  display: block;
    margin: 0;
    padding: 0;
}
.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #ffffff;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
}
.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  -webkit-transition: all 200ms linear;
   transition: all 200ms linear;
}
.btn{  
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition : all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  align-items: center;
  background-color: #ffeba7;
  color: #000000;
}
.btn:hover{  
  background-color: #000000;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.badge {
  --bs-badge-padding-x: 0.65em;
  --bs-badge-padding-y: 0.35em;
  --bs-badge-font-size: 0.75em;
  --bs-badge-font-weight: 700;
  --bs-badge-color: #fff;
  --bs-badge-border-radius: 0.375rem;
  display: inline-block;
  padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
  font-size: var(--bs-badge-font-size);
  font-weight: var(--bs-badge-font-weight);
  line-height: 1;
  color: var(--bs-badge-color);
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--bs-badge-border-radius);
}
.badge:empty {
  display: none;
}

.btn .badge {
  position: relative;
  top: -1px;
}
.position-absolute {
  position: absolute !important;
}
.translate-middle {
  transform: translate(-50%, -50%) !important;
}

.translate-middle-x {
  transform: translateX(-50%) !important;
}

.translate-middle-y {
  transform: translateY(-50%) !important;
}
.rounded-pill {
  border-radius: 50rem !important;
}
.bg-danger {
  --bs-bg-opacity: 1;
  background-color: rgb(220, 53, 69) !important;
}
.top-0{
  top: 31.2% !important;
}
.start-100 {
  left: 50.5% !important;
}
.p-2 {
  padding: 0.5rem !important;
}
.rounded-circle {
  border-radius: 50% !important;
}
.screen-1 {
	padding: 3.5em;
	display: flex;
	flex-direction: column;
	border-radius: 30px;
	gap: 2em;
	.email {
		background: hsl(0deg 0% 100%);
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
	}
  .lastname {
		background: hsl(0deg 0% 100%);
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
	}
  .name {
		background: hsl(0deg 0% 100%);
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
    margin-top: -0.5em;
	}
  .password {
    background: hsl(0deg 0% 100%);
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
    margin-top: -0.5em;
  }
}
.screen-2 {
	padding: 3.5em;
	/* display: flex; */
	flex-direction: column;
	border-radius: 30px;
	gap: 2em;
  .product{
    background: hsl(0deg 0% 100%);
		padding: 1em;
    width: 49.5%;
		flex-direction: row;
		/* gap: 0.5em; */
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
    /* margin-top: -0.5em; */
  }
  .quantity{
    background: hsl(0deg 0% 100%);
		padding: 1em;
    width: 49.5%;
		flex-direction: row;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
  }
  .name {
		background: hsl(0deg 0% 100%);
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
    margin-top: -0.5em;
	}
  .purpose{
    background: hsl(0deg 0% 100%);
		padding: 1em;
    padding-right: 12em;
		/* display: flex; */
		flex-direction: row;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
    margin-top: 1em;
  }
  .category{
    background: hsl(0deg 0% 100%);
		padding: 1em;
    padding-right: 13em;
		/* display: flex; */
		flex-direction: row;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
    margin-top: 1em;
  }
  .detail{
    background: hsl(0deg 0% 100%);
    padding: 1em;
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
    margin-top: 1em;
  }
  .price{
    background: hsl(0deg 0% 100%);
		padding: 1em;
    padding-right: 5em;
		/* display: flex; */
		flex-direction: row;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
    margin-top: 1em;
  }
  .discount{
    background: hsl(0deg 0% 100%);
		padding: 1em;
    padding-right: 5em;
		/* display: flex; */
		flex-direction: row;
		gap: 0.5em;
		border-radius: 20px;
		color: hsl(0deg 0% 30%);
    margin-top: 1em;
  }
}
.multiselect .multiselect__input {
    caret-color: transparent; /* ซ่อน caret */
    height: 0%; /* จัดการความสูงให้เต็มพื้นที่ */
    border: 0;
}
.multiselect{
  background-color: #ffffff;
  border: #000 1px solid;
  margin-top: 10px;
  padding: 15px;
  border-radius: 20px 20px 20px 20px;
  color: hsl(0deg 0% 30%);
}
.multiselect1{
  padding: 3px;
  border-radius: 0px 0px 0px 0px;
  width: 29%;
}
.screen-3{
  padding: 3.5em;
	/* display: flex; */
	flex-direction: column;
	border-radius: 30px;
	gap: 2em;
}
button ,button4, button5{
  background: #ffffff;
  background-image: -webkit-linear-gradient(top, #ffffff, #ededed);
  background-image: -moz-linear-gradient(top, #ffffff, #ededed);
  background-image: -ms-linear-gradient(top, #ffffff, #ededed);
  background-image: -o-linear-gradient(top, #ffffff, #ededed);
  background-image: linear-gradient(to bottom, #ffffff, #ededed);
  -webkit-border-radius: 30;
  -moz-border-radius: 30;
  border-radius: 30px;
  -webkit-box-shadow: 0px 1px 6px #666666;
  -moz-box-shadow: 0px 1px 6px #666666;
  box-shadow: 0px 1px 6px #666666;
  font-family: Arial;
  color: #000000;
  padding: 9px 18px 10px 20px;
  text-decoration: none;
}
p{
  color: #48dcf3;
}
.nav-link2 a1{
  color: #d7e93b;
}
.nav-link1 a1{
  color: #0fff3f;
}
.nav-link a1{
  color: #ffffff;
}
.nav-link3 a1{
  color: #f71e1ef6;
}
.su ,.sa{
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
}
.su button,.sa button{
  padding: 0px 20px 0px 20px;
}
.si button4{
  border: #000000 solid 2px;
  margin-left: 30px;
}
button1{
  padding-left: 10px;
  font-size:20px;
  color: #bdbbbb;
}
button1 a:hover i{
  color: #00ccff;
}
button1 a:hover a{
  color: #00ccff;
}
span2{
  margin-left: 25px;
}
span3{
  color: #ffffff;
  text-align: center;
}
.bg{
  background-color: #000000;
}
.box{
  background-color: #ffffff;
  margin-left:20px;
  margin-right: 20px;
  border-radius: 50px 50px 50px 50px;
  /* display: flex; */
}
.row2 {
  /* display: -ms-flexbox; */
  display: flex;
  /* -ms-flex-wrap: wrap; */
  /* flex-wrap: wrap; */
  /* margin-right: 15px; */
  margin-left: 15px;
  /* margin-top: 500px; */
}
.container1 {
  color: #242424;
  width: 100%;
  /* padding-right: 0px;
  padding-left: px; */
  margin-right: auto;
  margin-left: auto;
  padding-top: 20px;
  /* margin-top: 100px; */
}
.container1 img{
  /* background-color: #242424; */
  margin: 20px;
  width: 70%;
}
.flexbox {
  /* margin-top: 20px; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  box-sizing: border-box;
  /* margin: 35px -20px; */
}

.item {
  box-sizing: border-box;
  width: 33.33%;
  margin-bottom: 17px;
  padding: 0px 20px;
}
.item1 {
  box-sizing: border-box;
  width: 10%;
  margin-bottom: 17px;
  padding: 0px 20px;
}
.item2 {
  box-sizing: border-box;
  width: 50%;
  margin-bottom: 19px;
  padding: 0px 20px;
}
.item3 {
  box-sizing: border-box;
  width: 55%;
  margin-bottom: 19px;
  overflow-wrap: break-word;
  /* padding: 0px 20px; */
}
.item4 {
  box-sizing: border-box;
  width: 25%;
  margin-bottom: 19px;
  /* padding: 0px -10px; */
}

.content2 {
  color: #242424;
  background-color: #ffffff;
  font-weight: 600;
  /* text-align: center; */
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  border-radius: 20px 20px 20px 20px;
}
.content3 {
  color: #242424;
  background-color: #ffffff;
  font-weight: 600;
  /* text-align: center; */
  /* box-sizing: border-box; */
  height: 100%;
  padding: 10px;
  border-radius: 20px 20px 20px 20px;
}
.content4 {
  color: #242424;
  background-color: #ffffff;
  font-weight: 600;
  /* text-align: center; */
  box-sizing: border-box;
  height: 100%;
  /* width: 200px; */
  padding: 10px;
  border-radius: 0px 20px 20px 0px;
  margin-right: 20px;
  overflow-wrap: break-word;
}
.content3 a1{
  margin-left: 20px;
  text-shadow: 4px 3px 4px rgba(0, 59, 235, 0.82);
}
.text{
  /* text-align:center; */
  margin-right: 10%;
  /* flex-direction: column; */
}
.text2{
  margin-top: 47px;
}
.text_shop{
  margin-top: 30px;
  /* margin-left: 25%; */
  display: flex;
}

.text_shop img{
  width: 50%;

}
.text_shop a{
  padding-right: 10px;
}
.button_shop{
  margin-top: 30px;
  margin-left: 25%;
}
.hr{
  padding: 20px;
}
.hr hr{
  background-color: #ffffff;
}
.text_detail{
  margin-top: 30px;
  text-align: center;
  padding-bottom: 20px;
  color: #ffffff;

}
.text_detail a, a1{
  margin-right: 10px;
  font-weight: 500;
  font-size: 20px;
}

.content {
  color: #242424;
  background-color: #ffffff;
  border: #000000 solid 3px;
  box-shadow: #fb780e 4px 5px 15px 0px;
  font-weight: 600;
  text-align: center;
  box-sizing: border-box;
  height: 100%;
  margin-top: 50px;
  padding: 10px;
  border-radius: 20px 20px 20px 20px;
  overflow-wrap: break-word;
}
.content1 {
  color: #00b680;
  font-size: 95px;
  text-align: center;
  box-sizing: border-box;
  height: 100%;
  margin-top: 65px;
  padding: 10px;
}
button5 {
  justify-content: center;
}
.button-center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 20px;
}
button5:hover {
  box-shadow: 0px 0px 7px 8px rgba(0, 238, 255, 0.31);
}
.pulse {
  animation: pulse 2s linear 0s infinite normal;
}
@keyframes pulse {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.5);
	}

	100% {
		transform: scale(1);
	}
}
.edituser h1{
  margin-top: 20px;
  margin-left: 20px;
  padding: 10px 20px;
  font-weight: bolder;
}
.eu{
  margin-top: 80px;
  margin-left: 50px;
}
.eu h4, .eu h6{
  margin-left: 50px;
  padding-right: 20px;
}
.dropbox {
 outline: 2px dashed grey; /* the dash box */
 outline-offset: -10px;
 background:lemonchiffon;
 color: dimgray;
 padding: 10px 10px;
 min-height: 200px; /* minimum height */
 position: relative;
 cursor: pointer;
 }
 .input-file {
 opacity: 0; /* invisible but it's there! */
 width: 100%;
 height: 200px;
 position: absolute;
 cursor: pointer;
 }
 .dropbox:hover {
 background:khaki; /* when mouse over to the drop zone, change color 
*/
 }
 .dropbox p {
 font-size: 1.2em;
 text-align: center;
 padding: 50px 0;
 }
 ul.pictures {
 list-style: none;
 padding: 0;
 margin: 0;
 float: left;
 padding-top: 10px;
 padding-bottom: 10px;
}
ul.pictures li {
 float: left;
}
ul.pictures li img {
 max-width: 180px;
 margin-right: 20px;
}
.pictures {
 padding: 0;
 margin: 0;
 padding-top: 20px;
 display: flex;
 flex-wrap: wrap;
  justify-content: center;
 /* padding-bottom: 10px; */
}
.pictures img {
  display: inline-block;
 max-width: 300px;
 margin-right: 20px;
}
.clearfix {
 clear: both;
}
.pictures-box{
  padding: 10px 10px 150px;
}
.pictures-box1{
  /* padding: 10px 10px 150px; */
}
.centerD{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: bolder;
}
.thumbnail{
  background-color: #000;
  margin-right: 80%;
}
.thumbnail img{
  width: 50%;
}
.a{
  background-color: #00204a ;
}
.message{
  background-color: #fff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 0px 25% 0px 25%;
  padding: 20px 0px 50px 0px;
}
.hr1{
  border-bottom: 1px solid black;
  width: 100%;
}
.message_box{
  margin-top: 20px;
}
.message_box textarea{
  width: 500px;
  height: 150px;
  border-radius: 10px;
}
.message_text{
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>