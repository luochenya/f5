<template>
  <div class="to-apply-for-d">
    <div class="container">
      <div class="centent">
        <div class="main">
          <div class="main-item">
            <div class="top"><h1>填寫資料確認</h1><div class="num"><span>4</span>/4</div></div>
            <div class="link"><div class="links"></div></div>
             <h2>A.客戶及專案資訊</h2>
             <p>客戶信息</p>
             <div class="card-box" v-if="formA">
                <div class="card">
                  <span></span>
                  <div class="name">客戶名稱</div>
                  <div class="text">{{formA.client_name}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">專案名稱</div>
                  <div class="text">{{formA.project_name}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">承辦單位/部門</div>
                  <div class="text">{{formA.organizer}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">承辦人電話(O)</div>
                  <div class="text">{{formA.unker_phone[0]}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">承辦人</div>
                  <div class="text">{{formA.undertaker}}</div>
                </div>
             </div>
             <p>客戶信息</p>
             <div class="card-box">
                <div class="card">
                  <span></span>
                  <div class="name">預計結案季度</div>
                  <div class="text">{{formA.exp_close_quarter}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">預計結案月份</div>
                  <div class="text">{{formA.exp_close_month}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">專案總結算</div>
                  <div class="text">{{formA.total_budget}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">F5預算</div>
                  <div class="text">{{formA.five_budget}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">產業別</div>
                  <div class="text">{{formA.industry}}</div>
                </div>
                <div class="card">
                  <span></span>
                  <div class="name">承辦人E-mail</div>
                  <div class="text">{{formA.unker_email}}</div>
                </div>
             </div>
             <div class="link"></div>
            <h2 class="main-b-title">B.產品方案資訊</h2>
            <div class="main-b" v-for="(item,index) in formA.product_program" :key="index">
              <div class="title"><span></span>產品型號</div>
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
              <div class="title"><span></span>產品模組</div>
              <p v-for="(items,i) in item.project_module" :key="i">{{items.module_name}}</p>
            </div>
            <div class="link"></div>
            <h2>C.經銷商資訊</h2>
            <p>經銷商資訊</p>
            <div class="card-box" v-if="formB">
              <div class="card">
                <span></span>
                <div class="name">經銷商公司名稱</div>
                <div class="text">{{formB.dealer_company_name}}</div>
              </div>
              <div class="card">
                <span></span>
                <div class="name">業務E-mail</div>
                <div class="text">{{formB.business_email}}</div>
              </div>
              <div class="card">
                <span></span>
                <div class="name">業務姓名</div>
                <div class="text">{{formB.business_name}}</div>
              </div>
              <div class="card">
                <span></span>
                <div class="name">報備日期</div>
                <div class="text">{{formB.report_date}}</div>
              </div>
              <div class="card">
                <span></span>
                <div class="name">職稱</div>
                <div class="text">{{formB.rank}}</div>
              </div>
              <div class="card">
                <span></span>
                <div class="name">行動電話</div>
                <div class="text">{{formB.mobile}}</div>
              </div>
            </div>
            <div class="link"></div>
            <h2>D.代理商資訊</h2>
            <div class="card-box-d">
              <div class="card">
                <div class="name" >代理商公司</div>
                <el-select v-if="formB.agent_company" v-model="formB.agent_company.name" placeholder="二三科技有限公司" disabled>
                  <!-- <el-option
                    label="A"
                    value="B">
                  </el-option> -->
                </el-select>
              </div>
              <div class="card">
                <div class="name">代理商業務</div>
                <el-select v-if="formB.agent_business" v-model="formB.agent_business.qz_name" placeholder="陳二"  disabled>
                  <!-- <el-option
                    label="A"
                    value="B">
                  </el-option> -->
                </el-select>
              </div>
            </div>
            <div class="card-box-e">
              <h2>E.專案配置與進度說明</h2>
              <div class="card-item" v-if="formC.projectThat">
                <div class="card">
                  <div class="title">1.已向客戶進行方案簡報?</div>
                  <div class="card-d">{{formC.projectThat[0]}}</div>
                </div>
                <div class="card">
                  <div class="title">2.已提供/建議 產品 or 方案給客戶?</div>
                  <div class="card-d">{{formC.projectThat[1]}}</div>
                </div>
                <div class="card">
                  <div class="title">3.須進行PoC驗證?</div>
                  <div class="card-d">{{formC.projectThat[2]}}</div>
                </div>
                <div class="card">
                  <div class="title">4.預估進行PoC之日常?</div>
                  <div class="card-d">{{formC.projectThat[3]}}</div>
                </div>
                <div class="card">
                  <div class="title">5.是否需要開立原廠保固授權說明?</div>
                  <div class="card-d">{{formC.projectThat[4]}}</div>
                </div>
                <div class="card">
                  <div class="title">6.決標方式? (價格標/評選標/資格標.....等)</div>
                  <div class="card-d">{{formC.projectThat[5]}}</div>
                </div>
                <div class="card">
                  <div class="title">7.競爭對手狀態說明</div>
                  <div class="card-d">{{formC.projectThat[6]}}</div>
                </div>
              </div>
            </div>
            <div class="card-box-f">
              <h2>F.需要F5支援項目</h2>
              <div class="text">
               {{formC.five_support_project}}
            </div>
            <div class="bottom-b">
              <div class="btn" @click="$emit('prev')">上一步</div>
              <div class="btn btn-r" @click="successModal">發出申請</div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      :showModal="isShowModal"
      btnType="3"
      @submit = "submit"
    >
      <template slot="body">
        <h3>已收到您的申請</h3>
        <p>請等待時間審核</p>
      </template>
    </modal>
    <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import Modal from './../../components/Modal'
import { setApplyProject } from './../../api/request'
export default {
  name: 'to-apply-for-d',
  components: {
    Modal
  },
  props: {
    formA: Object,
    formB: Object,
    formC: Object
  },
  data () {
    return {
      value: '',
      isShowModal: false,
      textValue: '',
      selectValue: '',
      product_program: [],
      projectThat: [],
      five_support_project: '',
      token: window.sessionStorage.getItem('token'),
      isShowLoading: false
    }
  },
  mounted () {
    console.log(this.formA, '122')
    console.log(this.formB, '2')
    console.log(this.formC, '3')
  },
  methods: {
    successModal () {
      this.isShowLoading = true
      // eslint-disable-next-line camelcase
      const { client_name, project_name, organizer, unker_phone, undertaker, exp_close_quarter, exp_close_month, total_budget, five_budget, industry, unker_email, comp_manu_origina, comp_manu_dealer, product_programs } = this.formA
      // eslint-disable-next-line camelcase
      const { dealer_company_name, business_email, business_name, report_date, rank, mobile, agent_companyId, agent_businessId } = this.formB
      // eslint-disable-next-line camelcase
      const { five_support_project, projectThat } = this.formC
      const projectThatArr = []
      projectThat.forEach((v, i) => {
        projectThatArr[i] = v
      })

      // this.projectThat = JSON.stringify(projectThatArr)
      console.log(JSON.stringify(projectThatArr))
      const form = {
        client_name,
        project_name,
        organizer,
        unker_phone: JSON.stringify(unker_phone),
        undertaker,
        exp_close_quarter,
        exp_close_month,
        total_budget,
        five_budget,
        industry,
        unker_email,
        comp_manu_origina,
        comp_manu_dealer,
        product_program: JSON.stringify(product_programs),
        dealer_company_name,
        business_email,
        business_name,
        report_date,
        rank,
        mobile,
        agent_company: agent_companyId,
        agent_business: agent_businessId,
        project_config_progress_that: JSON.stringify(projectThatArr),
        five_support_project
      }
      console.log(form, 'f')
      setApplyProject(form, { headers: { token: this.token } }).then(res => {
        if (res.data.code !== '200') {
          this.isShowLoading = false
          this.$message.error('提交失敗！')
        } else {
          this.isShowLoading = false
          this.isShowModal = true
        }

        // console.log(res)
      })
    },
    submit () {
      // this.textValue
      // console.log(this.textValue)

      this.isShowModal = false
    },
    submitSuccess () {
      console.log(this.selectValue)
      this.isShowModalSuccess = false
    }
  }
}
</script>

<style lang='scss'>
@import './../../assets/style/mixin.scss';
.to-apply-for-d {
  margin-top: 8rem;
  .img-box {
    background: url('./../../assets/imgs/project-review.png') no-repeat;
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
    .top {
      @include flex();
      h1 {
        font-size:2rem;
        font-weight:500;
        color:rgba(37,36,39,1);
        line-height:2.8rem;
      }
      .num {
        font-size:1.2rem;
        font-weight:500;
        color:rgba(37,36,39,1);
        line-height:2.8rem;
        span {
          font-size: 2rem;
          font-weight:500;
        }
      }
    }
    .link {
      width: 100%;
      height:.4rem;
      background:rgba(237,237,237,1);
      border-radius:.2rem;
      margin-top: 1.1rem;
      .links {
        width: 100%;
        height:.4rem;
        background:rgba(37,36,39,1);
        border-radius:.2rem;
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
