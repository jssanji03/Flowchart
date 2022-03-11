const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    // context: path.resolve(__dirname, 'src'),
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.bundle.js',
    },
    devtool: 'source-map',
    devServer: {
        static: './src',
        hot: true,
    },
    // 決定我可以載入什麼檔案格式
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
            {
            test: /\.(scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     publicPath: './', // 指定公共路徑
                        // },
            },
            {
                loader: 'css-loader', // translates CSS into CommonJS modules
                options: {
                    sourceMap: true
                }
            }, 
            {
                loader: 'sass-loader', // compiles Sass to CSS
                options: {
                    sourceMap: true
                }
            },
            ]
            },
            {
                test: /\.html$/,
                loader: "raw-loader" // loaders: ['raw-loader']，這個方式也是可以被接受的。
            }
        ]
    },
    plugins: [//這邊以下是新增
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            publicPath: "./",
            template:"./src/index.html"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'//這邊以上是新增
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}