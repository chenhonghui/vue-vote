<template>
  <section class="page-rank">
    <table class="vote-table">
      <thead class='vote-table-head'>
        <tr class='vote-table-row'>
          <th class='vote-table-rank'>排名</th>
          <th class='vote-table-detail'>参赛宣言</th>
          <th class='vote-table-poll'>票数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if='votes.length === 0' class='vote-table-row'>当前暂无投票数据</tr>
        <tr :class="`vote-table-row  ${index < 2 ? 'red' : ''}`" v-for="(voteItem, index) in votes" :key="index">
          <td class="vote-table-rank">{{ index + 1 }}</td>
          <td class="vote-table-detail">{{ voteItem.name }}:{{ voteItem.title }}</td>
          <td class="vote-table-poll">{{ voteItem.ticket }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <button class="rank-btn" @click="download">下载投票数据</button> -->
  </section>
</template>
<script>
import api from '../api/index'

export default {
  data () {
    return {
      votes: []
    }
  },
  methods: {
    download () {
      console.log('下载')
    }
  },
  mounted () {
    api.rank().then(res => {
      this.votes = [].concat(res)
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../constant/constant.scss';

.page-rank {
  padding-top: 50px;
  padding-bottom: 80px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: $BG_COLOR;

  .rank-btn {
    margin: 20px 20px 0;
    width: 710px;
    border-radius: 5px;
    height: 80px;
    background: $THEME_COLOR;
    color: $LIGHTER_THEME_COLOR;
    font-size: 35px;
    border: none;
    outline: none;
  }

  thead {
    background: $THEME_COLOR;

    th {
      color: $LIGHTER_THEME_COLOR;
    }
  }

  .vote-table {
    width: 710px;
    margin: 0 20px;
    background: #fff;
    font-size: 24px;
    border: 1PX solid $THEME_BORDER_COLOR;

    &-row {
      width: 100%;
      height: 60px;
      border-bottom: 1PX solid $THEME_BORDER_COLOR;
      display: flex;
      align-items: center;
    }

    &-rank {
      height: 100%;
      width: 100px;
      line-height: 60px;
      text-align: center;
      border-right: 1PX solid $THEME_BORDER_COLOR;
    }

    &-poll {
      width: 200px;
      text-align: center;
      line-height: 60px;
    }

    &-detail {
      padding-left: 10px;
      flex: 1;
      line-height: 60px;
      border-right: 1PX solid $THEME_BORDER_COLOR;
    }
  }
}
</style>
