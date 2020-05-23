<template>
  <div class="home">
    <nav-header></nav-header>
    <router-view v-if="isRouterAlive"></router-view>
     <nav-footer v-if="$route.meta.showNavBar || $route.meta.showNavBarTow"></nav-footer>
    <nav-footer-tow v-else></nav-footer-tow>

  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavFooterTow from '@/components/NavFooterTow'
// import { getUserInfo } from './../api/request'
// import storage from './../storage'
export default {
  components: {
    NavFooter,
    NavHeader,
    NavFooterTow
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  mounted () {
    // this._getUserInfo()
    // console.log('99')
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
    // _getUserInfo () {
    //   getUserInfo({ headers: { token: this.token } }).then(res => {
    //     console.log(res)
    //     if (res.data.code === '200') {
    //       if (res.data.data) {
    //         storage.setItem('userInfo', res.data.data)
    //       }
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss">
html,
body,
.home {
  // overflow-x: hidden;
  //  height: 100%;
  // overflow-y: scroll;
  // touch-action: pan-y;
  // -webkit-overflow-scrolling: touch;
}
</style>
