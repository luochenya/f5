<template>
  <div class="nav-footer">
    <div class="container">
      <p>©2020 F5, Inc. All rights reserved.</p>
      <p>Policies<span>|</span>Privacy<span>|</span>Trademarks</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.nav-footer {
  padding:14rem 0;
  .container {
    text-align: center;
    p {
      font-size:1.8rem;
      font-weight:400;
      color:rgba(134,134,134,1);
      line-height:3rem;
      span {
        margin: 0 2rem;
      }
    }
  }
@media screen and (max-width:767px) {

    padding: 6rem 0;
}
}
</style>
