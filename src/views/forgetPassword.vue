<template>
  <div class="forget-password">
    <div class="container">
      <div class="password-box">
        <div class="title">
          <h1>{{$route.query.type == '1' ? '忘記密碼' : '忘記帳號'}}</h1>
          <p>請輸入註冊時所填入的E-mail，我們將寄出驗證碼信件給您</p>
        </div>
        <div class="form">
          <label>
            <h3>E-mail</h3>
            <input type="text" placeholder="請填寫E-mail" v-model="receiver">
            <span v-if="!countDown" @click="sendVerifyCode">發送驗證碼</span>
            <span v-else>{{countDown}}</span>
          </label>
          <div class="label-tow">
            <label>
              <h3>驗證碼</h3>
              <input type="text" placeholder="請填寫驗證碼" v-model="code">
            </label>
          </div>
          <div class="btn" @click="gotoResetPassword">送出</div>
        </div>
      </div>
    </div>
    <model
      :showModal = "isShowModal"
      btnType=4
      @submit ="submit"
    >
      <template slot="body">
       <span>您的帳號為</span>
        <h2>{{accounts}}</h2>
      </template>
    </model>
  </div>
</template>

<script>
import { AccountSendCode, AccountVerify } from './../api/request'
import Model from './../components/Modal'
export default {
  name: 'forget-password',
  components: {
    Model
  },
  data () {
    return {
      countDown: 0,
      receiver: '',
      code: '',
      isShowModal: false,
      accounts: ''
    }
  },
  mounted () {
    // console.log(this.$route.query.type)
  },
  methods: {
    gotoResetPassword () {
      const { receiver, code } = this
      AccountVerify({ receiver, code, type: this.$route.query.type }).then(res => {
        // console.log(res)
        if (res.data.code === '200') {
          if (this.$route.query.type === 1 || this.$route.query.type === '1') {
            // console.log(res)
            this.$router.push({ path: '/reset', query: { type: 1, id: res.data.data } })
          } else {
            this.accounts = res.data.data
            this.isShowModal = true
            this.noScroll()
          }
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
    },
    sendVerifyCode () {
      AccountSendCode({ receiver: this.receiver, type: this.$route.query.type }).then(res => {
        if (res.data.code !== '200') {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.countDown = 60
          this.timeIntervalID = setInterval(() => {
            this.countDown--
            // 4.1 如果减到0 则清除定时器
            if (this.countDown === 0) {
              clearInterval(this.timeIntervalID)
            }
          }, 1000)
        }
      })
    },
    submit () {
      this.isShowModal = false
      this.$router.push({ path: '/login' })
      this.canScroll()
    }
  }
}
</script>

<style scoped lang='scss'>
.forget-password {
  margin-top: 8rem;
  background: url('./../assets/imgs/reser-passwodr.png') no-repeat right top;
  background-size: 32.4rem 48.3rem;
  .container {
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
        color:rgba(37,36,39,1);
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
        span {
          position: absolute;
          top: 4.6rem;
          right: 2rem;
          font-size:1.6rem;
          font-weight:600;
          color:rgba(0,106,255,1);
          line-height:2.2rem;
          cursor: pointer;
        }
      }
      .label-tow {
        margin-top: 4.6rem;
        margin-bottom: 2.6rem;
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
        margin-top: 3.6rem;
        cursor: pointer;
      }
    }
  }
  @media screen and(max-width: 767px){
    margin-top: 6rem;
    .container {
      .title {
        padding-top:6rem;
      }
      .form {
        width: 90%;
        label {
          input {
            width:100%;
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
