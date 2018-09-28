<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider">
      <SideMenu accordion :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage"
                :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo"/>
          <img v-show="collapsed" :src="minLogo"/>
        </div>
      </SideMenu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <HeaderBar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <User user-avatar="http://img1.imgtn.bdimg.com/it/u=3959116217,1142935632&fm=26&gp=0.jpg"/>
        </HeaderBar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <TagsNav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content>
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import { mapMutations } from 'vuex'
import SideMenu from './components/side-menu/SideMenu'
import HeaderBar from './components/header-bar/HeaderBar'
import TagsNav from './components/tags-nav/TagsNav'
import User from './components/user/User'
import { getNewTagList, getNextName } from '../../libs/util'
import minLogo from '../../assets/images/logo-min.jpg'
import maxLogo from '../../assets/images/logo.jpg'

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    User
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo
    }
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)) : []
    },
    menuList () {
      return this.$store.getters.menuList
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag'
    ]),
    turnToPage (name) {
      this.$router.push({
        name: name
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, name) {
      const nextName = getNextName(this.tagNavList, name)
      this.setTagNavList(res)
      if (type === 'all') this.turnToPage('home')
      else if (this.$route.name === name) this.$router.push({name: nextName})
    },
    handleClick (item) {
      this.turnToPage(item.name)
    }
  },
  watch: {
    '$route' (newRoute) {
      this.setBreadCrumb(newRoute.matched)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag(this.$store.state.app.homeRoute)
    this.setBreadCrumb(this.$route.matched)
  }
}
</script>

<style lang="less">
.main {
  .logo-con {
    height: 64px;
    padding: 10px;
    img {
      height: 44px;
      width: auto;
      display: block;
      margin: 0 auto;
    }
  }
  .header-con {
    background: #fff;
    padding: 0 20px;
    width: 100%;
  }
  .main-layout-con {
    height: 100%;
    overflow: hidden;
  }
  .main-content-con {
    height: ~"calc(100% - 60px)";
    overflow: hidden;
  }
  .tag-nav-wrapper {
    padding: 0;
    height: 40px;
    background: #F0F0F0;
  }
  .content-wrapper {
    padding: 18px;
    height: ~"calc(100% - 80px)";
    overflow: auto;
  }
  .left-sider {
    overflow: hidden;
    .ivu-layout-sider-children {
      overflow-y: scroll;
      margin-right: -18px;
    }
  }
  .ivu-menu-item > i {
    margin-right: 12px !important;
  }
  .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
    margin-right: 8px !important;
  }
  .ivu-select-dropdown.ivu-dropdown-transfer {
    max-height: 1000px;
    & div.ivu-dropdown {
      width: 100%;
      margin: 0;
      line-height: normal;
      padding: 7px 0 6px 16px;
      clear: both;
      font-size: 12px !important;
      white-space: nowrap;
      list-style: none;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
      &:hover {
        background: rgba(100, 100, 100, 0.1);
      }
      & * {
        color: #515a6e;
      }
    }
  }
  .collased-menu-dropdown {
    width: 100%;
    margin: 0;
    line-height: normal;
    padding: 7px 0 6px 16px;
    clear: both;
    font-size: 12px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    &:hover {
      background: rgba(100, 100, 100, 0.1);
    }
    & * {
      color: #515a6e;
    }
    .ivu-menu-item > i {
      margin-right: 12px !important;
    }
    .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
      margin-right: 8px !important;
    }
  }

  .ivu-select-dropdown.ivu-dropdown-transfer {
    max-height: 400px;
  }
}
</style>