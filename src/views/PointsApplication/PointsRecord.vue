<template>
  <div class="PointsRecord">
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
            <span class="bottom-msg-active">點數記錄<i class="icon-9"></i></span>
            <div></div>
            <span @click="$router.push({path:'/MallOrder'})">商城訂單查詢</span>
            <div></div>
            <span @click="$router.push({path:'/notificationCenter'})">通知中心</span>
          </div>
        </div>
        <div class="item-r">
          <div class="title">
            <div class="title-l">
              <h1>點數記錄</h1>
              <span>POINTS RECORD</span>
            </div>
          </div>
          <div class="time">
            <div class="time-left">
              <span>時間</span>
              <div class="itme-item">
                <div class="item-l">
                  <el-date-picker
                    v-model="form.value1"
                    type="date"
                     value-format="yyyy-MM-dd"
                    placeholder="請選擇時間">
                  </el-date-picker>
                  <i class="icon-8"></i>
                </div>
                <span class="link"></span>
                <div class="item-l">
                  <el-date-picker
                    v-model="form.value2"
                    type="date"
                     value-format="yyyy-MM-dd"
                    placeholder="請選擇時間">
                  </el-date-picker>
                  <i class="icon-8"></i>
                </div>
              </div>
            </div>
            <div class="btn">
              <span @click="toClear">清除</span>
              <a @click="_getPointRecordList">查詢</a>
            </div>
          </div>
          <div class="taba">
            <div class="taba_header">
              <div class="taba_header_big">兌換時間</div>
              <div>名稱</div>
              <div>點數收支</div>
            </div>
            <div class="taba_content" v-for="(item, index) in dataFormList" :key="index">
              <div class="taba_content_big">{{item.created_at}}</div>
              <div>{{item.type}}</div>
              <div :class="item.amount < 0 ? 'taba_content_positive' : ''">{{item.amount}}</div>
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
    <loading :show="isShowModal"></loading>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import storage from '@/storage'
import { getPointRecordList } from '@/api/request'
export default {
  name: 'PointsRecord',
  components: {
    Pagination
  },
  data () {
    return {
      isShowModal: false,
      userInfo: storage.getItem('userInfo'),
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一週前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      form: {
        value1: '',
        value2: '',
        state: ''
      },
      dataFormList: [],
      offset: 0,
      limit: 10,
      token: window.sessionStorage.getItem('token'),
      total: 0,
      path: this.imgs
    }
  },
  mounted () {
    this._getPointRecordList()
  },
  methods: {
    _getPointRecordList () {
      const c_time = `${this.form.value1}~${this.form.value2}`
      var form = {
        offset: this.offset * this.limit,
        limit: this.limit,
        c_time: c_time
      }
      this.isShowModal = true
      getPointRecordList(form, { headers: { token: this.token } }).then(res => {
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
      this._getPointRecordList()
    },
    toClear () {
      this.form = {
        value1: '',
        value2: '',
        state: ''
      }
      this.isActive = ''
      this.is_pass = ''
      this.offset = 0
      this._getPointRecordList()
    },
  }
}
</script>

<style lang='scss'>
@import '@/assets/style/mixin.scss';
.PointsRecord {
  margin-top: 8rem;
  background:rgba(245,246,247,1);
  .centent {
    padding-top: 4rem;
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
            line-height: 4rem;
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
        .taba_header {
          width: 100%;
          height:44px;
          background:rgba(245,246,247,1);
          div {
            display: inline-block;
            text-align: center;
            width: 30%;
            line-height:44px;
            font-size:12px;
            font-weight:600;
            color:rgba(37,36,39,1);
          }
          .taba_header_big {
            width: 40%;
          }
        }
        .taba_content {
          width: 100%;
          height: 70px;
          line-height: 70px;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          border-bottom: 1px solid rgba(247,248,250,1);;
          div {
            display: inline-block;
            text-align: center;
            width: 30%;
            line-height:44px;
            font-size:14px;
            color:rgba(37,36,39,1);
          }
          .taba_content_big {
            width: 40%;
          }
          .taba_content_positive {
            color:rgba(225,105,0,1);
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
    //  padding-bottom: 3rem;
    .centent {
      padding:1.5rem;
      flex-wrap: wrap;
      .item-r {
        overflow-x: auto;
        margin-bottom: 0;
        .taba {
          width: 50rem;
          margin-top: 3rem;
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
