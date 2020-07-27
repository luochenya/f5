<template>
  <div class="classify-safety">
    <div class="safety">
      <div class="item" v-for="(item,index) in list" :key="index" @click="toSelectedArticleDetails(item.id)">
        <img :src="`${imgs}${item.imgs}`" alt="" class="imgs">
        <div class="content">
          <h2>{{item.title}}</h2>
          <div class="tiem">
            <span v-if="item.isF"></span><p>創建於 {{item.created_at}}</p>
          </div>
          <div class="text" v-html="item.content"></div>
          <div class="user">
            <div class="img">
              <img v-if="item.uploader_img" :src="`${imgs}${item.uploader_img}`" alt="">
              <img v-else-if="item.user_head" :src="`${imgs}${item.user_head}`" alt="">
              <img src="./../../../assets/imgs/head-portrait.svg" alt="">
            </div>
            <span v-if="item.uploader">發表人：{{ item.uploader }}</span>
            <span v-else>發表人：{{ item.nick_name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classify-safety',
  props: {
    list: {
      type: Array
    },
    name: String,
    class_id: String
  },
  data () {
    return {
      imgs: this.imgs,
      safetyList: [
        {
          img: './../../../assets/imgs/safety-1.png',
          title: '為什麼必須要保護應用程序？',
          isF: true,
          tiem: '3月10日 18:32',
          text: 'ssential App Protect在不牺牲速度和敏捷性的情况下，将您作为Web服务使…',
          name: '郭子君'
        }, {
          img: './../../../assets/imgs/safety-2.png',
          title: 'DNS負載平衡器雲服務',
          isF: false,
          tiem: '3月10日 18:32',
          text: '簡單，智能的F5 DNS負載均衡器雲服務可確保高可用性和應用程序性能...',
          name: '郭子君'
        }, {
          img: './../../../assets/imgs/safety-3.png',
          title: '為什麼F5 DNS雲服務？',
          isF: false,
          tiem: '3月10日 18:32',
          text: 'F5的響應式和安全的DNS雲服務可確保簡單，智能的F5 DNS負載均衡器雲服務可確保高可用性和應用程序性能...',
          name: '郭子君'
        }

      ],
      pageTitle: "",
      pageTitles: "",
      type: "",
      classify: ""
    }
  },
  mounted() {
    if (this.$route.query.f5 == "0") {
      this.pageTitle = "F5專區"
      this.type = 1
    } else if (this.$route.query.agencyId == "2") {
      this.type = 3
      this.classify = 2
      this.pageTitle = "代理商專區"
      this.pageTitles = "逸盈科技NETFOS"
    } else if (this.$route.query.agencyId == "3") {
      this.type = 3
      this.classify = 3
      this.pageTitle = "代理商專區"
      this.pageTitles = "零壹科技ZERONE"
    } else if (this.$route.query.agencyId == "22") {
      this.type = 3
      this.classify = 1
      this.pageTitle = "代理商專區"
      this.pageTitles = "創泓科技Uniforce"
    } else if (this.$route.query.dealers == "4") {
      this.type = 2
      this.pageTitle = "經銷商專區"
    } else {
      this.type = 0
      this.pageTitle = "首頁"
    }
  },
  methods: {
    toSelectedArticleDetails (id) {
      this.$router.push({ path: '/selectedArticleDetails', query: { 
        article_id: id,
        titleName: this.name,
        pageTitle: this.pageTitle,
        pageTitles: this.pageTitles,
        type: this.type,
        classify: this.classify,
        class_id: this.class_id
      } }) 
    }
  }
}
</script>

<style  lang='scss'>
@import './../../../assets/style/mixin.scss';
.classify-safety {
  .safety {
    @include flex(flex-start,center);
    position: relative;
    padding-bottom: 4rem;
    box-sizing: border-box;
    .item {
      width:35.4rem;
      height: 54.6rem;
      margin-top: 4.4rem;
      background:rgba(255,255,255,1);
      box-shadow:0 2.5rem 6rem 0 rgba(245,246,247,1);
      border-radius:1.2rem;
      overflow: hidden;
      box-sizing: border-box;
      cursor: pointer;
      .imgs {
        width:100%;
        height: 25rem;
      }
      .content {
        padding: 3rem;
        h2 {
          height:3rem;
          font-size:2.2rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:3rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .tiem {
          @include flex(flex-start,center);
          margin-top: .9rem;
          // span {
          //   @include bgImg(5.3rem,1.6rem,'./../../../assets/imgs/icon/icon-f5.png');
          //   margin-right: .8rem;
          // }
          p {
            font-size:1rem;
            font-weight:400;
            color:rgba(189,189,189,1);
            line-height:1.4rem;
          }
        }
        .text {
          margin-top: 2rem;
          font-size:1.5rem;
          font-weight:400;
          color:rgba(134,134,134,1);
          line-height:2.6rem;
          height: 8rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .user {
          @include flex(flex-start);
          position: absolute;
          bottom: 8.4rem;
          .img {
            width: 4.4rem;
            height: 4.4rem;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 1.2rem;
            img {
              width: 100%;
              height: 100%;
            }

          }
          span {
            font-size:1.3rem;
            font-weight:400;
            color:rgba(134,134,134,1);
            line-height:2.6rem;
          }
        }
      }
    }
   .item:nth-child(2) {
     margin-left: 3.1rem;
     margin-right: 3.1rem;
    }
  }
  @media screen and (max-width: 1199px) {
    .safety {
      .item {
        height: 50rem;
        flex: 1;
        margin-right: 2rem;
        margin-top: 3.4rem;
        background:rgba(255,255,255,1);
        .imgs {
          width:100%;
        }
        .content {
          padding: 2rem;
          h2 {
            font-size:2rem;
          }
          .text {
            margin-top: 1.6rem;
            font-size:1.4rem;
            line-height:2.2rem;
          }
          .user {
            bottom: 6.4rem;
          }
        }
      }
      .item:last-child {
        margin-right: 0;
      }
    }

  }
  @media screen and (max-width: 991px) {
    .safety {
      width: 100%;
      @include flex();
      flex-wrap: wrap;
      .item {
        position: relative;
        width: 50%;
        flex: 0 0 48.5%;
        margin-right: 0rem;
        margin-top: 2rem;

        background:rgba(255,255,255,1);
        .content {
          .user {
            bottom: 2.4rem;
          }
        }
      }
      .item:nth-of-type(2n) {
        margin-right: 0;
      }
    }

  }
  @media screen and (max-width: 767px) {
    .safety {
      width: 100%;
      @include flex();
      flex-direction: column;
      .item {
        position: relative;
        width: 98%;
        //  height: 66rem;
        // flex: 0 0 90%;
        margin-right: 0rem;
        margin-top: 2rem;
        background:rgba(255,255,255,1);
        .content {
          .user {
            height: 8rem;
            position: relative;
            bottom: -1rem;
          }
        }
      }
    }

  }
}
 @media screen and (max-width: 767px) {
   .safety {
     display: block;
     .item {
       width: 100%;
       margin-left: 0 !important;
     }
   }
 }
</style>
