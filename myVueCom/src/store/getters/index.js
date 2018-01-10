/**
 *
 */

import * as type from './type'

export default {
  //获取用户信息
  [type.GET_USER_INFO]: state => {
    return state.user_info
  }
}
