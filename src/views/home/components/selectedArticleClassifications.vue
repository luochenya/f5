<template>
  <div class="selected-article-classification">
    <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3">
          <el-breadcrumb-item>
            <a>{{pageTitle}}</a><!--  @click="toRouter()" -->
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="pageTitle == '代理商專區'">
            <a @click="toRouter()">{{pageTitles}}</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>文章分類</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="title">
          <h1>文章分類</h1>
          <p>LATEST NEWS</p>
        </div>
        <div class="main dmax-md-none">
          <div class="main-item" v-for="(item,index) in menu" :key="index" @click="goArticleClassify(item.class_name, item.id)">
            <div class="item-text">
              <div class="name">
                <h1>{{item.class_name}}</h1>
              </div>
            </div>
          </div>
        </div>
        <!-- phone -->
        <div class="main d-md-none">
          <div class="main-item" v-for="(item,index) in menu" :key="index" @click="goArticleClassify(item.class_name, item.id)">
            <div class="item-text">
              <div class="name">
                <h1>{{item.class_name}}</h1>
              </div>
            </div>
          </div>
        </div>
        <!-- oo -->
      </div>
    </div>
  </div>
</template>

<script>
import { systemGetArticleClass } from './../../../api/request'
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('token'),
      type: this.$route.query.type,
      classify: this.$route.query.classify,
      menu: [],
      pageTitle: '',
      pageTitles: ''
    }
  },
  created () {
    this._systemGetArticleClass()
  },
  mounted() {
    if (this.$route.query.type == 1) {
      this.pageTitle = "F5專區"
    } else if (this.$route.query.type == 2) {
      this.pageTitle = "經銷商專區"
    } else if (this.$route.query.type == 3) {
      this.pageTitle = "代理商專區"
      if (this.$route.query.classify == 1) {
        this.pageTitles = "創泓科技Uniforce"
      } else if (this.$route.query.classify == 2) {
        this.pageTitles = "逸盈科技NETFOS"
      } else if (this.$route.query.classify == 3) {
        this.pageTitles = "零壹科技ZERONE"
      }
    } else {
      this.pageTitle = "首頁"
    }
  },
  methods: {
    goArticleClassify (class_name, id) {
      this.$router.push({ path: '/selectedArticleClassification', query: {
        title: class_name,
        type: this.type,
        class_id: id,
        classify: this.classify
      } })
    },
    // 获取文章分类列表
    _systemGetArticleClass () {
      systemGetArticleClass({ headers: { token: this.token } }).then(res => {
        // console.log(res)
        if (res.data.code !== '200') {
          this.$message.error({
            message: '獲取數據失敗！'
          })
        } else {
          this.menu = res.data.data.rows
        }
      })
    },
    // 路由跳轉
    toRouter() {
      if (this.pageTitle == 'F5專區') {
        this.$router.push({ path: '/pushInformation', query: { f5: 0 } })
      } else if (this.pageTitle == '首頁') {
        this.$router.push({ path: '/pushInformation' })
      } else if (this.pageTitle == '經銷商專區') {
        this.$router.push({ path: '/pushInformation', query: { dealers: 4 } })
      } else if (this.pageTitle == '代理商專區') {
        if (this.pageTitles == '逸盈科技NETFOS') {
          this.$router.push({ path: '/pushInformation', query: { agencyId: 3 } })
        } else if (this.pageTitles == '零壹科技ZERONE') {
          this.$router.push({ path: '/pushInformation', query: { agencyId: 2 } })
        } else if (this.pageTitles == '創泓科技Uniforce') {
          this.$router.push({ path: '/pushInformation', query: { agencyId: 22 } })
        }
      }
    },
  }
}
</script>

<style lang='scss'>
@import './../../../assets/style/mixin.scss';
.selected-article-classification {
  .tabs {
    height:6rem;
    background:rgba(245,246,247,1);
    display: flex;
    align-items: center;
    /deep/ .el-breadcrumb__item {
      display: flex;
      align-items: center;
      font-size:1.6rem;
      font-weight:400;
      color:rgba(37,36,39,1);
      line-height:2.2rem;
      cursor: pointer;
    }
    /deep/ .el-breadcrumb__inner a {
       font-weight:400;
        color:rgba(37,36,39,1);
     }
    /deep/ .el-breadcrumb__inner a:hover {
       color:rgba(37,36,39,1);
    }
    .checked {
       /deep/ .el-breadcrumb__inner {
        color: #006AFF !important;
       }
    }
    .icon-3 {
      color: #006AFF;
      font-size: 1.2rem;
    }
  }
  @media screen and (max-width:767px) {
    .tabs {
      height:3.6rem;
      padding: 0 1rem;
      /deep/ .el-breadcrumb__item {
        font-size:1.4rem;
      }
    }
  }
  .content {
    margin-top: 10rem;
    .title {
      text-align: center;
      margin-bottom: 3.9rem;
      h1 {
        font-size:3.6rem;
        font-weight:400;
        color:rgba(37,36,39,1);
        line-height:5.4rem;
      }
      p {
        font-size:1.2rem;
        margin-top: .3rem;
        font-weight:600;
        color:rgba(134,134,134,1);
        line-height:1.7rem;
        letter-spacing:1.5rem;
      }
    }
    .main {
      .main-item {
         @include flex(flex-start,flex-start);
         padding: 3rem 0;
         border-bottom: .1rem solid rgba(240,240,240,1);
         cursor: pointer;
        .item-img {
          width: 20.4rem;
          height: 15rem;
          border-radius: 1rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .item-text {
          margin-left: 3.6rem;
          width: 100%;
          .name {
            @include flex();
            h1 {
              font-size:2.8rem;
              font-weight:600;
              color:rgba(37,36,39,1);
              line-height:4rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            span {
              font-size:1.4rem;
              font-weight:400;
              color:rgba(189,189,189,1);
              line-height:2rem;
            }
          }
          .text {
            height: 5rem;
            margin-top: .9rem;
            font-size:1.8rem;
            font-weight:400;
            color:rgba(134,134,134,1);
            line-height:2.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
          }
          .user {
            margin-top: 2rem;
            @include flex(flex-start);
            .user-img {
              @include flex(flex-start);
              .img {
                width: 2.2rem;
                height: 2.2rem;
                margin-right: 1rem;
                border-radius: 50%;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              span {
                font-size:1.5rem;
                font-weight:400;
                color:rgba(134,134,134,1);
                line-height:2.6rem;
              }
            }
            .tip {
              margin-left: 7.5rem;
              font-size:1.4rem;
              font-weight:400;
              color:rgba(189,189,189,1);
              line-height:2rem;
              i {
                margin-right: .4rem;
              }
            }

          }
        }
      }
      .main-item:last-child{
        border-bottom: none;
      }
    }
  }
  @media screen and (max-width:1199px) {
     .content {
      .main {
        .main-item {
          .item-text {
            .name {
              flex-direction: column;
              @include flex(center,flex-start);
              margin-bottom: 2rem;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width:991px) {
    .content {
      margin-top: 6rem;
      .title {
        margin-bottom: 2.9rem;
      }
      .main {
        .main-item {
          padding: 3rem 0;
          border-bottom: .1rem solid rgba(240,240,240,1);
          .item-text {
            .name {
              flex-direction: column;
              @include flex(center,flex-start);
              h1 {
                font-size:2rem;
                line-height:3.6rem;
              }
              span {
                font-size:1.2rem;
                line-height:1.7rem;
              }
            }
            .text {
              font-size:1.4rem;
              line-height:2rem;
            }
            .user {
              margin-top: 1.6rem;
              .user-img {
                span {
                  font-size:1.2rem;
                  line-height:1.8rem;
                }
              }
              .tip {
                margin-left: 5.5rem;
                font-size:1.2rem;
                line-height:1.8rem;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width:767px) {
    .content {
      margin-top: 4rem;
      padding: 0 1.5rem;
      .title {
        margin-bottom: 2rem;
        h1 {
          font-size: 2.2rem;
          line-height:3.6rem;
        }
        p {
          letter-spacing:1rem;
        }
      }
      .main {
        .main-item {
          padding: 1.6rem 0;
          border-bottom: .1rem solid rgba(240,240,240,1);
          .item-text {
            margin-left: 0;
            .name {
              flex-direction: column;
              @include flex(center,flex-start);
              h1 {
                font-size:1.8rem;
                line-height:2.7rem;
              }
              span {
                font-size:1.2rem;
                line-height:1.7rem;
              }
            }
            .img-text {
              width: 100%;
              margin-top: 3rem;
              .item-img {
                width: 100%;
                height: auto;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .text {
                margin-top: 2rem;
                width: 100%;
                height: auto;
                margin-bottom: 2rem;
              }

            }
            .user {
              margin-top: 0;
              .user-img {
                span {
                  font-size:1.2rem;
                  line-height:1.8rem;
                }
              }
              .tip {
                margin-left: 5.5rem;
                font-size:1.2rem;
                line-height:1.8rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
