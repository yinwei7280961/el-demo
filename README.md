# el-demo
借鉴于[原链接](https://github.com/lin-xin/vue-manage-system);

本项目 采用了vue+vue-router+element-ui+node+mongoose +formidable
用formidable 处理 带文件的提交

做了一个简单的 登录、注册  

在基础表格 做了一个 增删查改 功能
首先在models 要先建立一个model 文件
然后在routes 建立一个对应的接口文件并（引入对应处理model文件）
//然后 应该在controllers 里面 建立 对应的处理model文件 并（引入对应model 文件）（这里 我没加 。。。）
# 项目中所遇到的问题 
1、图片动态加载 不显示 
、、、
export default {
	data(){
		return {
		    //直接 写字符串不行
	        //avatorUrl:"../../assets/img/img.jpg"
            avatorUrl:require("../../assets/img/img.jpg")
		}
	},
}
[原链接](https://blog.csdn.net/qq_39043923/article/details/90901636);	
、、、
## 2.配置代理 服务
我是照着下面这样设置 但是就是不能访问 
其实不是配置问题 ，就是调用出问题了
```
//例如 服务地址是 http://192.168.0.125/test/login 的调用过程

1 找到config ->index.js文件 配置proxyTable参数
        proxyTable: {
                '/api': {
                    target: 'http://192.168.0.125/test',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/'
                    }
                }

                /api 代替的是 ' http://192.168.0.125/test'

//  2 工具 封装
        const service = axios.create({
            timeout: 1000 * 30,
            withCredentials: true,
            baseURL:'/api/',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })

    3 action调用
        // 登录
        export function login (params) {
            return request({
                url:'login',
                method: 'post',
                data: requestParam(params)
            })
        }
```
[原链接](https://blog.51cto.com/8707838/2094178);

