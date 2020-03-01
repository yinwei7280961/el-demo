module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
       proxy: {
           '/api':{
               target:'http://localhost:3000',
               changeOrigin:true,
               pathRewrite:{
                   '/api':''
               }
           }
       }
    },
}