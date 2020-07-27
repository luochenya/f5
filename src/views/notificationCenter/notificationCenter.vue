<template>
  <div class="my-published-articles">
     <div class="container">
      <div class="centent">
        <div class="item-left">
          <div class="user" v-if="userInfo">
            <div class="img-box">
              <img v-if="userInfo &&userInfo.user_head" :src="`${path}${userInfo&& userInfo.user_head}`" alt="">
              <img v-else src="@/assets/imgs/head-portrait.svg" alt="">
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
            <span @click="$router.push({path:'/MallOrder'})">商城訂單查詢</span>
            <div></div>
            <span class="bottom-msg-activess">通知中心<i class="icon-9"></i></span>
          </div>
        </div>
        <div class="item-r">
          <div class="title">
            <div class="title-l">
              <img src="@/assets/imgs/notificationCenter.png" alt="">
              <div>
                <h1>通知中心</h1>
                <span>Notification Center</span>
              </div>
            </div>
          </div>
          <div class="taba" v-if="status">
            <div>
              <div class="activess">
                <div class="prompt" v-if="ArticlesList.length<=0">暫無通知記錄</div>
                <ul v-else>
                  <li v-for="(item,index) in ArticlesList" :key="index">
                    <div class="left-box" @click="examineClick(item)">
                       <div class="text">
                        <h1><i v-if="item.state == '0'">●</i>{{item.title}}</h1>
                        <p>{{item.content}}</p>
                      </div>
                    </div>
                    <div class="left-box-time">{{item.created_at}}</div>
                  </li>
                </ul>
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
          <div class="tabaaa" v-if="!status">
            <div>
              <h1>{{dataList.title}}</h1>
              <p>{{dataList.created_at}}</p>
            </div>
            <h2>{{dataList.content}}</h2>
            <span @click="closeClick()">我知道了</span>
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
import { getInformRecordList, saveInformRecordState } from '@/api/request'
import Modal from '@/components/Modal'
export default {
  name: 'my-published-articles',
  components: {
    Pagination,
    Modal
  },
  data () {
    return {
      dataList: {},
      status: true,
      isShowModal: false,
      userInfo: storage.getItem('userInfo'),
      ArticlesList: [],
      offset: 0,
      limit: 10,
      total: 0,
      token: window.sessionStorage.getItem('token'),
      path: this.imgs
    }
  },
  mounted () {
    this._getInformRecordList()
  },
  methods: {
    _getInformRecordList () {
      var form = {
        offset: this.offset * this.limit,
        limit: this.limit
      }
      this.isShowModal = true;
      var that = this
      getInformRecordList(form, { headers: { token: this.token } }).then(res => {
        this.isShowModal = false
        if (res.data.code === '200') {
          this.total = res.data.data.total
          this.ArticlesList = res.data.data.rows
        }
        this.ArticlesList.forEach(function(value,key){
          that.ArticlesList[key].created_at = that.splitFun(value.created_at)
        });
      })
    },
    splitFun (value) {
      var time = value.split(' ')[0]
      var data = value.split(' ')[1]
      var y = time.split('-')[0]
      var m = time.split('-')[1]
      var d = time.split('-')[2]
      var h = data.split(':')[0]
      var s = data.split(':')[1]
      var values = y + '年' + m + '月' + d + '日' + ' ' + h + ':' + s
      return values
    },
    handleCurrentChange (e) {
      if (e === 1) {
        this.offset = 0
      } else {
        // this.offset = (e - 1) * this.limit
        this.offset = e - 1
      }
      window,scrollTo(0,0)
      this._getInformRecordList()
    },
    examineClick (item) {
      this.status = false;
      this.dataList = item;
      saveInformRecordState
      var form = {
        record_id: item.id
      }
      this.isShowModal = true;
      saveInformRecordState(form, { headers: { token: this.token } }).then(res => {
        this.isShowModal = false;
      })
    },
    closeClick () {
      this.status = true;
      this._getInformRecordList()
    }
  }
}
</script>

<style lang='scss'>
@import '@/assets/style/mixin.scss';
.my-published-articles {
  margin-top: 8rem;
  background:rgba(245,246,247,1);
  .centent {
    padding-top: 4rem;
    @include flex(space-between,flex-start);
    .item-left {
      margin-bottom: 10rem;
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
        .bottom-msg-activess {
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
          display: flex;
          justify-items: center;
          align-items: center;
          img {
            margin-right: 1.4rem;
          }
          h1 {
            font-size:2.2rem;
            font-weight:600;
            color:rgba(37,36,39,1);
            line-height:3rem;
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
        margin-top: 4rem;
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
          .activess {
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
      }
      .tabaaa {
        position: relative;
        min-height: 38rem;
        margin-top: 4rem;
        padding-bottom: 4rem;
        div {
          display: flex;
          justify-content: space-between;
          h1 {
            width: 72%;
            font-size:2.2rem;
            font-weight:bold;
            color:rgba(37,36,39,1);
            line-height:3rem;
          }
          p {
            width: 25%;
            line-height:3rem;
            font-size:1.4rem;
            color:rgba(189,189,189,1);
          }
        }
        h2 {
          margin-top: 1.6rem;
          font-size:1.4rem;
          color:rgba(134,134,134,1);
          line-height:2.2rem;
        }
        span {
          cursor: pointer;
          display: block;
          width:17rem;
          height:5rem;
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          border-radius:0.4rem;
          font-size:1.6rem;
          color:rgba(255,255,255,1);
          line-height:5rem;
          text-align: center;
          position: absolute;
          right: 0;
          bottom: 5rem;
        }
      }
      .activess {
        .prompt {
          text-align: center;
          margin-top: 2rem;
          font-size: 1.6rem;
          color: #999;
        }
        ul>li{
          display: flex;
          justify-content: space-between;
          padding: 3.2rem 0;
          border-bottom: .1rem solid rgba(247,248,250,1);
          .left-box {
            cursor: pointer;
            // display: flex;
            width: 72%;
            .text {
              margin-left: 1.6rem;
              h1 {
                font-size:2.2rem;
                font-weight:600;
                color:rgba(37,36,39,1);
                line-height:3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                i {
                  margin-right: 5px;
                  line-height: 3rem;
                  display: inline-block;
                  color: red;
                  font-size: 1.8rem;
                }
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
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .tex-color {
                color:rgba(189,189,189,1);
              }
            }
          }
          .right-box {
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
          .left-box-time {
            width: 25%;
            font-size:1.4rem;
            color:rgba(189,189,189,1);
            line-height:2rem;
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
        .activess {
          ul>li{
            .left-box {
              .text {
                margin-left: 1rem;
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
        .taba .tabas li {
          flex: auto;
        }
        .tabaaa {
          div {
            display: block;
            h1 {
              width: 100%;
            }
            p {
              width: 100%;
            }
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
