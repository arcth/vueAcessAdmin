<style lang="less">
    @import "./index";
</style>
<template>
    <div class="main">
        <div class="left-menu">
            <div class="logo">
                <div class="logo-detail">
                    <img class="logo-img" src="../../src/assets/images/login-logo.png">
                    <div class="logo-name">
                        <p>园区管理系统</p>
                        <p>Estate Manage System</p>
                    </div>
                </div>
            </div>
            <side-menu :menu-list="menus" :open-names="openNames" :active-child="activeChild"></side-menu>
        </div>
        <header class="header">
        </header>
        <div class="content">
            <transition name="fade" mode="out-in">
                <router-view ></router-view>
            </transition>
        </div>
    </div>
    <!---->
</template>
<script>
    import store from '../store/index';
    import sideMenu from '../components/main/menu.vue';
    import {sessionStorage,localStorage} from '../../src/common/storage/index';
    export default {
        components: {
            sideMenu
        },
        data() {
          return {
              isCollapsed:false,
              user: {},
              activeChild:'',
              menus: [],
              breadcrumbs: [],
              openNames:[],
          };
        },
        watch: {
            '$route' (to) {
                let matched = this.$route.matched;
                this.activeChild = this.$route.name;
                this.breadcrumbs = (this.$route && this.$route.matched) || [];
                this.openNames = [];
                if(matched.length > 2){
                    this.openNames[0] = matched[1].name;
                }
                this.$store.commit('SET_OPEN_MENU',this.openNames);
                this.$store.commit('SET_ACTIVE_CHILD',this.activeChild);
            },

        },
        methods: {
            handleChange(active){
                console.log(active);
            }
        },
        created: function() {
            let login = this.$store.state.user.user_info.login;
            if(login){
                this.activeChild = this.$store.state.app.activeChild;
                this.breadcrumbs = (this.$route && this.$route.matched) || [];
            }else{
                this.$route.push({path:'/login'});
            }
            let menus = store.state.app.menuList;
            menus = menus.map(function (value) {
                value.icon = value.meta.icon;
                return value;
            })
            if(menus){
                this.menus = menus
            }

            let opendArr = sessionStorage.get('openedSubmenuArr');
            if( !opendArr ){
                this.openNames = [];
            }else{
                this.openNames = opendArr;
            }
        }
  }
</script>
