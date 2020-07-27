<template>
  <div class="CreditApplication">
     <div class="container">
      <div class="centent">
        <div class="item-left">
          <div class="user" v-if="userInfo">
            <div class="img-box">
              <img v-if="userInfo &&userInfo.user_head" :src="`${path}${userInfo&& userInfo.user_head}`" alt="">
              <img v-else src="../../assets/imgs/head-portrait.svg" alt="">

            </div>
            <h3>{{userInfo.nick_name}}</h3>
            <!-- <p>創業我一直努力在努力</p> -->
            <div class="btn"><span></span>身份：{{userInfo.identity}}</div>
            <div class="card">
              <div class="card-l">
                <p>目前累計點數</p>
                <span>{{ userInfo.point }}</span>
              </div>
              <div class="card-l card-m">
                <p>目前發文總數</p>
                <span>{{ userInfo.my_article_count }}</span>
              </div>
            </div>
          </div>
          <div class="bottom-msg">
            <span @click="$router.push({path:'/memberCenter'})">會員資料修改</span>
            <div></div>
            <span @click="$router.push({path:'/myPublishedArticles'})">我發表的文章</span>
            <div></div>
            <span class="bottom-msg-active">點數申請<i class="icon-9"></i></span>
            <div></div>
            <span @click="$router.push({path:'/PointsRecord'})">點數記錄</span>
            <div></div>
            <span @click="$router.push({path:'/MallOrder'})">商城訂單查詢</span>
            <div></div>
            <span @click="$router.push({path:'/notificationCenter'})">通知中心</span>
          </div>
        </div>
        <div class="item-r">
          <div class="titles">
            <div class="title-l">
              <h1>點數申請</h1>
              <span>APPLICATION</span>
            </div>
            <div class="title_title">
              <h2>標題</h2>
              <input type="text" placeholder="請填寫您的標題..." v-model="form.title" />
            </div>
            <div class="title_title">
              <h2>內容</h2>
              <textarea placeholder="請填寫您的內容..." v-model="form.content"></textarea>
            </div>
          </div>
          <div class="title_file">
            <h2>佐證文件上傳</h2>
            <div class="title_file_img" v-for="(item, index) in form.evidence" :key="index">
              <img class="title_file_img_close" src="@/assets/imgs/close.png" alt="" @click="closeClick(index)" />
              <a v-if="imgTypes[index] == 0" target="_blank" :href="path + item" class="title_file_img_img">
                <img :src="path + item" alt="" />
              </a>
              <a v-if="imgTypes[index] == 1" :href="path + item" class="title_file_img_imgs">
                <img src="@/assets/imgs/wordImg.png" alt="" />
              </a>
              <span>{{evidenceNames[index]}}</span>
            </div>
             <el-upload
              class="title_file_update"
              action=""
              title_file_update
              :show-file-list="false"
              :http-request="uploadImg"
              >
              <img class="title_file_update_img" src="@/assets/imgs/addImg.png" alt="" />
            </el-upload>
          </div>
          <div class="title_laber">
            <div
              class="title_laber_default"
              :class="selectedStatus == index ? 'title_laber_Selected' : ''"
              v-for="(item, index) in classList"
              :key="index"
              @click="laberClick(index)"
            >{{item.class_name}}</div>
          </div>
          <div class="title_button">
            <div class="title_button_left" @click="cancelClick()">取消</div>
            <div @click="submitClick()">確定送出</div>
          </div>
        </div>
      </div>
    </div>
    <loading :show="isShowLoading"></loading> 
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
  </div>
</template>

<script>
import storage from '@/storage'
import { getPointsApplyClassList, uploadPicture, insertPointApply } from '@/api/request'
import Modal from '@/components/Modal'
export default {
  name: 'CreditApplication',
  components: {
    Modal
  },
  data () {
    return {
      isShowModal: false,
      isShowLoading: false,
      userInfo: storage.getItem('userInfo'),
      token: window.sessionStorage.getItem('token'),
      path: this.imgs,
      selectedStatus: 0,
      classList: [],
      form: {
        evidence: [],
        title: '',
        content: '',
        class_id: ''
      },
      imgTypes: [],
      evidenceNames: []
    }
  },
  created() {
    this._getPointsApplyClassList()
  },
  methods: {
    // 确认取消
    submit () {
      this.isShowModal = false
      this.canScroll()
      this.evidenceNames = []
      this.selectedStatus = 0
      this.form = {
        evidence: [],
        title: '',
        content: '',
        class_id: ''
      }
      this.$router.push({path:'/PointsApplication'})
    },
    // 取消新增
    cancelClick () {
      this.canScroll()
      this.isShowModal = true
      // this.evidenceNames = []
      // this.selectedStatus = 0
      // this.form = {
      //   evidence: [],
      //   title: '',
      //   content: '',
      //   class_id: ''
      // }
      // this.$router.push({path:'/PointsApplication'})
    },
    // 刪除圖片
    closeClick (index) {
      this.form.evidence.splice(index, 1)
      this.imgTypes.splice(index, 1)
      this.evidenceNames.splice(index, 1)
    },
    // 提交申請
    submitClick() {
      if (!this.form.title) {
        this.$message.error('標題不能為空')
        return false
      }
      if (!this.form.content) {
        this.$message.error('內容不能為空')
        return false
      }
      this.isShowLoading = true
      let form = {
        evidence: JSON.stringify(this.form.evidence),
        title: this.form.title,
        content: this.form.content,
        class_id: this.form.class_id
      }
      insertPointApply(form, { headers: { token: this.token } }).then(res => {
        this.isShowLoading = false
        if (res.data.code !== '200') {
          this.$message.error(res.data.msg)
        } else {
          this.$router.push({path:'/PointsApplication'})
        }
      })
    },
    // 切換分類
    laberClick(index) {
      this.selectedStatus = index
      this.form.class_id = this.classList[index].id
    },
    // 獲取分類列表
    _getPointsApplyClassList () {
      this.isShowLoading = true
      getPointsApplyClassList({ headers: { token: this.token } }).then(res => {
        this.isShowLoading = false
        if (res.data.code !== '200') {
          this.$message.error(res.data.msg)
        } else {
          this.classList = res.data.data.rows
          this.form.class_id = res.data.data.rows[0].id
        }
      })
    },
    // 圖片上傳
    uploadImg (file) {
      // const isJPG = 'jpg,gif,png'
      // const name = file.file.name.split('.')
      // const imgName = name[name.length - 1]
      // if (isJPG.indexOf(imgName.toLowerCase()) === -1) {
      //   this.$message.error('上傳頭像圖片只能是 jpg/gig/png 格式!')
      //   return false
      // }
      // const isLt2M = file.file.size / 1024 / 1024 < 10
      // if (!isLt2M) {
      //   this.$message.error('上傳圖片大小不能超過 10MB!')
      //   return false
      // }
      var UploadData = new FormData()
      UploadData.append('file', file.file)
      UploadData.append('type', 'points_apply')
      const config = {
        headers: {
          token: this.token
        }
      }
      this.isShowLoading = true
      uploadPicture(UploadData, config).then(res => {
        this.isShowLoading = false
        if (res.data.code === '200') {
          const isJPG = 'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp'
          const name = res.data.data.path.split('.')
          const imgName = name[name.length - 1]
          if (isJPG.indexOf(imgName.toLowerCase()) === -1) {
            this.imgTypes.push(1)
          } else {
            this.imgTypes.push(0)
          }
          this.form.evidence.push(res.data.data.path)
          this.evidenceNames.push(file.file.name)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
  }
}
</script>

<style lang='scss'>
@import '@/assets/style/mixin.scss';
.CreditApplication {
  margin-top: 8rem;
  background:rgba(245,246,247,1);
  .centent {
    padding-top: 4rem;
    @include flex(space-between,flex-start);
    .item-left {
      width: 28rem;
      flex: 0 0 28rem;
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
            @include bgImg(1.2rem,1.2rem,'../../assets/imgs/icon/icon-center.png');
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
        .bottom-msg-active {
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
      margin-bottom: 10rem;
      .titles {
        .title-l {
          h1 {
            font-size:2.2rem;
            font-weight:600;
            color:rgba(37,36,39,1);
            line-height:3rem;
            em {
              cursor: pointer;
              display: inline-block;
              font-size:1.4rem;
              color:rgba(0,106,255,1);
              line-height:2rem;
              margin-left: 4rem;
              text-decoration: underline;
            }
          }
          span {
            margin-top: .2rem;
            font-size:1rem;
            font-weight:400;
            color:rgba(189,189,189,1);
            line-height:1.4rem;
          }
        }
        .title_title {
          margin-top: 3rem;
          h2 {
            font-size:1.4rem;
            font-weight:600;
            color:rgba(37,36,39,1);
            line-height:2rem;
            margin-bottom: 1rem;
          }
          input {
            padding: 0 5%;
            width: 100%;
            height: 5rem;
            background:rgba(245,246,247,1);
            border-radius:6px;
            border:1px solid rgba(239,239,239,1);
          }
          ::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
            font-size:16px;
            color:rgba(189,189,189,1);
            line-height:22px;
          }
          ::-moz-placeholder { /* Firefox 19+ */  
            font-size:16px;
            color:rgba(189,189,189,1);
            line-height:22px;
          }
          :-ms-input-placeholder { /* IE 10+ */ 
            font-size:16px;
            color:rgba(189,189,189,1);
            line-height:22px;
          }
          :-moz-placeholder { /* Firefox 18- */ 
            font-size:16px;
            color:rgba(189,189,189,1);
            line-height:22px;
          }
          textarea {
            padding: 1rem 5%;
            resize:none;
            width: 100%;
            height:11rem;
            background:rgba(245,246,247,1);
            border-radius:6px;
            border:1px solid rgba(239,239,239,1);
          }
          textarea::-webkit-input-placeholder {
            font-size:16px;
            color:rgba(189,189,189,1);
            line-height:22px;
          }
        }
      }
      .title_file {
        margin-top: 3rem;
        padding-bottom: 3rem;
        h2 {
          font-size:1.4rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2rem;
          margin-bottom: 1rem;
        }
        .title_file_img {
          float: left;
          margin-right: 3rem;
          margin-bottom: 3rem;
          position: relative;
          width: 7rem;
          height: 7rem;
          border-radius:4px;
          .title_file_img_close {
            cursor: pointer;
            position: absolute;
            right: -0.7rem;
            top: -0.7rem;
            width: 1.4rem;
            height: 1.4rem;
          }
          .title_file_img_img {
            img {
              width: 100%;
              height: 100%;
            }
          }
          .title_file_img_imgs {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background:rgba(245,246,247,1);
            border-radius:4px;
            img {
              width: 4.4rem;
              height: 4.8rem;
            }
          }
          span {
            width: 100%;
            display: block;
            position: absolute;
            bottom: -20px;
            left: 0;
            text-align: center;
            font-size:10px;
            color:rgba(134,134,134,1);
            line-height:14px;
            overflow:hidden;
            white-space:nowrap; /*不允许换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
          }
        }
        .title_file_update {
          display: inline-block;
          width: 7rem;
          height: 7rem;
          .title_file_update_img {
            width: 7rem;
            height: 7rem;
          }
        }
      }
      .title_laber {
        margin-top: 3rem;
        .title_laber_default {
          margin-bottom: 1rem;
          cursor: pointer;
          margin-right: 3rem;
          display: inline-block;
          font-size:12px;
          color:rgba(37,36,39,1);
          line-height:17px;
          padding: 7px 10px 7px 22px;
          background: url('../../assets/imgs/card-1.png') no-repeat;
          background-size: 100% 100%;
        }
        .title_laber_Selected {
          color:rgba(255,255,255,1);
          background: url('../../assets/imgs/card-checked.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .title_button {
        padding: 4rem 0;
        float: right;
        div {
          margin-left: 2rem;
          cursor: pointer;
          display: inline-block;
          width:15rem;
          height:5rem;
          font-size:1.4rem;
          color:rgba(255,255,255,1);
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          border-radius:6px;
          line-height:5rem;
          text-align: center;
        }
        .title_button_left {
          color:rgba(37,36,39,1);
          background:rgba(255,255,255,1);
          border:1px solid rgba(61,61,61,1);
        }
      }
    }
  }
  @media screen and (max-width: 1199px) {
    .centent {
      .item-left {
        margin-right: 2rem;
      }
      .item-r {
        padding: 3rem 2.5rem 0;
      }
    }
  }
  @media screen and (max-width: 991px) {
    .centent {
      overflow-x: auto;
    }
  }
  @media screen and (max-width: 767px) {
    .centent {
      padding:1.5rem;
      flex-wrap: wrap;
      width: 100%;
      .item-r {
        margin-bottom: 0;
        overflow-x: auto;
        .title_laber {
          margin-top: 1rem;
          .title_laber_default {
            margin-right: 1rem;
          }
        }
        .title_button {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 2rem 0;
          div {
            width: 45%;
            margin-left: 0;
          }
        }
      }
     .item-left {
        width: 100%;
        flex: 0 0 100%;
        margin-right: 0rem;
        margin-bottom: 1rem;
      }
    }
  }

}
</style>
