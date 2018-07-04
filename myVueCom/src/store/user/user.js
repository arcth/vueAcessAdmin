import * as type from './type';
import {localStorage} from '../../common/storage';

const user = {
    state:{
        user_info:localStorage.get('USER')
    },
    getters:{
      [type.GET_USER_INFO](state){
          return state.user_info;
      }
    },
    mutations:{
        [type.SET_USER_INFO](state,userinfo){
            debugger;
            state.user_info = userinfo;
            localStorage.set('USER',userinfo);
        },
        [type.LOGOUT](state){
            state.user_info = {};
            localStorage.remove('USER');
        }
    }
}

export  default  user;
