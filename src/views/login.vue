<template>
  <div class="login">
    <div class="container">
      <div class="login-img">
        <img src="./../assets/imgs/login-img.png" alt="" />
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
              <div class="name">
                <span>帳號</span><a @click="noAccount('account')">忘記帳號</a>
              </div>
              <!-- <input type="text" placeholder="請輸入您的帳號" :class="{'checked': isErorr}" v-model="form.account"  @blur.prevent="changeIpt" @input="onInput"> -->
              <input
                type="text"
                placeholder="請輸入您的帳號"
                :class="{ checked: errStatus }"
                v-model="form.account"
                @blur.prevent="changeIpt('user')"
              />
            </label>
            <div class="error" v-show="errStatus && prop.account">
              <span></span>{{ errMessage }}
            </div>
          </div>
          <div class="item-input">
            <label :prop="prop.password">
              <div class="name">
                <span>密碼</span><a @click="noAccount('password')">忘記密碼</a>
              </div>
              <input
                type="password"
                placeholder="請輸入您的密碼"
                v-model="form.password"
                :class="{ checked: errPawStatus }"
                @blur.prevent="changeIpt('pws')"
              />
            </label>
            <div class="error" v-show="errPawStatus">
              <span></span>{{ errPawMessage }}
            </div>
            <div style="margin-top: 10px">
              <el-checkbox v-model="checked">記住密碼</el-checkbox>
            </div>
          </div>
          <div></div>
          <div class="item-btn" @click="login(form)">登入</div>
        </form>
        <div class="or-use">
          <span></span>
          <p>or use</p>
          <span></span>
        </div>
        <div class="item-btns">
          <fb-signin-button
            class="btn btn-left"
            v-if="facebook_login == '1'"
            :params="fbSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >
            <span></span>
            使用Face book登入
          </fb-signin-button>
          <div
            class="btn btn-right"
            v-if="google_login == '1'"
            v-google-signin-button="clientId"
          >
            <!-- <div class="btn btn-right" v-google-signin-button="clientId"> -->
            <span></span>
            使用Google登入
          </div>
        </div>
      </div>
    </div>
    <loading :show="isShowModal"></loading>
  </div>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import Schema from "async-validator";
import { AccountLogin, getThirdLogin, loginThird } from "./../api/request";
export default {
  name: "login",
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      fbSignInParams: {
        // scope: "email,user_like",
        return_scopes: true
      },
      isShowModal: false,
      // 根据打包环境调用不同的谷歌clientId
      clientId:
        "573960589899-5bv2pugb5dadd28uolf3f1l6g4p9i8na.apps.googleusercontent.com",
      facebook_login: "",
      google_login: "",
      checked: false,
      form: {
        account: "",
        password: ""
      },
      prop: {
        account: "account",
        password: "password"
      },
      errMessage: "",
      errStatus: false,
      errPawMessage: "",
      errPawStatus: false,
      rules: {
        account: [
          {
            required: true,
            message: "請輸入您的帳號"
            // },
            // {
            //   min: 6,
            //   max: 10,
            //   message: '請輸入6~10的用户名'
          }
        ],
        password: [{ required: true, message: "請輸入您的密碼" }]
      },
      isErorr: false
    };
  },
  mounted() {
    this._getThirdLogin();
    if (window.localStorage.getItem("userName")) {
      this.form.account = window.localStorage.getItem("userName");
      this.form.password = window.localStorage.getItem("password");
      this.checked = true;
    }
  },
  methods: {
    // FB登录成功
    onSignInSuccess(response) {
      // FB.api('/me', dude => {
      //   console.log(`Good to see you, ${dude.name}.`)
      // })
      // console.log(response); //返回第三方的登录信息 tolen等

      this.isShowModal = true;
      loginThird({
        platform_id: response.authResponse.userID,
        platform: "facebook",
        type: "web"
      }).then(res => {
        this.isShowModal = false;
        if (res.data.code != "200") {
          this.$message({
            message: res.data.msg,
            type: "error",
            duration: 1000
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "success",
            duration: 1000
          });
          window.sessionStorage.setItem("token", res.data.data.token);
          window.sessionStorage.setItem(
            "verifier_lv",
            res.data.data.verifier_lv
          );
          window.sessionStorage.setItem("user_id", res.data.data.id);
          this.$router.push("/");
        }
      });
    },
    // FB登录失败
    onSignInError(error) {
      console.log(error);
    },
    // 谷歌登录成功
    OnGoogleAuthSuccess(idToken) {
      var jwt = require("jsonwebtoken");
      var form = jwt.decode(idToken);
      this.isShowModal = true;
      loginThird({
        platform_id: form.sub,
        platform: "google",
        type: "web"
      }).then(res => {
        this.isShowModal = false;
        if (res.data.code != "200") {
          this.$message({
            message: res.data.msg,
            type: "error",
            duration: 1000
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "success",
            duration: 1000
          });
          window.sessionStorage.setItem("token", res.data.data.token);
          window.sessionStorage.setItem(
            "verifier_lv",
            res.data.data.verifier_lv
          );
          window.sessionStorage.setItem("user_id", res.data.data.id);
          this.$router.push("/");
        }
      });
    },
    // 谷歌登录失败
    OnGoogleAuthFail(error) {
      console.log(error);
    },
    _getThirdLogin() {
      getThirdLogin().then(res => {
        this.facebook_login = res.data.data.rows.facebook_login;
        this.google_login = res.data.data.rows.google_login;
      });
    },
    changeIpt(type) {
      if (type === "user") {
        this.validator(this.prop.account);
      } else {
        this.validator(this.prop.password);
      }
    },
    onInput(e) {
      this.validator(this.prop.account);
    },
    validator(item) {
      const rules = this.rules[item];
      const value = this.form[item];
      const descriptor = { [item]: rules };
      const schema = new Schema(descriptor);
      schema.validate({ [item]: value }, errors => {
        if (errors) {
          if (item === "account") {
            this.errMessage = errors[0].message;
            this.errStatus = true;
          } else {
            this.errPawMessage = errors[0].message;
            this.errPawStatus = true;
          }
          return false;
        } else {
          if (item === "account") {
            this.errMessage = "";
            this.errStatus = "";
          } else {
            this.errPawMessage = "";
            this.errPawStatus = "";
          }
        }
      });
    },
    login(form) {
      // this.prop.forEach(item => {
      //   console.log(item)
      // })
      if (!form.account) {
        this.errMessage = "請輸入您的帳號";
        this.errStatus = true;
        return false;
      } else {
        this.errMessage = "";
        this.errStatus = "";
      }
      if (!form.password) {
        this.errPawMessage = "請輸入您的密碼";
        this.errPawStatus = true;
        return false;
      } else {
        this.errPawMessage = "";
        this.errPawStatus = "";
      }
      // for (const item in this.prop) {
      //   this.validator(item)
      // }
      if (
        this.form.account &&
        this.form.password &&
        !this.errStatus &&
        !this.errPawStatus
      ) {
        AccountLogin({
          account: this.form.account,
          password: this.form.password,
          type: "web"
        }).then(res => {
          // console.log(res)
          // console.log(res.data.data.token)
          if (res.data.code !== "200") {
            this.errMessage = res.data.msg;
            this.errStatus = true;
          } else {
            this.errMessage = "";
            this.errStatus = "";
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 1000
            });
            if (this.checked) {
              window.localStorage.setItem("userName", this.form.account);
              window.localStorage.setItem("password", this.form.password);
            } else {
              window.localStorage.removeItem("userName");
              window.localStorage.removeItem("password");
            }
            window.sessionStorage.setItem("token", res.data.data.token);
            window.sessionStorage.setItem(
              "verifier_lv",
              res.data.data.verifier_lv
            );
            window.sessionStorage.setItem("user_id", res.data.data.id);
            this.$router.push("/");
          }
        });
      }
      // this.validator()
      // if (this.form.user !== 'admin' && this.form.pwd !== 'admin') {
      //   this.isErorr = true
      // } else {
      //   this.$router.push('/')
      // }
    },
    noAccount(type) {
      if (type === "account") {
        this.$router.push({ path: "/forgetPassword", query: { type: 2 } });
      } else {
        this.$router.push({ path: "/forgetPassword", query: { type: 1 } });
      }
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/style/mixin.scss";
@import "./../assets/style/config.scss";
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
          @include bgImg(3.8rem, 3.8rem, "./../assets/imgs/nav-logo.png");
          margin-right: 1.2rem;
        }
        .title {
          color: $colorA;
          font-size: $fontF;
          font-weight: 600;
          line-height: 3rem;
          p {
            color: $colorL;
            font-size: $fontK;
            font-weight: 400;
            line-height: 1.4rem;
          }
        }
      }
      .item-input {
        height: 10.8rem;
        .name {
          display: flex;
          justify-content: space-between;
          font-size: 1.6rem;
          font-weight: 600;
          color: rgba(37, 36, 39, 1);
          line-height: 2.2rem;
          margin-bottom: 1rem;
          a {
            font-weight: 400;
            line-height: 2.2rem;
            padding-bottom: 0.1rem;
            text-decoration: underline;
          }
        }
        input {
          width: 42rem;
          height: 5rem;
          padding-left: 2rem;
          background: rgba(255, 255, 255, 1);
          border-radius: 0.4rem;
          border: 0.1rem solid rgba(61, 61, 61, 1);
          font-size: 1.6rem;
          font-weight: 400;
          color: rgba(189, 189, 189, 1);
          line-height: 2.2rem;
        }
        .checked {
          border: 0.1rem solid rgba(235, 54, 44, 1);
        }
        .error {
          margin-top: 0.4rem;
          font-size: 1.2rem;
          font-weight: 500;
          color: rgba(235, 54, 44, 1);
          line-height: 1.7rem;
          span {
            @include bgImg(0.8rem, 1.3rem, "./../assets/imgs/icon/erorr.png");
            margin: 0 0.4rem;
          }
        }
      }

      .item-btn {
        margin-top: 2rem;
        width: 42rem;
        height: 5rem;
        @include flex(center);
        background: linear-gradient(
          225deg,
          rgba(42, 42, 44, 1) 0%,
          rgba(37, 36, 39, 1) 100%
        );
        border-radius: 0.4rem;
        font-size: 1.6rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
      .or-use {
        @include flex();
        margin-top: 2.4rem;
        span {
          width: 17.3rem;
          height: 0.1rem;
          background: rgba(240, 240, 240, 1);
        }
        p {
          font-size: 1.6rem;
          font-weight: 400;
          color: rgba(210, 210, 210, 1);
          line-height: 2.2rem;
        }
      }
      .item-btns {
        @include flex();
        margin-top: 2.4rem;
        .btn {
          width: 20rem;
          height: 5rem;
          @include flex(center, center);
          background: rgba(2, 100, 224, 1);
          border-radius: 0.4rem;
          font-size: 1.4rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
        }
        .btn-left {
          span {
            @include bgImg(0.8rem, 1.6rem, "./../assets/imgs/icon/icon-f.png");
            padding: 0 2.1rem;
          }
        }
        .btn-right {
          background: rgba(227, 81, 42, 1);
          span {
            @include bgImg(1.6rem, 1.6rem, "./../assets/imgs/icon/icon-g.png");
            padding: 0 1.7rem;
          }
        }
      }
    }
  }
  @media screen and (max-width: 991px) {
    .container {
      justify-content: center;
      .login-img {
        display: none;
      }
    }
  }
  @media screen and (max-width: 767px) {
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
            flex: 1;
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
