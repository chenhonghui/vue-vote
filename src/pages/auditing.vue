<template>
  <section class="page-view">
    <div class="page-view-buttons">
      <Button type="info" @click="setFilterType('1')">仅通过</Button>
      <Button type="primary" @click="setFilterType('0')">仅未通过</Button>
      <Button type="success" @click="setFilterType('')">显示全部</Button>
    </div>
    <Table border :columns="columns" :data="list"></Table>
    <div style="margin: 10px;overflow: hidden">
        <Button type="success" @click="download()">下载投票数据</Button>
        <div style="float: right;">
            <Page :total="totalPage" :current="page" @on-change="changePage" :page-size="pageSize"></Page>
        </div>
    </div>
  </section>
</template>
<script>
import api from '../api/index'

export default {
  data () {
    return {
      page: 1,
      pageSize: 10,
      totalPage: 1,
      list: [],
      filterType: '',
      columns: [
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: '宣传语',
          key: 'title'
        },
        {
          title: '宣传语描述',
          key: 'content',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  marginTop: '20px',
                  marginBottom: '20px'
                }
              }, params.row.content)
            ])
          }
        },
        {
          title: '联系方式',
          key: 'contactWay'
        },
        {
          title: '状态',
          key: 'checked',
          render: (h, params) => {
            const type = params.row.checked
            let cn
            if (Number(type) === 0) {
              cn = '未通过'
              return h('strong', {
                style: {
                  color: 'red'
                }
              }, cn)
            } else {
              cn = '通过'
              return h('strong', {
                style: {
                  color: 'green'
                }
              }, cn)
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: Number(params.row.checked) === 1
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.check(params.row.id, '1')
                  }
                }
              }, '通过'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: Number(params.row.checked) === 0
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.check(params.row.id, '0')
                  }
                }
              }, '拒绝')
            ])
          }
        }
      ]
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    setFilterType (type) {
      this.filterType = type
      this.initList()
    },
    initList () {
      const type = this.filterType
      this.page = 1
      this.getPageData(this.page, type)
    },
    changePage (page) {
      const type = this.filterType
      this.getPageData(page, type)
    },
    getPageData (page, type) {
      api.getUncheckedList(page, type).then(res => {
        this.list = res.content
        this.totalPage = Number(res.totalCount)
      })
    },
    download () {
      api.export().then(res => {
        if (!res) {
          return
        }
        let url = window.URL.createObjectURL(res.data)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xls')
        document.body.appendChild(link)
        link.click()
      })
    },
    check (contentId, checked) {
      api.check(contentId, checked).then(res => {
        this.getPageData(this.page)
        this.$toast('操作成功')
      }, (msg) => {
        msg && this.$toast(msg)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view {
  margin: 100px;

  &-buttons {
    margin-bottom: 40px;
  }
}
</style>
