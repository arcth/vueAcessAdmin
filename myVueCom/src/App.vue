
  <!-- <div id="app">
    <router-view/>
  </div> -->
  <template>
    <router-view id="app" @login="loginDirect"></router-view>
  </template>
<script>
import  Vue  from 'vue';
import  iView from 'iview'
import  store from './store';
import  fetch from './common/fetch';
import  {user} from './common/api'
import  userPath from './router/fullPath';
import  {baseTool} from './common/utils'
export default{
    data(){
        return{
          menuData:null,
          userDate:null
        }
    },
    created: function(newPath) {
      this.signin();
  },
    methods:{
        signin(data){
            let vm = this;
            let userInfo = store.state.user_info.user;
            if(!userInfo) {
                return vm.$router.push({path: '/login',query:{from:vm.$router.currentRoute.path}});
            }
            const res = fetch.post(user.login.url,{username:'admin',password:'123456'});
            res.then((result) => {
//              console.log(result.data);
                let allowedRoute =  vm.getRoutes(result.data);
                vm.extendRoutes(allowedRoute);
                vm.keepMenuData(allowedRoute);
                this.$router.replace({path: vm.$router.currentRoute.query.from || '/'});
            })

        },
        loginDirect(data){
            this.signin(data);
        },
        getRoutes(userinfo){
            if(!userinfo.menus){
              return console.warn(userinfo);
            }
            let arr = [];
            let allowedRouter = [];
            arr = baseTool.buildMenu(userinfo.menus);
            let hashMenus = {};
            let setHashMenu = function(array,base){
                array.map(key => {
//                  debugger;
                  if(key.route){
                    let hashKey = ((base?base+ '/': '')+key.route).replace(/^\//,'');
                    hashMenus['/' + hashKey] = true;
                    if(Array.isArray(key.children)){
                      setHashMenu(key.children,key.route);
                    }
                  }
                })
            }
            setHashMenu(arr); // {/user:true}
            //遍历本地路由
            let findLocalRoute = function(array,base){
                let replyResult = [];
                array.forEach(function(route){
                    let pathKey = (base? base + '/':'')+route.path;
                    if(hashMenus[pathKey]){
                        if(Array.isArray(route.children)){
                            route.children = findLocalRoute(route.children,route.path);
                        }
                        replyResult.push(route);
                    }
                })
                if(base){
                    return replyResult;
                }else{
                    allowedRouter = allowedRouter.concat(replyResult);
                }
            }
            let originPath = baseTool.deepCopy(userPath[0].children);
            findLocalRoute(originPath);
            return allowedRouter;
        },
        extendRoutes:function(allowedRouter){ //注入动态路由
            let originPath = baseTool.deepCopy(userPath);
            originPath[0].children = allowedRouter;
            this.$router.addRoutes(originPath.concat([{
                path:'*',
                redirect: '/404'
            }]))
        },
        keepMenuData:function(allowedRouter){
            allowedRouter.forEach(route => {
                if(route.children){
                    if(!route.meta) route.meta = {};
                    route.meta.children = route.children;
                }
            });
            this.menuData = allowedRouter;
        },
        getPermission(userinfo){
            let resourcePermission = {};
            if(Array.isArray(userinfo.resources)){
              userinfo.resources.forEach(function(e,i){
                let key = e.url;
                resourcePermission[key] = true;
              });
            }
            return resourcePermission;
        }
    }
}
</script>

<style>
</style>
