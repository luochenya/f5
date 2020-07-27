<template>
  <div class="reser-password">
    <div class="container">
      <div class="password-box">
        <div class="title">
          <h1>重設密碼</h1>
          <p>RESET PASSWORD</p>
        </div>
        <form :model="form" :rules="rules">
          <div class="form">
            <label v-if="$route.query.type ==!1">
              <h3>舊密碼</h3>
              <input type="text" placeholder="請輸入您的舊密碼">
            </label>
            <div class="label-tow">
              <label :prop="prop.password">
                <h3>新密碼</h3>
                <input type="password" placeholder="密碼長度至少6位數" v-model="form.password" :class="{'checked': errStatus1}" @blur.prevent="changeIpt('password')">
                <div :class="{'error': errStatus1}"><span></span>{{errMessage1}}</div>
              </label>
            </div>
            <label :prop="prop.repassword">
              <h3>確認新密碼</h3>
              <input type="password" placeholder="密碼長度至少6位數" v-model="form.repassword" :class="{'checked': errStatus2}" @blur.prevent="changeIpt('repassword')">
              <div :class="{'error': errStatus2}"><span></span>{{errMessage2}}</div>
            </label>
            <div class="btn" @click="gotoHome">確認</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { AccountRetrievePassword } from './../api/request'
export default {
  name: 'reset-password',
  data () {
    return {
      form: {
        password: '',
        repassword: ''
      },
      prop: {
        password: 'password',
        repassword: 'repassword'
      },
      errMessage1: '',
      errStatus1: false,
      errMessage2: '',
      errStatus2: false,
      rules: {
        password: [{ required: true, message: '請輸入新密碼' }, { min: 6, message: '密碼長度至少6位數' }],
        repassword: [{ required: true, message: '請輸入確認密碼' }]
      },
      token: this.$route.query.id
    }
  },
  methods: {
    gotoHome () {
      // console.log(this.token)
      for (const item in this.prop) {
        this.validator(item)
      }
      const { password, repassword } = this.form
      if (password && repassword && !this.errStatus1 && !this.errStatus2) {
        AccountRetrievePassword(this.form, { headers: { token: this.token } }).then(res => {
          if (res.data.code === '200') {
            this.$router.push('/login')
          }
        })
      }
    },
    changeIpt (type) {
      if (type === 'password') {
        this.validator(this.prop.password)
      } else if (type === 'repassword') {
        this.validator(this.prop.repassword)
      }
    },
    validator (item) {
      const rules = this.rules[item]
      const value = this.form[item]
      const descriptor = { [item]: rules }
      const schema = new this.Schema(descriptor)
      schema.validate({ [item]: value }, errors => {
        if (errors) {
          if (item === 'password') {
            this.errMessage1 = errors[0].message
            this.errStatus1 = true
          } else if (item === 'repassword') {
            this.errMessage2 = errors[0].message
            this.errStatus2 = true
          }
          return false
        } else {
          if (item === 'password') {
            this.errMessage1 = ''
            this.errStatus1 = ''
          } else if (item === 'repassword') {
            this.errMessage2 = ''
            this.errStatus2 = ''
          }
        }
      })
      if (this.form.password !== this.form.repassword) {
        this.errMessage2 = '確認密碼與密碼不一致'
        this.errStatus2 = true
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import './../assets/style/mixin.scss';
.reser-password {
  margin-top: 8rem;
    background: url('./../assets/imgs/reser-passwodr.png') no-repeat right top;
      background-size: 32.4rem 48.3rem;
  .container {
    .password-box {

    }
    .title {
      text-align: center;
      padding-top:9.1rem;
      h1 {
        font-size:2.2rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:3rem;
      }
      p {
        font-size:1rem;
        font-weight:400;
        color:rgba(210,210,210,1);
        line-height:1.4rem;
        letter-spacing:.1rem;
      }
    }
    .form {
      width: 49rem;
      margin-left: auto;
      margin-right: auto;
      margin-top: 5rem;
      label {
        height: 10.8rem;
        display: inline-block;
        position: relative;
        h3 {
          font-size:1.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
          margin-bottom: 1rem;
          cursor: pointer;
        }
        input {
          width:49rem;
          height:5rem;
          padding-left: 2rem;
          background:rgba(255,255,255,1);
          border-radius:.4rem;
          border:.1rem solid rgba(61,61,61,1);
          font-size:16px;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:2.2rem;
        }
        .checked {
          border:.1rem solid rgba(235,54,44,1)!important;
        }
        .error {
          position: absolute;
          right: 0;
          // bottom: -2rem;
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
      .label-tow {
        margin-top: 4.6rem;
        // margin-bottom: 2.6rem;
      }
      .btn {
        width:49rem;
        height:5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
        border-radius:.4rem;
        font-size:1.6rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:2.2rem;
        margin-top: 1.6rem;
        cursor: pointer;
      }
    }
  }
@media screen and (max-width:991px) {
  margin-top: 6rem;
}
@media screen and (max-width:767px) {
   .container {
     .title {
        padding-top:6rem;
      }
    .form {
      width: 90%;
      label {
        width: 100%;
        input {
        width: 100%;
        }
      }
      .btn {
        width:100%;
      }
    }
   }
}
}
</style>
