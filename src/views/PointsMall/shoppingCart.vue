<template>
  <div class="shoppingCart">
    <div class="container">
      <div class="centent">
        <div class="shoppingCart_title">
          <h1 class="shoppingCart_title_h1">
            <img src="@/assets/imgs/PointsMallLeft.png" alt="" />
            購物車
            <img src="@/assets/imgs/PointsMallRight.png" alt="" />
          </h1>
          <div class="shoppingCart_title_input">
            <input type="text" v-model="goods_name" placeholder="搜尋商品，如：餐券、生活娛樂">
            <div @click="_getCart()">搜尋商品</div>
          </div>
        </div>
        <div class="shoppingCart_content">
          <h2>全部商品 {{numbers}}</h2>
          <div class="shoppingCart_content_title">
            <div class="shoppingCart_content_title1 shoppingCart_content_checkout" @click="selectAllClick()">
              <span v-if="!status"></span>
              <img v-if="status" src="@/assets/imgs/orderCheckout.png" alt="" />
              全選
            </div>
            <div class="shoppingCart_content_title4">商品</div>
            <div class="shoppingCart_content_title1">點數</div>
            <div class="shoppingCart_content_title1">數量</div>
            <div class="shoppingCart_content_title2">訂單時間</div>
            <div class="shoppingCart_content_title1">操作</div>
          </div>
          <div class="shoppingCart_content_content" v-for="(item, index) in dataFormList" :key="index">
            <div class="shoppingCart_content_content1">
              <span v-if="statusList[index] == 'false'" @click="checkoutClick(index, 'true')"></span>
              <img v-if="statusList[index] == 'true'" @click="checkoutClick(index, 'false')" src="@/assets/imgs/orderCheckout.png" alt="" />
              <em v-if="statusList[index] == null">失效</em>
            </div>
            <div class="shoppingCart_content_content2">
              <img :src="path + item.cover_plan" :class="statusList[index] == null ? 'imgFailure' : ''" alt="" />
              <div>
                <p :class="statusList[index] == null ? 'textFailure' : ''">{{item.goods_name}}</p>
                <!-- <span>私人定制 茶水分離 快速過濾茶湯</span> -->
              </div>
            </div>
            <div class="shoppingCart_content_content3" :class="statusList[index] == null ? 'textFailure' : ''">
              {{item.price}} <em :class="statusList[index] == null ? 'textFailure' : ''">點</em>
            </div>
            <div class="shoppingCart_content_content4">
              <em v-if="statusList[index] == null" :class="statusList[index] == null ? 'textFailure' : ''">商品庫存不足</em>
              <div v-else>
                <button @click="removeClick(index)">-</button>
                <input @change="changeClick(index)" type="text" v-model="item.number" />
                <button @click="addClick(index)">+</button>
              </div>
            </div>
            <div class="shoppingCart_content_content5" :class="statusList[index] == null ? 'textFailure' : ''">
              {{item.created_at}}
            </div>
            <div class="shoppingCart_content_content6">
              <p @click="deleteOrder(item.goods_id)">刪除</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shoppingCart_cart">
      <div class="container">
        <div class="centent">
          <div class="shoppingCart_cart_content">
            <div class="shoppingCart_cart_content1" @click="selectAllClick()">
              <span v-if="!status"></span>
              <img v-if="status" src="@/assets/imgs/orderCheckout.png" alt="" />
              全選
            </div>
            <div class="shoppingCart_cart_content2">
              <p>已選商品 <em>{{totalNumber}}</em> 件</p>
              <p>合計 <em>{{totalPrice}}</em> <i>點</i></p>
              <div @click="toPointsMall()">繼續購物</div>
              <span @click="_insertOrders()">確認兌換</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading :show="isShowLoadging"></loading>
    <modal
      :showModal= "isShowModal"
      btnType='3'
      @submit ="submit"
    >
      <template slot="body">
        <h3>兌換成功</h3>
        <p>若需要查詢訂單請到會員中心查詢</p>
      </template>
    </modal>
  </div>
</template>

<script>
import { getCart, delCart, setCart, insertOrders } from '@/api/request'
import Modal from '@/components/Modal'
export default {
  name: 'shoppingCart',
  inject:['reloads'],
  components: {
    Modal
  },
  data () {
    return {
      isShowModal: false,
      goods_name: '',
      dataFormList: [],
      statusList: [],
      numberList: [],
      status: false,
      isShowLoadging: false,
      token: window.sessionStorage.getItem('token'),
      path: this.imgs,
      totalPrice: 0,
      totalNumber: 0,
      numbers: 0
    }
  },
  created() {
    this._getCart()
  },
  watch: {
    statusList: function() {
      let value = 0
      this.totalPrice = 0
      this.totalNumber = 0
      this.statusList.forEach((item, index)=>{
        if (item == 'false') {
          value++
        }
        if (item == 'true') {
          this.totalPrice += parseInt(this.dataFormList[index].subtotal)
          this.totalNumber += parseInt(this.dataFormList[index].number)
        }
      })
      if (value > 0) {
        this.status = false
      } else {
        this.status = true
      }
    }
  },
  methods: {
    // 購物車商品全選
    selectAllClick() {
      if (this.status == false) {
        this.totalPrice = 0
        this.totalNumber = 0
        this.statusList.forEach((item, index)=>{
          if (item != null) {
            this.statusList.splice(index, 1, 'true')
            // 計算總價和總數
            this.totalPrice += parseInt(this.dataFormList[index].subtotal)
            this.totalNumber += parseInt(this.dataFormList[index].number)
          }
        })
        this.status = true
      } else {
        // 計算總價和總數
        this.totalPrice = 0
        this.totalNumber = 0
        this.statusList.forEach((item, index)=>{
          if (item != null) {
            this.statusList.splice(index, 1, 'false')
          }
        })
        this.status = false
      }
    },
    // 單條購物車商品選中
    checkoutClick(index, value) {
      this.statusList.splice(index, 1, value)
      // 計算總價和總數
      if (value) {
        this.totalPrice += parseInt(this.dataFormList[index].subtotal)
        this.totalNumber += parseInt(this.dataFormList[index].number)
      } else {
        this.totalPrice -= parseInt(this.dataFormList[index].subtotal)
        this.totalNumber -= parseInt(this.dataFormList[index].number)
      }
      // 計算總價和總數
    },
    // 減少商品數量
    removeClick(index) {
      this.dataFormList[index].number--
      let form = {
        goods_id: this.dataFormList[index].goods_id,
        number: -1
      }
      this._setCart(form)
    },
    // 增加商品數量
    addClick(index) {
      this.dataFormList[index].number++
      let form = {
        goods_id: this.dataFormList[index].goods_id,
        number: +1
      }
      this._setCart(form)
    },
    // 輸入框更改商品數量
    changeClick(index) {
      let form = {
        goods_id: this.dataFormList[index].goods_id,
        number: this.dataFormList[index].number - this.numberList[index]
      }
      this._setCart(form)
    },
    // 更改購物車數量
    _setCart (form) {
      this.isShowLoadging = true
      setCart(form, { headers: { token: this.token } }).then(res => {
        if (res.data.code == '200') {
          this._getCart()
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            duration: 1000
          })
          this._getCart()
        }
      })
    },
    // 获取購物車商品列表
    _getCart () {
      let form = {
        goods_name: this.goods_name
      }
      this.isShowLoadging = true
      getCart(form, { headers: { token: this.token } }).then(res => {
        this.isShowLoadging = false
        this.reloads()
        if (res.data.code == '200') {
          this.dataFormList = res.data.data.rows
          this.numbers = 0
          this.dataFormList.forEach((item,index)=>{
            this.numbers += parseInt(item.number)
            if (this.statusList == []) {
              // 判斷數量大於庫存，就改為失效商品
              if (parseInt(item.number) > parseInt(item.stock)) {
                this.statusList.splice(index, 0, null)
              } else {
                this.statusList.splice(index, 0, 'false')
              }
            } else {
              // 判斷數量大於庫存，就改為失效商品
              if (parseInt(item.number) > parseInt(item.stock)) {
                this.statusList.splice(index, 1, null)
              } else {
                this.statusList.splice(index, 1, 'false')
              }
            }
            if (this.numberList == []) {
              this.numberList.splice(index, 0, res.data.data.rows[index].number)
            } else {
              this.numberList.splice(index, 1, res.data.data.rows[index].number)
            }
          })
        }
      })
    },
    // 刪除購物車訂單
    deleteOrder(id) {
      this.isShowLoadging = true
      var form = {
        goods_id: id
      }
      delCart(form, { headers: { token: this.token } }).then(res => {
        this.isShowLoadging = false
        if (res.data.code == '200') {
          this._getCart()
          this.totalPrice = 0
          this.totalNumber = 0
          this.status = false
          this.$message({
            message: res.data.msg,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    submit() {
      this.$router.push({ path: '/MallOrder'})
    },
    // 購買商品
    _insertOrders() {
      let lists = []
      this.statusList.forEach((item, index)=>{
        if (item == 'true') {
          let list = {
            goods_id: this.dataFormList[index].goods_id,
            number: this.dataFormList[index].number
          }
          lists.push(list)
        }
      })
      if (lists.length == 0) {
        this.$message({
          message: '請選擇需要兌換的商品',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      var form = {
        goods_list: JSON.stringify(lists),
        type: 1
      }
      this.isShowLoadging = true
      insertOrders(form, { headers: { token: this.token } }).then(res => {
        this.isShowLoadging = false
        if (res.data.code == '200') {
          this.isShowModal = true
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    // 繼續購買
    toPointsMall () {
      this.$router.push('/PointsMall')
    }
  }
}
</script>

<style lang='scss'>
@import '@/assets/style/mixin.scss';
.shoppingCart {
  // margin-top: 8rem;
  padding-top: 14rem;
  padding-bottom: 10rem;
  .container {
    .centent {
      .shoppingCart_title {
        margin-bottom: 4rem;
        display: flex;
        justify-content: space-between;
        .shoppingCart_title_h1 {
          font-size:3rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:4.5rem;
          img {
            width: 2.2rem;
            height: 1.9rem;
          }
        }
        .shoppingCart_title_input {
          width: 50%;
          position: relative;
          input {
            padding-left: 3.4rem;
            padding-right: 16rem;
            background:none;  
            outline:none;  
            border:none;
            width: 100%;
            height:5rem;
            background:rgba(255,255,255,1);
            box-shadow:0px 10px 30px 0px rgba(230,233,238,0.3);
            border-radius:12px;
            font-size: 1.3rem;
          }
          ::-webkit-input-placeholder{
            font-size:1.3rem;
            color:rgba(193,193,193,1);
          }
          div {
            cursor: pointer;
            position: absolute;
            right: 0;
            top: 0;
            width:15rem;
            height:5rem;
            background:rgba(37,36,39,1);
            border-radius:0px 12px 12px 0px;
            font-size:1.5rem;
            font-weight:bold;
            color:rgba(255,255,255,1);
            line-height:5rem;
            text-align: center;
          }
        }
      }
      .shoppingCart_content {
        h2 {
          font-size:1.7rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
          margin-bottom: 1rem;
        }
        .shoppingCart_content_title {
          width: 100%;
          height:50px;
          background:rgba(245,246,247,1);
          border-radius:6px;
          display: flex;
          font-size:1.2rem;
          color:rgba(134,134,134,1);
          line-height:50px;
          text-align: center;
          .shoppingCart_content_checkout {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              display: inline-block;
              width:1.1rem;
              height:1.1rem;
              background:rgba(245,246,247,1);
              border:1px solid rgba(210,210,210,1);
              border-radius: 50%;
              margin-right: 0.5rem;
            }
            img {
              width:1.1rem;
              height:1.1rem;
              margin-right: 0.5rem;
            }
          }
          .shoppingCart_content_title1 {
            width: 10%;
          }
          .shoppingCart_content_title2 {
            width: 20%;
          }
          .shoppingCart_content_title4 {
            width: 40%;
            text-align: left;
          }
        }
        .shoppingCart_content_content {
          padding: 2.5rem 0;
          border-bottom: 1px solid rgba(245,246,247,1);;
          display: flex;
          width: 100%;
          .shoppingCart_content_content1 {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 10%;
            span {
              cursor: pointer;
              display: inline-block;
              width:1.1rem;
              height:1.1rem;
              background:rgba(245,246,247,1);
              border:1px solid rgba(210,210,210,1);
              border-radius: 50%;
              margin-right: 0.5rem;
            }
            img {
              cursor: pointer;
              width:1.1rem;
              height:1.1rem;
              margin-right: 0.5rem;
            }
            em {
              display: inline-block;
              padding: 1px 5px;
              background:rgba(216,216,216,1);
              border-radius:0.6rem;
              font-size:0.8rem;
              color:rgba(255,255,255,1);
              line-height:1.2rem;
            }
          }
          .shoppingCart_content_content2 {
            width: 40%;
            display: flex;
            img {
              width: 8rem;
              height: 8rem;
            }
            .imgFailure {
              -webkit-filter: grayscale(100%);/*兼容google、opera*/
              -moz-filter: grayscale(100%);/*FF下不生效*/
              -ms-filter: grayscale(100%);/*IE下不生效*/
              -o-filter: grayscale(100%);/*opera下不生效*/
              filter: grayscale(100%);/*无效*/
              filter: gray;/*兼容IE7-IE9，IE10不支持*/
            }
            div {
              width: calc(100% - 8rem);
              padding-left: 1.2rem;
              p {
                font-size:1.2rem;
                color:rgba(37,36,39,1);
                line-height:2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;
              }
              // span {
              //   font-size:1rem;
              //   color:rgba(189,189,189,1);
              //   margin-top: 1rem;
              //   line-height:1.5rem;
              //   overflow: hidden;
              //   text-overflow: ellipsis;
              //   display: -webkit-box;
              //   -webkit-line-clamp: 2;
              //   line-clamp: 2;
              //   -webkit-box-orient: vertical;
              // }
            }
          }
          .shoppingCart_content_content3 {
            width: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size:1.6rem;
            font-family:DINSchrift;
            color:rgba(235,54,44,1);
            line-height:2rem;
            em {
              margin-left: 0.4rem;
              font-size:1rem;
              color:rgba(235,54,44,1);
              line-height:1.5rem;
            }
          }
          .shoppingCart_content_content4 {
            width: 10%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            em {
              display: block;
              width: 100%;
              text-align: center;
              font-size:1.2rem;
              line-height:1.8rem;
            }
            div {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 2.1rem;
              button {
                cursor: pointer;
                display: inline-block;
                width:2rem;
                height:2.1rem;
                background:rgba(255,255,255,1);
                border-radius:0px 2px 2px 0px;
                border:1px solid rgba(245,246,247,1);
                line-height: 2.1rem;
                text-align: center;
                font-size: 2rem;
                color: #252427;
              }
              input {
                text-align: center;
                display: inline-block;
                width: calc(100% - 4rem);
                height: 2.1rem;
                outline:none;  
                border:none;
                background:rgba(245,246,247,1);
              }
            }
            span {
              display: block;
              width: 100%;
              text-align: center;
              margin-top: 0.5rem;
              font-size:1.2rem;
              color:rgba(189,189,189,1);
              line-height:1.8rem;
            }
          }
          .shoppingCart_content_content5 {
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size:1.2rem;
            color:rgba(37,36,39,1);
            line-height:1.8rem;
          }
          .shoppingCart_content_content6 {
            width: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
            p {
              cursor: pointer;
              font-size:1.2rem;
              color:rgba(37,36,39,1);
              line-height:1.8rem;
              text-decoration: underline;
            }
          }
          .textFailure {
            color:rgba(189,189,189,1) !important;
          }
        }
      }
    }
  }
  .shoppingCart_cart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 6;
    width: 100%;
    height:90px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 60px 0px rgba(240,240,240,0.5);
    .shoppingCart_cart_content {
      height:90px;
      display: flex;
      align-items: center;
      justify-items: center;
      justify-content: space-between;
      .shoppingCart_cart_content1 {
        width: 20%;
        cursor: pointer;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width:1.1rem;
          height:1.1rem;
          background:rgba(245,246,247,1);
          border:1px solid rgba(210,210,210,1);
          border-radius: 50%;
          margin-right: 0.5rem;
        }
        img {
          width:1.1rem;
          height:1.1rem;
          margin-right: 0.5rem;
        }
      }
      .shoppingCart_cart_content2 {
        display: flex;
        align-items: center;
        justify-items: center;
        p {
          margin-right: 3.6rem;
          font-size:1.2rem;
          color:rgba(37,36,39,1);
          line-height:1.8rem;
          em {
            font-size:1.8rem;
            font-family:DINSchrift;
            color:rgba(235,54,44,1);
            line-height:2rem;
          }
          i {
            color:rgba(235,54,44,1);
          }
        }
        div {
          cursor: pointer;
          margin-left: 1.8rem;
          width:14rem;
          height:4.2rem;
          background:rgba(255,255,255,1);
          border-radius:4px;
          border:1px solid rgba(61,61,61,1);
          font-size:1.3rem;
          color:rgba(37,36,39,1);
          line-height: 4.2rem;
          text-align: center;
        }
        span {
          cursor: pointer;
          display: block;
          margin-left: 1.8rem;
          width:14rem;
          height:4.2rem;
          background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
          border-radius:4px;
          font-size:1.3rem;
          color:rgba(255,255,255,1);
          line-height: 4.2rem;
          text-align: center;
        }
      }
    }
  }
  @media screen and (max-width: 1199px){
    .container {
      .centent {
        
      }
    }
  }
  @media screen and (max-width:991px){
    margin-top: 6rem;
    .container {
      .centent {
        
      }
    }
  }
  @media screen and (max-width:767px){
    .container {
      .centent {
        
      }
    }
  }
  @media screen and (max-width:520px){
    .container {
      .centent {
        
      }
    }
  }
}
</style>
