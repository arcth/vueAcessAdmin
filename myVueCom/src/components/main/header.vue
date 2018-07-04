<style lang="less">
    @import "./menu.less";
</style>

<template>

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
                type:Object
            }
        },
        data(){
            return{
                theme:'dark',
                menuData : this.menuList,
                parentName:[]
            }
        },
        mounted(){
            console.log(this.openNames.subName);
        },
        methods:{
            changeMenu(active,item){
                console.log(active);
                this.$router.push({
                    name:active
                })
            }
        }
    }
</script>
