<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="$props.userAvatar"/>
      <Icon :size="12" type="arrow-down-b"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'user',
  props: {
    userAvatar: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick () {

    }
  }
}
</script>

<style lang="less" scoped>
.user {
  &-avator-dropdown {
    cursor: pointer;
    display: inline-block;
    height: 32px;
    vertical-align: middle;
    line-height: 10px;
  }
}
</style>