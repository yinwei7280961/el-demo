<template>
	<div class="regsiter-wrap">
        <vue-particles
			color="#dedede"
			:particleOpacity="0.7"
			:particlesNumber="80"
			shapeType="circle"
			:particleSize="4"
			linesColor="#dedede"
			:linesWidth="1"
			:lineLinked="true"
			:lineOpacity="0.4"
			:linesDistance="150"
			:moveSpeed="3"
			:hoverEffect="true"
			hoverMode="grab"
			:clickEffect="true"
			clickMode="push"
		>
        </vue-particles>
        <div class="ms-regsiter">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-s-custom"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.pwd"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="regsiter-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
					<p class="regsiter-tips">已注册，请前往</p>                          
                    <router-link  to="/login">
                        <el-button type="primary">登录</el-button>
                    </router-link>
                </div>
                <p class="regsiter-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>
<script>
import request from '../../utils/request.js'
export default {
    data: function() {
        return {
            param: {
                username: '',
                pwd: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    request({
                		url: '/api/regsiter',
				        method: 'post',
                        data: this.param
                	}).then((res)=>{
                		console.log(res);
                		if(!res.status){
                			this.$message.success('注册成功');
		                    this.$router.push('/login');
                		}else{
                			this.$message.success(res.data);
                		}
                	});
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.regsiter-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color:rgb(45, 140, 240);
    border-bottom: 1px solid #ddd;
}
.ms-regsiter {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    z-index:99;
}
.ms-content {
    padding: 30px 30px;
}
.regsiter-btn {
    text-align: center;
}
.regsiter-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.regsiter-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
#particles-js{
	position:relative;
	top:0;
	z-index:6;
	height:100%;
}
</style>