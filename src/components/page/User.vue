<template>
	<div>
		<div class="crop-demo">
	        <img :src="cropImg" class="pre-img">
	        <div class="crop-demo-btn">选择图片
	            <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
	        </div>
	    </div>
	    <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
            <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelCrop">取 消</el-button>
                <el-button type="primary" @click="saveUser">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>

<script>
	import VueCropper  from 'vue-cropperjs';
	import request from '../../utils/request.js'
    export default {
        name: 'user',
        data: function(){
            return {
                defaultSrc: require('../../assets/img/img.jpg'),
                file: {},
                imgSrc: '',
                cropImg: '', 
                dialogVisible: false,
            }
        },
        components: {
            VueCropper
        },
        methods:{
        	setImage(event){
        		this.file=event.target.files[0];
        		this.dialogVisible=true;
        		if (!this.file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(this.file);
        	},
        	cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            saveUser(){
            	var param=new FormData();
            	param.append('file',this.file);
            	param.append('name',localStorage.getItem('ms_username'));
            	console.log(111)
            	request({
            		url:'/api/upload',
            		method:'post',
            		data:param
            	}).then((res)=>{
            		if(!res.status){
            			this.dialogVisible=false;
	            	    this.$message.success(res.data);
	            	    return ;
	            	}
            	});
            }
        },
        created(){
            this.cropImg = this.defaultSrc;
        }
    }
</script>

<style scoped>
	@import "../../assets/css/upload.css";
	.crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>