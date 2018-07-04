<style lang="less">
    @import "./menu.less";
</style>

<template>
    <Menu ref="sideMenu" :active-name="activeChild"  :open-names="openNames" :theme="theme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuData" >
            <Submenu  :name="item.name" :key="item.name" >
                <template slot="title">
                    <Icon :type="item.icon" ></Icon>
                    <!--{{parentName}}-->
                    <span class="layout-text"> {{item.name}}</span>
                </template>
                <template v-for="child in item.children" >
                    <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <Icon :type="child.icon"  :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{child.name}}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
    import route from '../../router/index'
    export default {
        name: 'sideMenu',
        props:{
            menuList: {
                type: Array,
                required: true
            },
            openNames:{
                type:Array
            },
            activeChild:''
        },
        data(){
            return{
                theme:'dark',
                menuData : this.menuList,
                parentName:[]
            }
        },
        mounted(){
            let activePath = this.$store.state.app.activeChild;
            if(activePath){
                this.$router.push({
                    name:activePath
                })
            }else{
                this.$router.replace({path:'/'});
            }

        },
        methods:{
            changeMenu(active,item){
                this.$router.push({
                    name:active
                })
            }
        }
    }
</script>
