<template>
  <div class="project-Registration">
    <div class="img-box">
      <div class="container">
        <div class="text">
          <!-- <p>PROJECT REGISTRATION</p> -->
          <span>專案註冊</span>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div class="container">
        <el-breadcrumb separator-class="icon-3">
          <el-breadcrumb-item><a href="javascript:;" @click="$router.push('/')">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;">我的</a></el-breadcrumb-item>
          <el-breadcrumb-item :class="{'checked': $route.meta.title}">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div class="centent">
        <div class="title">
          <div class="text-left">
            <h1>專案註冊</h1>
            <p>PROJECT REGISTRATION</p>
          </div>
          <div class="text-right" @click="$router.push({path:'/projectApplication'})">
            申請
          </div>
        </div>
        <div class="time">
          <div class="time-left">
            <span>申請時間</span>
            <div class="itme-item">
              <div class="item-left">
                <el-date-picker
                  v-model="form.value1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="請選擇時間">
                </el-date-picker>
                <i class="icon-8"></i>
              </div>
              <span class="link"></span>
              <div class="item-left">
                <el-date-picker
                  v-model="form.value2"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="請選擇時間">
                </el-date-picker>
                <i class="icon-8"></i>
              </div>
            </div>
          </div>
          <div class="right-box">
            <div class="item-l">
              <span>審核狀態</span>
              <el-select placeholder="請選擇狀態" v-model="form.is_pass">
                <el-option label="审核中" value="0"></el-option>
                <el-option label="审核通过" value="1"></el-option>
                <el-option label="审核不通过" value="2"></el-option>
              </el-select>
            </div>
          </div>
          <div class="right-btn">
            <span @click="toClear">清除</span>
            <a href="javascript:;" @click="theQuery">查詢</a>
          </div>
        </div>
        <div class="table-box">
          <div class="table-hade">
            <div class="hade-l">
              <ul>
                <li class="mc-1">申請人</li>
                <li class="mc-2">公司名稱</li>
                <li class="mc-3">專案名稱</li>
              </ul>
            </div>
            <div class="hade-l hade-r">
              <ul>
                <li class="mc-2">申請時間</li>
                <li class="mc-1">狀態</li>
                <li class="mc-3">歷程</li>
              </ul>
            </div>
          </div>
          <div class="table-centent" v-for="(item,index) in tableList" :key="index">
             <div class="hade-l">
              <ul>
                <li class="mc-1"><img :src="`${path}${item.user_head}`" alt="">{{item.nick_name}}</li>
                <li class="mc-2">{{item.cpname}}</li>
                <li class="mc-3">{{item.project_name}}</li>
              </ul>
            </div>
            <div class="hade-l hade-r">
              <ul>
                <li class="mc-2">{{item.created_at}}</li>
                <li class="mc-1" :class="{'color-0': item.is_pass == '0','color-1': item.is_pass == '1','color-2': item.is_pass == '2'}">{{passType(item.is_pass)}}</li>
                <li class="mc-3">
                  <a class="mc-btn" href="javascrpt:;" @click="$router.push({path:'/historyRegistration',query: {project_id:item.id}})">歷程記錄</a>
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
    <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import { getMyProject } from './../../api/request'
import Pagination from './../../components/Pagination'
export default {
  name: 'project-Registration',
  components: {
    Pagination
  },
  data () {
    return {
      isShowLoading: true,
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
          text: '一週前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      form: {
        value1: '',
        value2: '',
        is_pass: ''
      },
      value1: '',
      value2: '',
      tableList: [],
      token: window.sessionStorage.getItem('token'),
      path: this.imgs,
      offset: 0,
      limit: 2,
      total: 0
    }
  },
  mounted () {
    this._getMyProject()
  },
  computed: {
    passType () {
      return (type) => {
        if (type === '0') {
          return '审核中'
        } else if (type === '1') {
          return '审核通过'
        } else {
          return '审核不通过'
        }
      }
    }
  },
  methods: {
    _getMyProject () {
      const { offset, limit } = this
      getMyProject({ offset, limit, is_pass: this.form.is_pass }, { headers: { token: this.token } }).then(res => {
        if (res.data.code !== '200') {
          this.isShowLoading = false
          this.$message.error('獲取數據失敗!')
        } else {
          console.log(res, '3')
          this.isShowLoading = false
          this.total = res.data.data.total
          this.tableList = res.data.data.rows
        }
      })
    },
    theQuery () {
      // eslint-disable-next-line camelcase
      const { value1, value2, is_pass } = this.form
      let errMsg = ''
      if (!value1) {
        errMsg = '請選擇起始時間'
      } else if (!value2) {
        errMsg = '請選擇結束時間'
      // eslint-disable-next-line camelcase
      } else if (!is_pass) {
        errMsg = '請選擇狀態'
      }
      if (errMsg) {
        this.$message.error(errMsg)
        return
      }
      // eslint-disable-next-line camelcase
      const c_time = `${value1}~${value2}`
      this.offset = 0
      this.limit = 2
      this.isShowLoading = true
      const { offset, limit } = this
      getMyProject({ offset, limit, c_time, is_pass }, { headers: { token: this.token } }).then(res => {
        if (res.data.code !== '200') {
          this.$message.error('獲取數據失敗!')
          this.isShowLoading = false
        } else {
          this.tableList = res.data.data.rows
          this.total = res.data.data.total
          this.isShowLoading = false
        }
      })
    },
    toClear () {
      this.form = {}
      this.isShowLoading = true
      this._getMyProject()
    },
    handleCurrentChange (e) {
      if (e === 1) {
        this.offset = 0
      } else {
        this.offset = (e - 1) * this.limit
      }
      this.isShowLoading = true
      this._getMyProject()
    }
  }
}
</script>

<style lang='scss'>
@import './../../assets/style/mixin.scss';
.project-Registration {
  margin-top: 8rem;
  .img-box {
    background: url('./../../assets/imgs/project-registration.png') no-repeat;
    width: 100%;
    display: block;
    background-position: center center;
    background-size: cover;
    height: 32rem;
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
        width:13.4rem;
        height:4.4rem;
        @include flex(center);
        background:rgba(245,246,247,1);
        border-radius:.6rem;
        font-size:1.4rem;
        font-weight:400;
        color:rgba(37,36,39,1);
        line-height:2rem;
        cursor: pointer;
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
        .item-left {
          width:14.9rem;
          height:4.4rem;
          margin-top: .6rem;
          background:rgba(255,255,255,1);
          border-radius:.6rem;
          border:.1rem solid rgba(61,61,61,1);
          padding-right: 0;
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
          width:11.9rem;
          // padding-right: 0;
        }
        /deep/ .el-input__inner  {
          padding-left: 2rem;
          border: none;
          font-size:1.6rem;
          font-weight:400;
          color:rgba(210,210,210,1);
           padding-right: 0;
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
            width:33.7rem;
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
      }
      .right-btn {
        @include flex();
        margin-top: 2.6rem;
        margin-left: 16.8rem;
        span {
          font-size:1.4rem;
          font-weight:400;
          color:rgba(37,36,39,1);
          line-height:2rem;
          margin-right: 3rem;
          cursor: pointer;
        }
        a {
          width:13.4rem;
          height:4.4rem;
          @include flex(center);
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          border-radius:.6rem;
          font-size:1.4rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:2rem;
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
              @include flex(center);
              img {
                width: 2.6rem;
                height: 2.6rem;
                border-radius: 50%;
                overflow: hidden;
                margin-right: .8rem;
              }

            }
            .color-0 {
              color:rgba(225,105,0,1);
            }
            .color-1 {
              color:rgba(37,36,39,1);
            }
            .color-2 {
              color:rgba(235,54,44,1);
            }
            .mc-btn {
              padding: .7rem 1.4rem;
              background:rgba(255,255,255,1);
              border-radius:.6rem;
              border:.1rem solid rgba(61,61,61,1);
              font-size:1.4rem;
              font-weight:400;
              color:rgba(37,36,39,1);
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
          .item-left {

          }
          .link {
            margin: 0 1rem;
          }
          /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner {
            // width:15.9rem;
          }
          /deep/ .el-input__inner  {
            padding-left: 2rem;
          }

        }
        .right-box {
          margin-left: 3rem;
          .item-l {
            /deep/ .el-input__inner {
              width:25rem;
              padding-left: 2rem;
            }
            /deep/ .el-select .el-input .el-select__caret  {
              margin-right: 2rem;
            }
          }
        }
        .right-btn {
          margin-left: 13.8rem;
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
      .time {
        .right-btn {
          margin-left: 10.8rem;
        }
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
