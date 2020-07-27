<template>
  <div class="selected-article-list">
    <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3">
          <el-breadcrumb-item>
            <a v-if="this.$route.query.newsId == 6" @click="goNext()">首頁</a>
            <a v-if="this.$route.query.newsId == 4" @click="goNext()">經銷商專區</a>
            <a v-if="this.$route.query.newsId == 2 || this.$route.query.newsId == 3 || this.$route.query.newsId == 1" >代理商專區</a> <!-- @click="goNext()" -->
            <a v-if="this.$route.query.newsId == 0" @click="goNext()">F5專區</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$route.query.newsId == 2">
            <a @click="goNext()">逸盈科技NETFOS</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$route.query.newsId == 3">
            <a @click="goNext()">零壹科技ZERONE</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$route.query.newsId == 1">
            <a @click="goNext()">創泓科技Uniforce</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item :class="{'checked': $route.meta.title}">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="title">
          <h1>精選文章</h1>
          <p>LATEST NEWS</p>
        </div>
        <div class="main dmax-md-none">
          <div class="main-item" v-for="(item,index) in newsList" :key="index" @click="goArticlesDetails(item.id)">
            <div class="item-img">
              <img :src="`${path}${item.imgs}`" alt="">
            </div>
            <div class="item-text">
              <div class="name">
                <h1>{{item.title}}</h1>
                <span>創建於 {{item.created_at}}</span>
              </div>
              <div class="text" v-html="item.content"></div>
              <div class="user">
                <div class="user-img">
                  <div class="img">
                    <img src="./../../../assets/imgs/head-portrait.svg" alt="">
                  </div>
                  <span>發表人：{{ item.uploader ? item.uploader : item.nick_name }}</span>
                </div>
                <div class="tip">
                  <!-- <i class="icon-6"></i>查看234235 -->
                </div>
            </div>
            </div>

          </div>
        </div>
        <!-- phone -->
        <div class="main d-md-none">
          <div class="main-item" v-for="(item,index) in newsList" :key="index" @click="$router.push({path:`/selectedArticleDetails/${index}`})">
            <div class="item-text">
              <div class="name">
                <h1>{{item.title}}</h1>
                <span>創建於 {{item.created_at}}</span>
              </div>
              <div class="img-text">
                <div class="item-img">
                  <img :src="`${path}${item.imgs}`" alt="">
                </div>
                <div class="text" v-html="item.content"></div>
              </div>
              <div class="user">
                <div class="user-img">
                  <div class="img">
                    <img src="./../../../assets/imgs/head-portrait.svg" alt="">
                  </div>
                  <span>發表人：{{ item.uploader ? item.uploader : item.nick_name }}</span>
                </div>
                <div class="tip">
                  <!-- <i class="icon-6"></i>查看234235 -->
                </div>
            </div>
            </div>

          </div>
        </div>
        <!-- oo -->
      </div>
    </div>
     <pagination
      :currentpage="offset+1"
      :pagesize="limit"
      :total="total"
      :handleCurrentChange="handleCurrentChange"
      :isHidePage="true"
    ></pagination>
    <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import Pagination from './../../../components/Pagination'
import { systemFeaturedArticles, featuredArticlesWeb } from './../../../api/request'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      isShowLoading: true,
      newsList: [],
      token: window.sessionStorage.getItem('token'),
      path: this.imgs,
      newsId: this.$route.query.newsId,
      offset: 0,
      limit: 5,
      total: 0
    }
  },
  mounted () {
    this._systemFeaturedArticles()
  },
  methods: {
    goNext () {
      if (this.newsId === 6 || this.newsId === '6') {
        this.$router.push({ path: '/pushInformation' })
      } else if (this.newsId === 0 || this.newsId === '0') {
        this.$router.push({ path: '/pushInformation', query: { f5: this.newsId } })
      } else if (this.newsId == '1' || this.newsId == '3' || this.newsId == '2') {
        this.$router.push({ path: '/pushInformation', query: { agencyId: this.newsId } })
      } else if (this.newsId === 4 || this.newsId === '4') {
        this.$router.push({ path: '/pushInformation', query: { dealers: this.newsId } })
      }
    },
    _systemFeaturedArticles () {
      var types = ''
      if (this.newsId == 6) {
        var form = {
          offset: this.offset * this.limit,
          limit: this.limit
        }
        systemFeaturedArticles(form, { headers: { token: this.token } }).then(res => {
          this.isShowLoading = false
          if (res.data.code !== '200') {
            this.$message.error('獲取數據失敗！')
          } else {
            this.newsList = res.data.data.rows
            this.total = res.data.data.total
          }
        })
      } else {
        if (this.newsId == 0) {
          types = 1
        } else if (this.newsId == 4) {
          types = 2
        } else if (this.newsId == 3) {
          types = 3
        } else if (this.newsId == 2) {
          types = 4
        } else if (this.newsId == 1) {
          types = 5
        }
        var form = {
          type: types,
          offset: this.offset * this.limit,
          limit: this.limit
        }
        featuredArticlesWeb(form, { headers: { token: this.token } }).then(res => {
          this.isShowLoading = false
          if (res.data.code !== '200') {
            this.$message.error('獲取數據失敗！')
          } else {
            this.newsList = res.data.data.rows
            this.total = res.data.data.total
          }
        })
      }
    },
    handleCurrentChange (e) {
      if (e === 1) {
        this.offset = 0
      } else {
        // // this.offset = (e - 1) * this.limit
        this.offset = e - 1
      }
      window,scrollTo(0,0)
      this.isShowLoading = true
      this._systemFeaturedArticles()
    },
    goArticlesDetails (id) {
      this.$router.push({ path: '/articlesDetails', query: { name: this.newsId, article_id: id } })
    },
    goHome () {
      // 首頁
      if (this.newsId === 6 || this.newsId === '6') {
        this.$router.push('/')
      } else if (this.newsId === 0 || this.newsId === '0') {
        // f5
        this.$router.push({ path: '/pushInformation', query: { f5: 0 } })
      } else if (this.newsId == '22' || this.newsId == '3' || this.newsId == '2') {
        // 代理
        this.$router.push({ path: '/pushInformation', query: { agencyId: this.newsId } })
      } else if (this.newsId === 4 || this.newsId === '4') {
        this.$router.push({ path: '/pushInformation', query: { dealers: this.newsId } })
      }
    }
  }
}
</script>

<style lang='scss'>
@import './../../../assets/style/mixin.scss';
.selected-article-list {
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
          // overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .item-text {
          margin-left: 3.6rem;
          width: calc(100% - 24rem);
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
              width: 80%;
              display: inline-block;
            }
            span {
              text-align: right;
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
            -webkit-line-clamp: 2;
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
            width: 100%;
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
