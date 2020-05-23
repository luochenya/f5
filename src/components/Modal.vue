<template>
   <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="bgImg" v-if="imgShow">
            <img src="./../assets/imgs/book.png" alt="">
          </div>
          <div class="bgImg-success" v-if="btnType==3">
            <img src="./../assets/imgs/book-success.png" alt="">
          </div>
          <div class="bgImg-f5" v-if="btnType==2">
            <img src="./../assets/imgs/modal-f5.png" alt="">
          </div>
             <div class="bgImg-f5" v-if="btnType==4">
            <img src="./../assets/imgs/modal-f5.png" alt="">
          </div>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
       <div class="modal-footer">
          <a href="javascript:;" class="btn" v-if="btnType==1 || btnType==3 || btnType==4" @click="$emit('submit')">{{sureText}}</a>
          <div class="btn-group" v-if="btnType==2">
            <a href="javascript:;" class="btn" @click="$emit('cancel')">{{cancelText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('submit')">{{sureText}}</a>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    // 弹窗类型: 小small, 中middle, 大large, 表单form
    modalType: {
      type: String,
      default: 'small'
    },
    // 弹窗标题
    title: String,
    // 按钮类型: 1: 确定按钮  2: 取消按钮   3:确认取消
    btnType: String,
    sureText: {
      type: String,
      default: '確認'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showModal: Boolean,
    imgShow: Boolean
  }
}
</script>

<style lang='scss'>
@import './../assets/style/mixin.scss';
.modal {
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
    @include position(absolute,40%,50%,40rem,32rem);
    transform: translate(-50%,-50%);
    background:rgba(255,255,255,1);
    border-radius:.6rem;
    @include flex(flex-start,center);
    flex-direction: column;
    padding: 3.8rem 0 4.2rem 0;
    box-sizing: border-box;
    .modal-header {
      .bgImg {
        width: 10.4rem;
        height: 9.6rem;
      }
      .bgImg-f5 {
        width: 13.4rem;
        height: 8rem;
      }
      .bgImg-success {
        width: 10.3rem;
        height: 9.6rem;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .modal-body {
      text-align: center;
      h3,h2 {
        font-size:1.6rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:2.2rem;
      }
      h3 {
         margin-top: 1.9rem;
      }
      p,span {
        font-size:1.2rem;
        font-weight:400;
        color:rgba(189,189,189,1);
        line-height:1.7rem;
      }
      p,h2 {
        margin-top: .4rem;
      }
      span {
       padding-top: 3rem;
       display: block;
      }

    }
    .modal-footer {
      .btn{
        @include flex(center);
        width:25rem;
        height:4.6rem;
        margin-top: 3.6rem;
        background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
        box-shadow:0 1rem 3rem 0 rgba(41,41,44,0.1);
        border-radius:.4rem;
        font-size:1.6rem;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
      .btn-group {
        padding-top: 1rem;
        @include flex(center);
        .btn {
          width:16rem;
          height:5rem;
          background:rgba(255,255,255,1);
          border-radius:.6rem;
          border:.1rem solid rgba(61,61,61,1);
          font-size:1.4rem;
          font-weight:400;
          color:rgba(37,36,39,1);
        }
        .btn-default {
          margin-left: 2rem;
          color:rgba(255,255,255,1);
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
        }
      }
    }
  }
  @media screen and (max-width: 430px){
    .modal-dialog {
      @include position(absolute,40%,50%,97%,32rem);
      .modal-footer {
        .btn-group {
          @include flex(center);
          .btn {
            width:15rem;
          }
        }
      }
    }
  }
}
</style>
