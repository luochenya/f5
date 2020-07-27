<template>
  <div v-if="show" class="lds-spinner">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce">f5..</div>
      <div class="double-bounce2"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    show: Boolean
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.lds-spinner{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,.4);
  z-index: 999;
}
.spinner {
  width: 60px;
  height: 60px;
  line-height: 60px;
  position:absolute;
  text-align: center;
  top:30%;
  left:50%;
   transform: translate(-50%, -50%);
  .double-bounce,.double-bounce1, .double-bounce2 {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color: #fff;
    font-size: 1.8rem;
    font-weight: 500;
    background-color: rgba(0,0,0,.6);
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: bounce 2.0s infinite ease-in-out;
    animation: bounce 2.0s infinite ease-in-out;
  }
  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
}

@-webkit-keyframes bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
