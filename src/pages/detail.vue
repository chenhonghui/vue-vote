<template>
  <section class="page-detail">
    <section class="page-detail-header">
      <section class="detail-header-top">
        <section class="detail-header-top-icon"></section>
      </section>
      <section class="detail-header-bottom" v-html="detailInfo[0].content"></section>
      <p class="detail-header-red">获奖者最高可得10000元奖金</p>
    </section>
    <section class="page-detail-desc">
      <div class="page-detail-desc-icon top">
        <img src="@/assets/images/icon1.png">
      </div>
      <div class="page-detail-desc-content" v-html="detailInfo[1].content"></div>
      <div class="page-detail-desc-icon bottom">
        <img src="@/assets/images/icon2.png">
      </div>
    </section>
    <section class="page-detail-tips">
      <div class="page-detail-tips-left" v-html="tips"></div>
      <div class="page-detail-tips-right"></div>
    </section>
    <section class="page-detail-info">
      <div class="page-detail-info-title">
        <img src="@/assets/images/icon3.png">
        <p>{{ruleInfo[0].title}}</p>
      </div>
      <div class="page-detail-info-list1" v-for='(list1Item, key) in ruleInfo[0].list' :key='key'>
        <div class="page-detail-info-list1-tag">
          <p>{{key + 1}}</p>
        </div>
        <div class="page-detail-info-list1-content" v-html="list1Item"></div>
      </div>
    </section>
    <section class="page-detail-info">
      <div class="page-detail-info-title">
        <img src="@/assets/images/icon3.png">
        <p>{{ruleInfo[1].title}}</p>
      </div>
      <div class="page-detail-info-list2" v-for='(list2Item, key) in ruleInfo[1].list' :key='key'>
        <div class="page-detail-info-list2-tag">
          <div>{{list2Item.title}}</div>
          <p>{{key + 1}}</p>
        </div>
        <div class="page-detail-info-list2-content" v-html="list2Item.content"></div>
      </div>
    </section>
    <section class="page-detail-info">
      <div class="page-detail-info-title">
        <img src="@/assets/images/icon3.png">
        <p>{{ruleInfo[2].title}}</p>
      </div>
      <div class="page-detail-info-p">
        {{ruleInfo[2].content}}
      </div>
    </section>
    <section class="page-detail-info">
      <div class="page-detail-info-title">
        <img src="@/assets/images/icon3.png">
        <p>{{ruleInfo[3].title}}</p>
      </div>
      <div class="page-detail-info-time" v-html="ruleInfo[3].content"></div>
    </section>
    <section class="page-detail-alert">
      <section class="page-detail-alert-content">
        <p class="page-detail-alert-title">{{ruleInfo[4].title}}</p>
        <p class="page-detail-alert-list" v-for='(item, key) in ruleInfo[4].list' :key='key'>{{item}}</p>
        <p class="page-detail-alert-alert">{{ruleInfo[4].alert}}</p>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      tips: '本次活动共设<span style="font-weight: bold;color: red">16个奖项，奖金丰厚</span><br/>想拿大奖并非难事',
      detailInfo: [
        {
          content: '为了响应国家及省市相关部门的要求，改善医疗服务质量、构建和谐医患关系，树立医院良好形象，成都三六三医院现面向大众<span style="font-weight: bold">公开收集医院社会评价</span>的同时，征集<span style="font-weight: bold">医院形象宣传语</span>。'
        },
        {
          content: '成都三六三医院是集医疗、教学、科研功能于一体的<span style="font-weight: bold">国家公立三级甲等综合医院</span>，科室设置齐全，专科特色突出，<span style="font-weight: bold">“全系外科微创治疗”和“肿瘤精准整合治疗”</span>为医院优势专业……关于医院的详细介绍您可以关注微信公众号“三六三医院”了解哦。'
        }
      ],
      ruleInfo: [
        {
          title: '一、征集要求',
          list: [
            '针对医院的<span style="font-weight: bold">社会评价</span>，要求<span style="font-weight: bold">客观真实</span>，以便帮助医院发现并改进医疗服务中的不足，提高服务质量，提升患者就医体验，从而更好地<span style="font-weight: bold">履行医院的社会责任</span>',
            '宣传语<span style="font-weight: bold">突出医院性质为综合性医院（国家公立三级甲等综合医院）</span>，并<span style="font-weight: bold">重点凸显医院的特色技术</span>',
            '<span style="font-weight: bold">简短精炼，朗朗上口，富有感染力和亲和力，易于记忆和传播</span>，字数<span style="font-weight: bold">不超过</span>18字。并对宣传语创意来源和内涵进行说明，字数不超过100字'
          ]
        },
        {
          title: '二、投稿流程',
          list: [
            {
              title: '关注医院公众号',
              content: '关注<span style="font-weight: bold">“三六三医院”微信公众号</span>，点击下方“征集活动”，<span style="font-weight: bold">填写“医院社会评价调查表”并按要求上传宣传语作品即可</span>'
            },
            {
              title: '网络投票',
              content: '<span style="font-weight: bold">投稿作品</span>经征集组委会初审通过后将在“成都三六三医院形象宣传语及社会评价征集活动”页面<span style="font-weight: bold">进行展示、投票并接受社会监督</span>，显示信息为“编号+宣传语（包括创意及内涵说明）+投稿者”'
            }
          ]
        },
        {
          title: '三、评选原则',
          content: '为做到公平、公正、公开的原则，活动全程接受医院纪委、媒体、公证处、社会各界的监督，并设监督电话028-61810362。'
        },
        {
          title: '四、征集时间',
          content: '<span style="font-weight: bold">2018年9月17日-10月16日</span><br/>最终的获奖者将通过媒体进行公示'
        },
        {
          title: '温馨提示',
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
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../constant/constant.scss';

.page-detail {
  padding-top: 80px;
  background: #fff;
  padding-bottom: 100px;

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

  &-info {
    margin-top: 80px;

    &-title {
      padding-top: 8px;
      position: relative;
      margin: 0 auto;
      margin-bottom: 40px;
      width: 288px;
      height: 70px;
      background: rgb(58, 71, 148);
      border-radius: 4px;

      & img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 70px;
        height: 66px;
        transform: translate(70%, 30%);
      }

      & p {
        margin: 0 8px 8px;
        height: 62px;
        line-height: 62px;
        font-weight: bold;
        font-size: 36px;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        border: 1px dashed #fff;
      }
    }

    &-time {
      text-align: center;
      font-size: 35px;
      line-height: 55px;
    }

    &-p {
      margin: 0 auto;
      width: 720px;
      border: 2PX dashed rgb(192, 200, 209);
      padding: 20px;
      background-color: rgb(239, 239, 239);
      border-radius: 0.7em;
      font-size: 35px;
      line-height: 50px;

      box-sizing: border-box;
    }

    &-list2 {
      position: relative;
      margin: 0 60px 40px;
      border-left: 5px dashed rgb(71, 193, 168);

      &-content {
        padding-bottom: 50px;
        margin: -10px 0 0 40px;
        font-size: 35px;
        line-height: 50px;
      }

      &-tag {
        position: relative;
        transform: translate(-50%, -50%);
        padding-top: 13px;
        width: 76px;
        height: 63px;
        border-radius: 76px;
        background: rgb(249, 110, 87);

        & div {
          position: absolute;
          width: 500px;
          left: 90px;
          top: 21px;
          font-size: 36px;
          font-weight: bold;
        }

        & p {
          margin: 0 2px ;
          width: 56px;
          height: 56px;
          border-radius: 56px;
          background: #fff;
          font-size: 35px;
          line-height: 56px;
          text-align: center;
          color: rgb(249, 110, 87);;
        }
      }
    }

    &-list1 {
      position: relative;
      margin: 0 60px 40px;
      border-left: 5px dashed rgb(71, 193, 168);

      &-content {
        margin: -20px 0 0 40px;
        font-size: 35px;
        line-height: 50px;
      }

      &-tag {
        transform: translate(-50%, -50%);
        padding-top: 7px;
        width: 80px;
        height: 73px;
        border-radius: 80px;
        background: #fff;
        border: 1PX solid rgb(71, 193, 168);

        & p {
          margin: 0 7px 7px;
          width: 66px;
          height: 66px;
          border-radius: 50px;
          background: rgb(71, 193, 168);
          font-size: 35px;
          line-height: 66px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }

  &-tips {
    position: relative;
    margin: 40px 20px;
    height: 210px;

    &-left {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      padding: 20px;
      width: 600px;
      height: 115px;
      font-size: 35px;
      line-height: 42px;
      text-align: center;
      border: 10px solid $THEME_COLOR;
      background: #fff;
    }

    .page-detail-tips-right {
      z-index: 0;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 600px;
      background: $THEME_COLOR;
      height: 155px;
    }
  }

  &-desc {
    position: relative;
    margin: 60px auto;
    width: 640px;
    vertical-align: top;
    background-color: rgb(238, 248, 253);
    padding: 5px;
    border-width: 0px;
    border-radius: 5px;
    border-style: none;
    border-color: rgb(62, 62, 62);
    box-sizing: border-box;

    &-icon {
      position: absolute;

      &.top {
        right: -43px;
        top: -47px;

        & img {
          width: 86px;
          height: 94px;
        }
      }

      &.bottom {
        left: -46px;
        bottom: -60px;

        & img {
          width: 92px;
          height: 120px;
        }
      }
    }

    &-content {
      padding: 55px 30px;
      margin: 10px;
      width: 550px;
      border: 1PX dashed rgb(89, 179, 220);
      font-size: 32px;
      line-height: 50px;
      color: rgb(45, 66, 87);
    }
  }

  &-header {
    margin: 0 20px;
    width: 710px;
    border-width: 2Px 1Px;
    border-style: none none dashed;
    border-color: rgb(44, 90, 160);
    border-image: initial;
    background-color: rgb(229, 240, 247);
    border-radius: 0px;
    box-sizing: border-box;

    .detail-header-bottom {
      margin: 0 20px 30px;
      font-size: 32px;
      line-height: 50px;
      color: rgb(58, 71, 148);
    }

    .detail-header-red {
      margin: 0 auto 30px;
      text-align: center;
      text-indent: 0em;
      padding: 0px;
      box-sizing: border-box;
      font-size: 40px;
      font-weight: bold;
      color: #ff0000;
    }

    .detail-header-top {
      &-icon {
        width: 0px;
        display: inline-block;
        border-top: 20px solid rgb(255, 255, 255);
        border-left: 20px solid rgb(255, 255, 255);
        border-bottom: 20px solid transparent !important;
        border-right: 20px solid transparent !important;
        box-sizing: border-box;
      }
    }
  }

  .detail-content-rule {
    margin: 0 30px;
    padding: 30px 20px;
    background: #fff;
    box-shadow: 0px 4px 14px 0 $THEME_BORDER_COLOR;
    border-radius: 15px;

    .rule-info-item {
        margin-bottom: 50px;

        &:last-child {
          margin-bottom: 0;
        }

        &-title {
          margin: 0 auto 20px;
          font-size: 36px;
          color: $THEME_COLOR;
        }

        &-content {
          font-size: 32px;
          line-height: 50px;
          color: $THEME_COLOR;
        }
    }
  }

  .detail-content-info {
    margin: 0 30px 30px;
    padding: 20px;
    background: #fff;
    box-shadow: 0px 4px 14px 0 $THEME_BORDER_COLOR;
    border-radius: 15px;

    .detail-info-item {
      margin-top: 20px;
      width: 100%;
      display: flex;
      align-items: center;

      &-name {
        font-size: 35px;
        color: $THEME_COLOR;
      }

      &-content {
        text-indent: 50px;
        font-size: 32px;
        line-height: 50px;
        color: $THEME_COLOR;
      }
    }
  }
}

</style>
