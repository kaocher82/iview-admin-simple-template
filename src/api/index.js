import { fetch } from '../libs/axios'

/**
 api接口封装
 例如
 */
export const getList = (params) => fetch('/xxx/xxx', params)