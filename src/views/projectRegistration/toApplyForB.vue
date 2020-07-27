<template>
  <div class="to-apply-for-b">
    <div class="main">
      <div class="main-a">
        <div class="top"><h1>C.經銷商資訊</h1><div class="num"><span>2</span>/4</div></div>
        <div class="link"><div class="links"></div></div>
        <div class="form-box">
          <p>經銷商資訊</p>
          <div class="form">
            <div class="card">
              <label>
                <span></span>
                <div class="name">經銷商公司名稱</div>
                <input type="text" v-model="formB.dealer_company_name" placeholder="請填寫經銷商公司名稱">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">業務E-mail</div>
                <input type="text" v-model="formB.business_email" placeholder="請填寫E-mail">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">業務姓名</div>
                <input type="text" v-model="formB.business_name" placeholder="請填寫姓名">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">報備日期</div>
                <!-- <input type="text" placeholder="請填寫日期" v-model="formB.report_date">  -->
                <el-date-picker
                  disabled
                  v-model="formB.report_date"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="請選擇日期">
                </el-date-picker>
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">職稱</div>
                <input type="text" placeholder="請填寫職稱" v-model="formB.rank">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">行動電話</div>
                <input type="text" placeholder="請填寫電話號碼" v-model="formB.mobile">
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="main-b">
        <div class="top"><h1>D.代理商資訊</h1></div>
        <div class="main-form-b">
          <div class="card">
            <p>代理商公司</p>
            <el-select  placeholder="請選擇" value-key="name" v-model="formB.agent_company" @change="oegionChange(formB.agent_company)">
              <el-option v-for="(item,index) in oegionListA" :label="item.name" :value="item" :key="index"></el-option>
            </el-select>
          </div>
          <div class="card">
            <p>代理商產品經理</p>
            <el-select v-model="formB.agent_business" value-key="qz_name" placeholder="請選擇"  @change="oegionChangeB(formB.agent_business)">
              <el-option v-for="(item,index) in oegionListB" :label="item.qz_name" :value="item" :key="index"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="btn">
        <a @click="$emit('prev')">上一步</a>
        <a class="btnColor" @click="next">下一步</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getAgentPersonal } from './../../api/request'
export default {
  name: 'to-apply-for-b',
  data () {
    return {
      token: window.sessionStorage.getItem('token'),
      formB: {
        dealer_company_name: '',
        business_email: '',
        business_name: '',
        report_date: this.getNowTime(),
        rank: '',
        mobile: '',
        agent_company: [],
        agent_business: []
      },
      oegionListA: [],
      oegionListB: [],
      agent_companyId: '',
      agent_businessId: ''
    }
  },
  mounted () {
    this._getAgentPersonal()
    // this.formB = storage.getItem('formB') || {}
  },
  methods: {
    //处理默认选中当前日期
	    getNowTime() {
	       var now = new Date();
	       var year = now.getFullYear(); //得到年份
	       var month = now.getMonth(); //得到月份
	       var date = now.getDate(); //得到日期
	      //  var hour =" 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
	       month = month + 1;
	       month = month.toString().padStart(2, "0");
	       date = date.toString().padStart(2, "0");
	       var defaultDate = `${year}-${month}-${date}`;
	       return defaultDate;
	       this.$set(this.formB, "report_date", defaultDate);
	    },
    _getAgentPersonal () {
      getAgentPersonal({ headers: { token: this.token } }).then(res => {
        if (res.data.code !== '200') {
          this.$message.error('獲取數據失敗！')
        } else {
          this.oegionListA = res.data.data.rows
        }
      })
    },
    oegionChange (item) {
      this.formB.agent_business = ''
      // const list = this.oegionListA.filter(i => {
      //   return i.id === item
      // })
      this.oegionListB = item._child
      this.agent_companyId = item.id
    },
    oegionChangeB (item) {
      this.agent_businessId = item.qz_id
    },
    next (type) {
      const { formB } = this
      let errMsg = ''
      if (!formB.dealer_company_name) {
        errMsg = '請填寫經銷商公司名稱!'
      } else if (!formB.business_email) {
        errMsg = '請填寫E-mail!'
      } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(formB.business_email)) {
        errMsg = '請填寫正確E-mail!'
      } else if (!formB.business_name) {
        errMsg = '請填寫姓名!'
      } else if (!formB.report_date) {
        errMsg = '請填寫日期!'
      } else if (!formB.rank) {
        errMsg = '請填寫職稱!'
      } else if (!formB.mobile) {
        errMsg = '請填寫電話號碼!'
      // } else if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(formB.mobile)) {
      //   errMsg = '請填寫正確電話號碼!'
      } else if (formB.agent_company && !formB.agent_business) {
        errMsg = '代理商產品經理不能為空!'
      }
      if (errMsg) {
        this.$message.error(errMsg)
        return false
      }
      const form = {
        ...this.formB,
        agent_companyId: this.agent_companyId,
        agent_businessId: this.agent_businessId
      }
      this.$emit('next', form)
    }
  }
}
</script>

<style lang='scss'>
@import './../../assets/style/mixin.scss';
.to-apply-for-b {
  .main {
    margin-top: 4.8rem;
    .main-a {
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
          width: 50%;
          height:.4rem;
          background:rgba(37,36,39,1);
          border-radius:.2rem;
        }
      }
      .form-box {
        width: 100%;
        margin-top: 3rem;
        p {
          font-size:1.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
          margin-bottom: 1rem;
        }
        .form {
          width: 100%;
          @include flex();
          flex-wrap: wrap;
          .card {
            flex: 0 0 48%;
            height:5rem;
            background:rgba(245,246,247,1);
            border-radius:.4rem;
            border:.1rem solid rgba(239,239,239,1);
            margin-bottom: 2.4rem;
            label {
              height: 100%;
              @include flex(flex-start,center);
              margin-left: 2rem;
              span {
                width:.4rem;
                height:.4rem;
                background:rgba(235,54,44,1);
                border-radius: 50%;
                margin-right: .9rem;
              }
              .name {
                width: 12.3rem;
                font-size:1.6rem;
                font-weight:400;
                color:rgba(37,36,39,1);
                line-height:2.2rem;
                margin-right: 1.3rem;
                cursor: pointer;
              }
              input {
                border: none;
                outline: none;
                background:rgba(245,246,247,1);
                font-size:1.6rem;
                font-weight:400;
                color:rgba(189,189,189,1);
                line-height:2.2rem;
              }
              .el-input__inner {
                border: none;
                outline: none;
                background:rgba(245,246,247,1);
                font-size:1.6rem;
                font-weight:400;
                color:#BDBDBD;
                line-height:2.2rem;
                padding: 0;
              }
              input::-webkit-input-placeholder {
                color:#bdbdbd;
              }
              input::-moz-input-placeholder {
                color:#bdbdbd;
              }
              input::-ms-input-placeholder {
                color:#bdbdbd;
              }
              .el-input__prefix, .el-input__suffix {
                display: none;
              }
            }
          }
        }
      }
    }
    .main-b {
      .top {
        @include flex();
        h1 {
          font-size:2rem;
          font-weight:500;
          color:rgba(37,36,39,1);
          line-height:2.8rem;
        }
      }
      .main-form-b {
        width: 100%;
        @include flex(space-between,flex-start);
        margin-top: 1rem;
        .card {
          flex: 0 0 48%;
          height:5rem;
          width: 100%;
          @include flex(flex-start,center);
          background:rgba(245,246,247,1);
          border-radius:.4rem;
          border:.1rem solid rgba(239,239,239,1);
          padding-left: 3rem;
          margin-bottom: 2rem;
          p {
            margin-right: 1.4rem;
            font-size:1.6rem;
            font-weight:400;
            color:rgba(37,36,39,1);
            line-height:2.2rem;
          }
          .el-select {
            width: 70%;
          }
          /deep/.el-input__inner {
            border: none;
            font-size:1.6rem;
            background:rgba(245,246,247,1);
            font-weight:400;
            color:rgba(37,36,39,1)
          }
          /deep/.el-select .el-input .el-select__caret {
            color: #3D3D3D;
            font-size: 1.8rem;
            font-weight: 700;
          }
        }
        .bootm-title {
          .title {
            margin-top: 3.4rem;
          }
        }
      }
    }
    .btn {
      @include flex(flex-end,center);
       margin-left: auto;
       margin-top: 8rem;
      a {
        width:31rem;
        height:5rem;
        display: inline-block;
        @include flex(center);
        background:rgba(255,255,255,1);
        color:rgba(37,36,39,1);
        border-radius:.4rem;
        font-size:1.6rem;
        font-weight:400;

        border:1px solid rgba(61,61,61,1);
        line-height:2.2rem;
      }
      .btnColor {
        background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
        color:rgba(255,255,255,1);
        margin-left: 2rem;
      }
    }
  }
}
</style>
