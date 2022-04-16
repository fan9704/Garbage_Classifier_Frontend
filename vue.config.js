module.exports = {
    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        },
    },
    devServer: {

        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                secure: true,
                ws: true, //代理websockets
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                },

            }
        }
    }
};