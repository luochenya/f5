<template>
  <div class="project-application">
    <div class="img-box">
      <div class="container">
        <div class="text">
         <!-- <p>PROJECT REGISTRATION</p> -->
          <span>專案註冊</span>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3">
          <el-breadcrumb-item><a href="javascript:;" @click="$router.push('/')">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;">我的</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;">專案註冊</a></el-breadcrumb-item>
          <el-breadcrumb-item :class="{'checked': true}">申請</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div class="centent">
        <div class="title">
          <h1>專案註冊</h1>
          <p>PROJECT REGISTRATION</p>
        </div>
        <!-- <router-view></router-view> -->
        <!-- <div class="main" v-if="false">
          <div class="main-a">
            <div class="top"><h1>A.客戶及專案資訊</h1><div class="num"><span>1</span>/4</div></div>
            <div class="link"><div class="links"></div></div>
            <div class="form-box">
              <p>客戶信息</p>
              <div class="form">
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">客戶名稱</div>
                    <input type="text" placeholder="請填寫客戶名稱">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">專案名稱</div>
                    <input type="text" placeholder="請填寫專案名稱">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">承辦單位/部門</div>
                    <input type="text" placeholder="請填寫承辦單位/部門">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">承辦人電話(O)</div>
                    <input type="text" placeholder="請填寫電話號碼">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">承辦人</div>
                    <input type="text" placeholder="請填寫承辦人姓名">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">(M)</div>
                    <input type="text" placeholder="請填寫電話號碼">
                  </label>
                </div>
              </div>
              <p>客戶信息</p>
              <div class="form">
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">預計結案季度</div>
                    <input type="text" placeholder="請填寫季度">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">預計結案月份</div>
                    <input type="text" placeholder="請填寫月份">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">專案總結算</div>
                    <input type="text" placeholder="請填寫預算">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">F5預算</div>
                    <input type="text" placeholder="請填寫預算">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">產業別</div>
                    <input type="text" placeholder="請填寫承辦人姓名">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">承辦人E-mail</div>
                    <input type="text" placeholder="請填寫電話號碼">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">競爭廠商(原廠)</div>
                    <input type="text" placeholder="請填寫廠商資訊">
                  </label>
                </div>
                <div class="card">
                  <label>
                    <span></span>
                    <div class="name">競爭廠商(經銷商)</div>
                    <input type="text" placeholder="請填寫廠商資訊">
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="main-b">
            <div class="top"><h1>B.產品方案資訊</h1><div class="num"><span>增加產品</span></div></div>
            <div class="main-form-b">
              <div class="item item-l">
                <div class="title">
                  <span></span>
                  <h3>客戶信息</h3>
                </div>
                <div class="card">
                  <p>產品</p>
                  <el-select v-model="value" placeholder="VIPRION 4800 Chassis">
                    <el-option
                      label="A"
                      value="B">
                    </el-option>
                  </el-select>
                </div>
                <div class="card">
                  <label>
                    <p>數量</p>
                    <input type="text" placeholder="請填寫產品數量">
                  </label>
                </div>
                <div class="bootm-title">
                  <div class="title">
                    <span></span>
                    <h3>產品模組</h3>
                  </div>
                  <div class="radio">
                    <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
                      <span class="radio-item" :class="{'on':item.isChecked}"></span>
                      <input v-model="radio" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="item item-r">
                 <h3>Others</h3>
                 <div class="text">
                     <textarea placeholder="請填寫內容..."></textarea>
                     <p>0/300</p>
                 </div>
              </div>
            </div>
          </div>
          <div class="btn" @click="$router.push({path:'/toApplyFora'})">下一步</div>
        </div> -->
        <to-apply-for-a v-show="isShowA" @next="nextA"></to-apply-for-a>
        <to-apply-for-b v-show="isShowB" @prev="prevB" @next="nextB"></to-apply-for-b>
        <to-apply-for-c v-show="isShowC" @prev="prevC" @next="nextC"></to-apply-for-c>
        <to-apply-for-d v-show="isShowD" @prev="prevD" :formA="formA" :formB="formB" :formC="formC"></to-apply-for-d>
      </div>
    </div>
  </div>
</template>

<script>
import toApplyForA from './toApplyForA'
import toApplyForB from './toApplyForB'
import toApplyForC from './toApplyForC'
import toApplyForD from './toApplyForD'
export default {
  name: 'project-review-detail',
  components: {
    toApplyForA,
    toApplyForB,
    toApplyForC,
    toApplyForD
  },
  data () {
    return {
      isShowA: true,
      isShowB: false,
      isShowC: false,
      isShowD: false,
      formA: {},
      formB: {},
      formC: {}
    }
  },
  methods: {
    check (index) {
    // 先取消所有选中项
      this.radios.forEach((item) => {
        item.isChecked = false
      })
      // 再设置当前点击项选中
      this.radio = this.radios[index].value
      // 设置值，以供传递
      this.radios[index].isChecked = true
      console.log(this.radio)
    },
    nextA (from) {
      this.formA = from
      this.isShowA = false
      this.isShowB = true
    },
    prevB () {
      this.isShowB = false
      this.isShowA = true
    },
    nextB (from) {
      this.formB = from
      this.isShowB = false

      console.log(this.formB, 'b')
      this.isShowC = true
    },
    prevC () {
      this.isShowC = false
      this.isShowB = true
    },
    nextC (from) {
      this.formC = from
      this.isShowC = false

      this.isShowD = true
      console.log(this.formC, 'c')
    },
    prevD () {
      this.isShowD = false
      this.isShowC = true
    }
  }
}
</script>

<style lang='scss'>
@import './../../assets/style/mixin.scss';
.project-application {
  margin-top: 8rem;
  .img-box {
    background: url('./../../assets/imgs/project-registration.png') no-repeat;
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
    .title {
      margin-bottom: 2.8rem;
      h1 {
        font-size:2.2rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:3rem;
      }
      p {
        font-size:1rem;
        font-weight:400;
        color:rgba(189,189,189,1);
        line-height:1.4rem;
        margin-top: .2rem;
      }
    }
    // .main {
    //   margin-top: 4.8rem;
    //   .main-a {
    //     .top {
    //       @include flex();
    //       h1 {
    //         font-size:2rem;
    //         font-weight:500;
    //         color:rgba(37,36,39,1);
    //         line-height:2.8rem;
    //       }
    //       .num {
    //         font-size:1.2rem;
    //         font-weight:500;
    //         color:rgba(37,36,39,1);
    //         line-height:2.8rem;
    //         span {
    //           font-size: 2rem;
    //           font-weight:500;
    //         }
    //       }
    //     }
    //     .link {
    //       width: 100%;
    //       height:.4rem;
    //       background:rgba(237,237,237,1);
    //       border-radius:.2rem;
    //       margin-top: 1.1rem;
    //       .links {
    //         width: 25%;
    //         height:.4rem;
    //         background:rgba(37,36,39,1);
    //         border-radius:.2rem;
    //       }
    //     }
    //     .form-box {
    //       width: 100%;
    //       margin-top: 3rem;
    //       p {
    //         font-size:1.6rem;
    //         font-weight:600;
    //         color:rgba(37,36,39,1);
    //         line-height:2.2rem;
    //         margin-bottom: 1rem;
    //       }
    //       .form {
    //         width: 100%;
    //         @include flex();
    //         flex-wrap: wrap;
    //         .card {
    //           flex: 0 0 48%;
    //           height:5rem;
    //           background:rgba(245,246,247,1);
    //           border-radius:.4rem;
    //           border:.1rem solid rgba(239,239,239,1);
    //           margin-bottom: 2.4rem;
    //           label {
    //             height: 100%;
    //             @include flex(flex-start,center);
    //             margin-left: 2rem;
    //             span {
    //               width:.4rem;
    //               height:.4rem;
    //               background:rgba(235,54,44,1);
    //               border-radius: 50%;
    //               margin-right: .9rem;
    //             }
    //             .name {
    //               width: 12.3rem;
    //               font-size:1.6rem;
    //               font-weight:400;
    //               color:rgba(37,36,39,1);
    //               line-height:2.2rem;
    //               margin-right: 1.3rem;
    //               cursor: pointer;
    //             }
    //             input {
    //               border: none;
    //               outline: none;
    //               background:rgba(245,246,247,1);
    //               font-size:1.6rem;
    //               font-weight:400;
    //               color:rgba(189,189,189,1);
    //               line-height:2.2rem;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   .main-b {
    //     .top {
    //       @include flex();
    //       h1 {
    //         font-size:2rem;
    //         font-weight:500;
    //         color:rgba(37,36,39,1);
    //         line-height:2.8rem;
    //       }
    //       .num {
    //         width:13.4rem;
    //         height:4.4rem;
    //         background:rgba(0,106,255,.1);
    //         border-radius:.6rem;
    //         @include flex(center);
    //         span {
    //           font-size:1.4rem;
    //           font-weight:400;
    //           color:rgba(0,106,255,1);
    //           line-height:2rem;
    //         }
    //       }
    //     }
    //     .main-form-b {
    //       width: 100%;
    //       @include flex(space-between,flex-start);
    //       .item {
    //         flex: 0 0 48%;
    //       }
    //       .item-l {
    //         .title {
    //           @include flex(flex-start,center);
    //           margin-bottom: 1rem;
    //           span {
    //             width:.4rem;
    //             height:.4rem;
    //             display: inline-block;
    //             margin-right: .9rem;
    //             background:rgba(235,54,44,1);
    //             border-radius: 50%;
    //           }
    //           h3 {
    //             font-size:1.6rem;
    //             font-weight:600;
    //             color:rgba(37,36,39,1);
    //             line-height:2.2rem;
    //           }
    //         }
    //         .card {
    //           height:5rem;
    //           width: 100%;
    //           @include flex(flex-start,center);
    //           background:rgba(245,246,247,1);
    //           border-radius:.4rem;
    //           border:.1rem solid rgba(239,239,239,1);
    //           padding-left: 3rem;
    //           margin-bottom: 2rem;
    //           p {
    //             margin-right: 1.4rem;
    //             font-size:1.6rem;
    //             font-weight:400;
    //             color:rgba(37,36,39,1);
    //             line-height:2.2rem;
    //           }
    //          .el-select {
    //             width: 86%;
    //           }
    //           /deep/.el-input__inner {
    //             border: none;
    //             font-size:1.6rem;
    //             background:rgba(245,246,247,1);
    //             font-weight:400;
    //             color:rgba(37,36,39,1)
    //           }
    //           .el-select .el-input .el-select__caret {
    //             color: #3D3D3D;
    //             font-size: 1.8rem;
    //             font-weight: 700;
    //           }
    //           label {
    //             @include flex(flex-start,center);
    //             input {
    //               border: none;
    //               background:rgba(245,246,247,1);
    //             }
    //           }
    //         }
    //         .bootm-title {
    //           .title {
    //             margin-top: 3.4rem;
    //           }
    //           .radio {
    //             margin-top: 2.8rem;
    //             margin-left: 3rem;
    //            .radio-box{
    //               @include flex(flex-start,center);
    //               position: relative;
    //               height: 2.5rem;
    //               line-height: 2.5rem;
    //               margin-right: .5rem;
    //             }
    //             .radio-item {
    //               display: inline-block;
    //               width: 1.4rem;
    //               height: 1.4rem;
    //               background:rgba(245,246,247,1);
    //               border:.1rem solid rgba(210,210,210,1);
    //               border-radius: 50%;
    //               box-sizing: border-box;
    //               margin-right: 1.6rem;
    //             }
    //             .input-radio {
    //               display: inline-block;
    //               position: absolute;
    //               opacity: 0;
    //               width: 2.5rem;
    //               height: 2.5rem;
    //               cursor: pointer;
    //               left: 0;
    //               outline: none;
    //               -webkit-appearance: none;
    //             }
    //             .on {
    //               @include bgImg(1.4rem,1.4rem,'./../../assets/imgs/icon/icon-success.png');
    //             }
    //           }
    //         }
    //       }
    //       .item-r {
    //         h3 {
    //           font-size:1.6rem;
    //           font-weight:600;
    //           color:rgba(37,36,39,1);
    //           line-height:2.2rem;
    //         }
    //         .text {
    //           height:31rem;
    //           padding: 2rem;
    //           margin-top: 1rem;
    //           width: 100%;
    //           background:rgba(245,246,247,1);
    //           border-radius:.4rem;
    //           border:.1rem solid rgba(239,239,239,1);
    //           textarea {
    //             width: 100%;
    //             height: 92%;
    //             background:rgba(245,246,247,1);
    //             border: none;
    //             outline: none;
    //             font-size:1.6rem;
    //             font-weight:400;
    //             color:rgba(189,189,189,1);
    //             line-height:2.2rem;
    //           }
    //           p {
    //             @include flex(flex-end);
    //             font-size:1.6rem;
    //             font-weight:400;
    //             color:rgba(189,189,189,1);
    //             line-height:2.2rem;
    //           }
    //         }
    //       }
    //     }
    //   }
    //   .btn {
    //     width:31rem;
    //     height:5rem;
    //     @include flex(center);
    //     margin-left: auto;
    //     margin-top: 8rem;
    //     background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
    //     border-radius:.4rem;
    //     font-size:1.6rem;
    //     font-weight:400;
    //     color:rgba(255,255,255,1);
    //     line-height:2.2rem;
    //     cursor: pointer;
    //   }
    // }
  }
}
</style>
