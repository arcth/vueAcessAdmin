import axios from 'axios';
import store from '../../store';
import {Message} from 'iview';
import { server_base_url } from '../../common/config';

import qs from 'qs';
//设置用户信息
const setUserInfo = function(user){
  store.commit('SET_USER_INFO',user);
}

//获取用户信息
const getUserInfo = function(){
  let user_info = store.state.user.user_info.user;
  if(!user_info){
    return {};
  }
  return user_info;
}



axios.interceptors.request.use(config => {
  return config;
},error => {
  return Promise.reject(error);
})

axios.interceptors.response.use(response => {
  return response;
},error => {
  return Promise.resolve(error.response);
})

function checkStatus(response){
  if(response && (response.status === 200 || response.status === 304 || response.status === 400)){
    return response;
  }
  return{
    status : -404,
    msg : '网络异常'
  }
}

function checkCode(res){
  if(res.status == -404){
    Vue.$Message.error(res);
  }
  // if(res.data && (!res.data.success)){
  //   this.$Message.error(res);
  // }
  return res;
}

export default {
  post(url,data){
      return axios({
        method:'post',
        baseURL: server_base_url,
        url,
        withCredentials:true,
        data:qs.stringify(data),
        timeout:10000,
        // headers:{
        //   USERINFO : getUserInfo()
        // }
      }).then((response) => {
          return checkStatus(response);
      }).then((res) => {
          return checkCode(res);
      })
  },
  get(url,params){
    return axios({
      method:'get',
      baseURL:server_base_url,
      url,
      params,
      timeout:10000,
      // headers:{
      //   USERINFO : getUserInfo()
      // }
    }).then((response)=>{
        return checkStatus(response);
    }).then((res) => {
        return checkCode(res);
    })
  }
}

