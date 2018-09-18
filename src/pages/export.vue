<template>
  <section class="page-export">
    <div class="page-export-form" v-if='!isLogined'>
      <p class="form-title">投票系统</p>
      <div class="form-item" v-for='(formItem, key) in formList' :key='key'>
        <p class="form-item-label">{{formItem.label}}</p>
        <input :type="formItem.type" class="form-item-input" v-model="formLabel[formItem.model]" :placeholder="formItem.placeholder" @input="verify(formItem)"/>
      </div>
      <button class='form-submit' @click="submit()">登陆</button>
    </div>
  </section>
</template>
<script>
import api from '../api/index'
import storage from '../lib/localstorage'
import md5 from 'js-md5'
import { jump } from '../actions/common'

export default {
  data () {
    const _this = this
    return {
      formList: [
        {
          label: '用户名',
          model: 'username',
          placeholder: '请输入用户名',
          type: 'text',
          verify: (text) => {
            if (!text) {
              _this.$toast('用户名不能为空')
              return false
            }
            return true
          }
        },
        {
          label: '密码',
          model: 'password',
          placeholder: '请输入密码',
          type: 'password',
          verify: (text) => {
            if (!text) {
              _this.$toast('密码不能为空')
              return false
            }
            return true
          }
        }
      ],
      formLabel: {},
      isLogined: false
    }
  },
  methods: {
    submit () {
      const verifyResult = this.checkVerifyResult()

      if (!verifyResult) {
        return this.$toast('请确认表单填写是否正确')
      }

      const label = Object.assign({}, this.formLabel)
      label.password = md5(label.password)
      api.exportLogin(label).then(res => {
        this.$toast('登录成功')
        storage.set('token', res)
        this.isLogined = true
        this.jump()
      }, (msg) => {
        msg && this.$toast(msg)
        this.isLogined = false
      })
    },
    jump () {
      jump('/auditing', this.$router)
    },
    download () {
      api.export().then(res => {
        let url = window.URL.createObjectURL(res.data)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xls')
        document.body.appendChild(link)
        link.click()
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
    const token = storage.get('token') || ''

    if (token) {
      this.isLogined = true
      this.jump()
    }
    this.initFormLabelAndFormVerify()
  }
}
</script>
<style lang="scss" scoped>
@import '@/constant/constant.scss';

.page-export {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-btn {
    margin-bottom: 40px;
    width: 400px;
    height: 60px;
    font-size: 28px;
    border-radius: 60px;
    background: $THEME_COLOR;
    color: #fff;
    border: none;
    outline: none;
  }

  .form-title {
    margin-bottom: 120px;
    font-size: 35px;
    line-height: 60px;
    text-align: center;
    font-weight: bold;
    color: $THEME_COLOR;
  }

  .form-submit {
    width: 450px;
    height: 60px;
    font-size: 28px;
    border-radius: 60px;
    background: $THEME_COLOR;
    color: #fff;
    border: none;
    outline: none;
  }

  .form-item {
    width: 450px;
    height: 40px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;

    &-label {
      width: 100px;
      font-size: 24px;
      color: $THEME_COLOR;
    }

    &-input {
      flex: 1;
      padding-left: 10px;
      height: 36px;
      font-size: 24px;
      border: none;
      outline: none;
    }
  }
}
</style>
