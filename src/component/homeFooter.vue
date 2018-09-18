<template>
  <section class="-footer">
    <section v-if="btns.length > 0" class="-footer-btn-item" v-for="btn in btns" :key="btn.name" @click.stop="goPage(btn.path)">
        <i :class="`icon iconfont icon-${btn.icon} btn-icon`"></i>
        <p class='btn-name'>{{ btn.name }}</p>
    </section>
  </section>
</template>
<script>
import { jump } from '../actions/common'

export default {
  props: {
    // 底部按钮
    footerBtns: Array
  },
  data () {
    return {
      btns: this.footerBtns
    }
  },
  methods: {
    goPage (path) {
      jump(path, this.$router)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../constant/constant.scss';

.-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 750px;
  height: 80px;
  background: #fff;
  border-top: 1px solid #eaeaea;

  .btn-name {
    margin-top: 10px;
    color: $THEME_COLOR;
  }

  .btn-icon {
    color: $THEME_COLOR;
  }

  &-btn-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-left: 1PX solid #eaeaea;

    &:nth-last-child() {
      border: none;
    }
  }
}
</style>
