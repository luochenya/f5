<template>
  <div class="orderDetails">
     <div class="container">
      <div class="centent">
        <div class="item-left">
          <div class="user" v-if="userInfo">
            <div class="img-box">
              <img v-if="userInfo &&userInfo.user_head" :src="`${path}${userInfo&& userInfo.user_head}`" alt="">
              <img v-else src="../../assets/imgs/head-portrait.svg" alt="">

            </div>
            <h3>{{userInfo.nick_name}}</h3>
            <!-- <p>創業我一直努力在努力</p> -->
            <div class="btn"><span></span>身份：{{userInfo.identity}}</div>
            <div class="card">
              <div class="card-l">
                <p>目前累計點數</p>
                <span>{{ userInfo.point }}</span>
              </div>
              <div class="card-l card-m">
                <p>目前發文總數</p>
                <span>{{ userInfo.my_article_count }}</span>
              </div>
            </div>
          </div>
          <div class="bottom-msg">
            <span @click="$router.push({path:'/memberCenter'})">會員資料修改</span>
            <div></div>
            <span @click="$router.push({path:'/myPublishedArticles'})">我發表的文章</span>
            <div></div>
            <span @click="$router.push({path:'/PointsApplication'})">點數申請</span>
            <div></div>
            <span @click="$router.push({path:'/PointsRecord'})">點數記錄</span>
            <div></div>
            <span @click="$router.push({path:'/MallOrder'})" class="bottom-msg-active">商城訂單查詢<i class="icon-9"></i></span>
            <div></div>
            <span @click="$router.push({path:'/notificationCenter'})">通知中心</span>
          </div>
        </div>
        <div class="item-r">
          <div class="item_r_title">
            <img v-if="dataFormList.state == 2" src="@/assets/imgs/orderCancel.png" alt="" />
            <img v-if="dataFormList.state == 1" src="@/assets/imgs/orderCarryOut.png" alt="" />
            <img v-if="dataFormList.state == 0" src="@/assets/imgs/orderProcessing.png" alt="" />
            <div v-if="dataFormList.state == 2">
              <p>訂單已取消</p>
              <span>ORDER CANCELLED</span>
            </div>
            <div v-if="dataFormList.state == 1">
              <p>訂單已完成</p>
              <span>ORDER COMPLETED</span>
            </div>
            <div v-if="dataFormList.state == 0">
              <p>訂單處理中...</p>
              <span>ORDER IS BEING PROCESSED</span>
            </div>
          </div>
          <div class="item_r_contents">
            <div class="item_r_content" v-for="(item, index) in dataFormList.goods_list" :key="index">
              <div>
                <img :src="path + item.cover_plan" alt="" />
                <span>
                  <h2>{{item.goods_name}}</h2>
                  <h3>數量：{{item.number}}</h3>
                </span>
              </div>
              <p>{{item.subtotal}} <em>點</em></p>
            </div>
          </div>
          <div class="item_r_orderNo">
            <div>訂單編號：{{dataFormList.order_no}}</div>
            <div v-if="dataFormList.state == 2" class="item_r_orderNo_right">取消時間：{{dataFormList.updated_at}}</div>
            <div v-if="dataFormList.state == 1" class="item_r_orderNo_right">完成時間：{{dataFormList.updated_at}}</div>
            <div v-if="dataFormList.state == 0" class="item_r_orderNo_right"></div>
            <div>訂單時間：{{dataFormList.created_at}}</div>
          </div>
          <div class="item_r_orderPrice">
            總兌換點數
            <span>{{dataFormList.total_price}}</span>
            <em>點</em>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from '@/storage'
export default {
  name: 'orderDetails',
  data () {
    return {
      userInfo: storage.getItem('userInfo'),
      token: window.sessionStorage.getItem('token'),
      path: this.imgs,
      dataFormList: []
    }
  },
  mounted() {
    let data = JSON.parse(this.$route.query.res)
    this.dataFormList = Object.assign({}, data)
  }
}
</script>

<style lang='scss'>
@import '@/assets/style/mixin.scss';
.orderDetails {
  margin-top: 8rem;
  background:rgba(245,246,247,1);
  .centent {
    padding-top: 4rem;
    padding-bottom: 4rem;
    @include flex(space-between,flex-start);
    .item-left {
      width: 28rem;
      flex: 0 0 28rem;
      margin-right: 3rem;
      .user {
        @include flex(center);
        flex-direction: column;
        padding: 3rem 1.9rem 4rem;
        background:rgba(255,255,255,1);
        border-radius:.6rem;
        .img-box {
          width: 10rem;
          height: 10rem;
          margin-bottom: 1rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        h3 {
          font-size:1.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
        }
        p {
          margin-top: .1rem;
          font-size:1.3rem;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:1.8rem;
        }
        .btn {
          @include flex(center);
          // width:10rem;
          padding: 0 1.4rem;
          height:2.4rem;
          margin-top: .6rem;
          background:rgba(0,106,255,1);
          border-radius:1.4rem;
          font-size:1.1rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:1.6rem;
          span {
            @include bgImg(1.2rem,1.2rem,'../../assets/imgs/icon/icon-center.png');
            margin-right: .6rem;
          }
        }
        .card {
          width: 100%;
          @include flex();
          margin-top: 3rem;
          .card-l {
            flex: 1;
            text-align: center;
            padding: 1rem 0 .9rem 0;
            background:rgba(255,255,255,1);
            box-shadow:0 1.2rem 4rem 0 rgba(245,246,247,1);
            border-radius:.8rem;
            p {
              font-size:1.2rem;
              font-weight:500;
              color:rgba(189,189,189,1);
              line-height:1.7rem;
            }
            span {
              margin-top: .2rem;
              font-size:1.6rem;
              font-weight:500;
              color:rgba(37,36,39,1);
              line-height:2.2rem;
            }
          }
          .card-m {
            margin-left: 1.4rem;
          }
        }
      }
      .bottom-msg {
        margin-top: 1rem;
        text-align: center;
        padding: 0 1.9rem 0;
        background:rgba(255,255,255,1);
        border-radius:.6rem;
        span {
          padding: 1.9rem 0 1.9rem;
          display: inline-block;
          font-size:1.6rem;
          font-weight:400;
          color:rgba(134,134,134,1);
          cursor: pointer;
          line-height:2.2rem;
        }
        .bottom-msg-active {
          position: relative;
          color:rgba(37,36,39,1);
          .icon-9 {
            position: absolute;
            line-height:2.2rem;
            right: -2.5rem;
          }
        }
        div {
          height:.1rem;
          background:rgba(240,240,240,1);
        }
      }
    }
    .item-r {
      flex: 1;
      padding: 4rem 4rem 0;
      background:rgba(255,255,255,1);
      border-radius:.6rem;
      margin-bottom: 10rem;
      .item_r_title {
        display: flex;
        align-items: center;
        justify-items: center;
        img {
          width: 2.6rem;
          height: 2.6rem;
        }
        div {
          margin-left: 1rem;
          p {
            font-size:1.6rem;
            font-weight:bold;
            color:rgba(37,36,39,1);
            line-height:2.5rem;
          }
          span {
            font-size:0.8rem;
            color:rgba(189,189,189,1);
            line-height:1.1rem;
          }
        }
      }
      .item_r_contents {
        margin-top: 2rem;
        padding-bottom: 2.5rem;
        border-top: 1px dashed #E8E8E8;
        border-bottom: 1px dashed #E8E8E8;
        .item_r_content {
          padding-top: 2.5rem;
          display: flex;
          justify-content: space-between;
          div {
            width: 70%;
            display: flex;
            align-items: center;
            justify-items: center;
            img {
              width: 6rem;
              height: 6rem;
            }
            span {
              display: block;
              width: calc(100% - 7rem);
              height: 6rem;
              margin-left: 1rem;
              h2 {
                display: block;
                font-size:1rem;
                color:rgba(37,36,39,1);
                line-height:1.8rem;
                height: 3.6rem;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
              }
              h3 {
                display: inline-block;
                padding: 4px 14px;
                font-size:1rem;
                color:rgba(189,189,189,1);
                line-height:1.6rem;
                background:rgba(245,246,247,1);
                border-radius:2px;
              }
            }
          }
          p {
            display: block;
            width: 30%;
            text-align: right;
            line-height: 6rem;
            font-size:1.8rem;
            font-family:DINSchrift;
            color:rgba(37,36,39,1);
            em {
              font-size:1rem;
              color:rgba(37,36,39,1);
              line-height:6rem;
            }
          }
        }
      }
      .item_r_orderNo {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 2.5rem 0 0.7rem;
        border-bottom: 1px dashed #E8E8E8;
        div {
          width: 50%;
          font-size:1.1rem;
          color:rgba(134,134,134,1);
          line-height:1.5rem;
          padding-bottom: 1.8rem;
        }
        .item_r_orderNo_right {
          text-align: right;
          padding-right: 2rem;
        }
      }
      .item_r_orderPrice {
        text-align: right;
        padding: 2.5rem 0 3rem;
        font-size:1.2rem;
        font-weight:500;
        color:rgba(37,36,39,1);
        line-height:1.8rem;
        span {
          padding: 0 0.5rem;
          font-size:1.9rem;
          font-family:DINSchrift;
          color:rgba(235,54,44,1);
          line-height:2.1rem;
        }
        em {
          font-size:1.2rem;
          font-weight:500;
          color:rgba(235,54,44,1);
          line-height:1.8rem;
        }
      }
    }
  }
  @media screen and (max-width: 1199px) {
    .centent {
      .item-left {
        margin-right: 2rem;
      }
      .item-r {
        padding: 3rem 2.5rem 0;
      }
    }
  }
  @media screen and (max-width: 991px) {
    .centent {
      overflow-x: auto;
    }
  }
  @media screen and (max-width: 767px) {
     padding-bottom: 3rem;
    .centent {
      padding:1.5rem;
      flex-wrap: wrap;
      width: 100%;
      .item-r {
        overflow-x: auto;
        .item_r_orderNo {
          div {
            width: 100%;
            padding-bottom: 1rem;
          }
          .item_r_orderNo_right {
            text-align: left;
            padding-right: 0;
          }
        }
      }
     .item-left {
        width: 100%;
        flex: 0 0 100%;
        margin-right: 0rem;
        margin-bottom: 1rem;
      }
    }
  }

}
</style>
