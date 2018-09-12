<template>
  <ErrorContent code="500" desc="Oh~~鬼知道服务器经历了什么～" :src="src"/>
</template>

<script>
import error500 from '../../assets/images/error-page/error-500.svg'
import ErrorContent from './ErrorContent'

export default {
  name: '500',
  components: {ErrorContent},
  data () {
    return {
      src: error500
    }
  }
}
</script>