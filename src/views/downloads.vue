<template>
  <div class="downloads">
    <div class="img-box">
      <swiper ref="mySwiper" :options="swiperOptions" class="isShow">
        <swiper-slide v-for="(item,index) in swiperList" :key="index">
        <img :src="`${imgs}${item.imgs}`" alt="">
        <div class="container">
          <div class="text">
            <!-- <p>DOWNLOADS</p> -->
            <span>下載專區</span>
          </div>
        </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3">
          <el-breadcrumb-item><a href="javascript:;" @click="$router.push('/')">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item :class="{'checked': $route.meta.title}">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div class="centent">
        <div class="title">
          <div class="text-left">
            <h1>下載專區</h1>
            <p>DOWNLOADS</p>
          </div>
          <!-- <div class="text-right">
            <span @click="toClear">清除</span>
            <div class="btn" @click="theQuery">查詢</div>
          </div> -->
        </div>
        <div class="time">
          <!-- <div class="time-left">
            <span>建立時間</span>
            <div class="itme-item">
              <div class="item-l">
                <el-date-picker
                  v-model="form.value1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="請選擇時間">
                </el-date-picker>
                <i class="icon-8"></i>
              </div>
              <span class="link"></span>
              <div class="item-l">
                <el-date-picker
                  v-model="form.value2"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="請選擇時間">
                </el-date-picker>
                <i class="icon-8"></i>
              </div>
            </div>
          </div> -->
          <div class="right-box">
            <div class="item-l">
              <span>分類</span>
              <el-select placeholder="請選擇分類" v-model="form.oegionA" @change="oegionChange(form.oegionA)">
                <el-option v-for="(item,index) in oegionListA" :label="item.name" :value="item.id" :key="index"></el-option>
              </el-select>
            </div>
            <div class="item-l item-r">
              <span>產品</span>
              <el-select  placeholder="請選擇產品" v-model="form.oegionB">
                  <el-option v-for="(item,index) in  oegionListB" :label="item.name" :value="item.id" :key="index"></el-option>
              </el-select>
            </div>
          </div>
          <div class="itme-item btn-box">
            <div class="item-l btn" @click="toClear">清除</div>
            <div class="item-l btn btn-l" @click="theQuery">查詢</div>
          </div>
        </div>
        <div class="table-box">
          <div class="table-hade">
            <div class="hade-l">
              <ul>
                <li class="mc-2">檔案名稱</li>
                <li class="mc-1">分類</li>
                <li class="mc-1">產品</li>
                <li class="mc-1">檔案大小</li>
              </ul>
            </div>
            <div class="hade-l hade-r">
              <ul>
                <li class="mc-2">建立時間</li>
                <li class="mc-3">上傳者姓名</li>
                <li class="mc-2">操作</li>
              </ul>
            </div>
          </div>
          <div class="table-centent" v-for="(item,index) in tableList" :key="index">
             <div class="hade-l">
              <ul>
                <li class="mc-2"><span></span>{{item.name}}</li>
                <li class="mc-1">{{item.class_name}}</li>
                <li class="mc-1">{{item.product_name}}</li>
                <li class="mc-1">{{item.file_size}}</li>
              </ul>
            </div>
            <div class="hade-l hade-r">
              <ul>
                <li class="mc-2">{{item.created_at}}</li>
                <li class="mc-3">{{item.uploader}}</li>
                <li class="mc-2">
                  <a class="mc-btn" :href="`${path}${item.src}`" :download="`${item.name}.${item.file_extension}`" target="_blank">檔案下載<i class="icon-7"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination
      :currentpage="offset+1"
      :pagesize="limit"
      :total="total"
      :handleCurrentChange="handleCurrentChange"
      :isHidePage="true"
    ></pagination>
    <loading :show="isShowLoadging"></loading>
  </div>
</template>

<script>
import Pagination from './../components/Pagination'
import { getDownloadBanner, getFileClass, getFileList } from './../api/request'
export default {
  name: 'downloads',
  components: {
    Pagination
  },
  data () {
    return {
      isShowLoadging: true,
      swiperOptions: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletActiveClass: 'my-bullet-active'
        }
      },
      swiperList: [],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      tableList: [
        {
          title: '衛生署安全防護.PDF',
          safety: '安全防護',
          service: '雲服務',
          kb: '265kb',
          time: '2020.03.12 23:23:56',
          name: '張曉婷'
        },
        0, 0, 0, 0, 0, 0, 0, 0
      ],
      token: '',
      form: {
        oegionA: '',
        oegionB: ''
      },
      oegionListA: [],
      oegionListB: [],
      offset: 0,
      limit: 8,
      fileListForm: {
        c_time: '',
        class_id: '',
        product_id: ''
      },
      path: this.imgs,
      total: 0
    }
  },
  mounted () {
    this.token = window.sessionStorage.getItem('token')
    this._getDownloadBanner()
    this._getFileClass()
    this._getFileList()
  },
  methods: {
    _getDownloadBanner () {
      getDownloadBanner({ type: 2 }, { headers: { token: this.token } }).then(res => {
        // console.log(res, '2')
        this.swiperList = res.data.data.rows
        this.isShowLoadging = false
      })
    },
    _getFileClass () {
      getFileClass({ headers: { token: this.token } }).then(res => {
        console.log(res, '66')
        if (res.data.code === '200') {
          this.oegionListA = res.data.data.rows
          // console.log(this.oegionListA)
        }
      })
    },
    oegionChange (item) {
      this.form.oegionB = ''
      const list = this.oegionListA.filter(i => {
        return i.id === item
      })
      this.oegionListB = list[0]._child
      // console.log(this.oegionListB)
      // console.log(this.form)
    },
    _getFileList () {
      this.isShowLoadging = true

      const { offset, limit, fileListForm } = this
      console.log(offset, limit, fileListForm, '99')
      getFileList({ offset, limit, fileListForm }, { headers: { token: this.token } }).then(res => {
        console.log(res, '3')
        if (res.data.code === '200') {
          this.tableList = res.data.data.rows
          this.isShowLoadging = false
        }
      })
    },
    theQuery () {
      const { oegionA } = this.form
      let errMsg = ''
      // if (!value1) {
      //   errMsg = '請選擇起始時間'
      // } else if (!value2) {
      //   errMsg = '請選擇結束時間'
      // } else if (!oegionA) {
      //   errMsg = '請選擇分類'
      // }
      if (!oegionA) {
        errMsg = '請選擇分類'
      }
      if (errMsg) {
        this.$message.error(errMsg)
      }
      // this.fileListForm.c_time = `${value1}~${value2}`
      this.offset = 0
      this.limit = 8
      this.fileListForm.class_id = oegionA
      this.fileListForm.product_id = this.form.oegionB
      // console.log(this.fileListForm)
      // const { fileListForm } = this.fileListForm
      getFileList({
        offset: this.offset,
        limit: this.limit,
        class_id: this.fileListForm.class_id,
        product_id: this.product_id
      }, { headers: { token: this.token } }).then(res => {
        if (res.data.code === '200') {
          this.tableList = res.data.data.rows
        }
      })
    },
    toClear () {
      this.fileListForm = {}
      this.form = {}
      this._getFileList()
    },
    handleCurrentChange (e) {
      if (e === 1) {
        this.offset = 0
      } else {
        this.offset = (e - 1) * this.limit
      }
      // this._setMyArticle()
      if (!this.from) {
        this._getFileList()
      } else {

      }
    }
  }
}
</script>

<style lang='scss'>
@import './../assets/style/mixin.scss';
.downloads {
  margin-top: 8rem;
  .img-box {
    // background: url('./../assets/imgs/downloads.png') no-repeat;
    width: 100%;
    // display: block;
    // background-position: center center;
    // background-size: cover;
    height: 32rem;
    .swiper-container {
      width: 100%;
      // height: 64rem;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        // position: relative;
      }
      .swiper-pagination {
        @include flex(center);
        // margin-bottom: 2.2rem;
        bottom: 3.2rem;
      }
      .swiper-pagination-bullet {
        margin: 0 1rem;
        width: 1rem;
        height: 1rem;
      }
      .swiper-pagination .my-bullet-active {
        width:1.4rem;
        height:1.4rem;
        background:rgba(37,36,39,1);
        opacity: 1;
      }
    }
    .container {
      .text {
        padding-top: 10.4rem;
        padding-left: 10.8rem;
        p {
          font-size:4.2rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:5.9rem;
        }
        span {
          font-size:3.6rem;
          font-weight:300;
          color:rgba(37,36,39,1);
          line-height:5.4rem;
        }
      }
    }
  }
  .centent {
    margin-top: 8rem;
    .title {
      @include flex();
      margin-bottom: 2.8rem;
      .text-left {
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
      .text-right {
        @include flex(flex-start,center);
        span {
          font-size:1.4rem;
          font-weight:400;
          color:rgba(37,36,39,1);
          line-height:2rem;
          cursor: pointer;
        }
        .btn {
          width:13.4rem;
          height:4.4rem;
          margin-left: 3rem;
          @include flex(center,center);
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          box-shadow:0 1rem 3rem 0 rgba(41,41,44,0.1);
          border-radius:.6rem;
          font-size:1.4rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          cursor: pointer;
        }
      }
    }
    .time {
      @include flex();
      span {
        font-size:1.4rem;
        font-weight:600;
        color:rgba(37,36,39,1);
        line-height:2rem;
      }
      .itme-item {
        display: flex;
        align-items: center;
        .item-l {
          width:20.9rem;
          height:4.4rem;
            margin-top: .6rem;
          background:rgba(255,255,255,1);
          border-radius:.6rem;
          border:.1rem solid rgba(61,61,61,1);
          .icon-8 {
            font-size: 1.4rem;
            font-weight: 500;
          }
        }
        .link {
          width:1.2rem;
          height:.1rem;
          margin: 0 1.4rem;
          background:rgba(37,36,39,1);
          border-radius:.1rem;
        }
        /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner {
          width:17.9rem;

        }
        /deep/ .el-input__inner  {
          padding-left: 2rem;
          border: none;
          font-size:1.6rem;
          font-weight:400;
          color:rgba(210,210,210,1);
        }
        /deep/ .el-input__icon {
          display: none;
          width: 0;
        }
      }
      .right-box {
          display: flex;
        .item-l {
          span {
            display: block;
             margin-bottom: .6rem;
          }
          /deep/ .el-input__inner {
            width:29rem;
            height:4.4rem;
            background:rgba(255,255,255,1);
            border-radius:.6rem;
            border:.1rem solid rgba(61,61,61,1);
           padding-left: 2rem;
          }
          /deep/ .el-select .el-input .el-select__caret  {
            margin-right: 2rem;
            color: #3D3D3D;
            font-size: 1.6rem;
            font-weight: 700;
          }
        }
        .item-r {
          margin-left: 2.7rem;
        }
      }
      .btn-box {
        margin-top: 2rem;
        align-items: flex-end;
        .btn {
          @include flex(center,center);
         font-size: 1.6rem;
         cursor: pointer;
        }
        .btn-l {
          margin-left: 2rem;
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          color: #fff;
        }
      }
    }
    .table-box {
      .table-hade {
        width: 100%;
        @include flex();
        margin-top: 3rem;
        .hade-l {
          width: 100%;
          ul {
            width: 100%;
            height: 3rem;
            display: flex;
            align-items: center;
            text-align: center;
            background:rgba(245,246,247,1);
            border-radius:.6rem;
            font-size:1.2rem;
            font-weight:600;
            color:rgba(37,36,39,1);
            line-height:17px;
          }
        }
      }
      .hade-r {
        margin-left: 2.4rem;
      }
      .mc-1 {
        flex: 1;
      }
      .mc-2 {
        flex: 2;
      }
      .mc-3 {
        flex: 1.5
      }
      .mc {
        width: 2.4rem;
      }
      .table-centent {
        width: 100%;
        @include flex();
        border-bottom:.1rem solid rgba(245,246,247,1);
       .hade-l {
          width: 100%;
          height: 6.9rem;
          display: flex;
          ul {
            width: 100%;
            display: flex;
            align-items: center;
            text-align: center;
            li {
              font-size:1.4rem;
              font-weight:400;
              color:rgba(37,36,39,1);
              line-height:2rem;
              span {
                @include bgImg(1.5rem,1.4rem,'./../assets/imgs/icon/icon-books.png');
                margin-right: .9rem;
              }
            }
            .mc-btn {
              padding: .7rem 1.4rem;
              background:rgba(245,249,255,1);
              border-radius:.6rem;
              border:.1rem solid rgba(0,106,255,1);
              font-size:1.4rem;
              font-weight:400;
              color:rgba(0,106,255,1);
              line-height:2rem;
              i {
                margin-left: 1rem;
                font-weight: 700;
              }
            }
          }
        }
      }
      .table-centent:last-child{
        border-bottom: none;
      }
    }
  }
  @media screen and (max-width: 1199px){
    .centent{
      .time {
        .itme-item {
          .item-l {
            width:18.9rem;
            height:4.4rem;
          }
          .link {
            margin: 0 1rem;
          }
          /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner {
            width:15.9rem;
          }
          /deep/ .el-input__inner  {
            padding-left: 2rem;
          }
        }
        .right-box {
          .item-l {
            /deep/ .el-input__inner {
              width:25rem;
              padding-left: 2rem;
            }
            /deep/ .el-select .el-input .el-select__caret  {
              margin-right: 2rem;
            }
          }
          .item-r {
            margin-left: 2rem;
          }
        }
      }
    }
  }
  @media screen and (max-width:991px){
    margin-top: 6rem;
    .container {
       overflow-x: auto;
    }
    .centent {
      margin-top: 6rem;
      width: 96rem;
      .title,.time {
        padding: 0 1.5rem;
      }

    }
  }
  @media screen and (max-width:767px){
    .centent {
      margin-top: 4rem;
      .time {
        .right-box {
          .item-l {
            /deep/ .el-input__inner {
              width:24rem !important;
              padding-left: 2rem;
            }
            /deep/ .el-select .el-input .el-select__caret  {
              margin-right: 2rem;
            }
          }
          .item-r {
            margin-left: 2rem;
          }
        }
      }
    }
  }
}
</style>
