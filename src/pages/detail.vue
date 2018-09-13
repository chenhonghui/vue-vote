<template>
  <section class="page-detail">
    <section class="detail-content-info">
      <section class="detail-info-item" v-for="(detailItem, index) in detailInfo" :key="index">
        <p class="detail-info-item-content">{{ detailItem.content }}</p>
      </section>
    </section>
    <section class="detail-content-rule">
      <section class="rule-info-item" v-for="(ruleItem, index) in ruleInfo" :key="index">
        <p class="rule-info-item-title">{{ruleItem.title}}</p>
        <p class="rule-info-item-content" v-html="ruleItem.content"></p>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      detailInfo: [
        {
          content: '为了响应国家及省市相关部门的要求，改善医疗服务质量、构建和谐医患关系，树立医院良好形象，成都三六三医院拟面向大众公开收集医院社会评价的同时，征集医院形象宣传语。'
        },
        {
          content: '成都三六三医院是集医疗、教学、科研、预防保健功能于一体的国家公立三级甲等综合医院，秉承“以综合医院为依托，以特色专科为龙头”的办院思路，科室设置较齐全，专科特色突出，“微创外科”和“肿瘤多学科整合治疗”优势明显……关于医院的详细介绍您可以关注微信公众号“三六三医院”了解哦。'
        }
      ],
      ruleInfo: [
        {
          title: '奖项设置',
          content: '一等奖：（1名） 10000元；<br/>二等奖：（2名） 5000元；<br/>三等奖：（3名） 3000元；<br/>优秀奖：（10名）；价值2000元健康体验卡一张（可转赠）'
        },
        {
          title: '征集要求',
          content: '1、突出医院性质为综合性医院（国家公立三级甲等综合医院），并重点凸显医院的特色技术。<br/>2、简短精炼，朗朗上口，富有感染力和亲和力，易于记忆和传播，字数不超过18字。并对宣传语创意来源和内涵进行说明，说明字数不超过100字。'
        },
        {
          title: '投稿流程',
          content: '1、您第一步需关注“三六三医院”微信公众号，点击下方“形象宣传语征集”，阅读活动详情，并按相关要求上传作品即可。<br/>2、投稿作品经征集组委会审核通过后将在“成都三六三医院形象宣传语征集活动”页面按照投稿先后顺序进行展示并接受投票和社会监督，显示信息为“编号+宣传语（包括创意及内涵说明）+投稿者”。'
        },
        {
          title: '公平公正原则',
          content: '为做到公平、公正、公开的原则，活动全程接受医院纪委、媒体、公证处、社会各界的监督，并设有监督电话。'
        },
        {
          title: '活动时间',
          content: '2018年9月12日-28日。最终的获奖作品将通过媒体进行公示。'
        },
        {
          title: '温馨提示',
          content: '1、投稿作品须为原创，不得与国内其他宣传语雷同，如涉及著作权纠纷等法律问题，由投稿者本人负责。 <br/>2、每位投稿者最多可提交3条作品，若有重复，则以最后投稿的作品为准。<br/>3、接受团队形式参与者，最终将以团队集体作品参与评选，评选结果不受团队与个人区分影响。<br/>4、作品需具有创意并且主题突出，对不符合要求的作品征集组委会有权进行筛除。<br/>5、如在投稿作品中出现雷同，以最先投稿为准，征集组委会不单独通知相同投稿者。<br/>6、咨询和监督电话：028-61810362。'
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
  background: $BG_COLOR;
  padding-bottom: 100px;

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
