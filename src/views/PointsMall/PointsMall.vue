<template>
  <div class="PointsMall">
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
        <div class="PointsMall_input">
          <input type="text" v-model="goods_name" placeholder="搜尋商品，如：餐券、生活娛樂">
          <div @click="searchFor()">搜尋商品</div>
        </div>
        <h1 class="PointsMall_h1">
          <img src="@/assets/imgs/PointsMallLeft.png" alt="" />
          為您推薦
          <img src="@/assets/imgs/PointsMallRight.png" alt="" />
        </h1>
        <div class="PointsMall_navs">
          <img class="PointsMall_nav_left" src="@/assets/imgs/PointsMallLeftClick.png" alt="" @click="toClick(1)" />
          <img class="PointsMall_nav_right" src="@/assets/imgs/PointsMallRightClick.png" alt="" @click="toClick(2)" />
          <div class="PointsMall_nav" id="PointsMall_nav_scrollLeft">
            <div @click="activeClick(index)" v-for="(item, index) in titleList" :key="index">
              <i :class="active == index ? 'active' : ''">{{item.class_name}}</i>
            </div>
          </div>
        </div>
        <div class="PointsMall_content">
          <div v-for="(item, index) in dataFormList" :key="index" @click="toPointsMallDetails(item.id)">
            <img :src="`${imgs}${item.cover_plan}`" alt="" />
            <h1>
              {{item.goods_name}}
            </h1>
            <h2>
              {{item.price}}<em>點</em>
              <i>:</i>
            </h2>
          </div>
        </div>
      </div>
    </div>
    <pagination
      :currentpage="offset+1"
      :pagesize="limit"
      :total="total"
      :handleCurrentChange="handleCurrentChange"
      :isHidePage="true"
    ></pagination>
    <loading :show="isShowLoadging"></loading>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getGoodsBanner, getGoodsClassList, getGoodsList } from '@/api/request'
let vm = null
export default {
  name: 'PointsMall',
  components: {
    Pagination
  },
  data () {
    return {
      dataFormList: [],
      titleList: [],
      active: 0,
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
            // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
            // console.log(this); // -> Swiper
            // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
            const realIndex = this.realIndex;
            vm.handleClickSlide(realIndex);
          }
        }
      },
      swiperList: [],
      token: window.sessionStorage.getItem('token'),
      offset: 0,
      limit: 8,
      total: 0,
      goods_name: '',
      class_id: '',
      path: this.imgs
    }
  },
  created() {
    vm = this;
    this._getGoodsClassList()
    this._getGoodsBanner()
    this._getGoodsList()
  },
  methods: {
    // 前往商品詳情頁
    toPointsMallDetails (id) {
      this.$router.push({ path: '/PointsMallDetails', query: { id: id } })
    },
    toClick(value) {
      // 左滑
      if(value == 1 && this.active > 0) {
        document.getElementById('PointsMall_nav_scrollLeft').scrollLeft -= document.getElementById('PointsMall_nav_scrollLeft').getElementsByTagName('div')[this.active].offsetWidth
        this.active--;
        this.class_id = this.titleList[this.active].id
        this._getGoodsList()
      } else if (value == 2 && this.active < this.titleList.length-1) {
        document.getElementById('PointsMall_nav_scrollLeft').scrollLeft += document.getElementById('PointsMall_nav_scrollLeft').getElementsByTagName('div')[this.active].offsetWidth
        this.active++;
        this.class_id = this.titleList[this.active].id
        this._getGoodsList()
      }
    },
    // 選中切換
    activeClick(num) {
      this.active = num
      this.class_id = this.titleList[this.active].id
      this._getGoodsList()
    },
    // 获取banner图
    _getGoodsBanner () {
      this.isShowLoadging = true
      getGoodsBanner({ headers: { token: this.token } }).then(res => {
        this.swiperList = res.data.data.banner
        this.isShowLoadging = false
      })
    },
    // 获取商品分类
    _getGoodsClassList () {
      this.isShowLoadging = true
      getGoodsClassList({ headers: { token: this.token } }).then(res => {
        this.isShowLoadging = false
        this.titleList = res.data.data.rows
        this.titleList.splice(0,0, {
          class_name: '首頁',
          id: ''
        })
      })
    },
    // 获取商品列表
    _getGoodsList () {
      this.isShowLoadging = true
      var form = {
        offset: this.offset * this.limit,
        limit: this.limit,
        goods_name: this.goods_name,
        class_id: this.class_id
      }
      getGoodsList(form, { headers: { token: this.token } }).then(res => {
        this.dataFormList = res.data.data.rows
        this.total = res.data.data.total
        this.isShowLoadging = false 
      })
    },
    // 产品搜索
    searchFor () {
      this._getGoodsList()
    },
    // 分页改变
    handleCurrentChange (e) {
      if (e === 1) {
        this.offset = 0
      } else {
        this.offset = e - 1
      }
      window,scrollTo(0,0)
      this._getGoodsList()
    }
  }
}
</script>

<style lang='scss'>
@import '@/assets/style/mixin.scss';
.PointsMall {
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
    .PointsMall_input {
      z-index: 2;
      margin-top: -36px;
      position: relative;
      input {
        padding-left: 50px;
        padding-right: 190px;
        background:none;  
        outline:none;  
        border:none;
        width: 100%;
        height:72px;
        background:rgba(255,255,255,1);
        box-shadow:0px 10px 30px 0px rgba(230,233,238,0.3);
        border-radius:12px;
        font-size: 19px;
      }
      ::-webkit-input-placeholder{
        font-size:19px;
        color:rgba(193,193,193,1);
      }
      div {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        width:180px;
        height:72px;
        background:rgba(37,36,39,1);
        border-radius:0px 12px 12px 0px;
        font-size:23px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:72px;
        text-align: center;
      }
    }
    .PointsMall_h1 {
      width: 250px;
      margin: 80px auto 26px;
      display: flex;
      justify-content: space-around;
      justify-items: center;
      align-items: center;
      font-size:36px;
      font-weight:bold;
      color:rgba(37,36,39,1);
      line-height:54px;
      img {
        width: 28px;
        height: 22px;
      }
    }
    .PointsMall_navs {
      position: relative;
      .PointsMall_nav_left {
        cursor: pointer;
        position: absolute;
        left: -46px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        transform:translateY(-50%);
      }
      .PointsMall_nav_right {
        cursor: pointer;
        position: absolute;
        right: -46px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        transform:translateY(-50%);
      }
      .PointsMall_nav {
        padding: 10px 0;
        height:92px;
        background:rgba(255,255,255,1);
        box-shadow:0px 12px 60px 0px rgba(245,246,247,1);
        border-radius:6px;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        div {
          height: 100%;
          width: 240px;
          cursor: pointer;
          // display: flex;
          // justify-items: center;
          // align-items: center;
          // justify-content: space-around;
          display: inline-block;
          border-right: 1px dashed  #E0E0E1;
          text-align: center;
          line-height:72px;
          i {
            display: inline-block;
            font-size:22px;
            font-weight:bold;
            color:rgba(37,36,39,1);
          }
          .active {
            width:108px;
            height:42px;
            line-height:42px;
            background:rgba(37,36,39,1);
            border-radius:21px;
            color:rgba(255,255,255,1);
          }
        }
        div:last-child {
          border-right: none;
        }
      }
      ::-webkit-scrollbar {display:none}
    }
    .PointsMall_content {
      display: flex;
      flex-wrap: wrap;
      div {
        margin-right: 2.6666%;
        cursor: pointer;
        margin-top: 30px;
        width: 23%;
        height:308px;
        background:rgba(255,255,255,1);
        box-shadow:0px 25px 60px 0px rgba(240,240,240,1);
        border-radius:6px;
        img {
          border-radius:6px 6px 0 0;
          width: 100%;
          height: 180px;
        }
        h1 {
          height: 78px;
          padding: 22px 22px 10px;
          font-size:15px;
          color:rgba(37,36,39,1);
          line-height:25px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        h2 {
          padding: 0 22px;
          font-size:20px;
          font-family:DINSchrift;
          color:rgba(235,54,44,1);
          line-height:24px;
          em {
            font-size:9px;
            font-weight:bold;
            color:rgba(235,54,44,1);
            line-height:13px;
          }
          i {
            float: right;
            color: rgba(189,189,189,1);;
          }
        }
      }
      div:nth-child(4n+4) {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-width: 1199px){
    .container {
      .PointsMall_content {
        div {
          width: 30%;
          margin-right: 5%;
        }
        div:nth-child(3n+3) {
          margin-right: 0;
        }
      }
    }
  }
  @media screen and (max-width:991px){
    margin-top: 6rem;
    .container {
      .PointsMall_input {
        input {
          padding-left: 30px;
          padding-right: 130px;
          height:52px;
          font-size: 16px;
        }
        div {
          width:120px;
          height:52px;
          font-size:16px;
          line-height:52px;
        }
        ::-webkit-input-placeholder{
          font-size:16px;
        }
      }
      .PointsMall_h1 {
        margin: 60px auto 26px;
        font-size:26px;
      }
      .PointsMall_navs {
        position: relative;
        .PointsMall_nav_left {
          left: -26px;
        }
        .PointsMall_nav_right {
          right: -26px;
        }
        .PointsMall_nav {
          height:72px;
          div {
            width: 200px;
            i {
              font-size:18px;
              line-height:52px;
            }
            .active {
              width:88px;
              height:32px;
              line-height:32px;
              border-radius:16px;
            }
          }
          div:last-child {
            border-right: none;
          }
        }
      }
      .PointsMall_content {
        div {
          width: 45%;
          margin-right: 10%;
        }
        div:nth-child(2n+2) {
          margin-right: 0;
        }
      }
    }
  }
  @media screen and (max-width:767px){
    .container {
      .PointsMall_input {
        width: 90%;
        margin: -27px auto 0;
        input {
          padding-left: 15px;
          padding-right: 90px;
          height:42px;
          font-size: 14px;
        }
        div {
          width:80px;
          height:42px;
          font-size:14px;
          line-height:42px;
          font-weight:normal;
        }
        ::-webkit-input-placeholder{
          font-size:14px;
        }
      }
      .PointsMall_h1 {
        margin: 60px auto 26px;
        font-size:22px;
      }
      .PointsMall_navs {
        .PointsMall_nav_left,
        .PointsMall_nav_right {
          display: none;
        }
        .PointsMall_nav {
          padding: 0;
          width: 90%;
          margin: 0 auto;
          height:47px;
          div {
            width: 100px;
            i {
              font-size:14px;
              line-height:47px;
            }
            .active {
              width:58px;
              height:27px;
              line-height:27px;
              border-radius:12.5px;
            }
          }
          div:last-child {
            border-right: none;
          }
        }
      }
      .PointsMall_content {
        div {
          margin-right: 6%;
          width: 47%;
          height: auto;
          padding-bottom: 22px;
          img {
            height: auto;
          }
        }
        div:nth-child(2n+2) {
          margin-right: 0;
        }
      }
    }
  }
  @media screen and (max-width:520px){
    .container {
      .PointsMall_content {
      justify-content: space-around;
        div {
          width: 90%;
          height: auto;
          padding-bottom: 22px;
          img {
            height: auto;
          }
        }
      }
    }
  }
}
</style>
