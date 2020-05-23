<template>
  <div class="home-article-classify">
    <div class="container">
      <p>CLASSIFICATION</p>
      <div class="title" @click="goArticleClassify">文章分類</div>
      <div class="taba">
         <ul class="tabas">
           <li
            v-for="(item,index) in menu"
            :key="index"
            :class="{'active' :isActive==index }"
            @click="tabaIsShow(index,item.id)"
            >
            <a href="javascript:;">{{item.class_name}}</a>
          </li>
        </ul>
        <div class="line"></div>
        <div v-show="isActive==0">
          <classify-safety :list="ClassifySafetyList"></classify-safety>
            <pagination
              :currentpage="offset+1"
              :pagesize="limit"
              :total="total"
              :handleCurrentChange="handleCurrentChange"
              :isHidePage="true"
            ></pagination>
        </div>
        <div v-show="isActive==1">
          <classify-safety :list="ClassifySafetyList"></classify-safety>
            <pagination
            :currentpage="offset+1"
            :pagesize="limit"
            :total="total"
            :handleCurrentChange="handleCurrentChange"
            :isHidePage="true"
          ></pagination>
        </div>
        <div v-show="isActive==2">
          <classify-safety :list="ClassifySafetyList"></classify-safety>
          <pagination
            :currentpage="offset+1"
            :pagesize="limit"
            :total="total"
            :handleCurrentChange="handleCurrentChange"
            :isHidePage="true"
          ></pagination>
        </div>
        <div v-show="isActive==3">
          <classify-safety :list="ClassifySafetyList"></classify-safety>
          <pagination
            :currentpage="offset+1"
            :pagesize="limit"
            :total="total"
            :handleCurrentChange="handleCurrentChange"
            :isHidePage="true"
          ></pagination>
        </div>
      </div>
    </div>
  <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import ClassifySafety from './ClassifySafety'
import { systemGetArticleClass, getAgentArticleList } from './../../../api/request'
import Pagination from './../../../components/Pagination'
export default {
  name: 'home-article-classify',
  components: {
    ClassifySafety,
    Pagination
  },
  data () {
    return {
      isActive: 0,
      menu: [{
        name: '交通管理',
        value: '1'
      }, {
        name: '應用安全',
        value: '2'
      }, {
        name: '硬體',
        value: '3'
      }, {
        name: '雲服務',
        value: '4'
      }, {
        name: '資訊安全',
        value: '5'
      }, {
        name: '',
        value: '6'
      }],
      token: window.sessionStorage.getItem('token'),
      offset: 0,
      limit: 3,
      class_id: '',
      ClassifySafetyList: [],
      isShowLoading: true,
      total: 0
    }
  },
  mounted () {
    this._systemGetArticleClass()
  },
  methods: {
    goArticleClassify () {
      this.$router.push({ path: 'selectedArticleClassification', params: { title: '應用安全' } })
    },
    _systemGetArticleClass () {
      systemGetArticleClass({ headers: { token: this.token } }).then(res => {
        // console.log(res)
        if (res.data.code !== '200') {
          this.$message.error({
            message: '獲取數據失敗！'
          })
        } else {
          this.menu = res.data.data.rows
          this.menu.push({})
          this.class_id = this.menu[0].id
          this._getAgentArticleList()
        }
      })
    },
    tabaIsShow (item, id) {
      this.isShowLoading = true
      this.class_id = id
      this.isActive = item
      this.offset = 0
      this.limit = 3
      this._getAgentArticleList()
    },
    _getAgentArticleList () {
      // eslint-disable-next-line camelcase
      const { offset, limit, class_id } = this
      // console.log(page)
      getAgentArticleList({ offset, limit, class_id }, { headers: { token: this.token } }).then(res => {
        // console.log(res)
        if (res.data.code !== '200') {
          this.$message.error({
            message: '獲取數據失敗！'
          })
        } else {
          this.ClassifySafetyList = res.data.data.rows
          this.total = res.data.data.total
          this.isShowLoading = false
          // console.log(this.ClassifySafetyList)
        }
      })
    },
    handleCurrentChange (e) {
      if (e === 1) {
        this.offset = 0
      } else {
        this.offset = (e - 1) * this.limit
      }
      this.isShowLoading = true
      this._getAgentArticleList()
    }
  }
}
</script>

<style scoped lang="scss">
@import './../../../assets/style/mixin.scss';
.home-article-classify {
  margin-top: 10rem;
  .container {
    >p {
      width: 13.2rem;
      height: 2.2rem;
      background: #F5F6F7;
      font-size:12px;
      font-weight:400;
      color:rgba(37,36,39,1);
      line-height:1.7rem;
      padding-left: 1rem;
      padding-top: .4rem;
      box-sizing: border-box;
    }
    .title {
      font-size:3.6rem;
      font-weight:600;
      color:rgba(37,36,39,1);
      line-height:5.4rem;
      cursor: pointer;
    }
    .taba {
      margin-top: 5rem;
      .tabas {
        @include flex();
        li {
          flex: 1;
          @include flex(center,flex-start);
          position: relative;
          z-index: 1;
          height:5.4rem;
          font-size:2.5rem;
          font-weight:400;
          line-height:3.4rem;
          box-sizing: border-box;
          a {
            color:#9B9B9B;
          }
        }
        .active {
          border-bottom: .2rem solid rgba(37,36,39,1);
          a {
             color:rgba(74,74,74,1);
          }
        }
        li:last-child {
          flex: 0 0 7.4rem;
          a {
            @include bgImg(4.2rem,4.2rem,'./../../../assets/imgs/icon/btn-right.png');
          }
        }
      }
      .line {
        position: relative;
        top:-.2rem;
        width: 100%;
        height: .2rem;
        background: rgba(247,248,250,1);
      }
    }
  }
  @media screen and (max-width:991px) {
    margin-top: 5rem!important;
    .container {
      .title {
          font-size:2.8rem!important;
          line-height:4rem!important;
          margin-top: 1rem;
        }
      .taba {
        margin-top: 2rem;
          .tabas {
             li {
               height: 4rem;
              font-size:1.6rem!important;
              }
              li:last-child {
              flex: 0 0 7rem;
                a {
                @include bgImg(3.2rem,3.2rem,'./../../../assets/imgs/icon/btn-right.png');
              }
        }
          }
      }
    }
  }
  @media screen and (max-width: 767px) {
     padding: 0 1.5rem;
    .container {
      .title {
          font-size:1.8rem!important;
          line-height:3rem!important;
        }
      .taba {
        margin-top: 1rem;
        .tabas {
          width: 100%;
          li {
            height: 3.6rem;
            font-size:1.4rem!important;
          }
          li:last-child {
          flex: 0 0 3.6rem;
            a {
            @include bgImg(3rem,3rem,'./../../../assets/imgs/icon/btn-right.png');
          }
        }
          }
      }
    }
  }
}
</style>
