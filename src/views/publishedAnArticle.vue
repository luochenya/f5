<template>
  <div class="published-an-article">
     <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3">
          <el-breadcrumb-item><a href="javascript:;" @click="$router.push('/')">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;">我的文章</a></el-breadcrumb-item>
          <el-breadcrumb-item :class="{'checked': $route.meta.title}">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div class="centent">
        <div class="title">
          <div class="title-l">
            <h1>發表文章</h1>
            <p>PUBLISH AN ARTICLE</p>
          </div>
          <span><i class="icon-6"></i>在線預覽文章</span>
        </div>
        <div class="main">
          <div class="item-l">
            <h3>上傳首頁圖</h3>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadImg"
              >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <div v-else class="text">
                <img src="./../assets/imgs/upload.png" alt="">
                <h3>點擊添加圖片</h3>
                <p>支持jpg/gif/png格式  RGB模式，不超過10M</p>
              </div>
            </el-upload>
             <el-upload
              action=""
              class="btn-uploader"
              :show-file-list="false"
              :http-request="uploadImg"
              >
              <div class="btn">上傳首頁圖</div>
            </el-upload>

            <div class="card">
              <ul>
                <li v-for="(item,index) in cardList" :key="index" :class="{'on': typeIndex==item.id}" @click="check(index,item.id)">
                  {{item.class_name}}
                </li>
              </ul>
            </div>
          </div>
          <div class="item-r">
            <h3>文章標題</h3>
            <div class="card">
              <input type="text" placeholder="請填寫您的文章標題..." v-model="form.title" @input="ipt">
              <span>{{form.title ? form.title.length : 0}}/30</span>
            </div>
            <h3>文章標題</h3>
            <div class="text">
               <quill-editor v-model="form.content"></quill-editor>
              <!-- <textarea placeholder="請填寫您的文章内容..." v-model="form.content"></textarea> -->
              <span>0/6000</span>
            </div>
          </div>
        </div>
        <div class="bottom-content">
          <p>點擊確定送出後，其他用戶方可看到您的文章</p>
          <div class="btn">
            <span @click="cancel">取消</span>
            <a href="javascrpt:;" @click="addfrom(1)">儲存草稿</a>
            <a href="javascrpt:;" class="btn-color" @click="addfrom(2)">確定送出</a>
          </div>
        </div>
      </div>
    </div>
    <modal
      :showModal= "isShowModal"
      btnType='1'
      :imgShow = true
      @submit ="submit"
    >
      <template slot="body">
        <h3>確定要取消發文嗎</h3>
        <p>取消後將不會儲存您的文章</p>
      </template>
    </modal>
    <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import Modal from './../components/Modal'
import { uploadPicture, systemGetArticleClass, setInsertArticle, setInsertDraft } from './../api/request'
export default {
  name: 'published-an-article',
  components: {
    Modal
  },
  data () {
    return {
      imageUrl: '',
      cardList: [
        { text: '交通管理', isChecked: true },
        { text: '應用安全', isChecked: false },
        { text: '硬體', isChecked: false },
        { text: '雲服務', isChecked: false },
        { text: '資訊安全', isChecked: false }
      ],
      isShowModal: false,
      token: '',
      typeIndex: '',
      form: {
        title: '',
        class_id: '',
        imgs: []
      },
      isShowLoading: false
    }
  },
  mounted () {
    this.token = window.sessionStorage.getItem('token')
    this._systemGetArticleClass()
  },
  methods: {
    _systemGetArticleClass () {
      systemGetArticleClass({ headers: { token: this.token } }).then(res => {
        if (res.data.code === '200') {
          this.cardList = res.data.data.rows
        }
      })
    },
    ipt () {
      if (this.form.title.length > 30) {
        this.$message({
          message: '您的文章標題过长',
          type: 'warning'
        })
      }
    },
    addfrom (type) {
      // console.log(type)
      // eslint-disable-next-line camelcase
      const { title, class_id, imgs, content } = this.form
      let errMsg = ''
      if (!title) {
        errMsg = '請填寫您的文章標題'
      // eslint-disable-next-line camelcase
      } else if (!class_id) {
        errMsg = '請選擇文章分類'
      } else if (imgs.length > 1) {
        errMsg = '請選擇首頁圖片'
      } else if (!content) {
        errMsg = '請填寫您的文章内容'
      } else if (title.length > 30) {
        errMsg = '您的文章標題过长'
      }
      if (errMsg) {
        this.$message.error(errMsg)
        return
      }
      this.isShowLoading = true
      // console.log(this.form.imgs)
      const imgsArr = []
      this.form.imgs.forEach((v, i) => {
        imgsArr[i] = v
      })
      // console.log(imgsArr)
      var str = JSON.stringify(imgsArr)
      // console.log(str)
      this.form.imgs = str
      if (type === 1) {
        // console.log(type)
        setInsertDraft(this.form, { headers: { token: this.token } }).then(res => {
          if (res.data.code !== '200') {
            this.isShowLoading = false
            this.$message.error(res.data.msg)
          } else {
            this.isShowLoading = false
            this.$message.success(res.data.msg)
            this.reset()
          }
        })
      } else {
        setInsertArticle(this.form, { headers: { token: this.token } }).then(res => {
          if (res.data.code !== '200') {
            this.isShowLoading = false
            this.$message.error(res.data.msg)
            // this.from = {}
            // this.this.imageUrl = ''
          } else {
            this.isShowLoading = false
            this.$message.success(res.data.msg)
            this.reset()
          }
        })
      }
    },
    reset () {
      this.form = {
        title: '',
        class_id: '',
        imgs: []
      }
      this.imageUrl = ''
      this.typeIndex = ''
    },
    upload () {
      this.uploadImg()
    },
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
      UploadData.append('type', 'Article')
      const config = {
        headers: {
          token: this.token
        }
      }
      this.isShowLoading = true
      uploadPicture(UploadData, config).then(res => {
        if (res.data.code === '200') {
          this.imageUrl = this.imgs + res.data.data.path
          this.form.imgs.push(res.data.data.path)
          this.isShowLoading = false
        }
      })
    },
    handleAvatarSuccess (res, file) {
      // console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    check (index, id) {
      // this.cardList.forEach((item) => {
      //   item.isChecked = false
      // })
      // this.cardList[index].isChecked = true
      this.typeIndex = id
      this.form.class_id = id
    },
    cancel () {
      this.isShowModal = true
      this.noScroll()
    },
    submit () {
      this.isShowModal = false
      this.canScroll()
      this.form = {}
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang='scss'>
@import './../assets/style/mixin.scss';
.published-an-article {
  margin-top: 8rem;
  .centent {
    margin-top: 7rem;
    .title {
      margin-bottom: 2.8rem;
      @include flex(space-between,flex-start);
      .title-l {
        h1 {
          font-size:2.2rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:3rem;
        }
        p {
          font-size:1rem;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:1.4rem;
          margin-top: .2rem;
        }
      }
      span {
        // @include flex(flex-start,flex-end);
        margin-top: 2.6rem;
        font-size:1.4rem;
        font-weight:600;
        color:rgba(0,106,255,1);
        line-height:2rem;
        .icon-6 {
          color:rgba(0,106,255,1);
          margin-right: .3rem;
        }
      }
    }
    .main {
     display: flex;
     .item-l {
      flex: 0 0 28rem;
      h3 {
        font-size:1.4rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:2rem;
      }
      /deep/.el-upload {
        @include flex(center);
        width: 100%;
        height:20.6rem;
        background:rgba(245,246,247,1);
        border-radius:.6rem;
        margin-top: 1.2rem;
        overflow: hidden;
      }
      .text {
        h3 {
          margin-top: 1rem;
          font-size:1.4rem;
          font-weight:400;
          color:rgba(134,134,134,1);
          line-height:2rem;
        }
        p {
          font-size:1rem;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:1.8rem;
        }
      }
      .avatar {
         width: 100%;
        height:20.6rem;
        display: block;
      }
      .btn-uploader {
        // height: 5rem;
       /deep/.el-upload {
        height: 5rem;
        margin-top: 2rem;
        margin-bottom: 3rem;
        border-radius:.6rem;
        background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
       }
      }
      .btn {
        height:5rem;
        @include flex(center);
        font-size:1.4rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:2rem;
      }
      .card {
        ul{
          display: flex;
          flex-wrap: wrap;
          li {
            padding: .6rem 1rem .7rem  2.2rem;
            margin-right: 1.4rem;
            margin-bottom: 1.4rem;
            background: url('./../assets/imgs/card-1.png') no-repeat;
            box-sizing: border-box;
            font-size:12px;
            font-family:PingFang-SC-Regular,PingFang-SC;
            font-weight:400;
            color:rgba(37,36,39,1);
            line-height:1.7rem;
            cursor: pointer;
          }
          .on {
             background: url('./../assets/imgs/card-checked.png') no-repeat;
             color:rgba(255,255,255,1);
          }
        }
      }
     }
     .item-r {
      flex: 1;
      margin-left: 3rem;
      h3 {
        margin-bottom: 1.2rem;
        font-size:1.4rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:2rem;
      }
      .card {
        height:5rem;
        padding: 0 2rem;
        margin-bottom: 3rem;
        background:rgba(245,246,247,1);
        border-radius:.6rem;
        border:.1rem solid rgba(239,239,239,1);
        @include flex(flex-start,center);
        font-size:1.6rem;
        font-weight:400;
        color:rgba(189,189,189,1);
        line-height:2.2rem;
        input {
          flex: 1;
          border: none;
          background:rgba(245,246,247,1);
          font-size:1.6rem;
           font-weight:400;
        }
        span {
          margin-left: 1rem;
        }
      }
      .text {
        height:40rem;
        padding: 1.4rem 2rem 2rem;
        background:rgba(245,246,247,1);
        border-radius:.6rem;
        border:.1rem solid rgba(239,239,239,1);
        font-size:1.6rem;
        font-weight:400;
        color:rgba(189,189,189,1);
        line-height:2.2rem;
        .quill-editor {
          background:rgba(245,246,247,1);
          width: 100%;
          height: 80%;
          border: none;
          font-size:1.6rem;
          color:rgba(189,189,189,1);
          margin-bottom: 3.6rem;
        }
        span {
          @include flex(flex-end);
          margin-right: 1rem;
        }
      }
     }
    }
    .bottom-content {
      @include flex();
      p {
        font-size:1.4rem;
        font-weight:400;
        color:rgba(210,210,210,1);
        line-height:2rem;
      }
      .btn {
        @include flex(flex-start,center);
        margin-top: 4rem;
        font-size:1.4rem;
        font-family:PingFang-SC-Regular,PingFang-SC;
        font-weight:400;
        color:rgba(37,36,39,1);
        line-height:2rem;
        span {
          margin-right: 3rem;
          cursor: pointer;
        }
        a {
          @include flex(center);
          width:16rem;
          height:5rem;
          background:rgba(255,255,255,1);
          border-radius:.6rem;
          border:.1rem solid rgba(61,61,61,1);
        }
        .btn-color {
          margin-left: 2rem;
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          color:rgba(255,255,255,1);
        }
      }
    }
  }
  @media screen and (max-width: 991px){
    margin-top: 6rem;
  }
  @media screen and (max-width: 767px){
  .centent {
      margin-top: 4rem;
      margin-left: 1rem;
      margin-right: 1rem;
      .main {
      flex-wrap: wrap;
      .item-l {
        flex: 0 0 100%;
      }
      .item-r {
        margin-left: 0rem;
      }
      }
      .bottom-content {
        flex-wrap: wrap;
        p {
          width: 100%;
          margin-top: 2rem;
        }
        .btn {
          width: 100%;
          margin-top: 1rem;
          a {
            width:13rem;
            height:4rem;
          }
        }
      }
    }
  }
}
</style>
