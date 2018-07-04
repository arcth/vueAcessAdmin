<style lang="less">
    @import "./login";
</style>
<template>
    <div class="login">
        <!--<img src="../assets/images/login-bg.png" alt="">-->
        <div class="loginContent">
            <div class="loginTitle">
                <i class="loginLogo"></i>
                <div class="titleText">
                    <div>地利技术相关系统</div>
                    <div>Dili Technology Operating System</div>
                </div>
            </div>
            <Form ref="loginForm" :model="loginForm" :rules="rules" class="loginForm" @keyup.enter="submitForm('loginForm')">
                <FormItem prop="username">
                    <Input type="text" v-model="loginForm.username" placeholder="用户名">
                        <Icon type="person" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="密码">
                        <Icon type="locked" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="submitForm('loginForm')" class="loginBtn">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>

</template>
<script>
    import {mapActions} from 'vuex'
    import fetch from '../common/fetch'
    import {user} from '../common/api'
    export default {
        data () {
            return {
                loginForm:{
                    username:'',
                    password:''
                },
                rules:{
                    username:[
                        {required:true,message:'请输入账号',trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:'请输入密码',trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName){
                var vm = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let datas = {
                            username:this.loginForm.username,
                            password:this.loginForm.password
                        };
                        const res = fetch.post(user.login.url,datas);
                        res.then((result) => {
//                        console.log(result);
                            let data = result.data;
                            if(data.code == 0){
                                vm.$store.commit('SET_USER_INFO',{
                                    login:true
                                })
                                vm.$emit('login', data);
                            }

                        })
                        console.log(vm.$store);
                        } else {
                        return false;
                        }
                });

//              const res = fetch.post(user.login.url,datas);
//              res.then((result) => {
////                        console.log(result);
//                var data = result.data;
//                this.set_user_info({
//                  user:data.id,
//                  login:true
//                })
//                this.$emit('login', data);
//              })
            }
        }
    }
</script>

