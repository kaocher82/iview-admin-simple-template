<template>
  <div class="tags-nav">
    <div class="close-con">
      <Dropdown transfer @on-click="handleTagsOption" style="margin-top:7px;">
        <Button size="small" type="text">
          <Icon :size="18" type="ios-close-circle-outline"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="close-all">关闭所有</DropdownItem>
          <DropdownItem name="close-others">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="btn-con left-btn">
      <Button icon="ios-arrow-back" type="text" style="font-size: 18px;" @click="handleScroll(240)"></Button>
    </div>
    <div class="btn-con right-btn">
      <Button icon="ios-arrow-forward" type="text" style="font-size: 18px;" @click="handleScroll(-240)"></Button>
    </div>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
          <Tag type="dot"
               v-for="item in list"
               ref="tagsPageOpened"
               :key="`tag-nav-${item.name}`"
               :name="item.name"
               :closable="item.name !== 'home'"
               :color="item.name === value.name ? 'primary' : 'default'"
               @on-close="handleClose"
               @click.native="handleClick(item)">
            {{ showTitleInside(item) }}
          </Tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tagsNav',
  props: {
    value: Object,
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tagBodyLeft: 0
    }
  },
  methods: {
    handlescroll (e) {
      const type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll (offset) {
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (this.$refs.scrollOuter.offsetWidth < this.$refs.scrollBody.offsetWidth) {
          if (this.tagBodyLeft > -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollOuter.offsetWidth)) {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, this.$refs.scrollOuter.offsetWidth - this.$refs.scrollBody.offsetWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    handleTagsOption (type) {
      if (type === 'close-all') {
        // 关闭所有，除了home
        let res = this.list.filter(item => item.name === 'home')
        this.$emit('on-close', res, 'all')
      } else {
        // 关闭除当前页和home页的其他页
        let res = this.list.filter(item => item.name === this.value.name || item.name === 'home')
        this.$emit('on-close', res, 'others')
      }
    },
    handleClose (e, name) {
      let res = this.list.filter(item => item.name !== name)
      this.$emit('on-close', res, undefined, name)
    },
    handleClick (item) {
      this.$emit('input', item)
    },
    showTitleInside (item) {
      return (item.meta && item.meta.title) || item.name
    }
  }
}
</script>

<style lang="less">
.no-select {
  user-select: none;
}

.size {
  width: 100%;
  height: 100%;
}

.tags-nav {
  position: relative;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
  .no-select;
  .size;
  .close-con {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
  }
  .btn-con {
    position: absolute;
    top: 0;
    height: 100%;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
    button {
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
    &.left-btn {
      left: 0;
    }
    &.right-btn {
      right: 32px;
      border-right: 1px solid #F0F0F0;
    }
    .ivu-btn > .ivu-icon {
      line-height: normal;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 28px;
    right: 61px;
    top: 0;
    bottom: 0;
    box-shadow: 0 0 3px 2px rgba(100, 100, 100, .1) inset;
    .scroll-body {
      height: ~"calc(100% - 1px)";
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left .3s ease;
      .ivu-tag-dot-inner {
        transition: background .2s ease;
      }
    }
  }
}
</style>