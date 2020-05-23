<template>
  <div class="login">
    <div class="container">
      <div class="login-img">
        <img src="./../assets/imgs/login-img.png" alt="">
      </div>
      <div class="login-from">
        <div class="item-top">
          <span></span>
          <div class="title">
            <h1>會員登入</h1>
            <p>MEMBER LOGIN</p>
          </div>
        </div>
        <form :model="form" :rules="rules">
          <div class="item-input">
            <label :prop="prop.account">
              <div class="name"><span>帳號</span><a href="javascrpt:;" @click="noAccount('account')">忘記帳號</a></div>
              <!-- <input type="text" placeholder="請輸入您的帳號" :class="{'checked': isErorr}" v-model="form.account"  @blur.prevent="changeIpt" @input="onInput"> -->
              <input type="text" placeholder="請輸入您的帳號" :class="{'checked': errStatus}" v-model="form.account"  @blur.prevent="changeIpt('user')">
            </label>
            <div class="error" v-show="errStatus && prop.account"><span></span>{{errMessage}}</div>
          </div>
          <div class="item-input">
            <label :prop="prop.password">
              <div class="name"><span>密碼</span><a href="javascrpt:;" @click="noAccount('password')">忘記密碼</a></div>
              <input type="password" placeholder="請輸入您的密碼" v-model="form.password" :class="{'checked': errPawStatus}"  @blur.prevent="changeIpt('pws')">
            </label>
            <div class="error" v-show="errPawStatus"><span></span>{{errPawMessage}}</div>
          </div>
          <div class="item-btn" @click="login(form)">登入</div>
        </form>
        <div class="or-use">
          <span></span><p>or use</p><span></span>
        </div>
        <div class="item-btns">
          <div class="btn btn-left">
            <span></span>
            使用Face book登入
          </div>
          <div class="btn btn-right">
            <span></span>
            使用Google登入
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator'
import { AccountLogin } from './../api/request'
export default {
  name: 'login',
  data () {
    return {
      form: {
        account: '',
        password: ''
      },
      prop: {
        account: 'account',
        password: 'password'
      },
      errMessage: '',
      errStatus: false,
      errPawMessage: '',
      errPawStatus: false,
      rules: {
        account: [
          {
            required: true,
            message: '請輸入您的帳號'
          },
          {
            min: 6,
            max: 10,
            message: '请输入6~10的用户名'
          }],
        password: [{ required: true, message: '請輸入您的密碼' }]
      },
      isErorr: false
    }
  },
  methods: {
    changeIpt (type) {
      if (type === 'user') {
        this.validator(this.prop.account)
      } else {
        this.validator(this.prop.password)
      }
    },
    onInput (e) {
      this.validator(this.prop.account)
    },
    validator (item) {
      const rules = this.rules[item]
      const value = this.form[item]
      const descriptor = { [item]: rules }
      const schema = new Schema(descriptor)
      schema.validate({ [item]: value }, errors => {
        if (errors) {
          if (item === 'account') {
            this.errMessage = errors[0].message
            this.errStatus = true
          } else {
            this.errPawMessage = errors[0].message
            this.errPawStatus = true
          }
          return false
        } else {
          if (item === 'account') {
            this.errMessage = ''
            this.errStatus = ''
          } else {
            this.errPawMessage = ''
            this.errPawStatus = ''
          }
        }
      })
    },
    login (form) {
      // this.prop.forEach(item => {
      //   console.log(item)
      // })
      for (const item in this.prop) {
        this.validator(item)
      }
      if (this.form.account && this.form.password && !this.errStatus && !this.errPawStatus) {
        AccountLogin({ account: this.form.account, password: this.form.password, type: 'web' }).then(res => {
          // console.log(res)
          // console.log(res.data.data.token)
          if (res.data.code !== '200') {
            this.errMessage = res.data.msg
            this.errStatus = true
          } else {
            this.errMessage = ''
            this.errStatus = ''
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            window.sessionStorage.setItem('token', res.data.data.token)
            this.$router.push('/')
          }
        })
      }
      // this.validator()
      // if (this.form.user !== 'admin' && this.form.pwd !== 'admin') {
      //   this.isErorr = true
      // } else {
      //   this.$router.push('/')
      // }
    },
    noAccount (type) {
      if (type === 'account') {
        this.$router.push({ path: '/forgetPassword', query: { type: 2 } })
      } else {
        this.$router.push({ path: '/forgetPassword', query: { type: 1 } })
      }
    }
  }
}
</script>

<style lang="scss">
@import './../assets/style/mixin.scss';
@import './../assets/style/config.scss';
.login {
  .container {
    display: flex;
    justify-content: space-between;
    .login-img {
      margin-top: 23.7rem;
    }
    .login-from {
      width: 42rem;
      margin-top: 17.4rem;
      box-sizing: border-box;
      .item-top {
         @include flex(flex-start);
         margin-bottom: 6.3rem;
        span {
          @include bgImg(3.8rem,3.8rem,'./../assets/imgs/nav-logo.png');
          margin-right: 1.2rem;
        }
        .title {
          color: $colorA;
          font-size: $fontF;
          font-weight:600;
          line-height:3rem;
          p{
            color: $colorL;
            font-size: $fontK;
            font-weight:400;
            line-height:1.4rem;
          }
        }
      }
      .item-input {
        height: 10.8rem;
        .name {
          display: flex;
          justify-content: space-between;
          font-size:1.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
          margin-bottom: 1rem;
          a {
            font-weight:400;
            line-height: 2.2rem;
            padding-bottom: .1rem;
            text-decoration:underline;
          }
        }
        input {
          width:42rem;
          height:5rem;
          padding-left: 2rem;
          background:rgba(255,255,255,1);
          border-radius:.4rem;
          border:.1rem solid rgba(61,61,61,1);
          font-size:1.6rem;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:2.2rem;
        }
        .checked {
          border:.1rem solid rgba(235,54,44,1);
        }
        .error {
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

      .item-btn {
        width:42rem;
        height:5rem;
        @include flex(center);
        background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
        border-radius:.4rem;
        font-size:1.6rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        cursor: pointer;
      }
      .or-use {
        @include flex();
        margin-top: 2.4rem;
        span{
          width:17.3rem;
          height:.1rem;
          background:rgba(240,240,240,1);
        }
        p {
          font-size:1.6rem;
          font-weight:400;
          color:rgba(210,210,210,1);
          line-height:2.2rem;
        }
      }
      .item-btns {
        @include flex();
        margin-top: 2.4rem;
        .btn {
          width:20rem;
          height:5rem;
          @include flex(flex-start,center);
          background:rgba(2,100,224,1);
          border-radius:.4rem;
          font-size:1.4rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          cursor: pointer;
        }
        .btn-left {
          span {
             @include bgImg(.8rem,1.6rem,'./../assets/imgs/icon/icon-f.png');
             padding: 0 2.1rem;
          }
        }
        .btn-right {
          background:rgba(227,81,42,1);;
          span {
             @include bgImg(1.6rem,1.6rem,'./../assets/imgs/icon/icon-g.png');
             padding: 0 1.7rem;
          }
        }
      }
    }
  }
@media screen and (max-width:991px) {
  .container {
    justify-content: center;
    .login-img {
      display: none;
    }
  }
}
@media screen and (max-width:767px) {
  .container {
    .login-from {
      width: 80%;
      margin-top: 10rem;
      .item-top {
        margin-bottom: 3.3rem;
      }
      .item-input {
        input {
          width: 100%;
        }
      }
      .item-btn {
        width: 100%;
      }
      .or-use {
        span {
          flex:1;
        }
        p {
          margin: 0 1rem;
        }
      }
      .item-btns {
        .btn {
          width: 48%;
          font-size: 1.2rem;
        }
        .btn-left {
          span {
            padding: 0 1.2rem;
          }
        }
      }
    }
  }
}
}
</style>
