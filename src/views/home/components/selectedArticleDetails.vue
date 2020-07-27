<template>
  <div class="selected-article-details">
    <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3" v-if="!types">
          <el-breadcrumb-item v-if="pageTitle != '代理商專區'">
            <a @click="toRouter()">{{pageTitle}}</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="pageTitle == '代理商專區'">
            <a>{{pageTitle}}</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="pageTitle == '代理商專區'">
            <a @click="toRouter()">{{pageTitles}}</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a @click="toSelectedArticleClassifications()">文章分類</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a @click="toSelectedArticleClassification()">{{ titleName }}</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item :class="{'checked': true}">
            {{ articles.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb separator-class="icon-3" v-if="types">
          <el-breadcrumb-item>
            <a @click="toRouters()">我的文章</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a @click="toRouters()">{{class_name}}</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item :class="{'checked': true}">
            {{ articles.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <!-- <h1>Shape正式加入F5以捍衛每個應用程序免受欺詐和濫用<span>F5原廠</span></h1> -->
        <h1>{{articles.title}}</h1>
        <div class="user dmax-md-none">
          <div class="user-img">
            <div class="img">
              <img v-if="articles.upload_picture" :src="`${path}${articles.upload_picture}`" alt="">
              <img v-else src="./../../../assets/imgs/head-portrait.svg" alt="">
            </div>
            <span>發表人：{{articles.uploader}}</span>
          </div>
          <div class="tip">
            <!-- <i class="icon-6"></i>查看234235 -->
          </div>
          <div class="time">創建於：{{articles.created_at}}</div>
        </div>
        <!-- phone -->
        <div class="time d-md-none">創建於：{{articles.created_at}}</div>
        <div class="user d-md-none">
          <div class="user-img">
            <div class="img">
              <img v-if="articles.upload_picture" :src="`${path}${articles.upload_picture}`" alt="">
              <img v-else src="./../../../assets/imgs/head-portrait.svg" alt="">
            </div>
            <span>發表人：{{articles.uploader}}</span>
          </div>
          <div class="tip">
            <!-- <i class="icon-6"></i>查看234235 -->
          </div>
        </div>
        <!-- oo -->
        <div class="img-box">
          <div v-for="(item, index) in articles.imgs" :key="index">
            <img :src="`${path}${item}`" alt="">
          </div>
        </div>
        <div class="text" v-html="articles.content"></div>
        <div class="btn">
          <div class="item" @click="prevNext(1)"><i class="icon-5"></i>上一篇文章</div>
          <div class="item item-2" @click="prevNext(2)">下一篇文章<i class="icon-3"></i></div>
        </div>
      </div>
    </div>
     <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>

import { getFeaturedArticlesRead, getFlipOverArticle, systemGetArticleClass } from './../../../api/request'
export default {
  data () {
    return {
      types: this.$route.query.types,
      name: this.$route.query.name,
      article_id: this.$route.query.article_id,
      titleName: this.$route.query.titleName,
      pageTitle: this.$route.query.pageTitle,
      pageTitles: this.$route.query.pageTitles,
      type: this.$route.query.type,
      classify: this.$route.query.classify,
      token: window.sessionStorage.getItem('token'),
      isShowLoading: true,
      class_id: this.$route.query.class_id,
      path: this.imgs,
      class_name: "",
      articles: {}
    }
  },
  mounted () {
    this._getFeaturedArticlesRead()
    this._systemGetArticleClass()
  },
  methods: {
    // 返回文章列表
    toSelectedArticleClassifications() {
      this.$router.push({ path: '/selectedArticleClassifications', query: {
          type: this.type,
          classify: this.classify
        }
      })
    },
    // 跳转到分类列表
    toSelectedArticleClassification() {
      this.$router.push({ path: '/selectedArticleClassification', query: {
        title: this.titleName,
        type: this.type,
        class_id: this.class_id,
        classify: this.classify
      } })
    },
    // 獲取文章分類
    _systemGetArticleClass () {
      systemGetArticleClass({ headers: { token: this.token } }).then(res => {
        // console.log(res)
        if (res.data.code !== '200') {
          this.$message.error({
            message: '獲取數據失敗！'
          })
        } else {
          for (let i = 0; i < res.data.data.rows.length; i++) {
            if(res.data.data.rows[i].id == this.$route.query.class_id) {
              this.class_name = res.data.data.rows[i].class_name
            }
          }
        }
      })
    },
    toRouters() {
      this.$router.push({ path: '/myPublishedArticles' })
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
    _getFeaturedArticlesRead () {
      getFeaturedArticlesRead({ article_id: this.article_id }, { headers: { token: this.token } }).then(res => {
        this.isShowLoading = false
        if (res.data.code !== '200') {
          this.$message.error('獲取數據失敗!')
        } else {
          this.articles = res.data.data
        }
      })
    },
    // 上/下
    prevNext (type) {
      this.isShowLoading = true
      let msg = ''
      if (type === 1) {
        msg = '無上一篇文章'
      } else {
        msg = '無下一篇文章'
      }
      getFlipOverArticle({ flip_type: type, now_id: this.article_id }, { headers: { token: this.token } }).then(res => {
        this.isShowLoading = false
        if (res.data.code !== '200') {
          this.$message.error({
            message: '獲取數據失敗！',
            duration: 3000
          })
        } else if (res.data.data === undefined || res.data.data.length <= 0) {
          this.$message.warning({
            message: msg,
            duration: 3000
          })
        } else {
          this.articles = res.data.data
          this.article_id = res.data.data.id
          const path = this.$router.history.current.path
          this.$router.push({ path, query: { name: this.name, article_id: res.data.data.id } })
          this._getFeaturedArticlesRead(this.name, res.data.data.id)
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import './../../../assets/style/mixin.scss';
.selected-article-details {
  .content {
    padding: 10rem 0;
      h1 {
        // @include flex(flex-start);
        font-size:2.8rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:4rem;
        span {
          padding: .5rem 2.3rem;
          margin-left: 1.4rem;
          font-size:1.4rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          vertical-align:top;
          background:rgba(0,106,255,1);
        }
      }
    .user {
      margin-top: 1.2rem;
      margin-bottom: 5.5rem;
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
      .time {
        margin-left: 4rem;
        font-size:1.4rem;
        font-weight:400;
        color:rgba(189,189,189,1);
        line-height:2rem;
      }
    }
    .img-box {
      width: 100%;
      border-radius: 1rem;
      overflow: hidden;
      margin-bottom: 4rem;
      img {
        width: 100%;
      }
    }
    .text {
      p,span {
        font-size:1.9rem;
        font-weight:400;
        color:rgba(37,36,39,1);
        line-height:4rem;
      }
      p {
        margin-bottom: 4rem;
      }
      span {
        display: block;
      }
      span:last-of-type {
        margin-bottom: 4rem;
      }
    }
    .btn {
      @include flex(center);
      margin-top: 6rem;
      .item {
        @include flex(center);
        width:17.4rem;
        height:5rem;
        border-radius:.6rem;
        border:.1rem solid rgba(61,61,61,1);
        font-size:1.4rem;
        font-weight:400;
        color:rgba(37,36,39,1);
        line-height:2rem;
        box-sizing: border-box;
        .icon-5 {
          margin-right: .5rem;
        }
      }
      .item-2 {
        margin-left: 2rem;
        color:rgba(255,255,255,1);
        background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
        .icon-3 {
          margin-left: .5rem;
        }
      }
    }
  }
  @media screen and (max-width:991px) {
    .content {
      h1 {
        line-height: 5rem;
        span {
          // margin-left: 0rem;
          margin-top: 2rem;
        }
      }
    }
  }
  @media screen and (max-width:767px) {
    .content {
      padding: 3rem 1.5rem;
      h1 {
        font-size:2rem;
        line-height:3rem;
        span {
          padding: .3rem 1.6rem;
          margin-left: 1rem;
          font-size:1.2rem;
          font-weight:400;
          vertical-align: middle;
        }
      }
      .time {
        margin-top: 1rem;
        font-size:1.2rem;
        font-weight:400;
        color:rgba(189,189,189,1);
        line-height:1.8rem;
      }
      .user {
        margin-top: 2rem;
        margin-bottom: 2.5rem;
        .user-img {
          span {
            font-size:1.2rem;
            line-height:1.8rem;
          }
        }
        .tip {
          margin-left: 2.5rem;
          font-size:1.2rem;
          line-height:2rem;
          i {
            margin-right: .4rem;
          }
        }
      }
      .img-box {
        margin-bottom: 2rem;
      }
      .text {
        p,span {
          font-size:1.4rem;
          font-weight:400;
          color:rgba(37,36,39,1);
          line-height:3rem;
        }
        p {
          margin-bottom: 2rem;
        }
        span:last-of-type {
          margin-bottom: 2rem;
        }
      }
    }
  }
  @media screen and (min-width: 570px) and (max-width: 767px){
    .content {
      h1 {
        span {
          margin-left: 2rem;
           padding: .5rem 3rem;
        }
      }
    }
  }
}
</style>
