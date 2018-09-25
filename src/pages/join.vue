<template>
  <section class="join-page">
    <section class="join-container">
      <section class='form-item' v-for="(formItem, id) in formList" :key="id">
        <p class="form-item-label">{{ formItem.label }}</p>
        <p class="form-item-text" v-if="formItem.type === 'text'">{{ formLabel[formItem.model] }}</p>
        <input type="text" class='form-item-input' :placeholder="formItem.placeholder" v-model="formLabel[formItem.model]" :disabled="formItem.disabled" v-if="formItem.type === 'input'" @input="verify(formItem)">
        <div class="form-item-textarea" v-if="formItem.type === 'area'">
          <textarea class='form-item-textarea-content' v-model="formLabel[formItem.model]" @input="verify(formItem)"></textarea>
          <span class="form-item-textarea-span"></span>
        </div>
      </section>
      <button class="form-submit" @click="submit">我要投稿</button>
    </section>
  </section>
</template>
<script>
import api from '../api/index'
import { jump } from '../actions/common'

const CN_REG_18 = new RegExp(/^[\u4E00-\u9FA5|\s+ |\\！|\\!|\\,|\\.|\\，|\\。|\\（|\\）|\\(|\\)|\\《|\\》|\\"|\\'|\\‘|\\’|\\?|\\“|\\”|\\？|\\：|\\；|\\【|\\】]{0,19}[\u4E00-\u9FA5|\s+ |\\！|\\!|\\,|\\.|\\，|\\。|\\（|\\）|\\(|\\)|\\《|\\》|\\"|\\'|\\‘|\\’|\\?|\\“|\\”|\\？|\\：|\\；|\\【|\\】]{1}$/)
const CN_REG_30 = new RegExp(/^[\u4E00-\u9FA5|\s+ |\\！|\\!|\\,|\\.|\\，|\\。|\\（|\\）|\\(|\\)|\\《|\\》|\\"|\\'|\\‘|\\’|\\?|\\“|\\”|\\？|\\：|\\；|\\【|\\】]{0,99}[\u4E00-\u9FA5|\s+ |\\！|\\!|\\,|\\.|\\，|\\。|\\（|\\）|\\(|\\)|\\《|\\》|\\"|\\'|\\‘|\\’|\\?|\\“|\\”|\\？|\\：|\\；|\\【|\\】]{1}$/)

export default {
  data () {
    const _this = this
    return {
      api: api,
      verifyResult: {},
      formList: [
        // {
        //   label: '编号',
        //   model: 'id',
        //   type: 'text',
        //   default: 'test'
        // },
        {
          label: '宣传语',
          model: 'title',
          type: 'input',
          placeholder: '请输入不超过18个字的宣传语',
          verify: (text) => {
            const testCN = CN_REG_18
            if (!testCN.test(text)) {
              _this.$toast('请输入不超过18字的中文')
              return false
            }
            return true
          }
        },
        {
          label: '创意/内涵描述',
          model: 'content',
          type: 'input',
          placeholder: '请输入不超过100个字的创意/内涵描述',
          verify: (text) => {
            const testCN = CN_REG_30
            if (text.length <= 0) {
              return false
            }
            if (!testCN.test(text)) {
              _this.$toast('请输入不超过100字的中文')
              return false
            }
            return true
          }
        },
        {
          label: '姓名',
          model: 'name',
          type: 'input',
          placeholder: '请输入您的姓名',
          verify: (text) => {
            if (text.length <= 0) {
              _this.$toast('姓名不能为空')
              return false
            }
            return true
          }
        },
        {
          label: '联系方式',
          model: 'contactWay',
          type: 'input',
          placeholder: '请输入您的联系方式',
          verify: (text) => {
            if (text.length <= 0) {
              _this.$toast('联系方式不能为空')
              return false
            }
            return true
          }
        }
      ],
      formLabel: {}
    }
  },
  methods: {
    initFormLabelAndFormVerify () {
      this.formList.forEach((formItem) => {
        this.formLabel = Object.assign({}, this.formLabel, {
          [formItem.model]: ''
        })
        this.verifyResult = Object.assign({}, this.formLabel, {
          [formItem.model]: false
        })
      })
    },
    submit () {
      const verifyResult = this.checkVerifyResult()

      if (!verifyResult) {
        return this.$toast('请确认表单填写是否正确')
      }
      api.enroll(this.formLabel).then(res => {
        this.$toast('报名成功')
        jump('/vote', this.$router)
      }).catch(msg => {
        msg && this.$toast(msg)
      })
    },
    checkVerifyResult () {
      const verifyResultKeys = Object.keys(this.verifyResult)
      let verifyResult
      for (var i = 0, len = verifyResultKeys.length; i < len; i++) {
        if (!this.verifyResult[verifyResultKeys[i]]) {
          verifyResult = false
          break
        }
        verifyResult = true
      }

      return verifyResult
    },
    verify (formItem) {
      let verifyMethod = formItem.verify && typeof formItem.verify === 'function' ? formItem.verify : () => { return true }
      let VERIFY_MIN_TIME = 100
      let verify = setTimeout(() => {
        clearTimeout(verify)
        let verifyResult = verifyMethod(this.formLabel[formItem.model])
        this.verifyResult = Object.assign({}, this.verifyResult, {
          [formItem.model]: verifyResult
        })
      }, VERIFY_MIN_TIME)
    }
  },
  mounted () {
    this.initFormLabelAndFormVerify()
  }
}
</script>
<style lang="scss" scoped>
  @import '../constant/constant.scss';

  .join-page {
    background: #fff;

    .join-container {
      margin: 0 30px;
      padding: 10px 15px;
      background: $LIGHTER_THEME_COLOR;

      .form-alert {
        margin-top: 20px;
        font-size: 30px;
        color: #999;
        text-align: center;
      }

      .form-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 120px;
        border-bottom: 1PX solid $THEME_BORDER_COLOR;

        &-label {
          width: 200px;
          font-size: 28px;
          color: #333;
        }

        &-input {
          flex: 1;
          height: 70px;
          border: none;
          outline: none;
        }

        &-textarea {
          flex: 1;
          position: relative;
          height: 140px;

          &-content {
            outline: none;
            position: absolute;
            width: 490px;
            padding: 10px;
            font-size: 28px;
            border: none;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
          }
        }
      }

      .form-submit {
        margin-top: 60px;
        width: 100%;
        border-radius: 80px;
        height: 80px;
        background: $THEME_COLOR;
        color: $LIGHTER_THEME_COLOR;
        font-size: 35px;
        border: none;
        outline: none;
      }
    }
  }
</style>
