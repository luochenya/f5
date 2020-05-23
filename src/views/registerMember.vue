<template>
  <div class="register-member">
    <div class="container">
      <div class="title">
        <h1>註冊會員</h1>
        <p>已經有帳號了？<a href="javascript:;" @click="$router.push({path:'/login'})">登入</a></p>
      </div>
      <form :model="form" :rules="rules">
        <div class="form-box">
          <div class="form-item">
            <h2>公司訊息</h2>
            <div class="item-input" :class="{'checked': errStatus1}">
              <label :prop="prop.company_name">
                <span>公司名稱</span>
                <input type="text" placeholder="請填寫公司名稱" v-model="form.company_name" @blur.prevent="changeIpt('company_name')">
              </label>
                <div :class="{'error': errStatus1}"><span></span>{{errMessage1}}</div>
            </div>
            <div class="item-input" :class="{'checked': errStatus2}">
              <label :prop="prop.rank">
                <span>職稱</span>
                <input type="text" placeholder="請填寫職稱" v-model="form.rank" @blur.prevent="changeIpt('rank')">
              </label>
              <div :class="{'error': errStatus2}"><span></span>{{errMessage2}}</div>
            </div>
            <div class="item-input" :class="{'checked': errStatus3}">
              <label :prop="prop.tax_id">
                  <span>統編</span>
                  <input type="text" placeholder="請填寫公司統編" v-model="form.tax_id"  @blur.prevent="changeIpt('tax_id')">
              </label>
              <div :class="{'error': errStatus3}"><span></span>{{errMessage3}}</div>
            </div>
            <div class="item-input" :class="{'checked': errStatus4}">
              <label :prop="prop.company_email">
                  <span>電子郵件</span>
                  <input type="text" placeholder="請輸入公司電子郵件"  v-model="form.company_email"  @blur.prevent="changeIpt('company_email')">
              </label>
              <div :class="{'error': errStatus4}"><span></span>{{errMessage4}}</div>
            </div>
          </div>
          <div class="name-phone">
            <div class="name-phone-item">
                <label :prop="prop.nick_name">
                  <span>姓名</span>
                  <input type="text" placeholder="請填寫姓名" :class="{'checked': errStatus5}"  v-model="form.nick_name"  @blur.prevent="changeIpt('nick_name')">
                </label>
                <div :class="{'error': errStatus5}"><span></span>{{errMessage5}}</div>
            </div>
            <div class="name-phone-item">
                <label :prop="prop.phone">
                  <span>電話/手機</span>
                  <input type="text" placeholder="請輸入您的電話號碼"  v-model="form.phone" :class="{'checked': errStatus6}"  @blur.prevent="changeIpt('phone')">
                </label>
                <div :class="{'error': errStatus6}"><span></span>{{errMessage6}}</div>
            </div>
          </div>
          <div class="form-item">
            <h2>帳號訊息</h2>
            <div class="item-input input-w" :class="{'checked': errStatus7}">
              <label :prop="prop.accounts">
                  <span>帳號</span>
                  <input type="text" placeholder="請設定登入帳號"  v-model="form.accounts" @blur.prevent="changeIpt('accounts')">
              </label>
              <div :class="{'error': errStatus7}"><span></span>{{errMessage7}}</div>
            </div>
            <div class="item-input" :class="{'checked': errStatus8}">
              <label :prop="prop.password">
                  <span>密碼</span>
                  <input type="password" placeholder="長度8至20之英數字組合" v-model="form.password"  @blur.prevent="changeIpt('password')">
              </label>
                <div :class="{'error': errStatus8}"><span></span>{{errMessage8}}</div>
            </div>
            <div class="item-input" :class="{'checked': errStatus9}">
              <label :prop="prop.repassword">
                  <span>確認密碼</span>
                  <input type="password" placeholder="再次輸入確認密碼" v-model="form.repassword"  @blur.prevent="changeIpt('repassword')">
              </label>
              <div :class="{'error': errStatus9}"><span></span>{{errMessage9}}</div>
            </div>
          </div>
          <div class="form-btn" @click="gotoModal">註冊</div>
        </div>
      </form>
    </div>
    <modal
     btnType= "1"
     :showModal="showModal"
     :imgShow= true
     @submit="gotoHome"
    >
      <template slot="body">
        <h3>謝謝您的註冊</h3>
        <p>註冊需要審核，請您耐心等待</p>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import { AccountRegister } from './../api/request'
export default {
  name: 'register-member',
  components: {
    Modal
  },
  data () {
    return {
      showModal: false,
      form: {
        company_name: '',
        nick_name: '',
        rank: '',
        tax_id: '',
        company_email: '',
        phone: '',
        accounts: '',
        password: '',
        repassword: ''
      },
      prop: {
        company_name: 'company_name',
        rank: 'rank',
        tax_id: 'tax_id',
        company_email: 'company_email',
        nick_name: 'nick_name',
        phone: 'phone',
        accounts: 'accounts',
        password: 'password',
        repassword: 'repassword'
      },
      errMessage1: '',
      errStatus1: false,
      errMessage2: '',
      errStatus2: false,
      errMessage3: '',
      errStatus3: false,
      errMessage4: '',
      errStatus4: false,
      errMessage5: '',
      errStatus5: false,
      errMessage6: '',
      errStatus6: false,
      errMessage7: '',
      errStatus7: false,
      errMessage8: '',
      errStatus8: false,
      errMessage9: '',
      errStatus9: false,
      rules: {
        company_name: [{ required: true, message: '請填寫公司名稱' }],
        rank: [{ required: true, message: '請填寫職稱' }],
        tax_id: [{ required: true, message: '請填寫公司統編' }],
        company_email: [{ required: true, message: '請輸入公司電子郵件' }],
        nick_name: [{ required: true, message: '請輸入姓名' }],
        phone: [{ required: true, message: '請輸入您的電話號碼' }],
        accounts: [{ required: true, message: '請設定登入帳號' }, {
          min: 6,
          max: 10,
          message: '請設定6至10位數帳號'
        }],
        password: [{ required: true, message: '請输入密碼' }, { min: 6, max: 20, message: '長度8至20之英數字組合' }],
        repassword: [{ required: true, message: '請输入確認密碼' }]
      }
    }
  },
  methods: {
    changeIpt (type) {
      if (type === 'company_name') {
        this.validator(this.prop.company_name)
      } else if (type === 'rank') {
        this.validator(this.prop.rank)
      } else if (type === 'tax_id') {
        this.validator(this.prop.tax_id)
      } else if (type === 'company_email') {
        this.validator(this.prop.company_email)
      } else if (type === 'nick_name') {
        this.validator(this.prop.nick_name)
      } else if (type === 'phone') {
        this.validator(this.prop.phone)
      } else if (type === 'accounts') {
        this.validator(this.prop.accounts)
      } else if (type === 'password') {
        this.validator(this.prop.password)
      } else {
        this.validator(this.prop.repassword)
      }
    },
    gotoModal () {
      for (const item in this.prop) {
        this.validator(item)
      }
      // eslint-disable-next-line camelcase
      const { company_name, rank, tax_id, company_email, nick_name, phone, accounts, password, repassword } = this.form
      // eslint-disable-next-line camelcase
      if (company_name && rank && tax_id && company_email && nick_name && phone && accounts && password && repassword &&
      !this.errStatus1 && !this.errStatus2 && !this.errStatus3 && !this.errStatus4 && !this.errStatus5 && !this.errStatu6 && !this.errStatus7 && !this.errStatus8 && !this.errStatus9) {
        if (this.form.password !== this.form.repassword) {
          this.errMessage9 = '密碼不相同'
          this.errStatus9 = true
        } else {
          this.errMessage9 = ''
          this.errStatus9 = ''
          this.showModal = true
          this.noScroll()
        }
      }
    },
    gotoHome () {
      AccountRegister(this.form).then(res => {
        console.log(res)
      })
      this.showModal = false
      this.canScroll()
      this.$router.push('/login')
    },
    validator (item) {
      const rules = this.rules[item]
      const value = this.form[item]
      const descriptor = { [item]: rules }
      const schema = new this.Schema(descriptor)
      schema.validate({ [item]: value }, errors => {
        if (errors) {
          if (item === 'company_name') {
            this.errMessage1 = errors[0].message
            this.errStatus1 = true
          } else if (item === 'rank') {
            this.errMessage2 = errors[0].message
            this.errStatus2 = true
          } else if (item === 'tax_id') {
            this.errMessage3 = errors[0].message
            this.errStatus3 = true
          } else if (item === 'company_email') {
            this.errMessage4 = errors[0].message
            this.errStatus4 = true
          } else if (item === 'nick_name') {
            this.errMessage5 = errors[0].message
            this.errStatus5 = true
          } else if (item === 'phone') {
            this.errMessage6 = errors[0].message
            this.errStatus6 = true
          } else if (item === 'accounts') {
            this.errMessage7 = errors[0].message
            this.errStatus7 = true
          } else if (item === 'password') {
            this.errMessage8 = errors[0].message
            this.errStatus8 = true
          } else {
            this.errMessage9 = errors[0].message
            this.errStatus9 = true
          }

          return false
        } else {
          if (item === 'company_name') {
            this.errMessage1 = ''
            this.errStatus1 = ''
          } else if (item === 'rank') {
            this.errMessage2 = ''
            this.errStatus2 = ''
          } else if (item === 'tax_id') {
            this.errMessage3 = ''
            this.errStatus3 = ''
          } else if (item === 'company_email') {
            this.errMessage4 = ''
            this.errStatus4 = ''
          } else if (item === 'nick_name') {
            this.errMessage5 = ''
            this.errStatus5 = ''
          } else if (item === 'phone') {
            this.errMessage6 = ''
            this.errStatus6 = ''
          } else if (item === 'accounts') {
            this.errMessage7 = ''
            this.errStatus7 = ''
          } else if (item === 'password') {
            this.errMessage8 = ''
            this.errStatus8 = ''
          } else {
            this.errMessage9 = ''
            this.errStatus9 = ''
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import './../assets/style/mixin.scss';
.register-member {
  margin-top: 8rem;
   background: url('./../assets/imgs/reser-passwodr.png') no-repeat right top;
    background-size: 32.4rem 48.3rem;
  .container {
    // background: url('./../assets/imgs/reser-passwodr.png') no-repeat right top;
    // background-size: 32.4rem 48.3rem;
  }
  .title {
    @include flex(center);
    flex-direction: column;
    padding-top: 9.1rem;
    h1 {
      font-size:2.2rem;
      font-weight:600;
      color:rgba(37,36,39,1);
      line-height:3rem;
    }
    p {
      line-height: 1.4rem;
      font-size: 1rem;
      color: #252427;
      a {
        color: #006AFF;
        text-decoration: underline;
      }
    }

  }
  .form-box {
    width: 87rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5rem;
    .form-item {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      h2 {
        height:2.2rem;
        font-size:1.6rem;
        width: 100%;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:2.2rem;
        margin-bottom: 1rem;
      }
      .item-input {
        position: relative;
        @include flex(flex-start,center);
        width:42rem;
        height:5rem;
        background:rgba(255,255,255,1);
        border-radius:.4rem;
        border:.1rem solid rgba(61,61,61,1);
        margin-bottom: 2.4rem;
        label {
          line-height:2.2rem;
          cursor: pointer;
          span {
            width: 6.6rem;
            display: inline-block;
            font-size:1.6rem;
            font-weight:400;
            margin: 0 1.4rem 0 2rem;
            color:rgba(37,36,39,1);
          }
          input {
            font-size:1.6rem;
            border:none;
            color:#BDBDBD;
          }
        }
        .error {
          position: absolute;
          right: 0;
          bottom: -2rem;
          margin-top: .4rem;
          font-size:1.2rem;
          font-weight:500;
          color:rgba(235,54,44,1);
          line-height:1.7rem;
          span {
            @include bgImg(.8rem,1.3rem,'./../assets/imgs/icon/erorr.png');
            margin: 0 .4rem;
          }
        }
      }
      .input-w {
        width: 100%;
      }

    }
    .name-phone {
      @include flex();
      margin-top: 1rem;
      margin-bottom: 3rem;
      .name-phone-item {
        position: relative;
        label {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          span {
            height:2.2rem;
            font-size:1.6rem;
            width: 100%;
            font-weight:600;
            color:rgba(37,36,39,1);
            line-height:2.2rem;
            margin-bottom: 1rem;
          }
          input {
            width:42rem;
            height:5rem;
            background:rgba(255,255,255,1);
            border-radius:.4rem;
            border:.1rem solid rgba(61,61,61,1);
            padding-left: 2rem;
            font-weight:400;
            color:rgba(189,189,189,1);
             font-size:1.6rem;
          }
        }
        .error {
          position: absolute;
          right: 0;
          bottom: -2rem;
          margin-top: .4rem;
          font-size:1.2rem;
          font-weight:500;
          color:rgba(235,54,44,1);
          line-height:1.7rem;
          span {
            @include bgImg(.8rem,1.3rem,'./../assets/imgs/icon/erorr.png');
            margin: 0 .4rem;
          }
        }
      }
    }
    .form-btn {
      @include flex(center);
      width: 100%;
      margin-top:3rem;
      height:5rem;
      background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
      border-radius:.4rem;
      font-size:1.6rem;
      font-weight:400;
      color:rgba(255,255,255,1);
      cursor: pointer;
    }
    .checked {
      border:.1rem solid rgba(235,54,44,1)!important;
    }
  }
  @media screen and(max-width: 991px){
     margin-top: 6rem;
    .form-box {
      width: 100%;
      margin-top: 5rem;
      .form-item {
        h2 {
          width: 60%;
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        .item-input {
          width: 60%;
        }
      }
      .name-phone {
        display: flex;
        flex-direction: column;
        // align-items: flex-start;
        width: 100%;
        margin-top: -2rem;
        .name-phone-item {
          position: relative;
          width: 60%;
          margin-top: 2rem;
          label {
            display: flex;
            flex-direction: column;
            input {
              width: 100%;
              height:5rem;
            }
          }
        }
      }
      .form-btn {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
  @media screen and(max-width: 767px){
    margin-top: 6rem;
    .title {
      padding-top: 6rem;
    }
    .form-box {
      width: 100%;
      margin-top: 5rem;
      .form-item {
        h2 {
          width: 90%;
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        .item-input {
          width: 90%;
        }
      }
      .name-phone {
        display: flex;
        flex-direction: column;
        // align-items: flex-start;
        width: 100%;
        margin-top: -2rem;
        .name-phone-item {
          position: relative;
          width: 90%;
          margin-top: 2rem;
          label {
            display: flex;
            flex-direction: column;
            input {
              width: 100%;
              height:5rem;
            }
          }
        }
      }
      .form-btn {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
}
</style>
