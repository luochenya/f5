<template>
  <div class="nav-footer-tow">
    <div class="container">
      <div class="top-title">
        <div class="item-content">
          <p>YOUR APPS—FAST, AVAILABLE, AND SECURE—IN ANY CLOUD.</p>
          <div class="text">
            <p>With 20+ years of application service experience, F5 provides the broadest set of services and</p>
            <p>security for enterprise-grade apps, whether on-premises or across any multi-cloud environment.</p>
          </div>
        </div>
        <div class="tip">
          <div class="left-text">
            <a>HAVE A QUESTION? </a>
            <span>|</span>
            <a>Support and Sales ›</a>
          </div>
          <div class="right-icon">
            <a>FOLLOW US</a>
            <div class="item-icon">
              <a></a>
              <a></a>
              <a></a>
              <a></a>
              <a></a>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="num">
          <div class="num-item">
            <h1>48</h1>
            <p><span>of the Fortune 50</span><span>rely on F5</span></p>
          </div>
          <div class="num-item num-ml">
            <h1>85</h1>
            <p><span>offices in 43</span><span>countries</span></p>
          </div>
          <div class="num-item">
            <h1>20</h1>
            <p><span>plus years</span><span>protecting apps</span></p>
          </div>
        </div>
        <div class="line"></div>
        <div class="link">
          <div class="link-item">
            <div class="title"><span></span>ABOUT F5</div>
            <ul>
              <li><a >Corporate Information</a></li>
              <li><a >Newsroom</a></li>
              <li><a >Investor Relations</a></li>
              <li><a >Careers</a></li>
              <li><a >Contact Information</a></li>
              <li><a >Communication Preferences</a></li>
              <li><a >Product Certifications</a></li>
              <li><a >Diversity & Inclusion</a></li>
            </ul>
          </div>
          <div class="link-item link-item-ml">
            <div class="title">EDUCATION</div>
            <ul>
              <li><a >Training</a></li>
              <li><a >Professional Certification</a></li>
              <li><a >LearnF5</a></li>
              <li><a >Free Online Training</a></li>
            </ul>
          </div>
          <div class="link-item">
            <div class="title">F5 SITES</div>
            <ul>
              <li><a >F5.com</a></li>
              <li><a >DevCentral</a></li>
              <li><a >Support Portal</a></li>
              <li><a >Partner Central</a></li>
              <li><a >F5 Labs</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>©2020 F5, Inc. All rights reserved.</p>
          <p>Policies<span>|</span>Privacy<span>|</span>Trademarks</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer-tow',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import './../assets/style/mixin.scss';
.nav-footer-tow {
  width: 100%;
  background:rgba(37,36,39,1);
  padding: 10rem 0 8.8rem 0;
  box-sizing: border-box;
  .top-title {
    .item-content{
      text-align: center;
      >p {
        font-size:2.1rem;
        font-weight:600;
        color:rgba(255,255,255,1);
        line-height:2.9rem;
      }
      .text {
        margin-top: 5rem;
        p {
          font-size:1.9rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:2.6rem;
        }
      }
    }
    .tip {
      @include flex();
      margin-top: 11rem;
      margin-bottom: 10.2rem;
      .left-text {
        line-height:2.4rem;
        a,span{
          font-size:1.7rem;
          font-weight:600;
          color:rgba(255,255,255,1);
        }
        span {
          margin: 0 3rem;
        }
      }
      .right-icon {
        @include flex();
        > a {
          font-size:1.7rem;
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:2.4rem;
        }
        .item-icon {
          a {
            margin-left: 4.1rem;
          }
          a:nth-of-type(1) {
            @include bgImg(2.3rem,1.8rem,'./../assets/imgs/icon/link-icon-1.png');
            margin-left: 6.8rem;
          }
          a:nth-of-type(2) {
            @include bgImg(2rem,2rem,'./../assets/imgs/icon/link-icon-2.png');
          }
          a:nth-of-type(3) {
            @include bgImg(1rem,2rem,'./../assets/imgs/icon/link-icon-3.png');
          }
          a:nth-of-type(4) {
            @include bgImg(1.7rem,2rem,'./../assets/imgs/icon/link-icon-4.png');
          }
          a:nth-of-type(5) {
            @include bgImg(1.6rem,2rem,'./../assets/imgs/icon/link-icon-5.png');
          }
        }
      }
    }
    .line {
      width: 100%;
      height:.1rem;
      background:rgba(247,248,250,1);
      opacity:0.2;
    }
    .num {
      @include flex(center);
      padding: 9.8rem 0;
      .num-item {
        display: flex;
        h1 {
          font-size:6rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:8.4rem;
        }
        p {
          @include flex(center,flex-start);
          margin-left: 1.2rem;
          flex-direction: column;
          font-size:1.7rem;
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:2.4rem;
        }

      }
      .num-ml {
        margin: 0 11.4rem 0 11.4rem;
      }
    }
    .link {
      @include flex(center,flex-start);
    }
    .link-item {
      .title {
        @include flex(flex-start,center);
        margin-top: 10.4rem;
        margin-bottom: 2rem;
        font-size:2rem;
        font-weight:600;
        color:rgba(255,255,255,1);
        line-height:2.8rem;
        span {
           @include bgImg(2.4rem,2.4rem,'./../assets/imgs/icon/link-icon-f5.png');
           margin-right: 1rem;
        }
      }
      ul{
        li a {
          font-size:2rem;
          font-family:PingFang-SC-Regular,PingFang-SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:4.4rem;
        }
      }
    }
    .link-item-ml {
      margin-left: 14rem;
      margin-right: 14rem;
    }
    .footer-bottom {
      padding: 8.8rem 0 7.7rem 0;
      text-align: center;
      p {
        font-size:1.8rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:3rem;
        span {
          margin: 0 2rem;
        }
      }
    }
  }
  @media screen and (max-width:991px) {
    padding: 5rem 0 4.4rem 0;
    .top-title {
      .item-content {
        >p {
          font-size: 1.8rem;
          line-height: 2rem;
        }
        .text {
          margin-top: 2rem;
          p {
            font-size: 1.4rem;
          }
        }
      }
      .tip {
        margin-top: 5.5rem;
        margin-bottom: 5.1rem;
        .left-text {
          line-height: 2rem;
          a,span {
            font-size: 1.4rem;
          }
          span {
            margin: 0 1.6rem;
          }
        }
        .right-icon {
          >a {
            font-size: 1.4rem;
            line-height: 2rem;
          }
          .item-icon {
            a {
              margin-left: 3rem;
            }
            a:nth-of-type(1) {
              margin-left: 4.8rem;
            }
          }
        }
      }
      .num {
        padding: 3.9rem 0;
        .num-item {
          h1 {
            font-size: 3.6rem;
          }
          p {
            font-size: 1.4rem;
            line-height: 1.8rem;
          }
        }
      }
      .link-item {
        .title {
          margin-top: 5.2rem;
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
        ul {
          li a {
            font-size: 1.6rem;
            line-height: 3.6rem;
          }
        }
      }
      .footer-bottom {
        padding: 4.4rem 0 3.8rem 0;
      }
    }
  }
@media screen and (max-width:767px) {
   padding: 3rem 1rem 2.4rem 1rem;
  .top-title {
    .item-content {
      >p {
        font-size: 1.6rem;
        line-height: 2rem;
      }
      .text {
        margin-top: 1rem;
        p {
          font-size: 1.2rem;
        }
      }
    }
    .tip {
      margin-top: 2.5rem;
      margin-bottom: 3.1rem;
      flex-direction: column;
      .left-text {
        line-height: 2rem;
        a,span {
          font-size: 1.2rem;
        }
        span {
          margin: 0 .6rem;
        }
      }
      .right-icon {
        margin-top: 2rem;
        >a {
          font-size: 1.2rem;
          line-height: 2rem;
        }
        .item-icon {
          a {
            margin-left: 1rem;
          }
          a:nth-of-type(1) {
            margin-left: 2.8rem;
          }
        }
      }
    }
    .num {
      width: 100%;
      padding: 1.9rem 0;
      .num-item {
        width: 33.3333%;
        h1 {
          font-size: 1.8em;
        }
        p {
          margin-left: .6rem;
          font-size: 1rem;
          line-height: 1.6rem;
        }
      }
      .num-ml {
        margin: 0 1rem 0 1rem;
      }
    }
    .link-item {
      .title {
        margin-top: 3.2rem;
        font-size: 1.6rem;
        margin-bottom: 1rem;
        span {
           @include bgImg(1.8rem,1.8rem,'./../assets/imgs/icon/link-icon-f5.png');
           margin-right: .6rem;
        }
      }
      ul {
        li a {
          font-size: 1.4rem;
          line-height: 2.8rem;
        }
      }
    }
    .link-item-ml {
      margin-left: 1rem;
      margin-right: 1rem;
    }
    .footer-bottom {
      padding: 2.4rem 0 1.8rem 0;
    }
  }
}
}
</style>
