<template>
  <div id="app">
    <section class='-content'>
      <router-view/>
    </section>
    <homeFooter :footer-btns='homeBtns'></homeFooter>
  </div>
</template>

<script>
import homeFooter from './component/homeFooter.vue'
import auth from './lib/auth'
import {share} from './lib/share'

export default {
  name: 'App',
  data () {
    return {
      homeBtns: [
        {
          name: '首页',
          path: '/',
          icon: 'renkou'
        },
        {
          name: '详情',
          path: '/detail',
          icon: 'tijiaowendang'
        },
        {
          name: '投稿',
          path: '/join',
          icon: 'jinbi'
        },
        {
          name: '奖品',
          path: '/prizes',
          icon: 'jiangpai'
        }
      ]
    }
  },
  mounted () {
    auth.login().then(() => {
      share('成都三六三医院形象宣传语及社会评价征集活动', '成都三六三医院现面向大众公开收集医院社会评价的同时，征集医院形象宣传语。', () => {}, () => {})
    }, (e) => {
      console.log(e)
    })
  },
  components: {
    homeFooter
  }
}
</script>

<style lang="scss">

#app {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;

  .-content {
    width: 750px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
  }
}
</style>
