<template>
  <div class="history">
    <div class="img-box">
      <div class="container">
        <div class="text">
          <p>PROJECT REVIEW</p>
          <span>專案審核</span>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3">
          <el-breadcrumb-item><a @click="$router.push('/')">首頁</a></el-breadcrumb-item>
          <el-breadcrumb-item><a @click="$router.push('projectReview')">我的</a></el-breadcrumb-item>
          <el-breadcrumb-item><a @click="$router.push('projectReview')">專案審核</a></el-breadcrumb-item>
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
              <div class="tip" :class="{'tip-bg-1':item.check_state == '1','tip-bg-2': item.check_state == '2','tip-bg-3':item.check_state == '3'}"><span></span></div>
              <div class="time">{{item.created_at}}</div>
            </div>
            <div class="item-box">
              <div class="main">
                <div class="top">
                  <div class="user">
                    <!-- <img v-if="item.user_head" :src="`${path}${item.user_head}`" alt="">
                    <img v-else src="./../assets/imgs/head-portrait.svg" alt=""> -->
                    <img src="./../assets/imgs/safety-user.png" alt="">
                    <div>
                      <h3>{{item.nick_name}}</h3>
                      <span  :class="{'bg-1': item.check_state == '1','bg-2':item.check_state== '2','bg-3': item.check_state == '3'}">{{passType(item.check_state)}}</span>
                      <div>
                        <h4>{{item.audit_name}}</h4>
                        <h5>{{item.agent_company}}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="btn" @click="$router.push({path:'/projectReviewDetails',query:{project_id:item.project_id}})">
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
import { getAuditLogging } from './../api/request'
export default {
  name: 'history',
  data () {
    return {
      historyList: [],
      token: window.sessionStorage.getItem('token'),
      project_id: this.$route.query.project_id,
      path: this.imgs
    }
  },
  computed: {
    passType () {
      return (type) => {
        if (type === '1') {
          return '審核通過'
        } else if (type === '2') {
          return '審核不通過'
        } else {
          return '審核中'
        }
      }
    }
  },
  mounted () {
    this._getAuditLogging()
  },
  methods: {
    timeFun(originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')
      return `${y}年${m}月${d}日 ${hh}:${mm}:${ss}`
    },
    _getAuditLogging () {
      getAuditLogging({ project_id: this.project_id }, { headers: { token: this.token } }).then(res => {
        if (res.data.code !== '200') {
          this.$message.error('獲取數據失敗！')
        } else {
          this.historyList = res.data.data.rows
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import './../assets/style/mixin.scss';
.history {
  margin-top: 8rem;
  .img-box {
    background: url('./../assets/imgs/project-review.png') no-repeat;
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
                  display: inline-block;
                  font-size:1.6rem;
                  font-weight:600;
                  color:rgba(37,36,39,1);
                  line-height:2.3rem;
                }
                h4 {
                  display: inline-block;
                  font-size:1.6rem;
                  font-weight:600;
                  color:rgba(37,36,39,1);
                  line-height:2.3rem;
                }
                h5 {
                  margin-left: 1.4rem;
                  display: inline-block;
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
      margin-left: 1.5rem;
      margin-right: 1.5rem;
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
