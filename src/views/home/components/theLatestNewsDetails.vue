<template>
  <div class="the-latest-news-details">
    <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3">
          <el-breadcrumb-item><a href="javascript:;" @click="goNext(1)">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;" @click="goNext(2)">最新消息</a></el-breadcrumb-item>
          <el-breadcrumb-item :class="{'checked': true}">{{newsRead.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <h1>{{newsRead.title}}</h1>
        <div class="user dmax-md-none">
          <div class="user-img">
            <div class="img">
              <img src="./../../../assets/imgs/safety-user.png" alt="">
            </div>
            <span>發表人：郭子君</span>
          </div>
          <div class="tip">
            <i class="icon-6"></i>查看234235
          </div>
          <div class="time">創建於 {{newsRead.created_at |dateFormat}}</div>
        </div>
        <!-- phone -->
        <div class="time d-md-none">創建於 {{newsRead.created_at | dateFormat}}</div>
        <div class="user d-md-none">
          <div class="user-img">
            <div class="img">
              <img src="./../../../assets/imgs/safety-user.png" alt="">
            </div>
            <span>發表人：郭子君</span>
          </div>
          <div class="tip">
            <i class="icon-6"></i>查看234235
          </div>
        </div>
        <!-- oo -->
        <div class="text">
          {{newsRead.content}}
          <!-- <p>在線應用程序今天運行世界。應用程序推動了我們的互動方式，學習方式和增長方式，數據的存放位置以及品牌，客戶和合作夥伴之間的價值交換方式。在許多方面，應用程序已成為我們的經濟，我們的政府和我們的日常生活的基礎。因此，從網絡犯罪分子的角度來看，應用程序代表著世界上最賺錢的目標，這並不奇怪，估計到2023年，在線欺詐損失每年將超過480億美元。</p>
          <p>F5和Shape正在聯手改變我們保護全球應用程序的方式。我們對此主題有獨特的見解：我們認為服務，交付和啟用應用程序的平台最適合防禦這些應用程序，尤其是隨著攻擊者軍備競賽的不斷升級。作為NGINX和Shape的母公司，F5定位為成為世界上最重要的應用程序支持者，並且最適合增強和增強全球組織的應用程序安全性。 </p>
          <p>我們對應用程序安全性轉型的願景是什麼樣的？簡單來說：</p>
          <span>·提供安全成果，而不僅僅是提供更多工具</span>
          <span>·可靠的可靠AI引擎提供有效，準確的防禦</span>
          <span>·支持客戶的現實世界異構應用程序，包括混合雲，任何云乃至多雲環境</span>
          <p>F5和NGINX在所有類型的環境中為全球一半以上的應用程序提供支持。Shape的AI驅動平台每天可緩解超過十億次應用攻擊。當您將這些力量結合在一起時，您將在一面旗幟下擁有全方位的應用程序交付和安全功能，並擁有貫穿整個代碼對客戶價值鏈的一流技術。我們相信，使F5 + NGINX + Shape成為提供應用程序交付，支持和安全性的終極公司，並且對每個組織都是必不可少的。</p>
          <p>公共雲是我們戰略的重要組成部分。世界上一些領先的銀行，航空公司，零售商以及其他一些公司已經依靠F5 + NGINX + Shape交付和保護在公共雲環境中運行的應用程序。公共雲是現代應用程序開發的支柱之一，它提供了諸如計算資源，內容交付，數據存儲和其他必需服務之類的功能，這些功能以前需要來自不同供應商的解決方案。F5的代碼對客戶解決方案集（包括NGINX和Shape）對公共雲進行了補充，並支持混合雲和多雲應用方案。因此，開發人員可以將F5當作強大的抽象層，而無論他們的應用程序現在或將來位於何處。 </p> -->
        </div>
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
import { getHomeNewsRead, newsFiveNewsRead, getAgentNewsRead, getDealerNewsRead, getFlipOver } from './../../../api/request'
export default {
  data () {
    return {
      isShowLoading: true,
      name: this.$route.query.name,
      news_id: this.$route.query.news_id,
      token: window.sessionStorage.getItem('token'),
      newsRead: {},
      area: '',
      inject: ['reload']
    }
  },
  mounted () {
    this._newsFiveNewsRead(this.$route.query.name, this.$route.query.news_id)
  },
  watch: {
    $route () {
      // this.news_id = this.$route.query.news_id
      // console.log(this.news_id)
    }
  },

  methods: {
    goNext (type) {
      if (type === 1) {
        if (this.name === 6 || this.name === '6') {
          this.$router.push({ path: '/pushInformation' })
        } else if (this.name === 0 || this.name === '0') {
          this.$router.push({ path: '/pushInformation', query: { f5: this.name } })
        } else if (this.name === 3 || this.name === '3' || this.name === 2 || this.name === '2') {
          this.$router.push({ path: '/pushInformation', query: { agencyId: this.name } })
        } else if (this.name === 4 || this.name === '4') {
          this.$router.push({ path: '/pushInformation', query: { dealers: this.name } })
        }
      } else {
        this.$router.push({ path: '/theLatestNews', query: { agencyId: this.name } })
      }
    },
    _newsFiveNewsRead (name, id) {
      if (this.name === '6' || this.name === 6) {
        getHomeNewsRead({ news_id: id }, { headers: { token: this.token } }).then(res => {
          // console.log(res, '6')
          if (res.data.code !== '200') {
            this.$message.error({
              message: '獲取數據失敗！'
            })
          } else {
            this.newsRead = res.data.data
          }
          this.isShowLoading = false
        })
      } else if (this.name === '0' || this.name === 0) {
        // f5
        newsFiveNewsRead({ news_id: id }, { headers: { token: this.token } }).then(res => {
          console.log(res, '0')
          if (res.data.code !== '200') {
            this.$message.error({
              message: '獲取數據失敗！'
            })
          } else {
            this.newsRead = res.data.data
            this.isShowLoading = false
          }
        })
      } else if (this.name === '3' || this.name === 3 || this.name === 2 || this.name === '2') {
        // 代理
        getAgentNewsRead({ classify: this.name, news_id: this.news_id }, { headers: { token: this.token } }).then(res => {
          console.log(res, this.name)
          if (res.data.code !== '200') {
            this.$message.error({
              message: '獲取數據失敗！'
            })
          } else {
            this.newsRead = res.data.data
            this.isShowLoading = false
          }
        })
      } else if (this.name === '4' || this.name === 4) {
        // 經銷商
        getDealerNewsRead({ news_id: this.news_id }, { headers: { token: this.token } }).then(res => {
          console.log(res, this.name)
          if (res.data.code !== '200') {
            this.$message.error({
              message: '獲取數據失敗！'
            })
          } else {
            this.newsRead = res.data.data
            this.isShowLoading = false
          }
        })
      }
    },
    // 上/下
    prevNext (Type) {
      // console.log(Type)
      this.isShowLoading = true
      if (this.name === '6' || this.name === 6) {
      //  首頁
        this.area = 1
      } else if (this.name === '0' || this.name === 0) {
        // f5
        this.area = 2
      } else if (this.name === 2 || this.name === '2') {

      } else if (this.name === '3' || this.name === 3) {
        // 代理

      } else if (this.name === '4' || this.name === 4) {
        // 經銷商

      }
      let msg = ''
      if (Type === 1) {
        msg = '已到第一頁，再跳到火星了~'
      } else {
        msg = '我是有底線的人~'
      }
      getFlipOver({ flip_type: Type, area: this.area, now_id: this.news_id }, { headers: { token: this.token } }).then(res => {
        if (res.data.code !== '200') {
          this.$message.error({
            message: '獲取數據失敗！',
            duration: 3000
          })
        } else if (res.data.data === undefined || res.data.data.length <= 0) {
          this.isShowLoading = false
          this.$message.warning({
            message: msg,
            duration: 3000
          })
          // return false
        } else {
          this.isShowLoading = false

          this.newsRead = res.data.data
          this.news_id = res.data.data.id
          // this.reload()
          const path = this.$router.history.current.path
          console.log(path)
          this.$router.push({ path, query: { name: this.name, news_id: res.data.data.id } })
          this._newsFiveNewsRead(this.name, res.data.data.id)
          // console.log('66')
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import './../../../assets/style/mixin.scss';
.the-latest-news-details {
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
      color:rgba(37,36,39,1)!important;
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
        width: 16rem;
        color: #006AFF !important;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
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
    padding: 10rem 0;
    h1 {
      font-size:2.8rem;
      font-weight:600;
      color:rgba(37,36,39,1);
      line-height:4rem;
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
        cursor: pointer;
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
  @media screen and (max-width:767px) {
    .content {
      padding: 3rem 1.5rem;
      h1 {
        font-size:2rem;
        line-height:3rem;
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
}
</style>
