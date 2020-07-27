<template>
  <div class="PointsMallDetails">
    <div class="img-box">
      <swiper ref="mySwiper" :options="swiperOptions" class="isShow">
        <swiper-slide v-for="(item,index) in swiperList" :key="index">
        <img :src="`${imgs}${item.imgs}`" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="container">
      <div class="centent">
        <div class="PointsMallDetails_content">
          <div class="PointsMallDetails_content_left">
            <div class="PointsMallDetails_content_left_top">
              <img :src="`${imgs}${dataImgUrl}`" alt="" />
            </div>
            <div class="PointsMallDetails_content_left_bottom">
              <img v-for="(item, index) in dataFormlist.imgs" :key="index" :src="`${imgs}${item}`" @click="imgClick(item, index)" alt="" :class="filterActive == index ? 'active' : ''" />
            </div>
          </div>
          <div class="PointsMallDetails_content_right">
            <h1>{{ dataFormlist.goods_name }}</h1>
            <!-- <h2>私人定制 茶水分離 快速過濾茶湯</h2> -->
            <div>
              <span>數量</span>
              <div class="PointsMallDetails_content_right_num">
                <input type="text" v-model="num">
                <h4>
                  <img src="@/assets/imgs/PointsMallDetailsTop.png" @click="addClick()" class="PointsMallDetails_content_right_num_top" alt="" />
                  <img src="@/assets/imgs/PointsMallDetailsBottom.png" @click="cutBackClick()" alt="" />
                </h4>
              </div>
              <span>庫存{{dataFormlist.stock}}件</span>
            </div>
            <div>
              <span>點數</span>
              <p class="PointsMallDetails_content_right_Points">{{dataFormlist.price}}</p>
              <i>點</i>
            </div>
            <div class="PointsMallDetails_content_right_buy" @click="_insertOrders()">立即購買</div>
            <div class="PointsMallDetails_content_right_JoinIn" @click="_setCart()">加入購物車</div>
          </div>
          <div class="PointsMallDetails_content_title">
            <h1>商品介紹</h1>
            <h2>PRODUCT DESCIPTION</h2>
            <h3>{{dataFormlist.goods_information}}</h3>
            <h1>注意事項</h1>
            <h2>PRECAUTIONS</h2>
            <h3>{{dataFormlist.attention}}</h3>
          </div>
        </div>
      </div>
    </div>
    <loading :show="isShowLoadging"></loading>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import { getGoodsBanner, getGoodsRead, setCart, insertOrders } from '@/api/request'
let vm = null
export default {
  inject:['reloads'],
  name: 'PointsMallDetails',
  components: {
    Modal
  },
  data () {
    return {
      num: 1,
      isShowLoadging: false,
      swiperOptions: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletActiveClass: 'my-bullet-active'
        },
        on: {
          click: function (e) {
            const realIndex = this.realIndex;
            vm.handleClickSlide(realIndex);
          }
        }
      },
      swiperList: [],
      token: window.sessionStorage.getItem('token'),
      path: this.imgs,
      id: this.$route.query.id,
      dataFormlist: [],
      dataImgUrl: '',
      filterActive: 0
    }
  },
  watch: {
    num: function (newValue, oldValue) {
      var reg = /^[1-9]\d*$/
      if (!reg.test(newValue)) {
        this.num = oldValue
      }
      if (this.num >= this.dataFormlist.stock) {
        this.num = this.dataFormlist.stock
      }
      if (this.num <= 1) {
        this.num = 1
      }
    }
  },
  created() {
    vm = this;
    this._getGoodsBanner()
    this._getGoodsRead()
  },
  methods: {
    // 圖片切換
    imgClick (item, index) {
      this.filterActive = index
      this.dataImgUrl = item
    },
    // 增加數量
    addClick () {
      this.num++
      if (this.num >= this.dataFormlist.stock) {
        this.num = this.dataFormlist.stock
      }
    },
    // 減少數量
    cutBackClick () {
      this.num--
      if (this.num <= 1) {
        this.num = 1
      }
    },
    // 获取banner图
    _getGoodsBanner () {
      getGoodsBanner({ headers: { token: this.token } }).then(res => {
        this.swiperList = res.data.data.banner
        this.isShowLoadging = false
      })
    },
    // 獲取商品詳情
    _getGoodsRead () {
      var form = {
        goods_id: this.id
      }
      this.isShowLoadging = true
      getGoodsRead(form, { headers: { token: this.token } }).then(res => {
        this.isShowLoadging = false
        this.dataFormlist = res.data.data.rows
        this.dataFormlist.imgs.splice(0,0,this.dataFormlist.cover_plan)
        this.dataImgUrl = res.data.data.rows.cover_plan
      })
    },
    // 加入购物车
    _setCart () {
      var form = {
        goods_id: this.id,
        number: this.num
      }
      this.isShowLoadging = true
      setCart(form, { headers: { token: this.token } }).then(res => {
        this.isShowLoadging = false
        if (res.data.code == '200') {
          // this.$router.push({ path: '/shoppingCart'})
          this.reloads()
          this.$message({
            message: "加入購物車成功",
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    _insertOrders () {
      var form = {
        goods_id: this.id,
        number: this.num
      }
      this.isShowLoadging = true
      setCart(form, { headers: { token: this.token } }).then(res => {
        this.isShowLoadging = false
        if (res.data.code == '200') {
          this.$router.push({ path: '/shoppingCart'})
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    }
     
  }
}
</script>

<style lang='scss'>
@import '@/assets/style/mixin.scss';
.PointsMallDetails {
  margin-top: 8rem;
  .img-box {
    width: 100%;
    height: 32rem;
    .swiper-container {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
      }
      .swiper-pagination {
        @include flex(center);
        // margin-bottom: 2.2rem;
        bottom: 3.2rem;
      }
      .swiper-pagination-bullet {
        margin: 0 1rem;
        width: 1rem;
        height: 1rem;
      }
      .swiper-pagination .my-bullet-active {
        width:1.4rem;
        height:1.4rem;
        background:rgba(37,36,39,1);
        opacity: 1;
      }
    }
  }
  .container {
    .PointsMallDetails_content {
      margin-top: 59px;
      .PointsMallDetails_content_left {
        display: inline-block;
        width: 420px;
        .PointsMallDetails_content_left_top {
            width: 420px;
            height: 420px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .PointsMallDetails_content_left_bottom {
          overflow-x: scroll;
          overflow-y: hidden;
          white-space: nowrap;
          img {
            cursor: pointer;
            width: 93px;
            height: 93px;
            margin-right: 16px;
            margin-top: 16px;
            -webkit-filter: grayscale(100%);
            -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
            -o-filter: grayscale(100%);
            filter: grayscale(100%);
            filter: gray;
            opacity:0.5;//通过改变透明度来调节灰色的程度
          }
          .active {
            filter: none;
            opacity:1;
          }
        }
        ::-webkit-scrollbar {display:none}
      }
      .PointsMallDetails_content_right {
        float: right;
        width: calc(100% - 420px);
        padding-left: 60px;
        h1 {
          font-size:34px;
          font-weight:bold;
          color:rgba(37,36,39,1);
          line-height:50px;
          margin-bottom: 44px;
        }
        // h2 {
        //   font-size:18px;
        //   color:rgba(235,54,44,1);
        //   line-height:25px;
        //   margin-top: 14px;
        //   margin-bottom: 44px;
        // }
        span {
          margin-right: 24px;
          font-size:12px;
          color:rgba(134,134,134,1);
          line-height:17px;;
        }
        .PointsMallDetails_content_right_num {
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 20px;
          input {
            margin-right: 3px;
            padding: 0 5px;
            display: inline-block;
            width:43px;
            height:30px;
            background:rgba(255,255,255,1);
            border-radius:1px;
            border:1px solid rgba(167,166,173,1);
            font-size:12px;
            font-weight:bold;
            color:rgba(189,189,189,1);
            line-height:30px;
          }
          h4 {
            float: right;
            width: 18px;
            height: 30px;
            img {
              cursor: pointer;
              width: 18px;
              height: 13px;
            }
            .PointsMallDetails_content_right_num_top {
              margin-bottom: 3px;
            }
          }
        }
        .PointsMallDetails_content_right_Points {
          margin-right: 6px;
          display: inline-block;
          font-size:42px;
          font-family:DINSchrift;
          color:rgba(235,54,44,1);
          line-height:48px;
        }
        i {
          font-size:12px;
          color:rgba(235,54,44,1);
          line-height:17px;
        }
        .PointsMallDetails_content_right_JoinIn {
          cursor: pointer;
          float: right;
          margin-top: 90px;
          margin-right: 30px;
          width:220px;
          height:50px;
          background:rgba(255,255,255,1);
          border-radius:4px;
          border:1px solid rgba(61,61,61,1);
          font-size:16px;
          color:rgba(37,36,39,1);
          line-height:50px;
          text-align: center;
        }
        .PointsMallDetails_content_right_buy {
          cursor: pointer;
          float: right;
          margin-top: 90px;
          width:220px;
          height:50px;
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          border-radius:4px;
          font-size:16px;
          color:rgba(255,255,255,1);
          line-height:50px;
          text-align: center;
        }
      }
      .PointsMallDetails_content_title {
        padding-top: 20px;
        h1 {
          margin-top: 60px;
          font-size:22px;
          font-weight:bold;
          color:rgba(37,36,39,1);
          line-height:30px;
        }
        h2 {
          margin-top: 2px;
          margin-bottom: 17px;
          font-size:10px;
          color:rgba(189,189,189,1);
          line-height:14px;
        }
        h3 {
          font-size:14px;
          color:rgba(134,134,134,1);
          line-height:26px;
        }
      }
    }
  }
  @media screen and (max-width: 1199px){
    .container {
      .PointsMallDetails_content {
        margin-top: 59px;
        .PointsMallDetails_content_left {
          width: 320px;
          .PointsMallDetails_content_left_top {
              width: 300px;
              height: 300px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .PointsMallDetails_content_left_bottom {
            img {
              width: 63px;
              height: 63px;
              margin-right: 16px;
            }
          }
        }
        .PointsMallDetails_content_right {
          width: calc(100% - 320px);
          padding-left: 40px;
          h1 {
            font-size:30px;
          }
          .PointsMallDetails_content_right_Points {
            margin-right: 6px;
            display: inline-block;
            font-size:42px;
            font-family:DINSchrift;
            color:rgba(235,54,44,1);
            line-height:48px;
          }
          i {
            font-size:12px;
            color:rgba(235,54,44,1);
            line-height:17px;
          }
          .PointsMallDetails_content_right_JoinIn {
            width:170px;
            height:50px;
          }
          .PointsMallDetails_content_right_buy {
            width:170px;
            height:50px;
          }
        }
      }
    }
  }
  @media screen and (max-width:991px){
    margin-top: 6rem;
    .container {
      .PointsMallDetails_content {
        .PointsMallDetails_content_left {
          width: 300px;
          .PointsMallDetails_content_left_top {
              width: 300px;
              height: 300px;
          }
          .PointsMallDetails_content_left_bottom {
            img {
              width: 63px;
              height: 63px;
              margin-right: 16px;
            }
          }
        }
        .PointsMallDetails_content_right {
          width: calc(100% - 320px);
          padding-left: 40px;
          h1 {
            font-size:26px;
            line-height: 40px;
          }
          .PointsMallDetails_content_right_Points {
            font-size:28px;
          }
          .PointsMallDetails_content_right_JoinIn {
            width:160px;
            height:50px;
          }
          .PointsMallDetails_content_right_buy {
            width:160px;
            height:50px;
          }
        }
      }
    }
  }
  @media screen and (max-width:767px){
    .container {
      .PointsMallDetails_content {
        margin-top: 39px;
        .PointsMallDetails_content_left {
          width: 220px;
          .PointsMallDetails_content_left_top {
              width: 220px;
              height: 220px;
          }
          .PointsMallDetails_content_left_bottom {
            overflow-x: scroll;
            overflow-y: hidden;
            white-space: nowrap;
            img {
              width: 46px;
              height: 46px;
              margin-right: 12px;
              margin-top: 12px;
            }
          }
        }
        .PointsMallDetails_content_right {
          width: calc(100% - 220px);
          padding-left: 30px;
          h1 {
            font-size:24px;
            line-height:35px;
            margin-bottom: 30px;
          }
          .PointsMallDetails_content_right_Points {
            font-size:24px;
            line-height:35px;
          }
          .PointsMallDetails_content_right_JoinIn {
            margin-top: 60px;
            margin-right: 20px;
            width:130px;
            height:40px;
            font-size:14px;
            line-height:40px;
          }
          .PointsMallDetails_content_right_buy {
            margin-top: 60px;
            width:130px;
            height:40px;
            font-size:14px;
            line-height:40px;
          }
        }
        .PointsMallDetails_content_title {
          padding-top: 20px;
          h1 {
            margin-top: 60px;
            font-size:22px;
            font-weight:bold;
            color:rgba(37,36,39,1);
            line-height:30px;
          }
          h2 {
            margin-top: 2px;
            margin-bottom: 17px;
            font-size:10px;
            color:rgba(189,189,189,1);
            line-height:14px;
          }
          h3 {
            font-size:14px;
            color:rgba(134,134,134,1);
            line-height:26px;
          }
        }
      }
    }
  }
  @media screen and (max-width:550px){
    .container {
      .PointsMallDetails_content {
        width: 90%;
        margin: 0 auto;
        margin-top: 29px;
        .PointsMallDetails_content_left {
          width: 100%;
          .PointsMallDetails_content_left_top {
              width: 90vw;
              height: 90vw;
          }
          .PointsMallDetails_content_left_bottom {
            img {
              cursor: pointer;
              width: 21vw;
              height: 21vw;
              margin-right: 2vw;
              margin-top: 2vw;
            }
          }
        }
        .PointsMallDetails_content_right {
          width: 100%;
          padding-top: 40px;
          padding-left: 0;
          padding-bottom: 60px;
          h1 {
            font-size:22px;
            line-height:30px;
            margin-bottom: 30px;
          }
          span {
            font-size:12px;
          }
          .PointsMallDetails_content_right_num {
            input {
              width:63px;
            }
          }
          .PointsMallDetails_content_right_Points {
            font-size:24px;
            line-height:35px;
          }
          i {
            font-size:12px;
            color:rgba(235,54,44,1);
            line-height:17px;
          }
          .PointsMallDetails_content_right_JoinIn {
            float: right;
            margin-top: 50px;
            width:30vw;
            height:40px;
            line-height:40px;
          }
          .PointsMallDetails_content_right_buy {
            float: right;
            margin-top: 50px;
            width:30vw;
            height:40px;
            line-height:40px;
          }
        }
      }
    }
  }
}
</style>
