<template>
  <div class="history-registration">
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
          <el-breadcrumb-item :class="{'checked': $route.meta.title}">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div class="centent">
        <div class="title">
          <h1>歷程記錄</h1>
          <p>PROJECT REVIEW</p>
        </div>
        <div class="steps">
          <div class="item" v-for="(item,index) in historyList" :key="index">
            <div class="item-top">
              <div class="tip" :class="{'tip-bg-1': item.check_state == '2','tip-bg-2': item.check_state == '3','tip-bg-3': item.check_state == '1'}"><span></span></div>
              <div class="time">{{item.created_at |dateFormats}}</div>
            </div>
            <div class="item-box">
              <div class="main">
                <div class="top">
                  <div class="user">
                    <img :src="`${path}${item.user_head}`" alt="">
                    <h3>{{item.nick_name}}</h3>
                    <span  :class="{'bg-1': item.check_state == '2','bg-2': item.check_state== '3','bg-3': item.check_state == '1'}">{{passType(item.check_state)}}</span>
                  </div>
                  <div class="btn" @click="$router.push({path:'/projectReviewDetail',query: {project_id:item.project_id}})">
                    詳細資料
                  </div>
                </div>
                <p>·備註：{{item.remark? item.remark : '無'}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 1审核通过2审核失败3审核中
//  審核不通過
import { getAuditLogging } from './../../api/request'
export default {
  name: 'history-registration',
  data () {
    return {
      historyList: [
        {
          title: '代理商產品經理',
          tip: '麻煩你們快點通過審，因為此次的事情比較著急，麻煩你們快點審核通過，著急，謝謝你們！',
          type: '1',
          text: '同意'
        },
        {
          title: '代理商產品經理',
          tip: '無',
          type: '2',
          text: '審核中'
        },
        {
          title: 'F5業務經理',
          tip: '麻煩你們快點通過審，因為此次的事情比較著急，麻煩你們快點審核通過，著急，謝謝你們！',
          type: '1',
          text: '同意'
        },
        {
          title: 'F5業務經理',
          tip: '麻煩你們快點通過審，因為此次的事情比較著急，麻煩你們快點審核通過，著急，謝謝你們！',
          type: '3',
          text: '審核中'

        },
        {
          title: 'F5業務經理',
          tip: '無',
          type: '1',
          text: '同意'
        },
        {
          title: 'F5業務經理',
          tip: '麻煩你們快點通過審，因為此次的事情比較著急，麻煩你們快點審核通過，著急，謝謝你們！',
          type: '3',
          text: '審核中'

        },
        {
          title: 'F5業務經理',
          tip: '麻煩你們快點通過審，因為此次的事情比較著急，麻煩你們快點審核通過，著急，謝謝你們！',
          type: '2',
          text: '待審核'
        }
      ],
      token: window.sessionStorage.getItem('token'),
      project_id: this.$route.query.project_id,
      path: this.imgs
    }
  },
  computed: {
    passType () {
      return (type) => {
        if (type === '1') {
          return '审核中'
        } else if (type === '2') {
          return '审核通过'
        } else {
          return '审核不通过'
        }
      }
    }
  },
  mounted () {
    console.log(this.project_id)
    this._getAuditLogging()
  },
  methods: {
    _getAuditLogging () {
      getAuditLogging({ project_id: this.project_id }, { headers: { token: this.token } }).then(res => {
        // console.log(res)
        if (res.data.code !== '200') {
          this.$message.error('獲取數據失敗！')
        } else {
          this.historyList = res.data.data.rows
          console.log(this.historyList)
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import './../../assets/style/mixin.scss';
.history-registration {
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
    .steps {
      .item {
        .item-top {
          @include flex(flex-start,center);
          .tip {
            width: 3rem;
            height: 3rem;
             @include flex(center);
            border-radius: 50%;
            span {
              display: inline-block;
              width:1.4rem;
              height:1.4rem;
              border-radius: 50%;
            }
          }
          .tip-bg-1 {
             background:rgba(224,244,220,1);
             span {
                background:rgba(98,199,79,1);
             }
          }
          .tip-bg-2 {
             background:rgba(245,246,247,1);
             span {
               background:rgba(227,228,229,1);
             }
          }
          .tip-bg-3 {
             background:rgba(255,235,218,1);
             span {
               background:rgba(255,155,68,1);
             }
          }
          .time {
            margin-left: 2rem;
          }
        }
        .item-box {
          margin-left: 1.4rem;
          border-left: .1rem dashed #D2D2D2;
          padding-top: .7rem;
          padding-bottom: 3rem;
          .main {
            margin-left: 3.4rem;
            padding: 2rem 3rem 2rem 2.4rem;

            background:rgba(245,246,247,1);
            border-radius:.6rem;
            .top {
              @include flex();
              .user {
                @include flex(flex-start,center);
                img {
                  width: 3.6rem;
                  height: 3.6rem;
                  border-radius: 50%;
                  overflow: hidden;
                  margin-right: 1.2rem;
                }
                h3 {
                  font-size:1.6rem;
                  font-weight:600;
                  color:rgba(37,36,39,1);
                  line-height:2.3rem;
                }
                span {
                  // width:4.3rem;
                  padding: .3rem .8rem;
                  height:1.7rem;
                  margin-left: 1.4rem;
                  display: inline-block;
                  @include flex(center);
                  border-radius:.2rem;
                  font-size:.9rem;
                  font-weight:600;
                  color:rgba(255,255,255,1);
                  line-height:1.3rem;
                }
                .bg-1 {
                  background:rgba(98,199,79,1);
                }
                .bg-2 {
                  background:rgba(189,189,189,1);
                }
                .bg-3 {
                  background:rgba(255,155,68,1);
                }
              }
              .btn {
                width:13.4rem;
                height:4.4rem;
                @include flex(center);
                background:rgba(255,255,255,1);
                border-radius:.6rem;
                border:.1rem solid rgba(61,61,61,1);
                cursor: pointer;
              }
            }
            p {
              font-size:1.2rem;
              margin-top: .7rem;
              font-weight:400;
              color:rgba(189,189,189,1);
              line-height:1.7rem;
            }
          }
        }
      }
    }
  }
   @media screen and (max-width:991px) {
    margin-top: 6rem;
      .centent {
        margin-top: 6rem;
      }
  }
  @media screen and (max-width:767px) {
    .centent {
      margin-left: 1rem;
      margin-right: 1rem;
      margin-top: 2rem;
      .title {
        h1 {
          font-size:2rem;
          line-height:2.6rem;
        }
      }
      .steps {
        .item {
          .item-top {
            @include flex(flex-start,center);
            .tip {
              width: 2rem;
              height: 2rem;
              span {
                width:1rem;
                height:1rem;
              }
            }
            .time {
              margin-left: 1rem;
            }
          }
          .item-box {
            margin-left: 1rem;
            padding-bottom: 2rem;
            .main {
              margin-left: 2rem;
              padding: 1rem 1rem 1rem 1.4rem;
              .top {
                .user {
                  img {
                    margin-right: 1rem;
                  }
                  h3 {
                    font-size:1.4rem;
                    line-height:2.3rem;
                  }
                  span {
                      margin-left: .6rem;
                  }
                }
                .btn {
                  width:7rem;
                  height:2.8rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
