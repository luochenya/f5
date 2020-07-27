<template>
   <transition name="slide">
    <div class="audit-modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header" v-if="showTitle == 1">
          <div class="img"><img src="./../assets/imgs/review-failed.png" alt=""></div>
          <div class="text">
            <div class="name">審核未通過</div>
            <p>REVIEW FAILED</p>
          </div>
        </div>
        <div class="modal-header" v-if="showTitle == 2">
          <div class="img"><img src="./../assets/imgs/success.png" alt=""></div>
          <div class="text">
            <div class="name">審核通過</div>
            <p>SUCCESS</p>
          </div>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
       <div class="modal-footer">
          <a class="btn"  @click="$emit('submit')">確認送出</a>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: 'audit-modal',
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
    showModal: Boolean,
    showTitle: Number,
    imgShow: Boolean
  }
}
</script>

<style lang='scss'>
@import './../assets/style/mixin.scss';
.audit-modal {
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
    position: absolute;
    top: 40%;
    left: 50%;
    width:51.8rem;
    transform: translate(-50%,-50%);
    background:rgba(255,255,255,1);
    border-radius:.6rem;
    @include flex(flex-start,center);
    flex-direction: column;
    padding: 3.8rem 0 4.2rem 0;
    box-sizing: border-box;
    .modal-header {
      // @include flex(center,flex-start);
      display: flex;
      align-items: center;
      .img {
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;

        }
      }
      .text {
        margin-left: 1.2rem;

        .name {
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
    }
    .modal-body {
      textarea {
        width: 35rem;
        height: 18.6rem;
        margin-top: 3rem;
        border: none;
        outline: none;
        background:rgba(245,246,247,1);
        border-radius:.4rem;
        border:.1rem solid rgba(239,239,239,1);
        padding: 1.4rem 2rem;
        font-size:1.6rem;
        font-weight:400;
        color:rgba(189,189,189,1);
        line-height:2.2rem;
      }
      .audit-main {
        width: 35rem;
        .main-name {
          @include flex(flex-start,center);
          span {
            width:.4rem;
            height:.4rem;
            display: inline-block;
            border-radius: 50%;
            background:rgba(98,199,79,1);
          }
          h3 {
            margin-left: .9rem;
            font-size:1.6rem;
            font-weight:600;
            color:rgba(37,36,39,1);
            line-height:2.2rem;
          }
        }
        .el-select {
          margin-top: 1rem;
          width: 100%;
          height: 5rem;
        }
        .el-input__inner {
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
    .modal-footer {
      .btn{
        @include flex(center);
        width:35rem;
        height:5rem;
        margin-top: 3rem;
        background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
        box-shadow:0 1rem 3rem 0 rgba(41,41,44,0.1);
        border-radius:.4rem;
        font-size:1.4rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-bottom: 2.5rem;
      }

    }
  }
  @media screen and (max-width: 430px){
    // .modal-dialog {
    //   @include position(absolute,40%,50%,97%,32rem);
    //   .modal-footer {
    //     .btn-group {
    //       @include flex(center);
    //       .btn {
    //         width:15rem;
    //       }
    //     }
    //   }
    // }
  }
}
</style>
