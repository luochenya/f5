<template>
  <div class="MallOrder">
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
            <span class="bottom-msg-active">商城訂單查詢<i class="icon-9"></i></span>
            <div></div>
            <span @click="$router.push({path:'/notificationCenter'})">通知中心</span>
          </div>
        </div>
        <div class="item-r">
          <div class="title">
            <div class="title-l">
              <h1>商城訂單查詢</h1>
              <span>STORE ORDER INQUIRY</span>
            </div>
          </div>
          <div class="taba">
            <ul class="tabas">
              <li
                v-for="(item,index) in menu"
                :key="index"
                :class="{active : ( isActive == item.value ? true : false )}"
                @click="tabaIsShow(item.value)"
                >
                <a>{{item.name}}</a>
              </li>
            </ul>
            <div class="line"></div>
            <div class="MallOrderStyle">
              <div class="MallOrderStyle_header">
                <div class="MallOrderStyle_header_big">最近訂單</div>
                <div>商品數量</div>
                <div>總點數</div>
                <div>操作</div>
              </div>
              <div class="MallOrderStyle_content" v-for="(item, index) in dataFormList" :key="index">
                <div class="MallOrderStyle_content_cancel" v-if="item.state == 2"></div>
                <div class="MallOrderStyle_content_title">
                  <div>訂單時間：{{item.created_at}}</div>
                  <div class="MallOrderStyle_content_title_status MallOrderStyle_content_title_status_Processing" v-if="item.state == 0">處理中...</div>
                  <div class="MallOrderStyle_content_title_status MallOrderStyle_content_title_status_completed" v-if="item.state == 1">已完成</div>
                  <div class="MallOrderStyle_content_title_status MallOrderStyle_content_title_status_cancel" v-if="item.state == 2">已取消</div>
                </div>
                <div class="MallOrderStyle_list" v-for="(items, index) in item.goods_list" :key="index">
                  <div class="MallOrderStyle_list_big">
                    <img :src="path + items.cover_plan" alt="" />
                    <span>
                      <p>{{items.goods_name}}</p>
                      <em>點數：{{items.subtotal/items.number}} x {{items.number}}</em>
                    </span>
                  </div>
                  <div>{{items.number}}</div>
                  <div class="MallOrderStyle_list_price">{{items.subtotal}} <i>點</i></div>
                  <div class="MallOrderStyle_list_button" @click="CheckOther(item)">檢視其他產品</div>
                </div>
              </div>
              <pagination
              :currentpage="offset+1"
              :pagesize="limit"
              :total="total"
              :handleCurrentChange="handleCurrentChange"
              :isHidePage="true"
              ></pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading :show="isShowModal"></loading>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import storage from '@/storage'
import { getOrdersList } from '@/api/request'
export default {
  name: 'MallOrder',
  components: {
    Pagination
  },
  data () {
    return {
      isShowModal: false,
      userInfo: storage.getItem('userInfo'),
      token: window.sessionStorage.getItem('token'),
      offset: 0,
      limit: 10,
      total: 0,
      path: this.imgs,
      dataFormList: [],
      isActive: '',
      menu: [{
        name: '全部',
        value: ''
      }, {
        name: '處理中',
        value: '0'
      }, {
        name: '已完成',
        value: '1'
      }, {
        name: '已取消',
        value: '2'
      }, {}
      ],
    }
  },
  created () {
    this._getOrdersList()
  },
  methods: {
    // 查看訂單
    CheckOther(item) {
      console.log(item)
      let data = JSON.stringify(item)
      this.$router.push({path: '/orderDetails', query: {res: data}})
    },
    tabaIsShow (type) {
      this.isActive = type;
      this._getOrdersList()
    },
    _getOrdersList () {
      var form = {
        offset: this.offset * this.limit,
        limit: this.limit,
        state: this.isActive
      }
      this.isShowModal = true
      getOrdersList(form, { headers: { token: this.token } }).then(res => {
        this.isShowModal = false
        if (res.data.code === '200') {
          this.total = res.data.data.total
          this.dataFormList = res.data.data.rows
        }
      })
    },
    handleCurrentChange (e) {
      if (e === 1) {
        this.offset = 0
      } else {
        // this.offset = (e - 1) * this.limit
        this.offset = e - 1
      }
      window,scrollTo(0,0)
      this.isShowModal = true
      this._getOrdersList()
    }
  }
}
</script>

<style lang='scss'>
@import '@/assets/style/mixin.scss';
.MallOrder {
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
      .title {
        @include flex();
        .title-l {
          h1 {
            font-size:2.2rem;
            font-weight:600;
            color:rgba(37,36,39,1);
            line-height:3rem;
            em {
              cursor: pointer;
              display: inline-block;
              font-size:1.4rem;
              color:rgba(0,106,255,1);
              line-height:2rem;
              margin-left: 4rem;
              text-decoration: underline;
            }
          }
          span {
            margin-top: .2rem;
            font-size:1rem;
            font-weight:400;
            color:rgba(189,189,189,1);
            line-height:1.4rem;
          }
        }
        .title-r {
          width:9.4rem;
          height:4.4rem;
          @include flex(center);
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          box-shadow:0 1rem 3rem 0 rgba(41,41,44,0.1);
          border-radius:.6rem;
          font-size:1.4rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          cursor: pointer;
        }
      }
      .time {
        @include flex();
        margin-top: 2.8rem;
        span {
          font-size:1.4rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2rem;
        }
        .itme-item {
          display: flex;
          align-items: center;
          .item-l {
            width:14.5rem;
            // height:4.4rem;
            margin-top: .6rem;
            background:rgba(255,255,255,1);
            border-radius:.6rem;
            border:.1rem solid rgba(61,61,61,1);
            margin-right: 0;
            .icon-8 {
              font-size: 1.4rem;
              font-weight: 500;
            }
          }
          .link {
            width:1.2rem;
            height:.1rem;
            margin: 0 1.4rem;
            background:rgba(37,36,39,1);
            border-radius:.1rem;
          }
          .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width:11.9rem;
            height: 4rem;

          }
           .el-input__inner  {
            padding-left: 2rem;
            padding-right: 0;
            border: none;
            font-size:1.6rem;
            font-weight:400;
            color:rgba(210,210,210,1);
          }
           .el-input__icon {
            display: none;
            width: 0;
          }
        }
        .right-box {
          margin-left: 4rem;
          .item-l {
            span {
              display: block;
              margin-bottom: .6rem;
            }
             .el-input__inner {
              width:18.7rem;
              height:4.4rem;
              background:rgba(255,255,255,1);
              border-radius:.6rem;
              border:.1rem solid rgba(61,61,61,1);
              padding-left: 2rem;
            }
             .el-select .el-input .el-select__caret  {
              margin-right: 2rem;
              color: #3D3D3D;
              font-size: 1.6rem;
              font-weight: 700;
            }
          }
        }
        .btn {
          @include flex();
          margin-top: 2.6rem;

          span {
            width: 3.3rem;
            margin-right: 1.8rem;
            color:rgba(134,134,134,1);
            font-size:1.6rem;
            font-weight:400;
            line-height:2.2rem;
            cursor: pointer;
          }
          a {
            width:9.4rem;
            height:4.4rem;
            @include flex(center);
            background:rgba(255,255,255,1);
            border-radius:.6rem;
            border:.1rem solid rgba(61,61,61,1);
            color:rgba(37,36,39,1);
            font-size:1.6rem;
            font-weight:400;
            line-height:2.2rem;
          }
        }
      }
      .taba {
        margin-top: 6.6rem;
        .tabas {
          @include flex();
          li {
            flex: 1;
            @include flex(center,flex-start);
            position: relative;
            z-index: 1;
            height:3.2rem;
            font-size:1.6rem;
            font-weight:400;
            line-height:2.2rem;
            box-sizing: border-box;
            a {
              color:#9B9B9B;
            }
          }
          .active {
            border-bottom: .2rem solid rgba(37,36,39,1);
            a {
              color:rgba(74,74,74,1);
            }
          }
        }
        .line {
          position: relative;
          top:-.2rem;
          width: 100%;
          height: .2rem;
          background: rgba(247,248,250,1);
        }
        .MallOrderStyle {
          padding-top: 1.8rem;
          .MallOrderStyle_header {
            width: 100%;
            height:50px;
            background:rgba(245,246,247,1);
            border-radius:6px;
            font-size:15px;
            color:rgba(134,134,134,1);
            line-height: 50px;
            div {
              width: 20%;
              text-align: center;
              display: inline-block;
            }
            .MallOrderStyle_header_big {
              padding-left: 20px;
              width: 40%;
              text-align: left;
            }
          }
          .MallOrderStyle_content {
            position: relative;
            .MallOrderStyle_content_cancel {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(238,238,238,0.5);
              // 鼠標點擊穿透
              pointer-events: none;
            }
            .MallOrderStyle_content_title {
              margin-top: 14px;
              padding-left: 20px;
              height:34px;
              background:rgba(245,246,247,1);
              border-radius:6px 6px 0px 0px;
              display: flex;
              justify-content: space-between;
              font-size:11px;
              color:rgba(134,134,134,1);
              line-height:34px;
              .MallOrderStyle_content_title_status {
                width: 20%;
                text-align: center;
              }
              .MallOrderStyle_content_title_status_Processing {
                color:rgba(0,106,255,1);
              }
              .MallOrderStyle_content_title_status_completed {
                color:rgba(37,36,39,1);
              }
              .MallOrderStyle_content_title_status_cancel {
                color:rgba(37,36,39,1);
              }
            }
            .MallOrderStyle_list {
              padding: 14px 0 14px 20px;
              border-radius:0 0 6px 6px;
              border:1px solid rgba(245,246,247,1);
              border-top: none;
              display: flex;
              div {
                display: inline-block;
                width: 20%;
                text-align: center;
                font-size:15px;
                color:rgba(37,36,39,1);
                line-height:21px;
              }
              .MallOrderStyle_list_big {
                width: 40%;
                text-align: left;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width: 6rem;
                  height: 6rem;
                }
                span {
                  width: calc(100% - 6rem);
                  display: inline-block;
                  margin-left: 1rem;
                  p {
                    font-size:13px;
                    color:rgba(37,36,39,1);
                    line-height:20px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                  }
                  em {
                    margin-top: 12px;
                    padding: 4px 14px;
                    display: inline-block;
                    background:rgba(245,246,247,1);
                    border-radius:2px;
                    font-size:12px;
                    color:rgba(189,189,189,1);
                    line-height:17px;
                  }
                }
              }
              .MallOrderStyle_list_price {
                font-size:20px;
                font-family:DINSchrift;
                color:rgba(235,54,44,1);
                line-height:24px;
                i {
                  font-size:12px;
                  color:rgba(235,54,44,1);
                  line-height:17px;
                }
              }
              .MallOrderStyle_list_button {
                cursor: pointer;
                font-size:14px;
                color:rgba(37,36,39,1);
                line-height:20px;
                text-decoration: underline;
              }
            }
          }
        }
      }
      .active {
        .prompt {
          text-align: center;
          margin-top: 2rem;
          font-size: 1.6rem;
          color: #999;
        }
        ul>li{
          @include flex();
          padding: 3.2rem 0;
          border-bottom: .1rem solid rgba(247,248,250,1);

          .left-box {
            cursor: pointer;
            display: flex;
            span {
              @include bgImg(5rem,5rem,'../../assets/imgs/icon/icon-articles-2.png');
            }
            .bg-img {
              @include bgImg(5rem,5rem,'../../assets/imgs/icon/icon-articles-1.png');
            }
            .text {
              h6 {
                display: inline-block;
                font-size:8px;
                color:rgba(255,255,255,1);
                line-height:11px;
                background:rgba(0,106,255,1);
                padding: 4px 7px;
              }
              h1 {
                font-size:2.2rem;
                font-weight:600;
                color:rgba(37,36,39,1);
                line-height:3rem;
                width: 55rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .title-color {
                color:rgba(189,189,189,1);
              }
              p {
                margin-top: .4rem;
                font-size:1.4rem;
                font-weight:400;
                color:rgba(134,134,134,1);
                line-height:2rem;
              }
              .tex-color {
                color:rgba(189,189,189,1);
              }
            }
          }
          .right-box {
            .right_box_Processing {
              font-size:1.6rem;
              font-weight:bold;
              color:rgba(255,155,68,1);
              line-height:2.2rem;
            }
            .right_box_By {
              font-size:1.6rem;
              font-weight:bold;
              color:rgba(0,106,255,1);
              line-height:2.2rem;
            }
            .right_box_DidNotPass {
              font-size:1.6rem;
              font-weight:bold;
              color:rgba(235,54,44,1);
              line-height:2.2rem;
            }
            @include flex(flex-start,center);
            .btn {
              background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
              box-shadow:0 1rem 3rem 0 rgba(41,41,44,0.1);
              border-radius:.6rem;
              color: #fff;
              padding: .5rem 1rem;
              // margin-right: 1.5rem;
              cursor: pointer;
            }
          }
          .tip,.btn {
            font-size:1.6rem;
            font-weight:400;
            line-height:2.2rem;
            cursor: pointer;
          }
          .color-1 {
            color:rgba(0,106,255,1);
          }
          .color-2 {
            color:rgba(225,105,0,1);
          }
          .color-3 {
            color:rgba(37,36,39,1);
          }
          .color-4 {
            color:rgba(189,189,189,1);
          }

        }
        ul>li:last-child {
          border-bottom: none;

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
        .time {
          .itme-item {
            .link {
              margin: 0 .6rem;
            }
          }
          .right-box {
            margin-left: 2rem;
            .item-l {
               .el-input__inner {
                width:14.7rem;
              }
            }
          }
          .btn {
            margin-left: 1.6rem;
            a {
              width:7.4rem;
            }
          }
        }
        .active {
          ul>li{
            .left-box {
              .text {
                h1 {
                  font-size:1.8rem;
                  line-height:3rem;
                }
              }
            }
          }
        }
        .pagination {
          .container {
             .el-pagination.is-background .btn-prev{
              margin-right: 1.6rem!important;
            }
             .el-pagination .el-pager li {
              margin-right: 1.6rem!important;
            }
          }
        }
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
        margin-bottom: 0;
        .taba {
          width: 50rem;;
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
