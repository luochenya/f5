<template>
  <div class="member-center">
    <div class="container">
      <div class="centent">
        <div class="item-l">
          <div class="user">
            <div class="img-box">
              <el-upload
                action=""
                :show-file-list="false"
                :http-request="uploadImg"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div v-else class="text">
                  <!-- <img src="./../assets/imgs/head-portrait.svg" alt=""> -->
                   <img v-if="userInfo &&userInfo.user_head" :src="`${path}${userInfo&& userInfo.user_head}`" alt="">
                   <img v-else src="./../assets/imgs/head-portrait.svg" alt="">
                  <!-- <h3>點擊添加圖片</h3>
                  <p>支持jpg/gif/png格式  RGB模式，不超過10M</p> -->
                </div>
              </el-upload>
              <!-- <img src="./../assets/imgs/head-portrait.svg" alt=""> -->
            </div>
            <h3 v-if="userInfo">{{userInfo.nick_name}}</h3>
            <!-- <p>創業我一直努力在努力</p> -->
            <div class="btn"  v-if="userInfo"><span></span>身份：{{userInfo.identity}}</div>
            <div class="card">
              <div class="card-l">
                <p>目前累計點數</p>
                <span>0</span>
              </div>
              <div class="card-l card-m">
                <p>目前發文總數</p>
                <span>0</span>
              </div>
            </div>
          </div>
          <div class="bottom-msg">
            <span>會員資料修改<i class="icon-9"></i></span>
            <div></div>
            <span @click="$router.push({path:'/myPublishedArticles'})">我發表的文章</span>
          </div>
        </div>
        <div class="item-r">
          <div class="title">
            <h1>會員資料修改</h1>
            <span>MEMBER INFORMATION MODIFICATION</span>
          </div>
          <form :model="form" :rules="rules">
            <div class="form">
              <div class="form-item">
                <h2>公司訊息</h2>
                <div class="item-input" :class="{'checked': errStatus1}">
                  <label :prop="prop.company_name">
                    <span>公司名稱</span>
                    <input type="text" placeholder="請填寫公司名稱" v-model="form.company_name" @blur.prevent="changeIpt('company_name')">
                  </label>
                    <div :class="{'error': errStatus1}"><span></span>{{errMessage1}}</div>
                </div>
                <div class="item-input" :class="{'checked': errStatus2}">
                  <label :prop="prop.rank">
                    <span>職稱</span>
                    <input type="text" placeholder="請填寫職稱" v-model="form.rank" @blur.prevent="changeIpt('rank')">
                  </label>
                 <div :class="{'error': errStatus2}"><span></span>{{errMessage2}}</div>
                </div>
                <div class="item-input" :class="{'checked': errStatus3}">
                  <label :prop="prop.tax_id">
                      <span>統編</span>
                      <input type="text" placeholder="請填寫公司統編" v-model="form.tax_id" @blur.prevent="changeIpt('tax_id')">
                  </label>
                 <div :class="{'error': errStatus3}"><span></span>{{errMessage3}}</div>
                </div>
                <div class="item-input" :class="{'checked': errStatus4}">
                  <label :prop="prop.company_email">
                      <span>電子郵件</span>
                      <input type="text" placeholder="請輸入公司電子郵件" v-model="form.company_email" @blur.prevent="changeIpt('company_email')">
                  </label>
                  <div :class="{'error': errStatus4}"><span></span>{{errMessage4}}</div>
                </div>
              </div>
              <div class="form-item">
                <h2>個人訊息</h2>
                <div class="item-input" :class="{'checked': errStatus5}">
                  <label :prop="prop.nick_name">
                    <span>姓名</span>
                    <input type="text" placeholder="請填寫姓名" v-model="form.nick_name" @blur.prevent="changeIpt('nick_name')">
                  </label>
                   <div :class="{'error': errStatus5}"><span></span>{{errMessage5}}</div>
                </div>
                <div class="item-input" :class="{'checked': errStatus6}">
                  <label :prop="prop.phone">
                    <span>電話/手機</span>
                    <input type="text" placeholder="請輸入電話號碼" v-model="form.phone" @blur.prevent="changeIpt('phone')">
                  </label>
                  <div :class="{'error': errStatus6}"><span></span>{{errMessage6}}</div>
                </div>
              </div>
              <div class="form-tip">
                <h3 v-if="userInfo">帳號：{{userInfo.accounts}}</h3><a href="javascript:;" @click="istoModal">修改登入密碼</a>
              </div>
              <div class="form-btn" @click="modifyThe">儲存修改</div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <resetas-psword-modal
      :showModal="isResetasPswordModal"
      @isShowModal="submit"
      ></resetas-psword-modal>
      <modal
        :showModal = "isShowModal"
        :imgShow = true
        btnType = "1"
        @submit = "isNoModal"
      >
        <template slot="body">
          <h3>密碼已更新</h3>
          <p>請使用新密碼重新登入</p>
        </template>
      </modal>
      <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import ResetasPswordModal from './../components/ResetasPswordModal'
import Modal from './../components/Modal'
import storage from './../storage'
import { setUserInfo, getUserInfo, uploadPicture } from './../api/request'
export default {
  name: 'member-center',
  components: {
    ResetasPswordModal,
    Modal
  },
  data () {
    return {
      isShowLoading: false,
      isResetasPswordModal: false,
      isShowModal: false,
      userInfo: storage.getItem('userInfo'),
      imageUrl: '',
      form: {
        company_name: '',
        nick_name: '',
        rank: '',
        tax_id: '',
        company_email: '',
        phone: ''
      },
      prop: {
        company_name: 'company_name',
        rank: 'rank',
        tax_id: 'tax_id',
        company_email: 'company_email',
        nick_name: 'nick_name',
        phone: 'phone'
      },
      errMessage1: '',
      errStatus1: false,
      errMessage2: '',
      errStatus2: false,
      errMessage3: '',
      errStatus3: false,
      errMessage4: '',
      errStatus4: false,
      errMessage5: '',
      errStatus5: false,
      errMessage6: '',
      errStatus6: false,
      rules: {
        company_name: [{ required: true, message: '請填寫公司名稱' }],
        rank: [{ required: true, message: '請填寫職稱' }],
        tax_id: [{ required: true, message: '請填寫公司統編' }],
        company_email: [{ required: true, message: '請輸入公司電子郵件' }],
        nick_name: [{ required: true, message: '請輸入姓名' }],
        phone: [{ required: true, message: '請輸入您的電話號碼' }]
      },
      token: '',
      path: this.imgs,
      imgs: ''
    }
  },
  mounted () {
    // this.userInfo = storage.getItem('userInfo')
    this.token = window.sessionStorage.getItem('token')
  },
  methods: {
    uploadImg (file) {
      const isJPG = 'jpg,gif,png'
      const name = file.file.name.split('.')
      const imgName = name[name.length - 1]
      if (isJPG.indexOf(imgName.toLowerCase()) === -1) {
        this.$message.error('上傳頭像圖片只能是 jpg/gig/png 格式!')
        return false
      }
      const isLt2M = file.file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('上傳圖片大小不能超過 10MB!')
        return false
      }
      var UploadData = new FormData()
      UploadData.append('file', file.file)
      UploadData.append('type', 'user_head')
      const config = {
        headers: {
          token: this.token
        }
      }
      this.isShowLoading = true
      uploadPicture(UploadData, config).then(res => {
        console.log(res, 't')
        if (res.data.code === '200') {
          this.imageUrl = this.path + res.data.data.path
          this.imgs = res.data.data.path
          this.isShowLoading = false
        }
      })
    },
    istoModal () {
      this.isResetasPswordModal = true
      this.noScroll()
    },
    submit () {
      this.isResetasPswordModal = false
      this.isShowModal = true
    },
    isNoModal () {
      this.isShowModal = false
      this.canScroll()
      this.$router.push('/login')
      window.sessionStorage.clear()
    },
    changeIpt (type) {
      if (type === 'company_name') {
        this.validator(this.prop.company_name)
      } else if (type === 'rank') {
        this.validator(this.prop.rank)
      } else if (type === 'tax_id') {
        this.validator(this.prop.tax_id)
      } else if (type === 'company_email') {
        this.validator(this.prop.company_email)
      } else if (type === 'nick_name') {
        this.validator(this.prop.nick_name)
      } else {
        this.validator(this.prop.phone)
      }
    },
    // 验证
    validator (item) {
      const rules = this.rules[item]
      const value = this.form[item]
      const descriptor = { [item]: rules }
      const schema = new this.Schema(descriptor)
      schema.validate({ [item]: value }, errors => {
        if (errors) {
          if (item === 'company_name') {
            this.errMessage1 = errors[0].message
            this.errStatus1 = true
          } else if (item === 'rank') {
            this.errMessage2 = errors[0].message
            this.errStatus2 = true
          } else if (item === 'tax_id') {
            this.errMessage3 = errors[0].message
            this.errStatus3 = true
          } else if (item === 'company_email') {
            this.errMessage4 = errors[0].message
            this.errStatus4 = true
          } else if (item === 'nick_name') {
            this.errMessage5 = errors[0].message
            this.errStatus5 = true
          } else {
            this.errMessage6 = errors[0].message
            this.errStatus6 = true
          }
          return false
        } else {
          if (item === 'company_name') {
            this.errMessage1 = ''
            this.errStatus1 = ''
          } else if (item === 'rank') {
            this.errMessage2 = ''
            this.errStatus2 = ''
          } else if (item === 'tax_id') {
            this.errMessage3 = ''
            this.errStatus3 = ''
          } else if (item === 'company_email') {
            this.errMessage4 = ''
            this.errStatus4 = ''
          } else if (item === 'nick_name') {
            this.errMessage5 = ''
            this.errStatus5 = ''
          } else if (item === 'phone') {
            this.errMessage6 = ''
            this.errStatus6 = ''
          }
        }
      })
    },
    // 存儲修改
    modifyThe () {
      for (const item in this.prop) {
        this.validator(item)
      }
      // eslint-disable-next-line camelcase
      const { company_name, rank, tax_id, company_email, nick_name, phone } = this.form
      // eslint-disable-next-line camelcase
      if (company_name && rank && tax_id && company_email && nick_name && phone &&
      !this.errStatus1 && !this.errStatus2 && !this.errStatus3 && !this.errStatus4 && !this.errStatus5 && !this.errStatu6) {
        const form = {
          company_name,
          rank,
          tax_id,
          company_email,
          nick_name,
          phone,
          user_head: this.imgs
        }
        setUserInfo(form, { headers: { token: this.token } }).then(res => {
          console.log('66', res)
          if (res.data.code !== '200') {
            this.$message({
              duration: '2000',
              message: res.data.msg,
              type: 'warning'
            })
          } else {
            this.$message({
              duration: '2000',
              message: res.data.msg,
              type: 'success'
            })
            this.form = {}
            this.imgs = ''
            getUserInfo({ headers: { token: this.token } }).then(res => {
              console.log('66', res)
              if (res.data.code === '200') {
                storage.setItem('userInfo', res.data.data)
                this.userInfo = res.data.data
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style lang='scss'>
@import './../assets/style/mixin.scss';
.member-center {
  margin-top: 8rem;
  padding-bottom: 13rem;
  background:rgba(245,246,247,1);
  .centent {
    padding-top: 4rem;
    @include flex(space-between,flex-start);
    .item-l {
      width: 28rem;
      margin-right: 3rem;
      .user {
        @include flex(center);
        flex-direction: column;
        padding: 3rem 1.9rem 4rem;
        background:rgba(255,255,255,1);
        border-radius:.6rem;
        .img-box {
          width: 10rem;
          height: 10rem;
          margin-bottom: 1rem;
          border-radius: 50%;
          overflow: hidden;
          box-sizing: border-box;
          .el-upload {
            width: 100%;
            height: 100%;
          }
          img {
            width: 100%;
          }
        }
        h3 {
          font-size:1.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
        }
        p {
          margin-top: .1rem;
          font-size:1.3rem;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:1.8rem;
        }
        .btn {
          @include flex(center);
          // width:10rem;
          padding: 0 1.4rem;
          height:2.4rem;
          margin-top: .6rem;
          background:rgba(0,106,255,1);
          border-radius:1.4rem;
          font-size:1.1rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:1.6rem;
          span {
            @include bgImg(1.2rem,1.2rem,'./../assets/imgs/icon/icon-center.png');
            margin-right: .6rem;
          }
        }
        .card {
          width: 100%;
          @include flex();
          margin-top: 3rem;
          .card-l {
            flex: 1;
            text-align: center;
            padding: 1rem 0 .9rem 0;
            background:rgba(255,255,255,1);
            box-shadow:0 1.2rem 4rem 0 rgba(245,246,247,1);
            border-radius:.8rem;
            p {
              font-size:1.2rem;
              font-weight:500;
              color:rgba(189,189,189,1);
              line-height:1.7rem;
            }
            span {
              margin-top: .2rem;
              font-size:1.6rem;
              font-weight:500;
              color:rgba(37,36,39,1);
              line-height:2.2rem;
            }
          }
          .card-m {
            margin-left: 1.4rem;
          }
        }
      }
      .bottom-msg {
        margin-top: 1rem;
        text-align: center;
        padding: 0 1.9rem 0;
        background:rgba(255,255,255,1);
        border-radius:.6rem;
        span {
          padding: 1.9rem 0 1.9rem;
          display: inline-block;
          font-size:1.6rem;
          font-weight:400;
          color:rgba(134,134,134,1);
          cursor: pointer;
          line-height:2.2rem;
        }
        span:first-child {
          position: relative;
          color:rgba(37,36,39,1);
          .icon-9 {
            position: absolute;
            line-height:2.2rem;
            right: -2.5rem;
          }
        }
        div {
          height:.1rem;
          background:rgba(240,240,240,1);
        }
      }
    }
    .item-r {
      flex: 1;
      padding: 4rem 4rem 0;
      background:rgba(255,255,255,1);
      border-radius:.6rem;
      .title {
        h1 {
          font-size:2.2rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:3rem;
        }
        span {
          margin-top: .2rem;
          font-size:1rem;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:1.4rem;
        }
      }
      .form {
        margin-top: 2.8rem;
        .form-item {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          h2 {
            height:2.2rem;
            font-size:1.6rem;
            width: 100%;
            font-weight:600;
            color:rgba(37,36,39,1);
            line-height:2.2rem;
            margin-bottom: 1rem;
          }
          .item-input {
            position: relative;
            @include flex(flex-start,center);
            width:35rem;
            height:5rem;
            background:rgba(255,255,255,1);
            border-radius:.4rem;
            border:.1rem solid rgba(61,61,61,1);
            margin-bottom: 2.4rem;
            label {
              line-height:2.2rem;
              cursor: pointer;
              span {
                width: 7.1rem;
                display: inline-block;
                font-size:1.6rem;
                font-weight:400;
                margin: 0 1.4rem 0 2rem;
                color:rgba(37,36,39,1);
              }
              input {
                font-size:1.6rem;
                border:none;
                color:#BDBDBD;
              }
            }
            .error {
              position: absolute;
              right: 0;
              bottom: -2rem;
              margin-top: .4rem;
              font-size:1.2rem;
              font-weight:500;
              color:rgba(235,54,44,1);
              line-height:1.7rem;
              span {
                @include bgImg(.8rem,1.3rem,'./../assets/imgs/icon/erorr.png');
                margin: 0 .4rem;
              }
            }
          }
          .input-w {
            width: 100%;
          }

        }
        .form-tip {
          @include flex();
          font-size:1.6rem;
          line-height:2.2rem;
          h3 {
            color:rgba(37,36,39,1);
            font-weight:600;
          }
          a {
            font-weight:400;
            color:rgba(0,106,255,1);
            text-decoration: underline;
          }
        }
        .form-btn {
          @include flex(center);
          margin: 5rem 0 5rem auto;
          width:35rem;
          height:4.4rem;
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          box-shadow:0 1rem 3rem 0 rgba(41,41,44,0.1);
          border-radius:.6rem;
          font-size:1.4rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:2rem;
          cursor: pointer;
        }
        .checked {
          border:.1rem solid rgba(235,54,44,1)!important;
        }
      }
    }
  }
  @media screen and (max-width: 1199px) {
    .centent {
      .item-r {
        .title {
          text-align: center;
        }
        .form {
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          .form-item {
            .item-input {
              width:100%;
              height:5rem;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 991px) {
    margin-top: 6rem;
    .centent {
      .item-r {
        .title {
          text-align: center;
        }
        .form {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          .form-item {
            .item-input {
              width:100%;
              height:5rem;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
     padding-bottom: 3rem;
    .centent {
      padding:1.5rem;
      flex-wrap: wrap;
      .item-l {
        width: 100%;
        margin-right: 0rem;
        margin-bottom: 1rem;
      }
      .item-r {
        padding: 4rem 1.5rem 0;
        .form {
          width: 100%;
          .form-item {
            .item-input {
              width:100%;
              label {
                display: flex;
                width: 100%;
                input {
                  width: 20.1rem;
                }
              }
            }
          }
          .form-btn {
            @include flex(center);
            width:100%;
          }
        }
      }
    }
  }
}
</style>
