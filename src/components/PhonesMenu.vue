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
          <img src="./../assets/imgs/user-max.png" alt="">
        </div>
        <div class="text">
          <p>Hi~</p>
          <p>Aurora</p>
        </div>
        <span><i>66</i></span>
      </div>
      <div class="menu-box">
        <ul>
          <li><a href="javascrpt:;" @click="$router.push('/memberCenter')">會員中心</a></li>
          <li><a href="javascrpt:;" @click="$router.push({path:'/publishedAnArticle'})">發表文章</a></li>
          <li><a href="javascrpt:;">點數記錄</a></li>
          <li><a href="javascrpt:;">專案註冊</a></li>
          <li><a href="javascrpt:;">專案審核</a></li>
          <li><a href="javascrpt:;" @click="$emit('goOut')">登出</a></li>
        </ul>
        <div class="menu-r">
          <ul>
            <li><a href="javascript:;">F5專區</a></li>
            <li @click="isShowUl= !isShowUl">
              <a href="javascript:;">代理商專區<i class="icon-4" :class="{'item-icon':isShowUl}"></i></a>
              <ul :class="{'checked':isShowUl}">
                <li><a href="javascript:;">零壹科技ZERONE</a></li>
                <li><a href="javascript:;">逸盈科技NETFOS</a></li>
                <li><a href="javascript:;">C代理商</a></li>
              </ul>
            </li>
            <li><a href="javascript:;">經銷商專區</a></li>
            <li><a href="javascript:;"  @click="$emit('gotoDownloads')">下載專區</a></li>
            <li><a href="javascript:;">點數商城</a></li>
          </ul>
          <div class="btn" v-show="$route.meta.showNavBar"  @click="$emit('gotoRegisterMember')">加入會員</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowUl: false
    }
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
