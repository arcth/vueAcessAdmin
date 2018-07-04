import * as type from './type'
import  {baseTool} from '../../common/utils/index'
import  userPath from '../../router/fullPath';
import route from '../../router/index';
import {localStorage,sessionStorage} from '../../common/storage';

const app = {
    state:{
        menuList:localStorage.get('MENULIST') || [],
        openedSubmenuArr: localStorage.get('openedSubmenuArr') || [], // 要展开的菜单数组
        activeChild:sessionStorage.get('activeChild') || ''
    },
    getters:{
        [type.GET_ROUTES](state){
            return state.menuList;
        }
    },
    mutations:{
        [type.MATCH_ROUTES](state,menuData){
            let exoriginPath = baseTool.deepCopy(userPath);
            let data = menuData.data , menuArr = [];
            let originPath = baseTool.deepCopy(userPath[0].children);
            let allowedRoute = [];
    
            data.forEach(function(item){
                menuArr[item.code] = true;
            })
            // console.log(menuArr);
            let getAllowedRoute = function(originPath){
                let replyResult = [];
                let firstResult = [];
                originPath.forEach(function (item) {
                    if(Array.isArray(item.children)){
                        item.children.forEach(function(child){
                            if(menuArr[child.meta.code]){
                                replyResult.push(child);
                            }else{
                                if(Array.isArray(child.children)){
                                    getAllowedRoute(child);
                                }
                            }
                        })
                        item.children = replyResult;
                        allowedRoute.push(item)
                    }else{
                        if(menuArr[item.meta.code]){
                            allowedRoute.push(item);
                        }
                    }
                })
                
            }
            getAllowedRoute(originPath);
            exoriginPath[0].children = allowedRoute;
            route.addRoutes(exoriginPath.concat([{
                path:'*',
                redirect: '/404'
            }]))

            state.menuList = allowedRoute;
            // console.log(allowedRoute);
            localStorage.set('MENULIST',allowedRoute);
        },
        [type.SET_OPEN_MENU](state,name){
            state.openedSubmenuArr = name;
            sessionStorage.set('openedSubmenuArr',name);
        },
        [type.SET_ACTIVE_CHILD](state,childName){
            state.activeChild = childName;
            sessionStorage.set('activeChild',childName);
        }
    }
}

export default  app;
