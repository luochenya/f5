<template>
  <div class="to-apply-for-a">
    <div class="main">
      <div class="main-a">
        <div class="top"><h1>A.客戶及專案資訊</h1><div class="num"><span>1</span>/4</div></div>
        <div class="link"><div class="links"></div></div>
        <div class="form-box">
          <!-- <p>客戶信息</p> -->
          <div class="form">
            <div class="card">
              <label>
                <span></span>
                <div class="name">客戶名稱</div>
                <input v-model="formA.client_name" type="text" placeholder="請填寫客戶名稱">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">專案名稱</div>
                <input v-model="formA.project_name" type="text" placeholder="請填寫專案名稱">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">承辦單位/部門</div>
                <input v-model="formA.organizer" type="text" placeholder="請填寫承辦單位/部門">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">承辦人電話(O)</div>
                <input v-model="formA.unker_phone[0]" type="text" placeholder="請填寫電話號碼">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">承辦人</div>
                <input v-model="formA.undertaker"  type="text" placeholder="請填寫承辦人姓名">
              </label>
            </div>
            <div class="card">
              <label>
                <span class="bg"></span >
                <div class="name" style="text-indent:5em">(M)</div>
                <input v-model="formA.unker_phone[1]"  type="text" placeholder="請填寫電話號碼">
              </label>
            </div>
          </div>
          <!-- <p>客戶信息</p> -->
          <div class="form">
            <div class="card">
              <label>
                <span></span>
                <div class="name">預計結案季度</div>
                <input v-model="formA.exp_close_quarter" type="text" placeholder="請填寫季度">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">預計結案月份</div>
                <input v-model="formA.exp_close_month" type="text" placeholder="請填寫月份">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">專案總結算</div>
                <input v-model="formA.total_budget" type="text" placeholder="請填寫預算">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">F5預算</div>
                <input v-model="formA.five_budget" type="text" placeholder="請填寫預算">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">產業別</div>
                <input v-model="formA.industry" type="text" placeholder="請填寫產業別">
              </label>
            </div>
            <div class="card">
              <label>
                <span></span>
                <div class="name">承辦人E-mail</div>
                <input v-model="formA.unker_email" type="text" placeholder="請填寫E-mail">
              </label>
            </div>
            <div class="card">
              <label>
                <span class="bg"></span>
                <div class="name">競爭廠商(原廠)</div>
                <input v-model="formA.comp_manu_original" type="text" placeholder="請填寫廠商資訊">
              </label>
            </div>
            <div class="card">
              <label>
                <span class="bg"></span>
                <div class="name">競爭廠商(經銷商)</div>
                <input v-model="formA.comp_manu_dealer" type="text" placeholder="請填寫廠商資訊">
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="main-b">
        <!-- <div class="top"><h1>B.產品方案資訊</h1><div class="num"><span>增加產品</span></div></div> -->
        <div class="top"><h1>B.產品方案資訊</h1></div>
        <div class="main-form-b" v-for="(product,index) in product_program" :key="index">
          <div class="item item-l">

            <div class="title">
              <div class="name">
                <span></span>
                 <h3>產品型號</h3>
              </div>
              <span class="el-icon-close" v-show="product_program && product_program.length>1 && index>0" @click="close(index)"></span>
            </div>
            <div class="card">
              <p>產品</p>
              <el-select v-model="a[index]" value-key="type_name" placeholder="請選擇產品"  @change="oegionChange(index)">
               <el-option v-for="(item,indexs) in productList" :label="item.type_name" :value="item" :key="indexs"></el-option>
              </el-select>
            </div>
            <div class="card">
              <label>
                <p>數量</p>
                <input v-model="product.product_type_num" type="text" placeholder="請填寫產品數量"  @blur.prevent="changeIpt('1',index)">
              </label>
            </div>
            <div class="bootm-title">
              <div class="title">
                <div class="name">
                  <span></span>
                  <h3>產品模組</h3>
                </div>
              </div>
              <div class="radio">
                <div class="radio-box" v-for="(items,i) in moduleList[index]" :key="i">
                  <!-- <span class="radio-item" :class="{'on': checkedType == items.iindexd && type ==index+1 }"></span> -->
                  <label>
                       <input type="checkbox" :value="items" @change="clickMe(product.product_module,i,index)"  v-model="product.product_module" class="input-radio">
                       <span></span>
                       {{items.module_name}}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="item item-r">
              <h3>Others</h3>
              <div class="text">
                  <textarea v-model="product.others" placeholder="請填寫內容..." @blur.prevent="changeIpt('2',index)"></textarea>
                  <p>{{product.others&&product.others.length}}/300</p>
              </div>
          </div>
        </div>
      </div>
      <div class="add" @click="add"><span class="el-icon-plus"></span>增加產品</div>
      <div class="btn" @click="next">下一步</div>
    </div>
  </div>
</template>

<script>
import { getProductType } from './../../api/request'
import { mapActions } from 'vuex'
export default {
  name: 'to-apply-for-a',
  data () {
    return {
      a: [{ product_type: '', product_type_num: '', product_module: [], others: '' }],
      value: '',
      radio: '',
      checkedType: '',
      radios: [
        {
          label: 'Policy Enforcement Manager',
          value: '1',
          isChecked: true
        },
        {
          label: 'Carrier-grade NAT',
          value: '2',
          isChecked: false
        },
        {
          label: 'Advanced Web Application Firewall (WAF)',
          value: '3',
          isChecked: false
        }
      ],
      token: window.sessionStorage.getItem('token'),
      formA: {
        client_name: '',
        project_name: '',
        organizer: '',
        unker_phone: ["", ""],
        undertaker: '',
        exp_close_quarter: '',
        exp_close_month: '',
        total_budget: '',
        five_budget: '',
        industry: '',
        unker_email: '',
        comp_manu_original: '',
        comp_manu_dealer: ''
      },
      productList: [],
      moduleList: [],
      product_program: [{ product_type: '', product_type_num: '', product_module: [], others: '' }],
      product_programs: [{ product_type: '', product_type_num: '', product_module: [], others: '' }]
    }
  },
  mounted () {
    this._getProductType()
  },
  methods: {
    _getProductType () {
      getProductType({ headers: { token: this.token } }).then(res => {
        if (res.data.code !== '200') {
          this.$message.error('獲取數據失敗！')
        } else {
          this.productList = res.data.data.rows
        }
      })
    },
    oegionChange (index) {
      this.moduleList[index] = this.a[index]._child
      this.product_programs[index].product_type = this.a[index].type_name
      this.product_program[index].product_type = this.a[index].type_name
      // console.log(this.product_programs[index], 'p')
    },
    check (id, index) {
    // 先取消所有选中项
      // this.radios.forEach((item) => {
      //   item.isChecked = false
      // })
      // 再设置当前点击项选中
      // this.radio = this.radios[index].value
      // 设置值，以供传递
      // this.radios[index].isChecked = true
      // this.$`checkedType = id
      if (this.product_program.length === index + 1) {
        this.checkedType = id
        this.type = index + 1
      }
    },
    clickMe (items, i, index) {
      const resultArr = []
      items.forEach(item => {
        resultArr.push(item.module_name)
      })
      this.product_programs[index].product_module = resultArr.filter(function (item, i, self) {
        return self.indexOf(item) === i
      })
      // console.log(items, i, index, '00')
      // console.log(this.product_programs, 'a')
    },
    changeIpt (type, index) {
      if (type === '1') {
        // console.log('input', index)
        this.product_programs[index].product_type_num = this.product_program[index].product_type_num
      } else {
        this.product_programs[index].others = this.product_program[index].others
      }
    },
    add () {
      // storage.clear('formA')
      // console.log(this.projectModule)
      this.product_program.push({ product_type: '', product_type_num: '', product_module: [], others: '' })
      this.product_programs.push({ product_type: '', product_type_num: '', product_module: [], others: '' })
      this.a.push({ product_type: '', product_type_num: '', product_module: [], others: '' })
    },
    ...mapActions(['getFormA']),
    next () {
      // eslint-disable-next-line camelcase
      const { formA, product_program } = this
      // const { client_name, project_name, organizer, unker_phone, undertaker, mobile, exp_close_quarter, exp_close_month, total_budget, five_budget, industry, unker_email, comp_manu_original, comp_manu_dealer } = formA
      let errMsg = ''
      if (!formA.client_name) {
        errMsg = '請填寫客戶名稱!'
      } else if (!formA.project_name) {
        errMsg = '請填寫專案名稱!'
      } else if (!formA.organizer) {
        errMsg = '請填寫專案名稱!'
      } else if (!formA.undertaker) {
        errMsg = '請填寫承辦人姓名!'
      } else if (!formA.exp_close_quarter) {
        errMsg = '請填寫季度!'
      } else if (!formA.exp_close_month) {
        errMsg = '預計結案月份!'
      } else if (!formA.total_budget || !formA.five_budget) {
        errMsg = '請填寫預算!'
      } else if (!formA.industry) {
        errMsg = '請填寫產業別!'
      } else if (!formA.unker_email) {
        errMsg = '請填寫E-mail!'
      } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(formA.unker_email)) {
        errMsg = '請填寫正確E-mail!'
      }

      if (!formA.unker_phone.length > 0) {
        errMsg = '請填寫電話號碼 !'
      }
      // formA.unker_phone.forEach(item => {
      //   if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(item)) {
      //     errMsg = '請填寫正確電話號碼!'
      //   }
      // })
      // eslint-disable-next-line camelcase
      product_program.forEach(item => {
        if (!item.product_type) {
          errMsg = '請選擇產品!'
        } else if (!item.product_type_num) {
          errMsg = '請填寫產品數量!'
        } else if (!item.product_module.length) {
          errMsg = '請選擇產品模型!'
        }
      })
      if (errMsg) {
        this.$message.error(errMsg)
        return false
      }
      const form = {
        ...this.formA,
        product_program: this.product_program,
        product_programs: this.product_programs
      }
      console.log(form, 'f')
      this.$emit('next', form)
    },
    close (i) {
      // console.log(i)
      this.product_program.splice(i, 1)
      this.product_programs.splice(i, 1)
      this.a.splice(i, 1)
    }
  }
}
</script>

<style scoped lang='scss'>
@import './../../assets/style/mixin.scss';
.to-apply-for-a {
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
          width: 25%;
          height:.4rem;
          background:rgba(37,36,39,1);
          border-radius:.2rem;
        }
      }
      .form-box {
        width: 100%;
        margin-top: 3rem;
        p {
          font-size:1.6rem;
          font-weight:600;
          color:rgba(37,36,39,1);
          line-height:2.2rem;
          margin-bottom: 1rem;
        }
        .form {
          width: 100%;
          @include flex();
          flex-wrap: wrap;
          .card {
            flex: 0 0 48%;
            height:5rem;
            background:rgba(245,246,247,1);
            border-radius:.4rem;
            border:.1rem solid rgba(239,239,239,1);
            margin-bottom: 2.4rem;
            label {
              height: 100%;
              @include flex(flex-start,center);
              margin-left: 2rem;
              span {
                width:.4rem;
                height:.4rem;
                background:rgba(235,54,44,1);
                border-radius: 50%;
                margin-right: .9rem;
              }
              .bg {
                background:rgba(245,246,247,1);
              }
              .name {
                width: 12.4rem;
                font-size:1.6rem;
                font-weight:400;
                color:rgba(37,36,39,1);
                line-height:2.2rem;
                margin-right: 1.3rem;
                cursor: pointer;
              }
              input {
                border: none;
                outline: none;
                background:rgba(245,246,247,1);
                font-size:1.6rem;
                font-weight:400;
                color:rgba(189,189,189,1);
                line-height:2.2rem;
              }
              input::-webkit-input-placeholder {
                color:#bdbdbd;
              }
              input::-moz-input-placeholder {
                color:#bdbdbd;
              }
              input::-ms-input-placeholder {
                color:#bdbdbd;
              }
            }
          }
        }
      }
    }
    .main-b {
      .top {
        @include flex();
        h1 {
          font-size:2rem;
          font-weight:500;
          color:rgba(37,36,39,1);
          line-height:2.8rem;
        }
        .num {
          width:13.4rem;
          height:4.4rem;
          background:rgba(0,106,255,.1);
          border-radius:.6rem;
          @include flex(center);
          span {
            font-size:1.4rem;
            font-weight:400;
            color:rgba(0,106,255,1);
            line-height:2rem;
          }
        }
      }
      .main-form-b {
        margin-top: 2.6rem;
        width: 100%;
        @include flex(space-between,flex-start);
        .item {
          flex: 0 0 48%;
        }
        .item-l {
          .title {
            @include flex();
            margin-bottom: 1rem;
            .name {
               @include flex(flex-start,center);
              span {
                width:.4rem;
                height:.4rem;
                display: inline-block;
                margin-right: .9rem;
                background:rgba(235,54,44,1);
                border-radius: 50%;
              }
              h3 {
                font-size:1.6rem;
                font-weight:600;
                color:rgba(37,36,39,1);
                line-height:2.2rem;
              }
            }
            .el-icon-close {
              font-size: 2rem;
              font-weight: 700;
              cursor: pointer;
            }
          }
          .card {
            height:5rem;
            width: 100%;
            @include flex(flex-start,center);
            background:rgba(245,246,247,1);
            border-radius:.4rem;
            border:.1rem solid rgba(239,239,239,1);
            padding-left: 3rem;
            margin-bottom: 2rem;
            p {
              width: 10rem;
              margin-right: 1.4rem;
              font-size:1.6rem;
              font-weight:400;
              color:rgba(37,36,39,1);
              line-height:2.2rem;
            }
            input {
              border: none;
              outline: none;
              background:rgba(245,246,247,1);
              font-size:1.6rem;
              font-weight:400;
              color:rgba(189,189,189,1);
              line-height:2.2rem;
            }
            input::-webkit-input-placeholder {
              color:#bdbdbd;
            }
            input::-moz-input-placeholder {
              color:#bdbdbd;
            }
            input::-ms-input-placeholder {
              color:#bdbdbd;
            }
            .el-select {
              width: 86%;
            }
            /deep/.el-input__inner {
              border: none;
              font-size:1.6rem;
              background:rgba(245,246,247,1);
              font-weight:400;
              color:#bdbdbd
            }
            .el-select .el-input .el-select__caret {
              color: #3D3D3D;
              font-size: 1.8rem;
              font-weight: 700;
            }
            label {
              @include flex(flex-start,center);
              input {
                border: none;
                background:rgba(245,246,247,1);
              }
            }
          }
          .bootm-title {
            .title {
              margin-top: 3.4rem;
            }
            .radio {
              margin-top: 2.8rem;
              margin-left: 3rem;
              .radio-box{
                @include flex(flex-start,center);
                position: relative;
                height: 2.5rem;
                line-height: 2.5rem;
                margin-right: .5rem;
              }
              label {
                 @include flex(flex-start,center);
                 padding: .6rem 0;
              }
              // .radio-item {
              //   display: inline-block;
              //   width: 1.4rem;
              //   height: 1.4rem;
              //   background:rgba(245,246,247,1);
              //   border:.1rem solid rgba(210,210,210,1);
              //   border-radius: 50%;
              //   box-sizing: border-box;
              //   margin-right: 1.6rem;
              // }
              // .input-radio[type=radio]+span {
              //   display: none;
              //   display: inline-block;
              //   position: absolute;
              //   opacity: 0;
              //   width: 2.5rem;
              //   height: 2.5rem;
              //   cursor: pointer;
              //   left: 0;
              //   outline: none;
              //   -webkit-appearance: none;
              // }
              .input-radio {
                display: none;
              }

               .input-radio[type=checkbox]+span {
                display: inline-block;
                width: 1.4rem;
                height: 1.4rem;
                background:rgba(245,246,247,1);
                border:.1rem solid rgba(210,210,210,1);
                border-radius: 50%;
                box-sizing: border-box;
                margin-right: 1.6rem;
               }
               .input-radio[type=checkbox]:checked+span {
                 display: inline-block;
                  @include bgImg(1.4rem,1.4rem,'./../../assets/imgs/icon/icon-success.png');
               }
            }
          }
        }
        .item-r {
          h3 {
            font-size:1.6rem;
            font-weight:600;
            color:rgba(37,36,39,1);
            line-height:2.2rem;
          }
          .text {
            height:31rem;
            padding: 2rem;
            margin-top: 1rem;
            width: 100%;
            background:rgba(245,246,247,1);
            border-radius:.4rem;
            border:.1rem solid rgba(239,239,239,1);
            textarea {
              width: 100%;
              height: 92%;
              background:rgba(245,246,247,1);
              border: none;
              outline: none;
              font-size:1.6rem;
              font-weight:400;
              color:rgba(189,189,189,1);
              line-height:2.2rem;
              resize:none;
            }
            textarea::-webkit-input-placeholder {
                /* WebKit browsers */
                color: #bdbdbb;
                font-size:1.6rem;
            }
            textarea:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #bdbdbb;
                font-size:1.6rem;
            }
            textarea::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #bdbdbb;
                font-size:1.6rem;
            }
            textarea::-ms-input-placeholder {
                /* Internet Explorer 10+ */
                color: #bdbdbb;
                font-size:1.6rem;
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
      }
    }
    .add {
      width:13.4rem;
      height:4.4rem;
      margin-top: 2rem;
      background:rgba(0,106,255,.1);
      border-radius:.6rem;
      @include flex(center);
      font-size:1.4rem;
      font-weight:400;
      color:rgba(0,106,255,1);
      line-height:2rem;
      cursor: pointer;
      .el-icon-plus {
        margin-right: .4rem;
        font-weight: 500;
      }
    }
    .btn {
      width:31rem;
      height:5rem;
      @include flex(center);
      margin-left: auto;
      margin-top: 8rem;
      background:linear-gradient(225deg,rgba(42,42,44,1) 0%,rgba(37,36,39,1) 100%);
      border-radius:.4rem;
      font-size:1.6rem;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:2.2rem;
      cursor: pointer;
    }
  }
}
</style>
