<template>
  <div class="project-review-detail">
    <div class="img-box">
      <div class="container">
        <div class="text">
         <!-- <p>PROJECT REGISTRATION</p> -->
          <span>專案註冊</span>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3">
          <el-breadcrumb-item><a href="javascript:;" @click="$router.push('/')">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;">我的</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;">歷程記錄</a></el-breadcrumb-item>
          <el-breadcrumb-item :class="{'checked': $route.meta.title}">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div class="centent">
        <div class="title">
          <h1>專案註冊</h1>
          <p>PROJECT REGISTRATION</p>
        </div>
        <div class="main">
          <div class="main-item">
             <h2>A.客戶及專案資訊</h2>
             <p>客戶信息</p>
             <div class="card-box">
                <div class="card">
                  <span></span>
                  <div class="name">客戶名稱</div>
                  <div class="text">{{prpjectDetail.client_name}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">專案名稱</div>
                  <div class="text">{{prpjectDetail.project_name}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">承辦單位/部門</div>
                  <div class="text">{{prpjectDetail.organizer}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">承辦人電話(O)</div>
                  <div class="text" v-if="unker_phone">{{unker_phone[0]}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">承辦人</div>
                  <div class="text">{{prpjectDetail.undertaker}}</div>
                </div>
             </div>
             <p>客戶信息</p>
             <div class="card-box">
                <div class="card">
                  <span></span>
                  <div class="name">預計結案季度</div>
                  <div class="text">{{prpjectDetail.exp_close_quarter}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">預計結案月份</div>
                  <div class="text">{{prpjectDetail.exp_close_month}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">專案總結算</div>
                  <div class="text">{{prpjectDetail.total_budget}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">F5預算</div>
                  <div class="text">{{prpjectDetail.five_budget}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">產業別</div>
                  <div class="text">{{prpjectDetail.industry}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">承辦人E-mail</div>
                  <div class="text">{{prpjectDetail.unker_email}}</div>
                </div>
             </div>
             <div class="link"></div>
            <h2 class="main-b-title">B.產品方案資訊</h2>
            <div class="main-b" v-for="(item,index) in product_program" :key='index'>
              <div class="title"><span></span>客戶信息</div>
              <div class="card-box">
                <div class="card">
                  <div class="name">產品</div>
                  <div class="text">{{item.product_type_name}}</div>
                </div>
                <div class="card">
                  <div class="name">數量</div>
                  <div class="text">{{item.product_type_mum}}</div>
                </div>
              </div>
              <div class="title"><span></span>客戶信息</div>
              <p>Advanced Web Application Firewall (WAF)</p>
            </div>
            <div class="link"></div>
            <h2>C.經銷商資訊</h2>
            <p>經銷商資訊</p>
            <div class="card-box">
              <div class="card">
                <span></span>
                <div class="name">經銷商公司名稱</div>
                <div class="text">{{prpjectDetail.dealer_company_name}}</div>
              </div>
              <div class="card">
                <span></span>
                <div class="name">業務E-mail</div>
                <div class="text">{{prpjectDetail.business_email}}</div>
              </div>
              <div class="card">
                <span></span>
                <div class="name">業務姓名</div>
                <div class="text">{{prpjectDetail.business_name}}</div>
              </div>
              <div class="card">
                <span></span>
                <div class="name">報備日期</div>
                <div class="text">{{prpjectDetail.business_name}}</div>
              </div>
              <div class="card">
                <span></span>
                <div class="name">職稱</div>
                <div class="text">{{prpjectDetail.rank}}</div>
              </div>
              <div class="card">
                <span></span>
                <div class="name">行動電話</div>
                <div class="text">{{prpjectDetail.mobile}}</div>
              </div>
            </div>
            <div class="link"></div>
            <h2>D.代理商資訊</h2>
            <div class="card-box-d">
              <div class="card">
                <div class="name">代理商公司</div>
                <el-select v-model="prpjectDetail.agent_company" placeholder="二三科技有限公司" disabled>
                </el-select>
              </div>
              <div class="card">
                <div class="name">代理商業務</div>
                <el-select v-model="prpjectDetail.agent_business" placeholder="陳二" disabled></el-select>
              </div>
            </div>
            <div class="card-box-e">
              <h2>E.專案配置與進度說明</h2>
              <div class="card-item">
                <div class="card">
                  <div class="title">1.已向客戶進行方案簡報?</div>
                  <div class="card-d">{{project_config_progress_that[0]}}</div>
                </div>
                <div class="card">
                  <div class="title">2.已提供/建議 產品 or 方案給客戶?</div>
                  <div class="card-d">{{project_config_progress_that[1]}}</div>
                </div>
                <div class="card">
                  <div class="title">3.須進行PoC驗證?</div>
                  <div class="card-d">{{project_config_progress_that[2]}}</div>
                </div>
                <div class="card">
                  <div class="title">4.預估進行PoC之日常?</div>
                  <div class="card-d">{{project_config_progress_that[3]}}</div>
                </div>
                <div class="card">
                  <div class="title">5.是否需要開立原廠保固授權說明?</div>
                  <div class="card-d">{{project_config_progress_that[4]}}</div>
                </div>
                <div class="card">
                  <div class="title">6.決標方式? (價格標/評選標/資格標.....等)</div>
                  <div class="card-d">{{project_config_progress_that[5]}}</div>
                </div>
                <div class="card">
                  <div class="title">7.競爭對手狀態說明</div>
                  <div class="card-d">{{project_config_progress_that[6]}}</div>
                </div>
              </div>
            </div>
            <div class="card-box-f">
              <h2>F.需要F5支援項目</h2>
              <div class="text">
               {{prpjectDetail.five_support_project}}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getProjectRead } from './../../api/request'
export default {
  name: 'project-review-detail',
  data () {
    return {
      value: '',
      isShowModal: false,
      isShowModalSuccess: false,
      textValue: '',
      selectValue: '',
      token: window.sessionStorage.getItem('token'),
      project_id: this.$route.query.project_id,
      prpjectDetail: {},
      product_program: [],
      unker_phone: [],
      project_config_progress_that: []
    }
  },
  mounted () {
    console.log(this.project_id)
    this._getProjectRead()
  },
  methods: {
    _getProjectRead () {
      getProjectRead({ project_id: this.project_id }, { headers: { token: this.token } }).then(res => {
        console.log(res)
        if (res.data.code !== '200') {
          this.$message.error('獲取數據失敗！')
        } else {
          this.prpjectDetail = res.data.data
          this.product_program = JSON.parse(res.data.data.product_program)
          this.unker_phone = JSON.parse(res.data.data.unker_phone)
          this.project_config_progress_that = JSON.parse(res.data.data.project_config_progress_that)
          console.log(this.prpjectDetail)
          console.log(this.unker_phone)
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import './../../assets/style/mixin.scss';
.project-review-detail {
  margin-top: 8rem;
  .img-box {
    background: url('./../../assets/imgs/project-registration.png') no-repeat;
    width: 100%;
    display: block;
    background-position: center center;
    background-size: cover;
    height: 32rem;
    .container {
      .text {
        padding-top: 10.4rem;
        padding-left: 10.8rem;
        p {
          font-size:4.2rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:5.9rem;
        }
        span {
          font-size:3.6rem;
          font-weight:300;
          color:rgba(37,36,39,1);
          line-height:5.4rem;
        }
      }
    }
  }
  .centent {
    margin-top: 8rem;
    .title {
      margin-bottom: 2.8rem;
      h1 {
        font-size:2.2rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:3rem;
      }
      p {
        font-size:1rem;
        font-weight:400;
        color:rgba(189,189,189,1);
        line-height:1.4rem;
        margin-top: .2rem;
      }
    }
    .main {
      margin-top: 2.4rem;
      .main-item {
        h2 {
          font-size:2rem;
          font-weight:500;
          color:rgba(37,36,39,1);
          line-height:2.8rem;
        }
        p {
          font-size:1.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
      }
      .card-box {
        @include flex();
        width: 100%;
        flex-wrap: wrap;
        .card {
          flex: 0 0 48%;
          @include flex(flex-start,center);
          padding-left: 2rem;
          margin-bottom: 2.4rem;
          height:5rem;
          background:rgba(245,246,247,1);
          border-radius:.4rem;
          border:.1rem solid rgba(239,239,239,1);
          span {
            width:.4rem;
            height:.4rem;
            background:rgba(235,54,44,1);
            border-radius: 50%;
          }
          .name {
            margin-left: .9rem;
            width:11.2rem;
            height:2.2rem;
            font-size:1.6rem;
            font-weight:400;
            color:rgba(134,134,134,1);
            line-height:2.2rem;
          }
          .text {
            margin-left: 2.2rem;
            font-size:1.6rem;
            font-weight:400;
            color:rgba(37,36,39,1);
            line-height:2.2rem;
          }
        }
      }
      .link {
        height:.1rem;
        margin: 2rem 0 4rem;
        background:rgba(247,248,250,1);
      }
      .main-b-title {
        margin-bottom: 2rem;
      }
      .main-b {
        .title {
          @include flex(flex-start,center);
          font-size:1.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
          span {
            width:.4rem;
            height:.4rem;
            display: inline-block;
            background:rgba(235,54,44,1);
            border-radius: 50%;
            margin-right: .9rem;
          }
        }
        .card-box {
          .card {
            .name {
              width:3.2rem;
            }
          }
        }
        p {
          font-size:1.6rem;
          font-weight:400;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
          margin-bottom: 4rem;
        }
      }
      .card-box-d {
        @include flex();
        width: 100%;
        flex-wrap: wrap;
        margin-top: 1rem;
        .card {
          flex: 0 0 48%;
          @include flex(flex-start,center);
          padding-left: 2rem;
          margin-bottom: 2.4rem;
          height:5rem;
          background:rgba(245,246,247,1);
          border-radius:.4rem;
          border:.1rem solid rgba(239,239,239,1);
          .name {
            margin-left: .9rem;
            width:11.2rem;
            height:2.2rem;
            font-size:1.6rem;
            font-weight:400;
            color:rgba(134,134,134,1);
            line-height:2.2rem;
          }
         .el-select {
           width: 75%;
         }
         /deep/.el-input__inner {
           border: none;
           font-size:1.6rem;
           background:rgba(245,246,247,1);
           font-weight:400;
          color:rgba(37,36,39,1)
         }
         .el-select .el-input .el-select__caret {
           color: #3D3D3D;
           font-size: 1.8rem;
           font-weight: 700;
         }
        }

      }
      .card-box-e {
        margin-top: 8.1rem;
        .card-item {
          width: 100%;
          @include flex();
          flex-wrap: wrap;
          .card {
            flex: 0 0 48%;
            margin-bottom: 2.4rem;
            .title {
              font-size:1.6rem;
              font-weight:400;
              color:rgba(134,134,134,1);
              line-height:2.2rem;
              margin-bottom: 1rem;
            }
            .card-d {
              padding: 1.4rem 4.6rem 2.2rem 3rem;
              background:rgba(245,246,247,1);
              border-radius:.4rem;
              border:.1rem solid rgba(239,239,239,1);
              font-size:1.6rem;
              font-weight:400;
              color:rgba(37,36,39,1);
              line-height:2.2rem;
            }
          }
        }
      }
      .card-box-f {
        margin-top: 8.1rem;
        h2 {
          font-size:2rem;
          font-weight:500;
          color:rgba(37,36,39,1);
          line-height:2.8rem;

        }
        .text {
          padding: 1.9rem 3rem 1.9rem 2rem;
          margin-top: 1rem;
          font-size:1.6rem;
          font-weight:400;
          color:rgba(37,36,39,1);
          line-height:2.4rem;
          background:rgba(245,246,247,1);
          border-radius:.4rem;
          border:.1rem solid rgba(239,239,239,1);
        }
      }
      .bottom-b {
         display: flex;
         justify-content: flex-end;
         margin-left: auto;
         margin-top: 8rem;
        .btn {
          width:31rem;
          height:5rem;
          @include flex(center);
          background:rgba(255,255,255,1);
          border-radius:.4rem;
          border:.1rem solid rgba(61,61,61,1);
          font-size:1.6rem;
          font-weight:400;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
          cursor: pointer;
        }
        .btn-r {
          margin-left: 2rem;
          color:rgba(255,255,255,1);
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
        }
      }
    }
  }
}
</style>
