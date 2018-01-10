
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
            <div class="loginForm" @keyup.enter="submitForm('loginForm')">
                <el-form class="elForm" :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input placeholder="请输入账号" :autofocus="true" class="loginInput" prefix-icon="fa fa-user"
                            v-model="loginForm.username"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码" class="loginInput" prefix-icon="fa fa-lock-open"
                                  type="password"
                            v-model="loginForm.password"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="loginBtn" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>
<script>
    import {mapActions} from 'vuex'
    import fetch from '../common/fetch'
    import {user} from '../common/api'
    import {SET_USER_INFO} from '../store/actions/type'
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
            ...mapActions({
                set_user_info:SET_USER_INFO
            }),
            submitForm(formName){
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
                            this.set_user_info({
                                user:data.id,
                                login:true
                            })
                            this.$emit('login', data);
                        })
                        console.log(datas);
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
<style >
    body{
        background:url(../assets/images/login-bg.png) no-repeat left top/cover ;
    }
    .login>img{
        width: 100%;
        height:100%;
        display: block;
    }
    .loginContent{
        position: fixed;
        top:50%;
        left: 50%;
        margin-top: -215px;
        margin-left:-189px;
        width: 388px;
        height:430px;
        background-color: #fff;
        border-radius: 0 0 7px 7px;
    }
    .loginTitle{
        height: 145px;
        background: url(../assets/images/login-title.png) no-repeat left top/cover;
        padding: 0 0 0 47px;

    }
    .loginLogo{
        display: block;
        float: left;
        width: 47px;
        height:47px;
        float: left;
        margin: 49px 0;
        background: url(../assets/images/login-logo.png) no-repeat center/cover;
    }
    .titleText{
        height: 47px;
        margin: 49px 0 49px 20px;
        color: #fff;
        float: left;
    }
    .titleText>div:first-child{
        font-size: 24px;
    }
    .titleText>div:last-child{
        font-size: 12px;
        color: #f7f9fb;
    }
    .elForm{
        width: 280px;
        margin: 35px auto 0;
        text-align: center;
    }
    .loginInput .el-input__inner{
        border-width: 0 0 1px 0;
        border-radius: 0;
        text-align: center;
    }
    .loginInput .el-input-group__prepend{
        background-color: transparent;
        border-width: 0 0 1px 0;
        border-radius: 0;
    }
    .loginIcon{
        background-color: transparent;
    }
    .loginBtn{
        width: 100%;
        height: 42px;
        border-radius: 21px;
        margin-top: 21px;
    }
</style>
