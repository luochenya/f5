<template>
  <div class="home-article-classify">
    <div class="container">
      <p>CLASSIFICATION</p>
      <div class="title">
        <h1>文章分類</h1>
        <span @click="goArticleClassify()">查看更多<i class="icon-3"></i></span>
      </div>
      <div class="taba">
         <ul id="ulTabas" class="tabas">
           <li class="liLeft" @click="tabaIsShows()">
             <a></a>
           </li>
           <li
            v-for="(item,index) in menu"
            :key="index"
            :class="{'active' :isActive==index }"
            @click="tabaIsShow(index,item.id,item.class_name)"
            >
            <a>{{item.class_name}}</a>
          </li>
        </ul>
        <div class="line"></div>
        <div>
          <classify-safety :list="ClassifySafetyList" :class_id="class_id" :name="name"></classify-safety>
            <pagination
              :currentpage="offset+1"
              :pagesize="limit"
              :total="total"
              :handleCurrentChange="handleCurrentChange"
              :isHidePage="true"
            ></pagination>
        </div>
        <!-- <div v-show="isActive==0">
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
        </div> -->
      </div>
    </div>
  <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import ClassifySafety from './ClassifySafety'
import { systemGetArticleClass, getArticleList, systemFeaturedArticles } from './../../../api/request'
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
      menu: [],
      token: window.sessionStorage.getItem('token'),
      offset: 0,
      limit: 3,
      type: '',
      class_id: '',
      classify: '',
      ClassifySafetyList: [],
      name: "",
      isShowLoading: true,
      total: 0
    }
  },
  mounted () {
    this._systemGetArticleClass()
  },
  methods: {

    goArticleClassify () {
      if (this.$route.query.f5 === '0' || this.$route.query.f5 === 0) {
        this.type = 1
      } else if (this.$route.query.agencyId) {
        this.type = 3
        if (this.$route.query.agencyId === '3' || this.$route.query.agencyId === 3) {
          this.classify = 3
        } else if (this.$route.query.agencyId === '2' || this.$route.query.agencyId === 2) {
          this.classify = 2
        } else if (this.$route.query.agencyId === '22' || this.$route.query.agencyId === 22) {
          this.classify = 1
        }
      } else if (this.$route.query.dealers) {
        this.type = 2
      } else {
        this.type = 0
      }
      // this.$router.push({ path: '/selectedArticleClassification', query: {
      //   title: this.menu[this.isActive].class_name,
      //   type: this.type,
      //   class_id: this.class_id,
      //   classify: this.classify
      // } })
      this.$router.push({ path: '/selectedArticleClassifications', query: {
        type: this.type,
        classify: this.classify
      } })
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
          this.name = this.menu[0].class_name
          this._getAgentArticleList()
        }
      })
    },
    tabaIsShows () {
      if (this.isActive > 0) {
        // document.getElementById('ulTabas').scrollLeft -= 100
        this.isActive--
        this.class_id = this.menu[this.isActive].id
        document.getElementById('ulTabas').scrollLeft = document.getElementById('ulTabas').getElementsByTagName("li")[this.isActive].offsetLeft
        this.isShowLoading = true
        this.offset = 0
        this.limit = 3
        this.type = 1
        this._getAgentArticleList()
      }
    },
    tabaIsShow (item, id, name) {
      this.name = name;
      if (item === this.isActive) {
        return false
      }
      // 點擊跳轉更多
      if (this.menu.length == item + 1) {
        // this.goArticleClassify()
        // document.getElementById('ulTabas').scrollLeft += 100
        this.isActive++
        this.class_id = this.menu[this.isActive].id
        document.getElementById('ulTabas').scrollLeft = document.getElementById('ulTabas').getElementsByTagName("li")[this.isActive].offsetLeft
        if (this.isActive == item) {
          this.isActive--
          return false
        }
      } else {
        this.isActive = item
        this.class_id = id
      }
      this.isShowLoading = true
      this.offset = 0
      this.limit = 3
      this.type = 1
      this._getAgentArticleList()
    },
    _getAgentArticleList () {
      if (this.$route.query.f5 === '0' || this.$route.query.f5 === 0) {
        this.type = 1
        this._getArticleList()
      } else if (this.$route.query.agencyId) {
        this.type = 3
        if (this.$route.query.agencyId === '3' || this.$route.query.agencyId === 3) {
          this.classify = 3
        } else if (this.$route.query.agencyId === '2' || this.$route.query.agencyId === 2) {
          this.classify = 2
        } else if (this.$route.query.agencyId === '22' || this.$route.query.agencyId === 22) {
          this.classify = 1
        }
        this._getArticleList()
      } else if (this.$route.query.dealers) {
        this.type = 2
        this._getArticleList()
      } else {
        this._getFeaturedArticles()
      }
    },
    _getFeaturedArticles () {
      var form = {
        offset: this.offset * this.limit,
        limit: this.limit,
        class_id: this.class_id
      }
      systemFeaturedArticles(form, { headers: { token: this.token } }).then(res => {
          this.isShowLoading = false
        if (res.data.code !== '200') {
          this.$message.error({
            message: '獲取數據失敗！'
          })
        } else {
          this.ClassifySafetyList = res.data.data.rows
          this.total = res.data.data.total
        }
      })
    },
    _getArticleList () {
      var form = {
        offset: this.offset * this.limit,
        limit: this.limit,
        class_id: this.class_id,
        type: this.type,
        classify: this.classify
      }
      getArticleList(form, { headers: { token: this.token } }).then(res => {
          this.isShowLoading = false
        // console.log(res)
        if (res.data.code !== '200') {
          this.$message.error({
            message: '獲取數據失敗！'
          })
        } else {
          this.ClassifySafetyList = res.data.data.rows
          this.total = res.data.data.total
          // console.log(this.ClassifySafetyList)
        }
      })
    },
    handleCurrentChange (e) {
      if (e === 1) {
        this.offset = 0
      } else {
        this.offset = e - 1
      }
      window,scrollTo(0,0)
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
        @include flex();
        margin-top: 1.3rem;
        h1 {
          font-size:3.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:5.4rem;
          cursor: pointer;
        }
        span {
          height:3.3rem;
          font-size:2.4rem;
          font-weight:400;
          color:rgba(0,106,255,1);
          line-height:3.3rem;
          cursor: pointer;
          i {
            margin-left: 1rem;
            font-size: 1.6rem;
          }
        }
      }
    .taba {
      margin-top: 5rem;
      position: relative;
      .tabas {
        width: 90%;
        @include flex();
        overflow-x: scroll;
        white-space: nowrap;
        margin-left: calc(4.2rem + 40px);
        li {
          flex: 1;
          cursor: pointer;
          @include flex(center,flex-start);
          position: relative;
          z-index: 1;
          height:5.4rem;
          font-size:2.5rem;
          font-weight:400;
          line-height:3.4rem;
          box-sizing: border-box;
          padding: 0 20px;
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
          cursor: pointer;
          flex: 0 0 7.4rem;
          background: #ffffff;
          position: absolute;
          right: 0;
          top: 0;
          a {
            @include bgImg(4.2rem,4.2rem,'./../../../assets/imgs/icon/btn-right.png');
            background-size: 100% 100%;
          }
        }
        .liLeft {
          cursor: pointer;
          flex: 0 0 7.4rem;
          background: #ffffff;
          transform:rotate(180deg);
          -ms-transform:rotate(180deg); 	/* IE 9 */
          -moz-transform:rotate(180deg); 	/* Firefox */
          -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
          -o-transform:rotate(180deg); 	/* Opera */
          position: absolute;
          left: 0;
          top: 0;
          a {
            @include bgImg(4.2rem,4.2rem,'./../../../assets/imgs/icon/btn-right.png');
            background-size: 100% 100%;
          }
        }
      }
      ::-webkit-scrollbar {display:none}
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
          width: calc(100% - 3rem - 20px);
          margin-left: 3rem;
          li {
            padding: 0 10px;
            height: 3.6rem;
            font-size:1.4rem!important;
          }
          li:last-child {
            flex: 0 0 3.6rem;
            padding: 0;
              a {
                @include bgImg(3rem,3rem,'./../../../assets/imgs/icon/btn-right.png');
              }
          }
          .liLeft {
            padding: 0;
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
