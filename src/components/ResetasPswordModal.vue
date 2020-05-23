<template>
   <transition name="slide">
    <div class="resetas-psword-modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <h1>重設密碼</h1>
          <span>RESETAS PASSWORD</span>
        </div>
        <div class="modal-body">
          <form :model="form" :rules="rules">
            <div class="from">
              <div class="item-input" :class="{'checked': errStatus7}">
                <label :prop="prop.oldpassword">
                  <span>舊密碼</span>
                  <input type="text" placeholder="請輸入現在的密碼"  v-model="form.oldpassword" @blur.prevent="changeIpt('oldpassword')">
                </label>
                  <div :class="{'error': errStatus7}"><span></span>{{errMessage7}}</div>
              </div>
              <div class="item-input" :class="{'checked': errStatus8}">
                <label :prop="prop.password">
                  <span>新密碼</span>
                  <input type="text" placeholder="密碼必須為長度8至20之英數字組合"  v-model="form.password" @blur.prevent="changeIpt('password')">
                </label>
                  <div :class="{'error': errStatus8}"><span></span>{{errMessage8}}</div>
              </div>
              <div class="item-input" :class="{'checked': errStatus9}">
                <label :prop="prop.repassword">
                  <span>確認密碼</span>
                  <input type="password" placeholder="請再次確認密碼"  v-model="form.repassword" @blur.prevent="changeIpt('repassword')">
                </label>
                  <div :class="{'error': errStatus9}"><span></span>{{errMessage9}}</div>
              </div>
            </div>
          </form>
        </div>
       <div class="modal-footer">
          <!-- <a href="javascript:;" class="btn"  @click="$emit('submit')">儲存修改</a> -->
          <a href="javascript:;" class="btn"  @click="submit">儲存修改</a>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
import { updatePassword } from './../api/request'
export default {
  name: 'resetas-psword-modal',
  props: {
    // 按钮类型: 1: 确定按钮  2: 取消按钮   3:确认取消
    btnType: String,
    showModal: Boolean,
    imgShow: Boolean
  },
  data () {
    return {
      form: {
        password: '',
        repassword: '',
        oldpassword: ''
      },
      prop: {
        password: 'password',
        repassword: 'repassword',
        oldpassword: 'oldpassword'
      },
      errMessage7: '',
      errStatus7: false,
      errMessage8: '',
      errStatus8: false,
      errMessage9: '',
      errStatus9: false,
      rules: {
        password: [{ required: true, message: '請輸入現在的密碼' }],
        repassword: [{ required: true, message: '請输入新密碼' }, { min: 6, max: 20, message: '長度8至20之英數字組合' }],
        oldpassword: [{ required: true, message: '請输入確認密碼' }]
      },
      token: ''
    }
  },
  mounted () {
    this.token = window.sessionStorage.getItem('token')
  },
  methods: {
    changeIpt (type) {
      if (type === 'password') {
        this.validator(this.prop.password)
      } else if (type === 'repassword') {
        this.validator(this.prop.repassword)
      } else {
        this.validator(this.prop.oldpassword)
      }
    },
    submit () {
      for (const item in this.prop) {
        this.validator(item)
      }
      const { password, repassword, oldpassword } = this.form
      if (password && repassword && oldpassword && !this.errStatus7 && !this.errStatus8 && !this.errStatus9) {
        updatePassword(this.form, { headers: { token: this.token } }).then(res => {
          if (res.data.code !== '200') {
            this.$message({
              message: res.data.msg,
              type: 'error',
              descriptor: '2000'
            })
            return false
          } else {
            this.$emit('isShowModal')
          }
        })
      }
    },
    // 验证
    validator (item) {
      const rules = this.rules[item]
      const value = this.form[item]
      const descriptor = { [item]: rules }
      const schema = new this.Schema(descriptor)
      schema.validate({ [item]: value }, errors => {
        if (errors) {
          if (item === 'password') {
            this.errMessage7 = errors[0].message
            this.errStatus7 = true
          } else if (item === 'repassword') {
            this.errMessage8 = errors[0].message
            this.errStatus8 = true
          } else {
            this.errMessage9 = errors[0].message
            this.errStatus9 = true
          }
          return false
        } else {
          if (item === 'password') {
            this.errMessage7 = ''
            this.errStatus7 = ''
          } else if (item === 'repassword') {
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

<style lang='scss'>
@import './../assets/style/mixin.scss';
.resetas-psword-modal {
 @include position(fixed);
  z-index: 10;
  transition: all .5s;
  .mask {
    @include position(fixed);
    background:rgba(0,0,0,1);
    opacity: .5;
  }
  &.slide-enter-active {
    top: 0;
  }
  &.slide-leave-active {
    top: -100%;
  }
  &.slide-enter {
    top: -100%;
  }
  .modal-dialog {
    @include position(absolute,40%,50%,57.8rem,49.8rem);
    transform: translate(-50%,-50%);
    background: url('./../assets/imgs/resetas-psword-modal.png') no-repeat top right rgba(255,255,255,1);
    border-radius:.6rem;
    @include flex(flex-start,center);
    flex-direction: column;
    padding: 6rem 0 6.4rem;
    box-sizing: border-box;

    .modal-header {
      text-align: center;
      h1 {
        font-size:2.2rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:3rem;
      }
      span {
        font-size:10px;
        font-weight:400;
        color:rgba(210,210,210,1);
        line-height:1.4rem;
        letter-spacing:.1rem;
      }
    }
    .modal-body {
      .from {
        margin-top: 4rem;
        .item-input {
          position: relative;
          @include flex(flex-start,center);
          width:41rem;
          height:5rem;
          background:rgba(255,255,255,1);
          border-radius:.4rem;
          border:.1rem solid rgba(61,61,61,1);
          margin-bottom: 2.4rem;
          label {
            line-height:2.2rem;
            cursor: pointer;
            span {
              width: 7.1rem;
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
        .checked {
          border:.1rem solid rgba(235,54,44,1)!important;
        }
      }
    }
    .modal-footer {
      .btn{
        @include flex(center);
        width:41rem;
        height:5rem;
        margin-top: 2rem;
        background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
        box-shadow:0 1rem 3rem 0 rgba(41,41,44,0.1);
        border-radius:.4rem;
        font-size:1.6rem;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
  }
  @media screen and (max-width: 636px){
    .modal-dialog {
      width: 100%;
      @include position(absolute,45%,50%,97%,49.8rem);
      padding: 6rem 1rem 6.4rem;
      .modal-body {
         width: 100%;
        .from {
          width: 100%;
          .item-input {
            width:100%;
            label {
              span {
                width: 6.6rem;
                font-size:1.4rem;
                margin: 0 1rem 0 1rem;
              }
              input {
                width: 23rem;
                font-size:1.4rem;
              }
            }
          }
        }
      }
      .modal-footer {
        width: 100%;
        .btn{
          width:100%;
        }
      }
    }
  }
}
</style>
