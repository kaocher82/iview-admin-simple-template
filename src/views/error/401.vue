<template>
  <ErrorContent code="404" desc="Oh~~您的页面好想飞走了~" :src="src"/>
</template>

<script>
import error401 from '../../assets/images/error-page/error-401.svg'
import ErrorContent from './ErrorContent'

export default {
  name: 'Error_401',
  components: {ErrorContent},
  data () {
    return {
      src: error401
    }
  }
}
</script>

<style scoped>

</style>