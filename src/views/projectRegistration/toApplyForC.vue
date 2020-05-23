<template>
  <div class="to-apply-for-c">
    <div class="main">
      <div class="main-a">
        <div class="top"><h1>E.專案配置與進度說明</h1><div class="num"><span>3</span>/4</div></div>
        <div class="link"><div class="links"></div></div>
        <div class="form">
          <div class="card">
            <span>1.已向客戶進行方案簡報?</span>
            <textarea placeholder="請由此填寫（非必填）" v-model="projectThat[0]"></textarea>
          </div>
          <div class="card">
            <span>2.已提供/建議 產品 or 方案給客戶?</span>
            <textarea placeholder="請由此填寫（非必填）"  v-model="projectThat[1]"></textarea>
          </div>
          <div class="card">
            <span>3.須進行PoC驗證?</span>
            <textarea placeholder="請由此填寫（非必填）"  v-model="projectThat[2]"></textarea>
          </div>
          <div class="card">
            <span>4.預估進行PoC之日常?</span>
            <textarea placeholder="請由此填寫（非必填）"  v-model="projectThat[3]"></textarea>
          </div>
          <div class="card">
            <span>5.是否需要開立原廠保固授權說明?</span>
            <textarea placeholder="請由此填寫（非必填）"  v-model="projectThat[4]"></textarea>
          </div>
          <div class="card">
            <span>6.決標方式? (價格標/評選標/資格標.....等)</span>
            <textarea placeholder="請由此填寫（非必填）"  v-model="projectThat[5]"></textarea>
          </div>
          <div class="card">
            <span>7.競爭對手狀態說明</span>
            <textarea placeholder="請由此填寫（非必填）"  v-model="projectThat[6]"></textarea>
          </div>
        </div>
      </div>
      <div class="card-box-f">
          <h2>F.需要F5支援項目</h2>
          <div class="text">
            <textarea placeholder="請填寫內容..."  v-model="five_support_project"></textarea>
            <p>0/300</p>
          </div>
      </div>
      <div class="btn">
        <a href="javascript:;" @click="$emit('prev')">上一步</a>
        <a href="javascript:;" class="btnColor" @click="next">填寫完成</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      projectThat: ['', '', '', '', '', '', ''],
      five_support_project: ''
    }
  },
  methods: {
    next () {
      const from = {
        five_support_project: this.five_support_project,
        projectThat: this.projectThat
      }
      this.$emit('next', from)
    }

  }
}
</script>

<style scoped lang='scss'>
@import './../../assets/style/mixin.scss';
.to-apply-for-c {
  .main {
    margin-top: 4.8rem;
    .main-a {
      .top {
        @include flex();
        h1 {
          font-size:2rem;
          font-weight:500;
          color:rgba(37,36,39,1);
          line-height:2.8rem;
        }
        .num {
          font-size:1.2rem;
          font-weight:500;
          color:rgba(37,36,39,1);
          line-height:2.8rem;
          span {
            font-size: 2rem;
            font-weight:500;
          }
        }
      }
      .link {
        width: 100%;
        height:.4rem;
        background:rgba(237,237,237,1);
        border-radius:.2rem;
        margin-top: 1.1rem;
        .links {
          width: 75%;
          height:.4rem;
          background:rgba(37,36,39,1);
          border-radius:.2rem;
        }
      }

      .form {
        width: 100%;
        margin-top: 3rem;
        @include flex();
        flex-wrap: wrap;
        .card {
          flex: 0 0 48%;
          display: flex;
          flex-direction: column;
          margin-bottom: 2.4rem;
          span {
            font-size:1.6rem;
            font-weight:400;
            color:rgba(37,36,39,1);
            line-height:2.2rem;
            margin-bottom: 1rem;
          }
          textarea {
            padding: 1.4rem 3rem;
            background:rgba(245,246,247,1);
            border:.1rem solid rgba(239,239,239,1);
            border-radius:.4rem;
            height: 8rem;
            font-size:1.6rem;
            font-weight:400;
            color:rgba(189,189,189,1);
            line-height:2.2rem;
          }
        }

      }
    }
    .card-box-f {

      h2 {
        font-size:2rem;
        margin-top: 4rem;
        font-weight:500;
        color:rgba(37,36,39,1);
        line-height:2.8rem;
      }
      .text {
         margin-top: 1rem;
        padding: 2rem;
        width: 100%;
        height:11rem;
        background:rgba(245,246,247,1);
        border-radius:.4rem;
        border:.1rem solid rgba(239,239,239,1);
        textarea {
          width: 100%;
          height: 80%;
          background:rgba(245,246,247,1);
          border: none;
          outline: none;
          font-size:1.6rem;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:2.2rem;
        }
        p {
          @include flex(flex-end);
          font-size:1.6rem;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:2.2rem;
        }
      }
    }
    .btn {
      @include flex(flex-end,center);
       margin-left: auto;
       margin-top: 8rem;
      a {
        width:31rem;
        height:5rem;
        display: inline-block;
        @include flex(center);
        background:rgba(255,255,255,1);
        color:rgba(37,36,39,1);
        border-radius:.4rem;
        font-size:1.6rem;
        font-weight:400;

        border:1px solid rgba(61,61,61,1);
        line-height:2.2rem;
      }
      .btnColor {
        background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
        color:rgba(255,255,255,1);
        margin-left: 2rem;
      }
    }
  }
}
</style>
