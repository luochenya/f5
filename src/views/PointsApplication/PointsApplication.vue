<template>
  <div class="PointsApplication">
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
            <span class="bottom-msg-active">點數申請<i class="icon-9"></i></span>
            <div></div>
            <span @click="$router.push({path:'/PointsRecord'})">點數記錄</span>
            <div></div>
            <span @click="$router.push({path:'/MallOrder'})">商城訂單查詢</span>
            <div></div>
            <span @click="$router.push({path:'/notificationCenter'})">通知中心</span>
          </div>
        </div>
        <div class="item-r">
          <div class="title">
            <div class="title-l">
              <h1>點數申請 <em @click="ApplicationInstructions()">查看申請說明</em></h1>
              <span>CREDIT APPLICATION</span>
            </div>
            <div class="title-r" @click="toCreditApplication()">
              申請
            </div>
          </div>
          <div class="time">
            <div class="time-left">
              <span>發表時間</span>
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
            <div class="right-box">
              <div class="item-l">
                <span>審核狀態</span>
                <el-select placeholder="請選擇狀態" v-model="form.state">
                  <el-option label="已送審" value="0"></el-option>
                  <el-option label="已通過" value="1"></el-option>
                  <el-option label="未通過" value="2"></el-option>
                </el-select>
              </div>
            </div>
            <div class="btn">
              <span @click="toClear">清除</span>
              <a @click="_getPointApplyList">查詢</a>
            </div>
          </div>
          <div class="taba">
             <!-- @click="isActive = item.value;" -->
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
            <div>
              <div class="active">
                <div class="prompt" v-if="ArticlesList.length<=0">暫無申請記錄</div>
                <ul v-else>
                  <li v-for="(item,index) in ArticlesList" :key="index" @click="toPointsDetails(item.id)">
                    <div class="left-box">
                       <div class="text">
                        <h6 v-if="item.class_name">{{item.class_name}}</h6>
                        <h1>{{item.title}}</h1>
                        <p>發表時間：{{item.created_at}}</p>
                      </div>
                    </div>
                    <div class="right-box">
                      <p v-if="item.state== 0" class="right_box_Processing">處理中...</p>
                      <p v-if="item.state== 1" class="right_box_By">通過</p>
                      <p v-if="item.state== 2" class="right_box_DidNotPass">不通過</p>
                    </div>
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
        </div>
      </div>
    </div>
    <loading :show="isShowModal"></loading>
    <modal
      btnType='8'
      :imgShow="imgShow"
      :showModal="isModal"
      @cancel="isModal = false"
      @submit="submit"
    >
      <template slot="body">
        <h3>申請說明</h3>
        <em>
          企業依賴於應用程序。<br />
          無論是幫助企業與客戶建立聯繫的應用程序，還是幫助員工完成工作的應用程序，<br />
          我們都確保在任何地方始終可用且安全的應用程序。<br />
          快來看F5的實際運用 我們著迷於了解您最棘手的業務挑戰，因此我們可以共同解決這些挑戰。<br />
          我們在西雅圖，聖何塞和倫敦設有客戶簡報中心，我們希望向您展示。<br />
        </em>
      </template>
    </modal>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import storage from '@/storage'
import { getPointApplyList, getJurisdiction } from '@/api/request'
import Modal from '@/components/Modal'
export default {
  name: 'PointsApplication',
  components: {
    Pagination,
    Modal
  },
  data () {
    return {
      imgShow: true,
      isShowModal: false,
      isModal: false,
      userInfo: storage.getItem('userInfo'),
      isActive: '',
      menu: [{
        name: '全部',
        value: ''
      }, {
        name: '已送審',
        value: '0'
      }, {
        name: '已通過',
        value: '1'
      }, {
        name: '未通過',
        value: '2'
      }, {}
      ],
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
      ArticlesList: [],
      offset: 0,
      limit: 10,
      is_pass: '',
      token: window.sessionStorage.getItem('token'),
      total: 0,
      delId: '',
      path: this.imgs,
      Jurisdiction: ''
    }
  },
  mounted () {
    this._getPointApplyList() 
    this._getJurisdiction()
  },
  methods: {
    // 獲取會員權限
    _getJurisdiction () {
      getJurisdiction({ headers: { token: this.token } }).then(res => {
        if (res.data.code == '200') {
          this.Jurisdiction = res.data.data
        }
      })
    },
    // 點數申請
    toCreditApplication () {
      // 判斷有無權限
      if (this.Jurisdiction.points_apply == 1) {
        this.$router.push({path:'/CreditApplication'})
      } else {
        this.$message({
          message: '暫無權限',
          type: 'warning',
          duration: 1500
        });
      }
    },
    // 查看點數詳情
    toPointsDetails (id) {
      this.$router.push({
        name: `PointsDetails`,
        query: {
          id: id
        }
      })
    },
    ApplicationInstructions () {
      this.isModal = true
    },
    tabaIsShow (type) {
      this.form.state = type;
      this.isActive = type;
      this._getPointApplyList()
    },
    _getPointApplyList () {
      const c_time = `${this.form.value1}~${this.form.value2}`
      var form = {
        offset: this.offset * this.limit,
        limit: this.limit,
        state: this.form.state,
        c_time: c_time
      }
      this.isShowModal = true
      getPointApplyList(form, { headers: { token: this.token } }).then(res => {
        this.isShowModal = false
        if (res.data.code === '200') {
          this.total = res.data.data.total
          this.ArticlesList = res.data.data.rows
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
      this._getPointApplyList()
    },
    // theQuery () {
    //   const { value1, value2, state } = this.form
    //   this.is_pass = state
    //   const c_time = `${value1}~${value2}`
    //   const { offset, limit, is_pass } = this
    //   this.isShowModal = true
    //   getPointApplyList({ offset, limit, is_pass, c_time }, { headers: { token: this.token } }).then(res => {
    //     this.isShowModal = false
    //     if (res.data.code === '200') {
    //       this.total = res.data.data.total
    //       this.ArticlesList = res.data.data.rows
    //       this.isActive = this.is_pass == '' ? '' : this.is_pass
    //     }
    //   })
    // },
    toClear () {
      this.form = {
        value1: '',
        value2: '',
        state: ''
      }
      this.isActive = ''
      this.is_pass = ''
      this.offset = 0
      this._getPointApplyList()
    },
    deleteArticles (id) {
      this.delId = id
      this.isModal = true
    },
    submit () {
      this.isModal = false
    }
  }
}
</script>

<style lang='scss'>
@import '@/assets/style/mixin.scss';
.PointsApplication {
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
              width:13rem;
              height:4.4rem;
              background:rgba(255,255,255,1);
              border-radius:.6rem;
              border:.1rem solid rgba(61,61,61,1);
              padding-left: 2rem;
            }
             .el-select .el-input .el-select__caret  {
              margin-right: 1rem;
              color: #3D3D3D;
              font-size: 1.6rem;
              font-weight: 700;
              line-height: 4rem;
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
        .taba .tabas li {
          flex: auto;
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
