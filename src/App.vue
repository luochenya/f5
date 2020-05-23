<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
  // created () {
  //   // 在页面加载时读取sessionStorage里的状态信息
  //   if (sessionStorage.getItem('store')) {
  //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
  //   }

  //   // 在页面刷新时将vuex里的信息保存到sessionStorage里
  //   window.addEventListener('beforeunload', () => {
  //     sessionStorage.setItem('store', JSON.stringify(this.$store.state))
  //   })
  // }
}
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
}
.el-message {
  min-width: 320px!important;
  border-radius: .8rem!important;
  background-color: #fff!important;
    border-color: #ebeef5!important;
    box-shadow: 0 .2rem 1.2rem 0 rgba(0,0,0,.1)!important;
 }
.el-message__content {
  color: #303133!important;
}
.el-message__icon {
  font-size: 2.4rem!important;
}
</style>
