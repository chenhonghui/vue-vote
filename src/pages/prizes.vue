<template>
  <section class="page-prizes">
    <p class="page-prizes-title">{{page_title}}</p>
    <div class="page-prizes-content" v-for='(prize, key) in prizes' :key='key'>
      <p class='page-prizes-content-level'>{{ prize.level }}</p>
      <p class="page-prizes-content-item" >{{prize.content}}</p>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      page_title: '奖项设置',
      prizes: [
        {
          level: '一等奖（1名）',
          content: '10000元。'
        },
        {
          level: '二等奖（2名）',
          content: ' 5000元。'
        },
        {
          level: '三等奖（3名）',
          content: '3000元。'
        },
        {
          level: '优秀奖（10名）',
          content: '价值2000元健康体验卡一张（可转赠）'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../constant/constant.scss';

.page-prizes {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 50px 30px 100px 30px;
  width: 690px;
  border-top: 1PX solid #e4e4e4;
  border-bottom: 1PX solid #e4e4e4;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFF;

  &-content {
    padding: 30px 20px;
    margin-bottom: 20px;
    background: $THEME_COLOR;
    box-shadow: 0px 4px 14px 0 $THEME_BORDER_COLOR;
    border-radius: 15px;

    &-level {
      margin-bottom: 20px;
      font-size: 38px;
      color: #fff;
    }

    &-item {
      font-size: 32px;
      color: #fff;
      line-height: 40px;
    }
  }

  &-title {
    margin-bottom: 30px;
    height: 60px;
    line-height: 60px;
    font-size: 60px;
    text-align: left;
    font-weight: bold;
    color: $THEME_COLOR;
  }

}
</style>
