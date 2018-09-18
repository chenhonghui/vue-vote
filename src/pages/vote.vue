<template>
  <section class="page-vote" v-if='stopTime'>
    <header class="header">
      <div class="header-img" :style="{backgroundImage: `url(${topImg})`}"  @dblclick="clear()"></div>
      <section class="header-join">
        <button class="header-join-btn" @click.stop='goJoin'>我要投稿</button>
        <button class="header-join-btn" @click="jumpTo()">我要了解医院</button>
      </section>
      <div class="header-num">
        <div class="header-num-content" v-for="(numItem, key) in numArray" :key="key">
          <div class="header-num-container">
            <p class='header-num-text'><i :class='`icon iconfont icon-${numItem.icon} btn-icon`'></i>{{ numItem.text }}</p>
            <p class='header-num-main'>{{ numItem.num }}</p>
          </div>
        </div>
      </div>
      <div class="header-cutdown">
        <p class="header-cutdown-title">征集结束倒计时</p>
        <div class="header-cutdown-content">
          <p v-if='stopTime > 0' v-for='(value, key) in cutdown' :key='key' class='header-cutdown-content-word'>{{value}} {{ paramsToWord[key] }}</p>
          <p v-if='stopTime <= 0' class='header-cutdown-content-word'>活动已结束</p>
        </div>
      </div>
    </header>
    <section class="content">
      <section class="content-bg">
        <img src="@/assets/images/to.jpg" class='content-bg-img'>
      </section>
      <section class="content-alert">
        <section class="content-alert-content">
          <p class="content-alert-title">{{rule.title}}</p>
          <p class="content-alert-list" v-for='(item, key) in rule.list' :key='key'>{{item}}</p>
          <p class="content-alert-alert">{{rule.alert}}</p>
        </section>
      </section>
      <section class="content-search">
        <section class='content-search-main'>
          <input type="text" class="content-search-main-input" placeholder="输入编号、名字进行搜索" v-model="searchValue">
          <button class="content-search-main-btn" @click="search">搜索</button>
        </section>
      </section>
      <section class='content-list'>
        <section class="content-list-item" v-for='(listItem, index) in list' :key='index' @click="goDetail(listItem.id)">
            <p class='content-list-item-desc'>{{ listItem.id }}号:{{ listItem.name }}</p>
            <p class="content-list-item-info">{{ listItem.title }}</p>
            <p class='content-list-item-name'>{{ listItem.content }}</p>
            <button class='content-list-item-btn content-list-btn' @click.stop='vote(listItem.id)'>投票</button>
            <p class="content-list-item-poll">{{ listItem.ticket }}票</p>
        </section>
        <section class="content-list-page">
          <button class="content-list-page-prev" :disabled='page === 1' @click="getPrevPage()">上一页</button>
          <p class="content-list-page-result">{{page}} / {{totalPage}}</p>
          <button class="content-list-page-prev" :disabled='page === totalPage' @click="getNextPage()">下一页</button>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import headerImg from '../assets/images/header-bg.jpg'
import { jump } from '../actions/common'
import api from '../api/index'
import storage from '../lib/localstorage'

function cutDownTime (time, _this) {
  var timeDiff = time
  const initTime = Math.floor(new Date().getTime() / 1000)
  let interval = setTimeout(() => {
    const nowTime = Math.floor(new Date().getTime() / 1000)
    let freeTime = timeDiff - (nowTime - initTime)
    timeDiff = freeTime
    var day = Math.floor(timeDiff / 3600 / 24)
    timeDiff = timeDiff - day * 24 * 3600
    var hour = Math.floor(timeDiff / 3600)
    timeDiff = timeDiff - hour * 3600
    var minute = Math.floor(timeDiff / 60)
    timeDiff = timeDiff - minute * 60
    var second = Math.floor(timeDiff)
    _this.cutdown = { day, hour, minute, second }
    clearInterval(interval)
    cutDownTime(freeTime, _this)
  }, 1000)
}

export default {
  data () {
    return {
      voteTitle: '成都三六三医院形象宣传语征集活动',
      timeList: [
        '开始时间：2018年9月15日',
        '截止时间：2018年9月30日'
      ],
      prizeList: [
        '一等奖  1名   奖金10000元',
        '二等奖  2名   奖金5000元',
        '三等奖  3名   奖金3000元',
        '优秀奖  10名  2000元健康体验卡一张'
      ],
      page: 1,
      rule: {
        title: '征集规则',
        list: [
          '针对医院的社会评价，要求客观真实。',
          '宣传语投稿作品须为原创，不得与国内其他宣传语雷同，如涉及著作权纠纷等法律问题，由投稿者本人负责。',
          '每位投稿者最多可提交3条宣传语，若有重复，则以最后投稿的作品为准。',
          '宣传语需具有创意并且主题突出，对不符合要求的作品征集组委会有权进行筛除。',
          '如在投稿作品中出现雷同，以最先投稿为准，征集组委会不单独通知相同投稿者。',
          '作品一旦获奖，获奖作品知识产权归成都三六三医院所有。',
          '如本次活动无最终当选作品，则奖项空缺，评选终止。'
        ],
        alert: '成都三六三医院对此次活动拥有最终解释权！'
      },
      searchValue: '',
      paramsToWord: {
        day: '天',
        hour: '时',
        minute: '分',
        second: '秒'
      },
      cutdown: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      },
      numArray: [
        {
          icon: 'fasongchenggong',
          text: '已报名',
          num: '0'
        },
        {
          icon: 'shuju',
          text: '累计投票',
          num: '0'
        },
        {
          icon: 'fenxiang',
          text: '访问量',
          num: '0'
        }
      ],
      topImg: headerImg,
      stopTime: 1200006,
      listType: 'list',
      totalPage: 1,
      status: {
        showLoadMore: true
      },
      list: []
    }
  },
  created () {
  },
  mounted () {
    this.initOtherInfo()
    this.initPageData()
  },
  methods: {
    clear () {
      this.$toast('清除缓存成功')
      storage.clear()
      window.location.href = window.location.origin + window.location.pathname
    },
    goDetail (id) {
      jump(`/pollDetail?contentId=${id}`, this.$router)
    },
    initOtherInfo () {
      api.indexInfo().then(res => {
        this.numArray[0].num = res.enrollNum
        this.numArray[1].num = res.sumTicket
        this.numArray[2].num = res.viewCount
        this.stopTime = res.endTime
        res.endTime > 0 && cutDownTime(this.stopTime, this)
      })
    },
    getPageData (page) {
      if (this.totalPage && page > this.totalPage) {
        return this.$toast('当前已是最后一页')
      }
      return api.getVoteList(page)
    },
    getNextPage () {
      this.page = this.page + 1
      this.getPageData(this.page).then(res => {
        this.list = [].concat(res.content)
        this.totalPage = res.totalPage
      })
    },
    getPrevPage () {
      this.page = this.page - 1
      this.getPageData(this.page).then(res => {
        this.list = [].concat(res.content)
        this.totalPage = res.totalPage
      })
    },
    initPageData () {
      this.page = 1
      this.getPageData(this.page).then((res) => {
        this.list = [].concat(res.content)
        this.totalPage = res.totalPage
      })
    },
    goJoin () {
      jump('/join', this.$router)
    },
    vote (id) {
      api.vote(id).then(() => {
        this.$toast('投票成功')
        this.initOtherInfo()
        this.initPageData()
      }).catch((msg) => {
        msg && this.$toast(msg)
      })
    },
    search () {
      const searchValue = this.searchValue
      api.searchVoteList(searchValue).then(res => {
        this.list = [].concat(res.content)
        this.totalPage = Number(res.totalPage)
        this.page = Number(res.page) || 1
        this.status = Object.assign({}, this.status, { showLoadMore: false })
      })
    },
    fetchMoreList () {
      const lastList = this.list.slice(0)
      this.page++
      this.getPageData(this.page).then(res => {
        if (this.page < res.totalPage) {
          this.status = Object.assign({}, this.status, { showLoadMore: true })
        } else {
          this.status = Object.assign({}, this.status, { showLoadMore: false })
        }
        this.list = lastList.concat(res.content)
        this.totalPage = res.totalPage
      })
    },
    jumpTo () {
      window.location.href = 'http://his.mobimedical.cn/index.php?g=Wap&m=CloudIndex&a=introduce&entry=1&wx=MbTXAN2k'
    }
  },
  components: {
    vueWaterfallEasy
  }
}
</script>
<style lang="scss" scoped>
  @import '../constant/constant.scss';

  .header {
    &-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 750px;
      height: 502px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    &-title {
      margin-bottom: 100px;
      font-size: 50px;
      font-weight: bold;
      color: $LIGHTER_THEME_COLOR;
      text-align: center;
    }

    &-time {
      margin-bottom: 100px;
      &-item {
        margin-bottom: 20px;
        font-size: 30px;
        color: $LIGHTER_THEME_COLOR;
      }
    }

    &-prize {
      &-title {
        margin-bottom: 40px;
        font-size: 35px;
        color: $LIGHTER_THEME_COLOR;
        text-align: center;
      }

      &-item {
        margin-bottom: 20px;
        font-size: 30px;
        color: $LIGHTER_THEME_COLOR;
        text-align: center;
      }
    }

    &-num {
      display: flex;
      height: 120px;

      &-container {
        width: 100%;
        border-right: 1PX solid $THEME_BORDER_COLOR;
      }

      &-main {
        margin-top: 10px;
        font-size: 35px;
        color: $THEME_COLOR;
        text-align: center;
      }

      &-text {
        text-align: center;
      }

      &-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
      }
    }

    &-cutdown {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 20px 0;
      width: 750px;
      background: $THEME_COLOR;

      &-title {
        font-size: 40px;
        color: #eee;
      }

      &-content {
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &-content-word {
        margin-right: 24px;
        color: #eeeeee;
        font-size: 32px;

        &:nth-last-child() {
          margin: 0;
        }
      }
    }

    &-join {
      display: flex;
      justify-content: center;
      margin-top: -40px;

      &-btn {
        width: 300px;
        height: 80px;
        background: $THEME_COLOR;
        border-radius: 50px;
        outline: none;
        border: none;
        color: #fff;
        font-size: 28px;
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .content {
    width: 100%;

    &-btn {
      margin: 30px;
      width: 690px;
      height: 80px;
      border-radius: 80px;
      background: #fff;
      color: $THEME_COLOR;
      border: 1PX solid $THEME_COLOR;
      font-size: 35px;
      outline: none;
    }

    &-bg {
      &-img {
        width: 750px;
      }
    }

    &-alert {
      margin: 0 auto;
      margin-top: 60px;
      display: flex;
      padding: 30px;
      align-items: center;
      justify-content: center;
      width: 720px;
      background-image: -webkit-repeating-linear-gradient(135deg, transparent, transparent 4px, white 4px, white 12px);
      white-space: normal;
      display: block;
      background-color: rgb(95, 156, 239);
      box-sizing: border-box;

      &-title {
        margin-bottom: 40px;
        font-size: 38px;
        text-align: center;
        font-weight: bold;
        color: $THEME_COLOR;
      }

      &-list {
        margin-bottom: 20px;
        padding-left: 40px;
        font-size: 32px;
        line-height: 45px;
        background: url('~@/assets/images/icon4.png') no-repeat left 6.5px;
        background-size: 32px 32px;
      }

      &-alert {
        padding-top: 40px;
        padding-bottom: 15px;
        font-size: 28px;
        text-align: right;
      }

      &-content {
        padding: 40px 20px 0;
        width: 620px;
        background: #fff;
      }
    }

    &-search {
      display: flex;
      align-items: center;
      margin: 20px 20px 0;
      height: 100px;
      background: $LIGHTER_THEME_COLOR;

      &-main {
        width: 100%;
        display: flex;
        align-items: center;
        border: 1PX solid $THEME_BORDER_COLOR;
        border-radius: 80px;

        &-input {
          padding-left: 20px;
          display: block;
          outline: none;
          border: none;
          height: 100px;
          border-radius: 80px;
          flex: 5;
        }

        &-btn {
          margin-right: 5px;
          padding: 0 30px;
          display: block;
          height: 90px;
          outline: none;
          border: none;
          border-radius: 80px;
          background: $THEME_COLOR;
          color: $LIGHTER_THEME_COLOR;
          flex: 1;
        }
      }
    }

    &-rule {
      padding: 50px 15px 100px 15px;
      width: 720px;
      border-top: 1PX solid #e4e4e4;
      border-bottom: 1PX solid #e4e4e4;

      &-title {
        margin:0 auto 30px;
        background: $THEME_COLOR;
        border-radius: 60px;
        width: 200px;
        height: 60px;
        line-height: 60px;
        font-size: 35px;
        text-align: center;
        color: #fff;
      }

      &-content {
        padding: 0 40px;
        font-size: 32px;
        color: $THEME_COLOR;
        line-height: 40px;
      }
    }

    &-waterfall {
      max-height: 600px;
    }

    &-list {
      padding-top: 20px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 100%;
      background: #fff;
      border-bottom: 1PX solid #d2d2d2;
      padding-bottom: 95px;

      &-page {
        margin: 50px auto;
        display: flex;
        justify-content: center;
        align-items: center;

        &-next, &-prev {
          border-radius: 60px;
          height: 60px;
          padding: 0 30px;
          line-height: 60px;
          font-size: 30px;
          background: $THEME_COLOR;
          color: #fff;
          outline: none;
          border: none;

          &:disabled {
            background: #f0f1f2;
            color: $THEME_COLOR_BG;
          }
        }

        &-result {
          color: $THEME_COLOR;
          font-size: 30px;
          padding: 0 30px;
        }
      }
      &-btn {
        margin: 0 auto;
        width: 305px;
        border-radius: 15px;
        margin-top: 10px;
        height: 65px;
        background: $THEME_COLOR;
        color: $LIGHTER_THEME_COLOR;
        outline: none;
        border: none;
      }

      &-load {
        margin: 20px 0;
      }

      &-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 30px;
        margin-bottom: 20px;
        width: 330px;
        border-radius: 20px;
        background: $LIGHTER_THEME_COLOR;
        height: 420px;
        overflow: hidden;
        box-shadow: 0px 4px 14px 0 $THEME_BORDER_COLOR;

        &-info {
          padding: 20px 10px;
          font-size: 30px;
          line-height: 35px;
          max-height: 110px;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: #000;
        }

        &-poll {
          height: 50px;
          line-height: 50px;
          font-size: 30px;
          background: #efeded;
          text-align: center;
          color: $THEME_COLOR;
        }

        &-name {
          padding: 0 10px;
          margin-top: 10px;
          width: 310px;
          height: 30px;
          font-size: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 30px;
          color: #333;
        }

        &-desc {
          padding: 20px 10px;
          background: $THEME_COLOR;
          font-size: 32px;
          color: #fff;
          line-height: 40px;
          white-space: normal;
          text-align: center;
        }

        &:nth-last-child() {
          border: none;
        }
      }
    }
  }
</style>
