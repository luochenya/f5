<template>
  <div class="PointsDetails">
     <div class="container">
      <div class="centent">
        <div class="item-left">
          <div class="user" v-if="userInfo">
            <div class="img-box">
              <img v-if="userInfo &&userInfo.user_head" :src="`${path}${userInfo&& userInfo.user_head}`" alt="">
              <img v-else src="../../assets/imgs/head-portrait.svg" alt="">

            </div>
            <h3>{{userInfo.nick_name}}</h3>
            <!-- <p>創業我一直努力在努力</p> -->
            <div class="btn"><span></span>身份：{{userInfo.identity}}</div>
            <div class="card">
              <div class="card-l">
                <p>目前累計點數</p>
                <span>{{ userInfo.point }}</span>
              </div>
              <div class="card-l card-m">
                <p>目前發文總數</p>
                <span>{{ userInfo.my_article_count }}</span>
              </div>
            </div>
          </div>
          <div class="bottom-msg">
            <span @click="$router.push({path:'/memberCenter'})">會員資料修改</span>
            <div></div>
            <span @click="$router.push({path:'/myPublishedArticles'})">我發表的文章</span>
            <div></div>
            <span @click="$router.push({path:'/PointsApplication'})" class="bottom-msg-active">點數申請<i class="icon-9"></i></span>
            <div></div>
            <span @click="$router.push({path:'/PointsRecord'})">點數記錄</span>
            <div></div>
            <span @click="$router.push({path:'/MallOrder'})">商城訂單查詢</span>
            <div></div>
            <span @click="$router.push({path:'/notificationCenter'})">通知中心</span>
          </div>
        </div>
        <div class="item-r">
          <h1>{{dataFormList.title}} <em>{{dataFormList.class_name}}</em></h1>
          <h2>申請時間：{{dataFormList.created_at}}</h2>
          <h3>{{dataFormList.content}}</h3>
          <h4><i></i>佐證文件</h4>
          <div class="title_file_img_box">
            <div class="title_file_img" v-for="(item, index) in dataFormList.evidence" :key="index">
              <!-- <img class="title_file_img_img" :src="path + item" alt="" /> -->
              
              <a v-if="imgTypes[index] == 0" target="_blank" :href="path + item" class="title_file_img_img">
                <img :src="path + item" alt="" />
              </a>
              <a v-if="imgTypes[index] == 1" :href="path + item" class="title_file_img_imgs">
                <img src="../../assets/imgs/wordImg.png" alt="" />
              </a>
            </div>
          </div>
          <h4><i></i>審核說明</h4>
          <h5>{{dataFormList.explain}}</h5>
        </div>
      </div>
    </div>
    <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import storage from '@/storage'
import { getPointApplyRead } from '@/api/request'
export default {
  name: 'PointsDetails',
  data () {
    return {
      isShowLoading: false,
      userInfo: storage.getItem('userInfo'),
      token: window.sessionStorage.getItem('token'),
      path: this.imgs,
      dataFormList: [],
      imgTypes: []
    }
  },
  created() {
    this._getPointApplyRead()
  },
  methods: {
    // 獲取分類列表
    _getPointApplyRead () {
      let form = {
        id: this.$route.query.id
      }
      this.isShowLoading = true
      getPointApplyRead(form, { headers: { token: this.token } }).then(res => {
        this.isShowLoading = false
        if (res.data.code !== '200') {
          this.$message.error(res.data.msg)
        } else {
          this.dataFormList = res.data.data.rows
          this.dataFormList.evidence.forEach((item, index) => {
            const isJPG = 'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp'
            const name = item.split('.')
            const imgName = name[name.length - 1]
            if (isJPG.indexOf(imgName.toLowerCase()) === -1) {
              this.imgTypes.push(1)
            } else {
              this.imgTypes.push(0)
            }
          });
          // this.dataFormList.evidence = JSON.parse(res.data.data.rows.evidence)
        }
      })
    },
  }
}
</script>

<style lang='scss'>
@import '@/assets/style/mixin.scss';
.PointsDetails {
  margin-top: 8rem;
  background:rgba(245,246,247,1);
  .centent {
    padding-top: 4rem;
    padding-bottom: 4rem;
    @include flex(space-between,flex-start);
    .item-left {
      width: 28rem;
      flex: 0 0 28rem;
      margin-right: 3rem;
      .user {
        @include flex(center);
        flex-direction: column;
        padding: 3rem 1.9rem 4rem;
        background:rgba(255,255,255,1);
        border-radius:.6rem;
        .img-box {
          width: 10rem;
          height: 10rem;
          margin-bottom: 1rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        h3 {
          font-size:1.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
        }
        p {
          margin-top: .1rem;
          font-size:1.3rem;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:1.8rem;
        }
        .btn {
          @include flex(center);
          // width:10rem;
          padding: 0 1.4rem;
          height:2.4rem;
          margin-top: .6rem;
          background:rgba(0,106,255,1);
          border-radius:1.4rem;
          font-size:1.1rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:1.6rem;
          span {
            @include bgImg(1.2rem,1.2rem,'../../assets/imgs/icon/icon-center.png');
            margin-right: .6rem;
          }
        }
        .card {
          width: 100%;
          @include flex();
          margin-top: 3rem;
          .card-l {
            flex: 1;
            text-align: center;
            padding: 1rem 0 .9rem 0;
            background:rgba(255,255,255,1);
            box-shadow:0 1.2rem 4rem 0 rgba(245,246,247,1);
            border-radius:.8rem;
            p {
              font-size:1.2rem;
              font-weight:500;
              color:rgba(189,189,189,1);
              line-height:1.7rem;
            }
            span {
              margin-top: .2rem;
              font-size:1.6rem;
              font-weight:500;
              color:rgba(37,36,39,1);
              line-height:2.2rem;
            }
          }
          .card-m {
            margin-left: 1.4rem;
          }
        }
      }
      .bottom-msg {
        margin-top: 1rem;
        text-align: center;
        padding: 0 1.9rem 0;
        background:rgba(255,255,255,1);
        border-radius:.6rem;
        span {
          padding: 1.9rem 0 1.9rem;
          display: inline-block;
          font-size:1.6rem;
          font-weight:400;
          color:rgba(134,134,134,1);
          cursor: pointer;
          line-height:2.2rem;
        }
        .bottom-msg-active {
          position: relative;
          color:rgba(37,36,39,1);
          .icon-9 {
            position: absolute;
            line-height:2.2rem;
            right: -2.5rem;
          }
        }
        div {
          height:.1rem;
          background:rgba(240,240,240,1);
        }
      }
    }
    .item-r {
      flex: 1;
      padding: 4rem;
      background:rgba(255,255,255,1);
      border-radius:.6rem;
      margin-bottom: 10rem;
      h1 {
        font-size:2rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:2.5rem;
        em {
          margin-left: 1rem;
          display: inline-block;
          background:rgba(0,106,255,1);
          padding: 4px 7px;
          font-size:0.6rem;
          color:rgba(255,255,255,1);
          line-height:1rem;
        }
      }
      h2 {
        margin-top: 0.5rem;
        font-size:1rem;
        color:rgba(189,189,189,1);
        line-height:1.5rem;
      }
      h3 {
        margin-top: 2rem;
        font-size:1.2rem;
        color:rgba(134,134,134,1);
        line-height:2.2rem;
      }
      h4 {
        margin-top: 4rem;
        display: flex;
        align-items: center;
        font-size:14px;
        font-weight:bold;
        color:rgba(37,36,39,1);
        line-height:2rem;
        i {
          display: inline-block;
          width: 4px;
          height: 4px;
          background:rgba(0,106,255,1);
          border-radius: 50%;
          margin-right: 0.7rem;
        }
      }
      .title_file_img_box {
        display: flex;
        flex-wrap: wrap;
      }
      .title_file_img {
        margin-top: 2rem;
        margin-right: 3rem;
        width: 7rem;
        height: 7rem;
        .title_file_img_img {
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title_file_img_imgs {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background:rgba(245,246,247,1);
          border-radius:4px;
          img {
            width: 4.4rem;
            height: 4.8rem;
          }
        }
      }
      h5 {
        margin-top: 1rem;
        font-size:1.2rem;
        color:rgba(134,134,134,1);
        line-height:2.2rem;
      }
    }
  }
  @media screen and (max-width: 1199px) {
    .centent {
      .item-left {
        margin-right: 2rem;
      }
      .item-r {
        padding: 3rem 2.5rem 0;
      }
    }
  }
  @media screen and (max-width: 991px) {
    .centent {
      overflow-x: auto;
    }
  }
  @media screen and (max-width: 767px) {
     padding-bottom: 3rem;
    .centent {
      padding:1.5rem;
      flex-wrap: wrap;
      width: 100%;
      .item-r {
        overflow-x: auto;
      }
     .item-left {
        width: 100%;
        flex: 0 0 100%;
        margin-right: 0rem;
        margin-bottom: 1rem;
      }
    }
  }

}
</style>
