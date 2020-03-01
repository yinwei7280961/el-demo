<template>
	<!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="show" :show-close="false" width="30%">
        <el-form ref="form" :model="form" label-width="70px">
        	<input type="hidden" name="id" v-model="form._id" />
            <el-form-item label="菜名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="单价">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="种类">
                <el-select v-model="form.type" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
			    </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
	import request from '../../utils/request.js'
	export default {
		data(){
			return {
				options: [{
		          value: '1',
		          label: '湘菜'
		        }, {
		          value: '2',
		          label: '粤菜'
		        }, {
		          value: '3',
		          label: '川菜'
		        }, {
		          value: '4',
		          label: '豫菜'
		        }, {
		          value: '5',
		          label: '鲁菜'
		        }],
			};
		},
		props:['title','form','show','idx'],
		methods:{
			//取消
			cancel(){
				this.$emit('change',false);
			},
			// 保存编辑
	        saveEdit() {
	            console.log(this.form);
	            var url=this.form._id?'/api/edit':'/api/add';
	            request({
	            	url:url,
	            	method:'post',
	            	data:this.form
	            }).then((res)=>{
	            	if(res.status){
	            		this.$emit('change',true);
	            	    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
	            	    return ;
	            	}
	            	this.$message.error(res.data);
	            	
	            });
//	            this.$set(this.tableData, this.idx, this.form);
	        }
		},
		created(){
		}
	}
</script>

<style>
</style>