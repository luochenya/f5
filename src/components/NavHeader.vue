<template>
  <div class="nav-header">
    <div class="nav-topbar">
      <div class="container">
        <div class="header-logo">
          <a href="javascript:;" @click="gotoIndex('5')"></a>
        </div>
        <div class="topbar-menu d-none d-lg-block">
          <ul>
            <li><a href="javascrpt:;" @click="gotoIndex('4')">F5專區</a></li>
            <li class="menu-item">
              <a href="javascrpt:;">代理商專區<i class="item-icon icon-4"></i></a>
              <ul>
                <!-- <li><a href="javascript:;" @click="$router.push({path:'/pushInformation', query: {agencyId:1}})">零壹科技ZERONE</a></li> -->
                <li><a href="javascript:;" @click="gotoIndex('1')">零壹科技ZERONE</a></li>
                <li><a href="javascript:;" @click="gotoIndex('2')">逸盈科技NETFOS</a></li>
                <!-- <li><a href="/#/index">C代理商</a></li> -->
              </ul>
            </li>
            <li><a href="javascript:;" @click="gotoIndex('3')">經銷商專區</a></li>
            <li  v-show="!$route.meta.showNavBar"><a href="javascrpt:;" @click="gotoDownloads">下載專區</a></li>
            <li><a href="javascrpt:;">點數商城</a></li>
          </ul>
        </div>
        <div class="classification d-lg-none" @click="isShowClass" @touchmove.prevent><i class="icon-1"></i></div>
        <transition
            enter-active-class="fadeInRightBig"
            leave-active-class="slideOutRight">
          <div class="classification-item d-lg-none" v-show="isShow">
            <phones-menu
              @gotoRegisterMember="gotoRegisterMember"
              @gotoDownloads="gotoDownloads"
              @goOut="goOut"
              >
            </phones-menu>
          </div>
        </transition>
        <div class="btn-right d-none d-lg-block">
          <div class="btn" v-show="$route.meta.showNavBar" @click="gotoRegisterMember">
            加入會員
          </div>
          <div class="user-name" v-show="!$route.meta.showNavBar">
            <span>Hi, {{userInfo&&userInfo.nick_name}}</span>
            <div class="user-img">
              <img v-if="userInfo &&userInfo.user_head" :src="`${path}${userInfo&& userInfo.user_head}`" alt="">
              <img v-else src="./../assets/imgs/head-portrait.svg" alt="">

            </div>
            <div class="children">
              <div class="user">
                <div class="item-img">
                  <img v-if="userInfo &&userInfo.user_head" :src="`${path}${userInfo&& userInfo.user_head}`" alt="">
                  <img v-else src="./../assets/imgs/head-portrait.svg" alt="">
                </div>
                <div class="text">
                  <p>Hi~</p>
                  <p>{{userInfo&&userInfo.nick_name}}</p>
                </div>
                <span><i>66</i></span>
              </div>
              <ul>
                <li><a href="javascrpt:;" @click="$router.push('/memberCenter')">會員中心</a></li>
                <li><a href="javascrpt:;" @click="$router.push({path:'/myPublishedArticles'})">發表文章</a></li>
                <li><a href="javascrpt:;">點數記錄</a></li>
                <li><a href="javascrpt:;" @click="$router.push({path:'/projectRegistration'})">專案註冊</a></li>
                <li><a href="javascrpt:;" @click="$router.push({path:'/projectReview'})">專案審核</a></li>
                <li><a href="javascrpt:;" @click="goOut">登出</a></li>
              </ul>
              </div>
            </div>
          </div>
      </div>
    </div>
    <modal
      btnType= "2"
      :showModal="showModal"
      @cancel="cancel"
      @submit="gotoGogin"
    >
      <template slot="body">
        <h3>登出</h3>
        <p>確定要登出當前帳號？</p>
      </template>
    </modal>
    <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import Modal from './Modal'
import PhonesMenu from './PhonesMenu'
import { accountLogout, getUserInfo } from './../api/request'
// , getUserInfo
import storage from './../storage'
export default {
  name: 'nav-header',
  components: {
    Modal,
    PhonesMenu
  },
  inject: ['reload'],
  data () {
    return {
      showModal: false,
      isShow: false,
      token: '',
      userInfo: {},
      isShowLoading: false,
      path: this.imgs
    }
  },
  mounted () {
    const paths = this.$route.path
    console.log(paths)
    this.token = window.sessionStorage.getItem('token')

    this.$nextTick(() => {
      this._getUserInfo()
    })
  },
  watch: {
    isShow () {
      if (this.isShow) {
        this.noScroll()
      } else {
        this.canScroll()
      }
    }
  },
  methods: {
    gotoIndex (type) {
      if (type === '1') {
        this.$router.push({ path: '/pushInformation', query: { agencyId: 3 } })
        this.reload()
      } else if (type === '2') {
        this.$router.push({ path: '/pushInformation', query: { agencyId: 2 } })
        this.reload()
      } else if (type === '3') {
        this.$router.push({ path: '/pushInformation', query: { dealers: 4 } })
        this.reload()
      } else if (type === '4') {
        this.$router.push({ path: '/pushInformation', query: { f5: 0 } })
        this.reload()
      } else {
        this.$router.push({ path: '/pushInformation' })
        this.reload()
      }
    },
    gotoRegisterMember () {
      this.isShow = false
      this.$router.push('/register')
    },
    goOut () {
      this.isShow = false
      this.showModal = true
      this.noScroll()
    },
    gotoGogin () {
      this.showModal = false
      this.canScroll()
      accountLogout({ headers: { token: this.token } }).then(res => {
        // console.log(res)
        if (res.data.code !== '200') {
          window.sessionStorage.clear()
          this.$router.push('/login')
        } else {
          window.sessionStorage.clear()
          this.$router.push('/login')
        }
      })
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    cancel () {
      this.showModal = false
      this.canScroll()
    },
    // 分类
    isShowClass () {
      this.isShow = !this.isShow
      // if (this.isShow) {
      //   this.noScroll()
      // } else {
      //   this.canScroll()
      // }
    },
    gotoDownloads () {
      this.isShow = false
      this.$router.push('/downloads')
    },
    _getUserInfo () {
      getUserInfo({ headers: { token: this.token } }).then(res => {
        if (res.data.code === '200') {
          // console.log(res)
          this.isShowLoading = false
          this.userInfo = res.data.data || storage.getItem('userInfo')
          storage.setItem('userInfo', res.data.data)
        }
      })
    }
  }

}
</script>

<style lang="scss">
@import './../assets/style/mixin.scss';
.nav-header {
  width: 100%;
  .nav-topbar {
    width: 100%;
    height:8rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background:rgba(255,255,255,1);
    box-shadow:0 .2rem 7rem 0 rgba(0,0,0,0.05);
  }
  .container{
    height: 100%;
    @include flex ()
  }
  .header-logo {
    a {
      @include bgImg(3.8rem,3.8rem,'./../assets/imgs/nav-logo.png')
    }
  }
  .topbar-menu {
    position: absolute;
    left: 14.8rem;
    ul {
       @include flex ();
       li {
          margin-right: 6rem;
          font-size:1.6rem;
          font-weight:400;
          display: inline-block;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
          .item-icon {
            width: .9rem;
            height: .5rem;
            font-size: .9rem;
            font-weight: 700;
            margin-left: .6rem;
            display: inline-block;
          }
       }
       .menu-item {
         position: relative;
         &:hover{
          a .item-icon {
             transition: all .5s;
            transform: rotate(180deg);
           }

           ul {
               height:15.4rem;
               opacity: 1;
           }
         }
         ul {
          position: absolute;
          @include flex (flex-start,flex-start);
          flex-direction: column;
          top: 3.9rem;
          left: -1rem;
          width:22rem;
          padding: 2.4rem 0 0 2.4rem;
          height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all .5s;
          background:rgba(255,255,255,1);
          box-shadow:0 2.5rem 6rem 0 rgba(37,36,39,0.14);
          li {
            margin-bottom: 2rem;
          }
          li a {
            height:2.2rem;
            font-size:1.6rem;
            font-weight:400;
            color:rgba(37,36,39,1);
            line-height:2.2rem;
          }
         }
       }
    }
  }
  .classification {
    color:rgba(37,36,39,1);
    font-size: 3rem;
  }
  .classification-item {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 6rem;
    background-color: #F5F5F5;
  }
  .btn-right {
    .btn {
      width:12.4rem;
      height:4rem;
      @include flex (center);
      background:rgba(255,255,255,1);
      border-radius:.6rem;
      border:.1rem solid rgba(61,61,61,1);
      font-size:14px;
      font-weight:400;
      color:rgba(37,36,39,1);
      cursor: pointer;
    }
    .user-name {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      span {
        font-size:1.8rem;
        font-weight:400;
        color:rgba(37,36,39,1);
        line-height:2.5rem;
        margin-right: 1.4rem;
      }
      .user-img {
        width: 3.8rem;
        height: 3.8rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover{
        .children{
          height:37.4rem!important;
          opacity: 1!important;
        }
      }
      .children {
        position: absolute;
        left: 7.4rem;
        top: 4.7rem;
        width:25rem;
        height: 0;
        opacity: 0;
        transition: all .5s;
        padding: 2.4rem;
        overflow: hidden;
        background:rgba(255,255,255,1);
        box-shadow:0 2.5rem 6rem 0 rgba(37,36,39,0.14);
        box-sizing: border-box;
        .user {
          @include flex ();
          margin-bottom: 2.4rem;
          .item-img {
            width: 7rem;
            height: 7rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .text {
            margin-left: -2.6rem;
            p {
              font-size:1.5rem;
              font-weight:600;
              color:rgba(37,36,39,1);
              line-height:2.1rem;
            }
          }
          span {
            @include bgImg(1.9rem,2rem,'./../assets/imgs/icon/remind.png');
            margin-right: 0;
            position: relative;
            i {
              position: absolute;
              top: -.6rem;
              left: 1rem;
              @include flex (center);
              padding: .3rem .4rem;
              background:rgba(238,26,52,1);
              font-size:1.1rem;
              font-weight:500;
              color:rgba(255,255,255,1);
              line-height:.9rem;
              border-radius: .7rem;
            }
          }
        }
        ul {
          li {
            height:2.2rem;
            margin-bottom: 2rem;
            font-size:1.6rem;
            font-weight:400;
            color:rgba(37,36,39,1);
            line-height:2.2rem;
          }
        }
      }
    }
  }
@media screen and (max-width:991px) {
  .nav-topbar {
    height: 6rem;
  }
}
@media screen and (max-width:600px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    box-sizing: border-box;
  }
}
}
</style>
