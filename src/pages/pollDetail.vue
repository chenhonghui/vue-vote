<template>
  <section class='poll-detail' v-if='pollInfo'>
    <section class="poll-detail-header">
      <section class="poll-detail-header-name">{{pollInfo.id}}号:{{pollInfo.name}}</section>
      <section class="poll-detail-header-title">“ {{pollInfo.title}} ”</section>
      <section class="poll-detail-header-desc">{{pollInfo.content}}</section>
    </section>
    <section class="poll-detail-footer">
      <section class="poll-detail-footer-poll">{{pollInfo.ticket}}票</section>
      <button class="poll-detail-footer-btn" @click="vote()">投票</button>
    </section>
  </section>
</template>
<script>
import api from '../api/index'

export default {
  data () {
    return {
      pollInfo: null,
      contentId: null
    }
  },
  mounted () {
    this.initPageData()
  },
  methods: {
    initPageData () {
      const contentId = this.$route.query.contentId || null

      contentId && api.getDetail(contentId).then(res => {
        this.contentId = contentId
        this.pollInfo = res
      })
    },
    vote () {
      api.vote(this.contentId).then(() => {
        this.$toast('投票成功')
        this.initPageData()
      }).catch(() => {
        this.$toast('同一个用户一天只能投一次票')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../constant/constant.scss';

.poll-detail {
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-header {
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 690px;
    background: rgba(239, 239, 239, 0.6);
    border-radius: 15px;
    box-shadow: 0px 4px 14px 0 $THEME_BORDER_COLOR;

    &-name {
      margin-bottom: 50px;
      font-size: 36px;
      line-height: 45px;
    }

    &-title {
      margin-bottom: 30px;
      text-align: center;
      font-size: 42px;
      line-height: 50px;
      color: $THEME_COLOR;
    }

    &-desc {
      font-size: 36px;
      line-height: 40px;
      color: #666;
    }
  }

  &-footer {
    position: absolute;
    bottom: 130px;

    &-btn {
      width: 730px;
      height: 80px;
      border-radius: 80px;
      background: $THEME_COLOR;
      color: #fff;
      border: none;
      outline: none;
      font-size: 35px;
    }

    &-poll {
      color: $THEME_COLOR;
      font-size: 32px;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
