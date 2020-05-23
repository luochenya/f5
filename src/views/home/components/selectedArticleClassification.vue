<template>
  <div class="selected-article-classification">
    <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3">
          <el-breadcrumb-item><a href="javascript:;" @click="$router.push('/')">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item>精選文章分類</el-breadcrumb-item>
          <el-breadcrumb-item :class="{'checked': $route.meta.title}">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="title">
          <h1>應用安全·精選文章</h1>
          <p>LATEST NEWS</p>
        </div>
        <div class="main dmax-md-none">
          <div class="main-item" v-for="(item,index) in newsList" :key="index" @click="$router.push({path:`/selectedArticleDetails/${index}`})">
            <div class="item-img">
              <img src="./../../../assets/imgs/latestnews-1.png" alt="">
            </div>
            <div class="item-text">
              <div class="name">
                <h1>{{item.name}}</h1>
                <span>創建於 3月10日  18:32</span>
              </div>
              <div class="text">{{item.text}}</div>
              <div class="user">
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
            </div>

          </div>
        </div>
        <!-- phone -->
        <div class="main d-md-none">
          <div class="main-item" v-for="(item,index) in newsList" :key="index" @click="$router.push({path:`/selectedArticleDetails/${index}`})">
            <div class="item-text">
              <div class="name">
                <h1>{{item.name}}</h1>
                <span>創建於 3月10日  18:32</span>
              </div>
              <div class="img-text">
                <div class="item-img">
                  <img src="./../../../assets/imgs/latestnews-1.png" alt="">
                </div>
                <div class="text">{{item.text}}</div>
              </div>
              <div class="user">
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
            </div>

          </div>
        </div>
        <!-- oo -->
      </div>
    </div>
    <pagination></pagination>
  </div>
</template>

<script>
import Pagination from './../../../components/Pagination'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      newsList: [
        {
          img: './../../../assets/imgs/latestnews-1.png',
          name: 'Shape正式加入F5以捍衛每個應用程序免受欺詐和濫用',
          text: '在線應用程序今天運行世界。應用程序推動了我們的互動方式，學習方式和增長方式，數據的存放位置以及品牌。'

        }, {
          img: './../../../assets/imgs/latestnews-1.png',
          name: '從解決方案到堆棧：組裝時代',
          text: 'IT的這種組件化就像負責安全和交付的應用程序的組件化一樣。據估計，現代應用程序中有80％到90％由第三方組件組成，其中大多數是開源的。這樣做的好處包括速度。'

        }, {
          img: './../../../assets/imgs/latestnews-1.png',
          name: '“應用程序服務狀態”告訴我們有關組織準備情況的信息',
          text: '隨著組織迅速動員全球團隊在家中工作，他們正在考慮其企業應用程序的性能，可用性和安全性。在與全球客戶和合作夥伴的最近對話中，我們有趣地看到。'

        }, {
          img: './../../../assets/imgs/latestnews-1.png',
          name: '在COVID-19的潮流中吸引全球團隊和社區的參與',
          text: '隨著COVID-19繼續在全球範圍內發揮影響，F5的首席人力資源官Ana White和首席營銷。'

        }, {
          img: './../../../assets/imgs/latestnews-1.png',
          name: '用F5的Essential App Protect填補Web應用程序安全漏洞',
          text: 'Essential App Protect可以為Web應用程序（無論部署在何處）提供簡單，快速和可擴展的基於雲的安全性，從而消除了保護應用程序的複雜性和猜測。可以在幾分鐘內激活該服務，從而為應用程序提供開箱即用的保護。'

        }
      ]
    }
  },
  mounted () {

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
