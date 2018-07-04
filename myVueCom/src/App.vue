

  <template>
      <div id="main">
          <router-view  @login="loginDirect"></router-view>
      </div>
  </template>
<script>
import  Vue  from 'vue';
import  iView from 'iview'
import  store from './store/index';
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
        signin:function() {
            let vm = this;
            let userInfo = vm.$store.state.user.user_info;
            if(!userInfo) {
                return vm.$router.push({path: '/login',query:{from:vm.$router.currentRoute.path}});
            }
            const res = fetch.post(user.login.url,{username:'admin',password:'123456'});
            res.then((result) => {
                    vm.$store.commit('MATCH_ROUTES',result.data)
                    vm.$router.replace({path: vm.$router.currentRoute.query.from || '/'});
             })
        },
        loginDirect(data){
            this.signin(data);
        }
    }
}
</script>

<style>

</style>
