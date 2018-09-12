<template>
  <div class="header-bar">
    <SiderTrigger :collapsed="collapsed" @on-change="handleCollpasedChange"/>
    <CustomBreadCrumb show-icon style="margin-left: 30px;" :list="breadCrumbList"/>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import SiderTrigger from './sider-trigger/SiderTrigger'
import CustomBreadCrumb from './custom-bread-crumb/CustomBreadCrumb'

export default {
  name: 'HeaderBar',
  components: {
    SiderTrigger,
    CustomBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>

<style lang="less" scoped>
.header-bar {
  width: 100%;
  height: 100%;
  position: relative;
  .custom-content-con {
    float: right;
    height: auto;
    padding-right: 20px;
  }
}
</style>