import * as type from './type';
import {localStorage} from '../../common/storage';

export default {
    [type.SET_USER_INFO](state,userinfo){
        state.user_info = userinfo || {};
        // if (userinfo === null) {
        //   localStorage.remove('user_info')
        // } else {
          localStorage.set('user_info', userinfo)
        // }
    }
}
