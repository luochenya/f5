<template>
  <div class="the-entrance">
    <swiper ref="mySwiper" :options="swiperOptions" class="isShow">
      <swiper-slide v-for="(item,index) in swiperList" :key="index">
       <img :src="`${imgs}${item.imgs}`" alt="">
       <!-- <div class="container">
         <div class="box">
           <h1>COVID-19</h1>
           <h1>第一件事</h1>
           <div class="text">
             <p>第一要務是保持員工，客戶和我們的社區之間的</p>
             <p>聯繫和保護。面對前所未有的破壞，保持業務連續性</p>
             <p>也很重要。我們想提供幫助</p>
           </div>
           <div class="btn">
             <div class="btn-item btn-left">獲得詳細資料</div>
             <div class="btn-item btn-right">查看更多</div>
           </div>
         </div>
       </div> -->
      </swiper-slide>

       <!-- <div class="container">
         <div class="box">
           <h1>COVID-19</h1>
           <h1>第一件事</h1>
           <div class="text">
             <p>第一要務是保持員工，客戶和我們的社區之間的</p>
             <p>聯繫和保護。面對前所未有的破壞，保持業務連續性</p>
             <p>也很重要。我們想提供幫助</p>
           </div>
           <div class="btn">
             <div class="btn-item btn-left">獲得詳細資料</div>
             <div class="btn-item btn-right">查看更多</div>
           </div>
         </div>
       </div> -->
      <!-- <swiper-slide>
        <img src="./../../assets/imgs/swiper/pic_1.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="./../../assets/imgs/swiper/pic_1.png" alt="">
      </swiper-slide> -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- <swiper ref="mySwiper" :options="swiperOptions" class="isShowMobile">
      <swiper-slide v-for="(item,index) in mobile" :key="index">
       <img :src="`${imgs}${item.imgs}`" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper> -->
    <!-- <router-view></router-view> -->

     <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">

      </router-view>
    </keep-alive>
     <!-- 这里是不被缓存的视图组件，比如 page3 -->
      <router-view v-if="!$route.meta.keepAlive">

      </router-view>

    <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import { systemHomePage, systemHomeNewsRead, getHomePageWeb, getMobileBanner } from './../../api/request'
// import storage from './../../storage'
let vm = null
export default {
  name: 'the-entrance',
  data () {
    return {
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
            // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
            // console.log(this); // -> Swiper
            // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
            const realIndex = this.realIndex;
            vm.handleClickSlide(realIndex);
          }
        }
      },
      token: '',
      swiperList: [],
      mobile: [],
      w: document.documentElement.clientWidth,
      imgs: this.imgs,
      news_id: '',
      isShowLoading: false
    }
  },
  created() {
    vm = this;
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    // 鼠标覆盖停止自动切换
    this.swiper.el.onmouseover = function () {
      this.swiper.autoplay.stop()
    }
    // 鼠标离开开始自动切换
    this.swiper.el.onmouseout = function () {
      this.swiper.autoplay.start()
    }
    this.token = window.sessionStorage.getItem('token')
    // this.getSystemHomePage()
    this._getHomePageWeb()
    if (this.w < 992) {
      // this._getMobileBanner()
    }
    // this._getUserInfo()
  },
  methods: {
    // 點擊圖片跳轉URL
    handleClickSlide(index) {
      if (this.swiperList[index].url) {
        window.open(this.swiperList[index].url)
      }
    },
    getSystemHomePage () {
      systemHomePage({ headers: { token: this.token } }).then(res => {
        // console.log(res)
          this.isShowLoading = false
        if (res.data.code === '200') {
          this.swiperList = res.data.data
          // this.news_id = res.data
          // console.log(this.swiperList)
          this.news_id = res.data.data.news_id
          // this.getSystemHomeNewsRead()
        }
      })
    },
    _getHomePageWeb () {
      // this.$route.query.f5 == '0' || 
      if (this.$route.query.agencyId == '2'  || this.$route.query.agencyId == '22' || this.$route.query.agencyId == '3' || this.$route.query.dealers == '4') {
        // 除主页之外的banner
        var form = {
          type: 2
        }
        getMobileBanner(form, { headers: { token: this.token } }).then(res => {
            this.isShowLoading = false
          if (res.data.code === '200') {
            this.swiperList = res.data.data.rows
            // this.getSystemHomeNewsRead()
          }
        })
      } else {
      // 主页banner
        getHomePageWeb({ headers: { token: this.token } }).then(res => {
            this.isShowLoading = false
          if (res.data.code !== '200') {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            this.swiperList = res.data.data.banner
            // this.getSystemHomeNewsRead()
          }
        })
      }
    },
    // getSystemHomeNewsRead () {
    //   // console.log(this.news_id)
    //   systemHomeNewsRead({ news_id: this.news_id }, { headers: { token: this.token } }).then(res => {
    //     // console.log(res)
    //   })
    // }
    // _getUserInfo () {
    //   getUserInfo({ headers: { token: this.token } }).then(res => {
    //     if (res.data.code === '200') {
    //       // console.log(res)
    //       this.isShowLoading = false
    //       // this.userInfo = res.data.data || storage.getItem('userInfo')
    //       storage.setItem('userInfo', res.data.data)
    //     }
    //   })
    // }

  }
}
</script>

<style lang="scss">
@import './../../assets/style/mixin.scss';
.the-entrance {
  height: 100%;
  margin-top: 8rem;
  .swiper-container {
    width: 100%;
    height: 32rem;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      // position: relative;
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
  .container {
    .box {
      margin-top: 14rem;
      h1 {
        font-size:4.2rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:5.4rem;
      }
      .text {
        margin: 3rem 0;
        p {
          font-size:1.8rem;
          font-weight:400;
          color:rgba(37,36,39,1);
          line-height:3.3rem;
        }
      }
      .btn {
        display: flex;
        .btn-item {
          @include flex(center);
          width:14.4rem;
          height:5rem;
          border-radius:.6rem;
          border:.1rem solid rgba(61,61,61,1);
          color:rgba(37,36,39,1);
          font-size:1.4rem;
          font-weight:400;
          cursor: pointer;
        }
        .btn-left {
          margin-right: 2rem;
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          box-shadow:0 1rem 3rem 0 rgba(41,41,44,0.1);
          color:rgba(255,255,255,1);
        }
      }
    }
  }
  @media screen and (max-width: 1199px) {
    .swiper-container {
      width: 100%;
      // height: auto;
      img {
        width: 100%;
        // height: auto;
      }
      .swiper-pagination {
        // margin-bottom: 2.2rem;
        bottom: 2.2rem;
      }
    }
    .container {
      .box {
        margin-top: 3rem;
        h1 {
          font-size:3.2rem;
          line-height:4.3rem;
        }
        .text {
          margin: 1.6rem 0;
          p {
            font-size:1.8rem;
            line-height:3.3rem;
          }
        }
        .btn {
          margin-bottom: 3rem;
          .btn-item {
            width:12.4rem;
            height:4rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 992px) {
    .isShow {
      display: block;
    }
    .isShowMobile {
      display: none;
    }
  }
  @media screen and (max-width: 991px) {
    .isShow {

       display: none;
    }
    .isShowMobile {
      display: block;
    }
    margin-top: 6rem;
    .swiper-container {
      width: 100%;
      img {
        width: 100%;
        // height: auto;
      }
    }
    .container {
      .box {
        margin-top: 2rem;
        h1 {
          font-size:1.8rem;
          line-height:2.7rem;
        }
        .text {
          margin: 1.4rem 0;
          p {
            font-size:1.8rem;
            line-height:2.2rem;
          }
        }
        .btn {
          margin-bottom: 2rem;
          .btn-item {
            font-size: 1.2rem;
            width:10.4rem;
            height:3.4rem;
          }
        }
      }
    }
  }
}
</style>
