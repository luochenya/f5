<template>
  <div class="push-information">
    <div class="news-box">
      <div class="container">
        <p>LATEST NEWS</p>
        <div class="title">
          <h1 @click="gotoNews">最新消息</h1>
          <span @click="gotoNews">查看更多<i class="icon-3"></i></span>
        </div>
        <div class="content">
          <div class="item" v-for="(item,index) in fiveNewsList" :key="index" @click="goNewsDetails(item.id)">
            <span></span>
            <p>{{item.title}}</p>
            <div class="line"></div>
            <!-- <div class="text" v-html="item.content"></div> -->
            <div class="tiem"><span>創建於 {{item.created_at}}</span><span class="radius"><i></i><i></i></span></div>
          </div>
          <!-- <div class="item item-f">
            <span></span>
            <p>為什麼F5 DNS雲服務？</p>
            <div class="line"></div>
            <div class="text">
              F5的響應式和安全的DNS雲服務可確保您的應用程序的高可用性。付費使用。
            </div>
            <div class="tiem"><span>創建於 3月10日  18:32</span><span class="radius"><i></i><i></i></span></div>
          </div>
          <div class="item item-f">
            <span></span>
            <p>為什麼F5 DNS雲服務？</p>
            <div class="line"></div>
            <div class="text">
              F5的響應式和安全的DNS雲服務可確保您的應用程序的高可用性。付費使用。
            </div>
            <div class="tiem"><span>創建於 3月10日  18:32</span><span class="radius"><i></i><i></i></span></div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="article-box">
      <div class="container">
        <p>SELECTED ARTICLES</p>
        <div class="title">
          <h1>精選文章</h1>
          <span @click="goArticlesList">查看更多<i class="icon-3"></i></span>
        </div>
        <div class="content" v-if="articlesList.id">
          <div class="img-left">
            <!-- <img :src="`${imgs}${articlesList.imgs[0]}`" alt="" v-if="articlesList.imgs && articlesList.imgs.length > 0 && articlesList.imgs[0]"> -->
            <img :src="`${imgs}${articlesList.imgs}`" alt="">
          </div>
          <div class="text-right">
            <h3 class="text-right_title">{{articlesList.title}}</h3>
            <div class="tip">
              <div class="item-left">
                <!-- <span>F5原廠</span>
                <span>精選文章</span> -->
              </div>
              <div class="item-right">創建於 {{articlesList.created_at}}</div>
            </div>
            <div class="text" v-html="articlesList.content"></div>
            <div class="btn" @click="goArticlesDetails(articlesList.id)">
              查看全部內容
            </div>
          </div>
        </div>
      </div>
    </div>
    <home-article-classify></home-article-classify>
  </div>
</template>

<script>
import HomeArticleClassify from './HomeArticleClassify'
import { newsFiveNewsList, systemGetArticleClass, getAgentNewsList, getDealerNewsList, getHomePageWeb, getHomeNewsList, featuredArticlesWeb } from './../../../api/request'
export default {
  components: {
    HomeArticleClassify
  },
  data () {
    return {
      token: '',
      fiveNewsList: [],
      articlesList: [],
      imgs: this.imgs,
      classify: this.$route.query.agencyId,
      dealers: this.$route.query.dealers,
      f5: this.$route.query.f5,
      newsId: ''
    }
  },
  mounted () {
    this.token = window.sessionStorage.getItem('token')
    this.$nextTick(() => {
      this.classify = this.$route.query.agencyId
      this.getNewsFiveNewsList()
    })
    // this.getNewsFiveNewsList()
    // this.getSystemFeaturedArticles()
    this.getSystemGetArticleClass()
    // console.log(this.classify)
  },
  methods: {
    gotoNews () {
      if (this.classify) {
        this.newsId = this.classify
      } else if (this.dealers) {
        this.newsId = this.dealers
      } else if (this.f5 == 0) {
        this.newsId = this.f5
      } else {
        this.newsId = '6'
      }
      this.$router.push({ path: '/theLatestNews', query: { newsId: this.newsId } })
    },
    goNewsDetails (id) {
      if (this.classify) {
        this.newsId = this.classify
      } else if (this.dealers) {
        this.newsId = this.dealers
      } else if (this.f5) {
        this.newsId = this.f5
      } else {
        this.newsId = '6'
      }
      this.$router.push({ path: '/theLatestNewsDetails', query: { name: this.newsId, news_id: id } })
    },
    // 获取最新消息和精选文章
    getNewsFiveNewsList () {
      if (this.classify) {
        // 代理商最新消息列表
        if (this.classify == '22') this.classify = '1'
        getAgentNewsList({ offset: 0, limit: 3, classify: this.classify }, { headers: { token: this.token } }).then(res => {
          if (res.data.code !== '200') {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            this.fiveNewsList = res.data.data.rows
          }
        })
        // 获取代理商精选文章
        let types = ''
        // 逸盈科技NETFOS
        if (this.classify === 2 || this.classify === '2') {
          types = 4
        } else if (this.classify === 3 || this.classify === '3') {
          // 零壹科技ZERONE
          types = 3
        } else {
        // 創泓科技Uniforce
          types = 5
        }
        featuredArticlesWeb({ type: types, offset: 0, limit: 1 }, { headers: { token: this.token } }).then(res => {
          if (res.data.code !== '200') {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            this.articlesList = res.data.data.rows[0]
          }
        })
      } else if (this.dealers) {
        // 经销商最新消息列表
        getDealerNewsList({ offset: 0, limit: 3 }, { headers: { token: this.token } }).then(res => {
          if (res.data.code !== '200') {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            this.fiveNewsList = res.data.data.rows
          }
        })
        // 获取经销商精选文章
        featuredArticlesWeb({ type: 2, offset: 0, limit: 1 }, { headers: { token: this.token } }).then(res => {
          // console.log(res, 12)
          if (res.data.code !== '200') {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            this.articlesList = res.data.data.rows[0]
          }
        })
      } else if (this.f5 === '0' || this.f5 === 0) {
        // 获取f5最新消息
        // newsFiveNewsList({ offset: 0, limit: 3 }, { headers: { token: this.token } }).then(res => {
        //   if (res.data.code !== '200') {
        //     this.$message({
        //       message: res.data.msg,
        //       type: 'error'
        //     })
        //   } else {
        //     this.fiveNewsList = res.data.data.rows
        //   }
        // })
        // 获取f5最新消息
        getHomeNewsList({ offset: 0, limit: 3, type: 2 }, { headers: { token: this.token } }).then(res => {
          if (res.data.code !== '200') {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            this.fiveNewsList = res.data.data.rows
          }
        })
        // 获取f5精选文章
        featuredArticlesWeb({ type: 1, offset: 0, limit: 1 }, { headers: { token: this.token } }).then(res => {
          if (res.data.code !== '200') {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            this.articlesList = res.data.data.rows[0]
          }
        })
      } else {
        // 获取首页最新消息
        getHomeNewsList({ offset: 0, limit: 3, type: 2 }, { headers: { token: this.token } }).then(res => {
          if (res.data.code !== '200') {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            this.fiveNewsList = res.data.data.rows
          }
        })
        // 获取首页精选文章
        getHomePageWeb({ headers: { token: this.token } }).then(res => {
          if (res.data.code !== '200') {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            this.articlesList = res.data.data.articles
          }
        })
      }
    },
    getSystemGetArticleClass () {
      systemGetArticleClass({ headers: { token: this.token } }).then(res => {
        // console.log(res)
      })
    },
    goArticlesList () {
      if (this.classify) {
        this.newsId = this.classify
      } else if (this.dealers) {
        this.newsId = this.dealers
      } else if (this.f5 == 0) {
        this.newsId = this.f5
      } else {
        this.newsId = '6'
      }
      this.$router.push({ path: '/selectedArticlesList', query: { newsId: this.newsId } })
    },
    goArticlesDetails (id) {
      if(!id) {
        return false;
      }
      if (this.classify) {
        this.newsId = this.classify
      } else if (this.dealers) {
        this.newsId = this.dealers
      } else if (this.f5) {
        this.newsId = this.f5
      } else {
        this.newsId = '6'
      }
      this.$router.push({ path: '/articlesDetails', query: { name: this.newsId, article_id: id } })
    }
  }
}
</script>

<style lang='scss'>
@import './../../../assets/style/mixin.scss';
.push-information {
  .news-box {
    padding: 10rem 0 12rem 0;
    .container {
      >p {
        width: 12.2rem;
        height: 2.2rem;
        background: #F5F6F7;
        font-size:12px;
        font-weight:400;
        color:rgba(37,36,39,1);
        line-height:1.7rem;
        padding-left: 1rem;
        padding-top: .4rem;
        box-sizing: border-box;
      }
      .title {
        @include flex();
        margin-top: 1.3rem;
        h1 {
          font-size:3.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:5.4rem;
          cursor: pointer;
        }
        span {
          height:3.3rem;
          font-size:2.4rem;
          font-weight:400;
          color:rgba(0,106,255,1);
          line-height:3.3rem;
          cursor: pointer;
          i {
            margin-left: 1rem;
            font-size: 1.6rem;
          }
        }
      }
      .content {
        // @include flex();
        display: flex;
        margin-top: 3.8rem;
        .item {
          padding: 5.7rem 5rem 0 5rem;
          height:35.4rem;
          width:35.4rem;
          background:linear-gradient(135deg,rgba(59,59,59,1) 0%,rgba(37,36,39,1) 100%);
          box-shadow:0 2.5rem 6rem 0 rgba(245,246,247,1);
          border-radius:1.2rem;
          box-sizing: border-box;
          cursor: pointer;
          >span {
            @include bgImg(3.8rem,4.6rem,'./../../../assets/imgs/icon/books.png');
            margin-left: .8rem;
          }
          p {
            margin-top: 3rem;
            height:2.8rem;
            font-size:2rem;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height:2.8rem;
            text-overflow: ellipsis; // 显示省略号
            white-space: nowrap; // 对文本进行不换行
            overflow: hidden; //溢出隐藏
          }
          .line {
            width:6.4rem;
            height:.1rem;
            margin: 2.4rem 0 2.5rem 0;
            background:rgba(210,210,210,1);
          }
          .text {
            width:24.4rem;
            height:4.8rem;
            font-size:1.4rem;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:2.4rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .tiem {
            margin-top: 2.4rem;
            @include flex();
            &>span:first-of-type{
              height:1.4rem;
              font-size:1rem;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:1.4rem;
            }
            .radius{
              width: 1.4rem;
              @include flex();
              i {
                width: .4rem;
                height: .4rem;
                display: inline-block;
               background: rgba(255,255,255,1);
                border-radius: 50%;
              }
            }

          }
        }
        .item:nth-child(2),.item:nth-child(3) {
          margin-left: 1rem;
          background:rgba(255,255,255,1);
          box-shadow:0px 25px 20px 0px rgba(245,246,247,1);
          >span {
            @include bgImg(3.8rem,4.6rem,'./../../../assets/imgs/icon/books-2.png');
          }
          p {
            color:rgba(37,36,39,1);
          }
          .text {
            color:rgba(134,134,134,1);
          }
          .tiem {
            &>span:first-of-type{
              color:rgba(189,189,189,1);
            }
            .radius {
              i {
                background:rgba(236,236,236,1);
              }
            }
          }
        }
      }
    }
  }
  .article-box .container {
    >p {
      width: 15.2rem;
      height: 2.2rem;
      background: #FFFFFF;
      font-size:12px;
      font-weight:400;
      color:rgba(37,36,39,1);
      line-height:1.7rem;
      padding-left: 1rem;
      padding-top: .4rem;
      box-sizing: border-box;
    }
    .title {
      @include flex();
      margin-top: 1.3rem;
      h1 {
        font-size:3.6rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:5.4rem;
      }
      span {
        height:3.3rem;
        font-size:2.4rem;
        font-weight:400;
        color:rgba(0,106,255,1);
        line-height:3.3rem;
        cursor: pointer;
        i {
          margin-left: 1rem;
          font-size: 1.6rem;
        }
      }
    }
  }
  .article-box {
    padding: 10rem 0 12rem 0;
    background:rgba(245,246,247,1);
    .content {
      @include flex(space-between,flex-start);
      margin-top: 3.8rem;
      .img-left {
        width:52.4rem;
        height:35rem;
        background:rgba(255,255,255,1);
        border-radius:.6rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text-right {
        padding-left: 2.2rem;
        position: relative;
        width: 52.2rem;
        height: 35rem;
        box-sizing: border-box;
        .text-right_title {
          height:3.7rem;
          font-size:2.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:3.7rem;
          margin-bottom: 1.3rem;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .tip {
          @include flex();
          .item-left {
            display: flex;
            span {
              @include flex(center,center);
              width:90px;
              height:30px;
              background:rgba(255,255,255,1);
            }
            span:first-child{
              margin-right: 1rem;
            }
          }
          .item-right {
            height:1.7rem;
            font-size:1.2rem;
            font-weight:400;
            color:rgba(189,189,189,1);
            line-height:1.7rem;
          }
        }
        .text {
          width:522px;
          height: 20rem;
          font-size:1.8rem;
          font-weight:400;
          color:rgba(134,134,134,1);
          line-height:3.4rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 6;
          overflow: hidden;
        }
        .btn {
          @include flex(center);
          position: absolute;
          left: 2.2rem;
          bottom: 0;
          width:14.4rem;
          height:5rem;
          border-radius:.6rem;
          border:.1rem solid rgba(61,61,61,1);
          font-size:1.4rem;
          font-weight:400;
          color:rgba(37,36,39,1);
          cursor: pointer;
        }
      }
    }
  }
@media screen  and (max-width: 1199px) {
  .news-box .content {
    .item {
     margin-bottom: 2rem;
    }
  }
}
@media screen and (min-width:992px) and (max-width:1199px) {
  .news-box .container {
    .content {
      .item {
        width:30.4rem!important;
        height: 30.4rem!important;
        padding: 2.7rem 2rem 0 2rem!important;
      }
    }
  }
  .article-box {
    .content {
      height: 26.8rem;
      .img-left {
        width: 40rem;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text-right {
         height: 26.8rem;
         .btn {
            width:12.4rem;
            height:3.6rem;
         }
         .text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
         }
      }
    }
  }
}

@media screen and (max-width:991px) {
  .news-box {
     padding: 5rem 0 6rem 0!important;
    .container {
      .title {
        h1 {
          font-size:2.8rem!important;
          line-height:4rem!important;
        }
        span {
          font-size: 1.8rem!important;
        }
      }
      .content {
        flex-wrap: wrap;
        margin-top: 2rem!important;
        .item {
          width:35rem!important;
          height:34rem!important;
          padding: 2.7rem 2rem 0 2rem!important;
        }
      }
    }
  }
  .article-box {
     padding: 5rem 0 6rem 0!important;
     .title {
        h1 {
          font-size:2.8rem!important;
          line-height:4rem!important;
        }
        span {
          font-size: 1.8rem!important;
        }
      }
    .content {
      flex-direction: column;
      margin-top: 2rem!important;
      .text-right {
        margin-top: 2rem;
        width: 100%;
        height: 30rem;
        .text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .news-box {
     padding: 3rem 0 4rem 0!important;
     margin: 0 1.5rem;
    .container {
    .title {
      h1 {
        font-size:1.8rem!important;
        line-height:3rem!important;
      }
      span {
        font-size: 1.6rem!important;
      }
    }
    .content {
      flex-wrap: wrap;
      // margin: 2rem 1rem 0 1rem;
      .item {
        width:100vw!important;
        height:31rem!important;
        padding: 2.7rem 3rem 0 3rem!important;
        margin-left: 0 !important;
      }
    }
  }
  }
  .article-box {
    padding: 3rem 1.5rem 4rem 1.5rem!important;
    .container {
      .title {
        h1 {
          font-size:1.8rem!important;
          line-height:3rem!important;
        }
        span {
          font-size: 1.6rem!important;
        }
      }
      .content {
        .img-left {
          width: 100%!important;
          img {
            width: 100%!important;
          }
        }
        .text-right {
          .text-right_title {
            font-size:1.8rem!important;
          }
          .tip {
            margin-bottom: 1rem;
          }
          .text {
            height: 200px;
            width: 100%;
            font-size: 1.4rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            overflow: hidden;
          }
          .btn {
            width:12.4rem;
            height:3.6rem;
          }
        }
      }
    }
  }
}

}
</style>
