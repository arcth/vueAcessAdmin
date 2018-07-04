//本地存储的前缀
import env from '../../../build/env';
export const storage_prefix = 'DILIGRP_STORAGE_';
//base64加密前缀
export const base64_prefix = 'DILIGRP_BASE64_';
//接入服务器接口地址根目录
// export const server_base_url = 'http://192.168.103.131:8090'
export const server_base_url = env == 'development' ?
    'https://www.easy-mock.com/mock/5ad702ba5aeb662c8cdc8e51/login' : ''
