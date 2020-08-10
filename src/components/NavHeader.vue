<template>
  <div class="nav-header">
    <div class="nav-topbar">
      <div class="container">
        <div class="header-logo">
          <a @click="gotoIndex('5')"></a>
        </div>
        <div class="topbar-menu d-none d-lg-block">
          <ul>
            <li><a @click="gotoIndex('4')">F5專區</a></li>
            <li class="menu-item">
              <a>代理商專區<i class="item-icon icon-4"></i></a>
              <ul>
                <!-- <li><a @click="$router.push({path:'/pushInformation', query: {agencyId:1}})">零壹科技ZERONE</a></li> -->
                <li><a @click="gotoIndex('1')">零壹科技ZERONE</a></li>
                <li><a @click="gotoIndex('2')">逸盈科技NETFOS</a></li>
                <li><a @click="gotoIndex('22')">創泓科技Uniforce</a></li>
              </ul>
            </li>
            <li><a @click="gotoIndex('3')">經銷商專區</a></li>
            <li v-show="!$route.meta.showNavBar">
              <a @click="gotoDownloads">下載專區</a>
            </li>
            <li @click="gotoPointsMall()"><a>點數商城</a></li>
          </ul>
        </div>
        <div
          class="classification d-lg-none"
          @click="isShowClass"
          @touchmove.prevent
        >
          <i class="icon-1"></i>
        </div>
        <!-- 移动端 -->
        <transition
          enter-active-class="fadeInRightBig"
          leave-active-class="slideOutRight"
        >
          <div class="classification-item d-lg-none" v-show="isShow">
            <div class="phones-menu">
              <div class="children" v-show="!$route.meta.showNavBar">
                <div class="user">
                  <div class="item-img">
                    <img
                      v-if="userInfo && userInfo.user_head"
                      :src="`${path}${userInfo && userInfo.user_head}`"
                      alt=""
                    />
                    <img
                      v-else
                      src="./../assets/imgs/head-portrait.svg"
                      alt=""
                    />
                  </div>
                  <div class="text">
                    <p>Hi~</p>
                    <p>{{ userInfo && userInfo.nick_name }}</p>
                  </div>
                  <span @click="$router.push('notificationCenter'), isShows()">
                    <i v-if="count && count < 100">{{ count }}</i>
                    <i v-if="count && count >= 100">99+</i>
                  </span>
                </div>
                <div class="menu-box">
                  <ul>
                    <li>
                      <a @click="$router.push('/memberCenter'), isShows()"
                        >會員中心</a
                      >
                    </li>
                    <li>
                      <a @click="toMyPublishedArticles(), isShows()"
                        >發表文章</a
                      >
                    </li>
                    <li>
                      <a @click="toPointsApplication(), isShows()">點數申請</a>
                    </li>
                    <li>
                      <a @click="toPointsRecord(), isShows()">點數記錄</a>
                    </li>
                    <li>
                      <a @click="toProjectRegistration(), isShows()"
                        >專案註冊</a
                      >
                    </li>
                    <li>
                      <a @click="toProjectReview(), isShows()">專案審核</a>
                    </li>
                    <li><a @click="goOut">登出</a></li>
                  </ul>
                  <div class="menu-r">
                    <ul>
                      <li><a @click="gotoIndex('4'), isShows()">F5專區</a></li>
                      <li @click="isShowUl = !isShowUl">
                        <a
                          >代理商專區<i
                            class="icon-4"
                            :class="{ 'item-icon': isShowUl }"
                          ></i
                        ></a>
                        <ul :class="{ checked: isShowUl }">
                          <li>
                            <a @click="gotoIndex('1'), isShows()"
                              >零壹科技ZERONE</a
                            >
                          </li>
                          <li>
                            <a @click="gotoIndex('2'), isShows()"
                              >逸盈科技NETFOS</a
                            >
                          </li>
                          <li>
                            <a @click="gotoIndex('22'), isShows()"
                              >創泓科技Uniforce</a
                            >
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a @click="gotoIndex('3'), isShows()">經銷商專區</a>
                      </li>
                      <li><a @click="$emit('gotoDownloads')">下載專區</a></li>
                      <li>
                        <a @click="gotoPointsMall(), isShows()">點數商城</a>
                      </li>
                    </ul>
                    <div
                      class="btn"
                      v-show="$route.meta.showNavBar"
                      @click="gotoRegisterMember"
                    >
                      加入會員
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <!-- 移动端 -->
        <div class="btn-right d-none d-lg-block">
          <div
            class="btn"
            v-show="$route.meta.showNavBar"
            @click="gotoRegisterMember"
          >
            加入會員
          </div>
          <div class="user-name" v-show="!$route.meta.showNavBar">
            <em class="user-name_img" @click="toShoppingCart()">
              <img src="@/assets/imgs/shoppingCart.png" alt="" />
              <i v-if="cratNumber && cratNumber < 100">{{ cratNumber }}</i>
              <i v-if="cratNumber && cratNumber >= 100">99+</i>
            </em>
            <span>Hi, {{ userInfo && userInfo.nick_name }}</span>
            <div class="user-img">
              <img
                v-if="userInfo && userInfo.user_head"
                :src="`${path}${userInfo && userInfo.user_head}`"
                alt=""
              />
              <img v-else src="./../assets/imgs/head-portrait.svg" alt="" />
            </div>
            <div class="children">
              <div class="user">
                <div class="item-img">
                  <img
                    v-if="userInfo && userInfo.user_head"
                    :src="`${path}${userInfo && userInfo.user_head}`"
                    alt=""
                  />
                  <img v-else src="./../assets/imgs/head-portrait.svg" alt="" />
                </div>
                <div class="text" :title="userInfo && userInfo.nick_name">
                  <p>Hi~</p>
                  <p>{{ userInfo && userInfo.nick_name }}</p>
                </div>
                <div
                  class="user_Bells"
                  @click="$router.push('notificationCenter')"
                >
                  <i v-if="count && count < 100">{{ count }}</i>
                  <i v-if="count && count >= 100">99+</i>
                </div>
              </div>
              <ul>
                <li><a @click="$router.push('/memberCenter')">會員中心</a></li>
                <li><a @click="toMyPublishedArticles()">發表文章</a></li>
                <li><a @click="toPointsApplication()">點數申請</a></li>
                <li><a @click="toPointsRecord()">點數記錄</a></li>
                <li><a @click="toProjectRegistration()">專案註冊</a></li>
                <li><a @click="toProjectReview()">專案審核</a></li>
                <!-- <li><a>專案註冊</a></li> -->
                <!-- <li><a>專案審核</a></li> -->
                <li><a @click="goOut">登出</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      btnType="2"
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
import Modal from "./Modal";
import {
  accountLogout,
  getUserInfo,
  getJurisdiction,
  getUnreadMessage,
  getCart
} from "./../api/request";
// , getUserInfo
import storage from "./../storage";
export default {
  name: "nav-header",
  components: {
    Modal
  },
  inject: ["reload"],
  data() {
    return {
      isShowUl: false,
      showModal: false,
      isShow: false,
      token: "",
      count: "",
      userInfo: {},
      isShowLoading: false,
      path: this.imgs,
      paths: "",
      Jurisdiction: {},
      cratNumber: ""
    };
  },
  mounted() {
    this.paths = this.$route.path;
    // const paths = this.$route.path
    this.token = window.sessionStorage.getItem("token");
    this.$nextTick(() => {
      if (
        this.$route.path != "/login" &&
        this.$route.path !== "/register" &&
        this.$route.path != "/forgetPassword" &&
        this.$route.path != "/reset"
      ) {
        this._getUserInfo();
        this._getJurisdiction();
        this._getUnreadMessage();
        this._getCart();
      }
    });
  },
  watch: {
    isShow() {
      if (this.isShow) {
        this.noScroll();
      } else {
        this.canScroll();
      }
    },
    $route(to, from) {
      if (
        to.path !== "/login" &&
        to.path !== "/register" &&
        to.path != "/forgetPassword" &&
        to.path != "/reset"
      ) {
        this.token = window.sessionStorage.getItem("token");
        this._getUserInfo();
        this._getJurisdiction();
        this._getUnreadMessage();
        this._getCart();
      }
    }
  },
  methods: {
    // 跳轉購物車
    toShoppingCart() {
      this.$router.push({ path: "/shoppingCart" });
    },
    titleCilck() {
      if (this.$route.path !== "/login" && this.$route.path !== "/register") {
        // this.$message.warning("功能尚未啟用")
        this.$message({
          message: "功能尚未啟用",
          type: "warning",
          duration: 1000
        });
      }
    },
    // 获取购物车数量
    _getCart() {
      let form = {
        goods_name: ""
      };
      getCart(form, { headers: { token: this.token } }).then(res => {
        if (res.data.code == "200") {
          this.cratNumber = 0;
          res.data.data.rows.forEach((item, index) => {
            this.cratNumber += parseInt(item.number);
          });
        }
      });
    },
    // 獲取未讀通知
    _getUnreadMessage() {
      getUnreadMessage({ headers: { token: this.token } }).then(res => {
        if (res.data.code == "200") {
          this.count = res.data.data.count;
        } else {
          this.count = "";
        }
      });
    },
    // 獲取會員權限
    _getJurisdiction() {
      getJurisdiction({ headers: { token: this.token } }).then(res => {
        // console.log(res)
        if (res.data.code == "200") {
          this.Jurisdiction = res.data.data;
        } else {
          // this.$message.error("會員權限獲取失敗")
        }
      });
    },
    // 跳轉專案審核
    toProjectReview() {
      if (this.Jurisdiction.project_review == 1) {
        this.$router.push({ path: "/projectReview" });
      } else {
        this.$message.error("暫無權限");
      }
    },
    // 跳轉專案註冊
    toProjectRegistration() {
      if (this.Jurisdiction.project_reg == 1) {
        this.$router.push({ path: "/projectRegistration" });
      } else {
        this.$message.error("暫無權限");
      }
    },
    // 跳轉點數記錄
    toPointsRecord() {
      this.$router.push({ path: "/PointsRecord" });
    },
    // 跳轉點數申請
    toPointsApplication() {
      this.$router.push({ path: "/PointsApplication" });
    },
    // 跳轉發佈文章
    toMyPublishedArticles() {
      if (this.Jurisdiction.publications == 1) {
        this.$router.push({ path: "/myPublishedArticles" });
      } else {
        this.$message.error("暫無權限");
      }
    },
    // 頂部路由跳轉
    gotoIndex(type) {
      if (this.$route.path == "/login") {
        return false;
      }
      if (type === "1") {
        if (this.Jurisdiction.agent == 1) {
          this.$router.push({
            path: "/pushInformation",
            query: { agencyId: 3 }
          });
          this.reload();
        } else {
          this.$message.error("暫無權限");
        }
      } else if (type === "2") {
        if (this.Jurisdiction.agent == 1) {
          this.$router.push({
            path: "/pushInformation",
            query: { agencyId: 2 }
          });
          this.reload();
        } else {
          this.$message.error("暫無權限");
        }
      } else if (type === "22") {
        if (this.Jurisdiction.agent == 1) {
          this.$router.push({
            path: "/pushInformation",
            query: { agencyId: 22 }
          });
          this.reload();
        } else {
          this.$message.error("暫無權限");
        }
      } else if (type === "3") {
        if (this.Jurisdiction.dealer == 1) {
          this.$router.push({
            path: "/pushInformation",
            query: { dealers: 4 }
          });
          this.reload();
        } else {
          this.$message.error("暫無權限");
        }
      } else if (type === "4") {
        if (this.Jurisdiction.original == 1) {
          this.$router.push({ path: "/pushInformation", query: { f5: 0 } });
          this.reload();
        } else {
          this.$message.error("暫無權限");
        }
      } else {
        this.$router.push({ path: "/pushInformation" });
        this.reload();
      }
    },
    gotoRegisterMember() {
      this.isShow = false;
      this.$router.push("/register");
    },
    goOut() {
      this.isShow = false;
      this.showModal = true;
      this.noScroll();
    },
    isShows() {
      this.isShow = false;
    },
    gotoGogin() {
      this.showModal = false;
      this.canScroll();
      accountLogout({ headers: { token: this.token } }).then(res => {
        // console.log(res)
        if (res.data.code !== "200") {
          window.sessionStorage.removeItem("f5");
          window.sessionStorage.removeItem("token");
          // window.sessionStorage.clear()
          this.$router.push("/login");
        } else {
          window.sessionStorage.removeItem("f5");
          window.sessionStorage.removeItem("token");
          // window.sessionStorage.clear()
          this.$router.push("/login");
        }
      });
      window.sessionStorage.removeItem("f5");
      window.sessionStorage.removeItem("token");
      // window.sessionStorage.clear()
      this.$router.push("/login");
    },
    cancel() {
      this.showModal = false;
      this.canScroll();
    },
    // 分类
    isShowClass() {
      this.isShow = !this.isShow;
      // if (this.isShow) {
      //   this.noScroll()
      // } else {
      //   this.canScroll()
      // }
    },
    gotoDownloads() {
      if (this.Jurisdiction.download_browse == 0) {
        this.$message.error("暫無權限");
        return false;
      }
      this.isShow = false;
      this.$router.push("/downloads");
    },
    gotoPointsMall() {
      this.$router.push("/PointsMall");
    },
    _getUserInfo() {
      this.isShowLoading = true;
      getUserInfo({ headers: { token: this.token } }).then(res => {
        this.isShowLoading = false;
        if (res.data.code === "200") {
          this.userInfo = res.data.data || storage.getItem("userInfo");
          storage.setItem("userInfo", res.data.data);
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/style/mixin.scss";
.nav-header {
  width: 100%;
  .nav-topbar {
    width: 100%;
    height: 8rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0.2rem 7rem 0 rgba(0, 0, 0, 0.05);
  }
  .container {
    height: 100%;
    @include flex();
  }
  .header-logo {
    a {
      @include bgImg(3.8rem, 3.8rem, "./../assets/imgs/nav-logo.png");
    }
  }
  .phones-menu {
    padding: 0 2rem;
    overflow-y: scroll;
    .user-name {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 1.5rem;
      span {
        font-size: 1.8rem;
        font-weight: 400;
        color: rgba(37, 36, 39, 1);
        line-height: 2.5rem;
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
        @include flex(flex-start);
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
            font-size: 1.5rem;
            font-weight: 600;
            color: rgba(37, 36, 39, 1);
            line-height: 2.1rem;
          }
        }
        span {
          @include bgImg(1.9rem, 2rem, "./../assets/imgs/icon/remind.png");
          margin-left: 2rem;
          margin-right: 0;
          position: relative;
          i {
            position: absolute;
            top: -0.6rem;
            left: 1rem;
            @include flex(center);
            padding: 0.3rem 0.4rem;
            background: rgba(238, 26, 52, 1);
            font-size: 1.1rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 0.9rem;
            border-radius: 0.7rem;
          }
        }
      }
      .menu-box {
        display: flex;
        > ul {
          li {
            height: 2.2rem;
            margin-bottom: 2rem;
            font-size: 1.6rem;
            font-weight: 400;
            color: rgba(37, 36, 39, 1);
            line-height: 2.2rem;
          }
        }
        .menu-r {
          margin-left: 6rem;
          ul {
            li {
              // margin-top: 2rem;
              margin-bottom: 2rem;
              font-size: 1.6rem;
              font-weight: 400;
              line-height: 2.2rem;
            }
            li:nth-of-type(2) {
              .icon-4 {
                margin-left: 0.6rem;
              }
              > ul {
                height: 0;
                opacity: 0;
                overflow: hidden;
                transition: all 0.5s;
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
            width: 12rem;
            height: 3.6rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2rem;
            background: rgba(37, 36, 39, 1);
            border-radius: 0.6rem;
            border: 0.1rem solid rgba(37, 36, 39, 1);
            font-size: 14px;
            font-weight: 400;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
  }
  .topbar-menu {
    position: absolute;
    left: 14.8rem;
    ul {
      @include flex();
      li {
        margin-right: 6rem;
        font-size: 1.6rem;
        font-weight: 400;
        display: inline-block;
        color: rgba(37, 36, 39, 1);
        line-height: 2.2rem;
        .item-icon {
          width: 0.9rem;
          height: 0.5rem;
          font-size: 0.9rem;
          font-weight: 700;
          margin-left: 0.6rem;
          display: inline-block;
        }
      }
      .menu-item {
        position: relative;
        &:hover {
          a .item-icon {
            transition: all 0.5s;
            transform: rotate(180deg);
          }

          ul {
            height: 15.4rem;
            opacity: 1;
          }
        }
        ul {
          position: absolute;
          @include flex(flex-start, flex-start);
          flex-direction: column;
          top: 3.9rem;
          left: -1rem;
          width: 22rem;
          padding: 2.4rem 0 0 2.4rem;
          height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.5s;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 2.5rem 6rem 0 rgba(37, 36, 39, 0.14);
          li {
            margin-bottom: 2rem;
          }
          li a {
            height: 2.2rem;
            font-size: 1.6rem;
            font-weight: 400;
            color: rgba(37, 36, 39, 1);
            line-height: 2.2rem;
          }
        }
      }
    }
  }
  .classification {
    color: rgba(37, 36, 39, 1);
    font-size: 3rem;
  }
  .classification-item {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 6rem;
    background-color: #f5f5f5;
  }
  .btn-right {
    .btn {
      width: 12.4rem;
      height: 4rem;
      @include flex(center);
      background: rgba(255, 255, 255, 1);
      border-radius: 0.6rem;
      border: 0.1rem solid rgba(61, 61, 61, 1);
      font-size: 14px;
      font-weight: 400;
      color: rgba(37, 36, 39, 1);
      cursor: pointer;
    }
    .user-name:hover {
      .children {
        display: block;
      }
    }
    .user-name {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      .user-name_img {
        position: relative;
        margin-right: 1rem;
        width: 1.9rem;
        height: 1.7rem;
        img {
          width: 100%;
          height: 100%;
        }
        i {
          position: absolute;
          left: 1rem;
          top: -0.8rem;
          display: block;
          padding: 0.3rem 0.4rem;
          background: rgba(238, 26, 52, 1);
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 0.9rem;
          border-radius: 0.7rem;
        }
      }
      span {
        display: inline-block;
        width: 10rem;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.8rem;
        font-weight: 400;
        color: rgba(37, 36, 39, 1);
        line-height: 2.5rem;
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
      .children:hover {
        display: block;
      }
      .children {
        display: none;
        position: absolute;
        right: -4rem;
        top: 3.8rem;
        width: 27rem;
        height: 40.4rem !important;
        padding: 2.4rem !important;
        transition: all 0.5s;
        // overflow: hidden;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2.5rem 6rem 0 rgba(37, 36, 39, 0.14);
        box-sizing: border-box;
        .user {
          @include flex();
          margin-bottom: 2.4rem;
          .item-img {
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .text {
            width: 10rem;
            margin-left: -2.6rem;
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 1.5rem;
              font-weight: 600;
              color: rgba(37, 36, 39, 1);
              line-height: 2.1rem;
            }
          }
          .user_Bells {
            @include bgImg(1.9rem, 2rem, "./../assets/imgs/icon/remind.png");
            margin-right: 0;
            position: relative;
            i {
              position: absolute;
              top: -0.6rem;
              left: 1rem;
              @include flex(center);
              padding: 0.3rem 0.4rem;
              background: rgba(238, 26, 52, 1);
              font-size: 1.1rem;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 0.9rem;
              border-radius: 0.7rem;
            }
          }
        }
        ul {
          li {
            height: 2.2rem;
            margin-bottom: 2rem;
            font-size: 1.6rem;
            font-weight: 400;
            color: rgba(37, 36, 39, 1);
            line-height: 2.2rem;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1400px) {
    .btn-right {
      .user-name {
        .children {
          right: 0;
        }
      }
    }
  }

  @media screen and (max-width: 991px) {
    .nav-topbar {
      height: 6rem;
    }
  }
  @media screen and (max-width: 600px) {
    .container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      box-sizing: border-box;
    }
  }
}
</style>
