<template>
  <div class="phones-menu">
    <!-- <div class="user-name" v-show="!$route.meta.showNavBar">
      <div class="user-img">
        <img src="./../assets/imgs/user-max.png" alt="">
      </div>
      <span>Hi，Aurora</span>
    </div> -->
    <div class="children" v-show="!$route.meta.showNavBar">
      <div class="user">
        <div class="item-img">
          <img v-if="userInfo &&userInfo.user_head" :src="`${path}${userInfo&& userInfo.user_head}`" alt="">
          <img v-else src="./../assets/imgs/head-portrait.svg" alt="">
        </div>
        <div class="text">
          <p>Hi~</p>
          <p>{{userInfo&&userInfo.nick_name}}</p>
        </div>
        <span @click="$router.push('notificationCenter')">
          <i>66</i>
        </span>
      </div>
      <div class="menu-box">
        <ul>
          <li><a @click="$router.push('/memberCenter');$emit('isShows')">會員中心</a></li>
          <li><a @click="toMyPublishedArticles();$emit('isShows')">發表文章</a></li>
          <li><a @click="toPointsRecord();$emit('isShows')">點數記錄</a></li>
          <li><a @click="toProjectRegistration();$emit('isShows')">專案註冊</a></li>
          <li><a @click="toProjectReview();$emit('isShows')">專案審核</a></li>
          <li><a @click="$emit('goOut')">登出</a></li>
        </ul>
        <div class="menu-r">
          <ul>
            <li><a @click="gotoIndex('4');$emit('isShows')">F5專區</a></li>
            <li @click="isShowUl= !isShowUl">
              <a>代理商專區<i class="icon-4" :class="{'item-icon':isShowUl}"></i></a>
              <ul :class="{'checked':isShowUl}">
                <li><a @click="gotoIndex('1');$emit('isShows')">零壹科技ZERONE</a></li>
                <li><a @click="gotoIndex('2');$emit('isShows')">逸盈科技NETFOS</a></li>
                <li><a @click="gotoIndex('22');$emit('isShows')">創泓科技Uniforce</a></li>
              </ul>
            </li>
            <li><a @click="gotoIndex('3');$emit('isShows')">經銷商專區</a></li>
            <li><a  @click="$emit('gotoDownloads')">下載專區</a></li>
            <li><a @click="gotoPointsMall();$emit('isShows')">點數商城</a></li>
          </ul>
          <div class="btn" v-show="$route.meta.showNavBar"  @click="$emit('gotoRegisterMember')">加入會員</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import storage from '@/storage'
import { accountLogout, getUserInfo, getJurisdiction } from './../api/request'
export default {
  inject: ['reload'],
  data () {
    return {
      isShowUl: false,
      showModal: false,
      isShow: false,
      token: '',
      userInfo: {},
      isShowLoading: false,
      path: this.imgs,
      paths: '',
      Jurisdiction: {}
    }
  },
  mounted () {
    this.paths = this.$route.path
    // const paths = this.$route.path
    this.token = window.sessionStorage.getItem('token')
    if (this.$route.path != "/login" && this.$route.path !== '/register' && this.$route.path != "/forgetPassword" && this.$route.path != "/reset") {
      this._getUserInfo()
      this._getJurisdiction()
      this.$nextTick(() => {
        this._getUserInfo()
        this._getJurisdiction()
      })
    }
  },
  methods: {
    gotoPointsMall () {
      this.$router.push('/PointsMall')
    },
    titleCilck() {
      if (this.$route.path !== '/login' && this.$route.path !== '/register') {
        // this.$message.warning("功能尚未啟用")
        this.$message({
          message: '功能尚未啟用',
          type: 'warning',
          duration: 1000
        });
      }
    },
    // 跳轉專案審核
    toProjectReview () {
      if (this.Jurisdiction.project_review == 1) {
        this.$router.push({path:'/projectReview'})
      } else {
        this.$message.error("暫無權限")
      }
    },
    // 跳轉專案註冊
    toProjectRegistration () {
      if (this.Jurisdiction.project_reg == 1) {
        this.$router.push({path:'/projectRegistration'})
      } else {
        this.$message.error("暫無權限")
      }
    },
    // 跳轉發佈文章
    toMyPublishedArticles () {
      if (this.Jurisdiction.publications == 1) {
        this.$router.push({path:'/myPublishedArticles'})
      } else {
        this.$message.error("暫無權限")
      }
    },
    // 跳轉點數記錄
    toPointsRecord () {
      this.$router.push({path:'/PointsRecord'})
    },
    // 獲取會員權限
    _getJurisdiction () {
      getJurisdiction({ headers: { token: this.token } }).then(res => {
        // console.log(res)
        if (res.data.code == '200') {
          this.Jurisdiction = res.data.data
        } else {
          // this.$message.error("會員權限獲取失敗")
        }
      })
    },
    // 獲取個人信息
    _getUserInfo () {
      this.isShowLoading = true
      getUserInfo({ headers: { token: this.token } }).then(res => {
        this.isShowLoading = false
        if (res.data.code === '200') {
          // console.log(res)
          this.userInfo = res.data.data || storage.getItem('userInfo')
          storage.setItem('userInfo', res.data.data)
        }
      })
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
          window.sessionStorage.removeItem('f5')
          window.sessionStorage.removeItem('token')
          // window.sessionStorage.clear()
          this.$router.push('/login')
        } else {
          window.sessionStorage.removeItem('f5')
          window.sessionStorage.removeItem('token')
          // window.sessionStorage.clear()
          this.$router.push('/login')
        }
      })
      window.sessionStorage.removeItem('f5')
      window.sessionStorage.removeItem('token')
      // window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 頂部路由跳轉
    gotoIndex (type) {
      if (type === '1') {
        if (this.Jurisdiction.agent == 1) {
          this.$router.push({ path: '/pushInformation', query: { agencyId: 3 } })
          this.reload()
        } else {
          this.$message.error("暫無權限")
        }
      } else if (type === '2') {
        if (this.Jurisdiction.agent == 1) {
          this.$router.push({ path: '/pushInformation', query: { agencyId: 2 } })
          this.reload()
        } else {
          this.$message.error("暫無權限")
        }
      } else if (type === '22') {
        if (this.Jurisdiction.agent == 1) {
          this.$router.push({ path: '/pushInformation', query: { agencyId: 22 } })
          this.reload()
        } else {
          this.$message.error("暫無權限")
        }
      } else if (type === '3') {
        if (this.Jurisdiction.dealer == 1) {
          this.$router.push({ path: '/pushInformation', query: { dealers: 4 } })
          this.reload()
        } else {
          this.$message.error("暫無權限")
        }
      } else if (type === '4') {
        if (this.Jurisdiction.original == 1) {
          this.$router.push({ path: '/pushInformation', query: { f5: 0 } })
          this.reload()
        } else {
          this.$message.error("暫無權限")
        }
      } else {
        this.$router.push({ path: '/pushInformation' })
        this.reload()
      }
    },
  }
}
</script>

<style lang='scss'>
@import './../assets/style/mixin.scss';
.phones-menu {
  padding: 0 2rem;
  overflow-y: scroll;
  .user-name {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 1.5rem;
    span {
      font-size:1.8rem;
      font-weight:400;
      color:rgba(37,36,39,1);
      line-height:2.5rem;
      margin-right: 1.4rem;
    }
    .user-img {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .children {
    // position: absolute;
    // left: 7.4rem;
    // top: 4.7rem;
    // width:25rem;
    // height: 0;
    // opacity: 0;
    // transition: all .5s;
    // padding: 2.4rem;
    // overflow: hidden;
    // background:rgba(255,255,255,1);
    // box-shadow:0 2.5rem 6rem 0 rgba(37,36,39,0.14);
    margin-top: 2rem;
    box-sizing: border-box;
    .user {
      @include flex (flex-start);
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
        margin-left: 2.6rem;
        p {
          font-size:1.5rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.1rem;
        }
      }
      span {
        @include bgImg(1.9rem,2rem,'./../assets/imgs/icon/remind.png');
        margin-left: 2rem;
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
    .menu-box {
     display: flex;
      > ul {
        li {
          height:2.2rem;
          margin-bottom: 2rem;
          font-size:1.6rem;
          font-weight:400;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
        }
      }
      .menu-r {
        margin-left: 6rem;
        ul {
          li {
            // margin-top: 2rem;
            margin-bottom: 2rem;
            font-size:1.6rem;
            font-weight:400;
            line-height:2.2rem;
          }
          li:nth-of-type(2) {
            .icon-4 {
              margin-left: .6rem;
            }
            >ul {
              height: 0;
              opacity: 0;
              overflow: hidden;
              transition: all .5s;
              margin-left: 3rem;
              li {
                font-weight: 400;
              }
            }
            .checked {
              height: 12.6rem;
              opacity: 1;
            }
            a .item-icon {
              display: inline-block;
              transform: rotate(180deg);
            }
          }
        }
        .btn {
          width:12rem;
          height:3.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
          background: rgba(37,36,39,1);
          border-radius:.6rem;
          border:.1rem solid rgba(37,36,39,1);
          font-size:14px;
          font-weight:400;
          color:#fff;
          cursor: pointer;
        }
      }
    }

  }

}
</style>
