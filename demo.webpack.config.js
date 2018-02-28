let webpack = require('webpack')
	, path = require('path')
	, HtmlWebpackPlugin = require('html-webpack-plugin')
	, compiler = require('vue-template-compiler')
	;

module.exports = {
	devtool: 'cheap-module-source-map',
	//插件项
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin({name:'base'}),//提取公共文件
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: true
		}) //压缩JS
		, new webpack.optimize.CommonsChunkPlugin({
			name: 'base'
		})

		, new HtmlWebpackPlugin({
			filename: 'index.html'
			, template: path.resolve(__dirname, 'demo/src/tpl/index.html')
			, minify: {    //压缩HTML文件
				removeComments: true        //移除HTML中的注释
				, collapseWhitespace: true  //删除空白符与换行符
			}
			, chunks: ['base', 'index']
			, inject: 'body'
		})

		, new HtmlWebpackPlugin({
			filename: 'debounce.html'
			, minify: {    //压缩HTML文件
				removeComments: true        //移除HTML中的注释
				, collapseWhitespace: true  //删除空白符与换行符
			}
			, chunks: ['base', 'debounce']
			, inject: 'body'
		})
		, new HtmlWebpackPlugin({
			filename: 'throttle.html'
			, minify: {    //压缩HTML文件
				removeComments: true        //移除HTML中的注释
				, collapseWhitespace: true  //删除空白符与换行符
			}
			, chunks: ['base', 'throttle']
			, inject: 'body'
		})
		, new HtmlWebpackPlugin({
			filename: 'listener.html'
			, minify: {    //压缩HTML文件
				removeComments: true        //移除HTML中的注释
				, collapseWhitespace: true  //删除空白符与换行符
			}
			, chunks: ['base', 'listener']
			, inject: 'body'
		})
		, new HtmlWebpackPlugin({
			filename: 'model.html'
			, minify: {    //压缩HTML文件
				removeComments: true        //移除HTML中的注释
				, collapseWhitespace: true  //删除空白符与换行符
			}
			, chunks: ['base', 'model']
			, inject: 'body'
		})
		, new HtmlWebpackPlugin({
			filename: 'router.html'
			, minify: {    //压缩HTML文件
				removeComments: true        //移除HTML中的注释
				, collapseWhitespace: true  //删除空白符与换行符
			}
			, chunks: ['base', 'router']
			, inject: 'body'
		})
		, new HtmlWebpackPlugin({
			filename: 'routerPage.html'
			, template: path.resolve(__dirname, 'demo/src/tpl/routerPage.html')
			, minify: {    //压缩HTML文件
				removeComments: true        //移除HTML中的注释
				, collapseWhitespace: true  //删除空白符与换行符
			}
			, chunks: ['base', 'routerPage']
			, inject: 'body'
		})
		, new HtmlWebpackPlugin({
			filename: 'error.html'
			, template: path.resolve(__dirname, 'demo/src/tpl/error.html')
			, minify: {    //压缩HTML文件
				removeComments: true        //移除HTML中的注释
				, collapseWhitespace: true  //删除空白符与换行符
			}
			, chunks: ['base', 'error']
			, inject: 'body'
		})
		, new HtmlWebpackPlugin({
			filename: 'eventSource.html'
			, minify: {    //压缩HTML文件
				removeComments: true        //移除HTML中的注释
				, collapseWhitespace: true  //删除空白符与换行符
			}
			, chunks: ['base', 'eventSource']
			, inject: 'body'
		})
	],
	//页面入口文件配置
	entry: {
		base: ['maple']
		, 'vue-plugin/router': [path.resolve(__dirname, 'src/maple/vue-plugin/router.js')]

		, index: [path.resolve(__dirname, 'demo/src/javascript/index.js')]

		, debounce: [path.resolve(__dirname, 'demo/src/javascript/debounce.js')]
		, throttle: [path.resolve(__dirname, 'demo/src/javascript/throttle.js')]
		, listener: [path.resolve(__dirname, 'demo/src/javascript/listener.js')]
		, model:    [path.resolve(__dirname, 'demo/src/javascript/model.js')]
		, router:   [path.resolve(__dirname, 'demo/src/javascript/router.js')]
		, routerPage:   [path.resolve(__dirname, 'demo/src/javascript/routerPage.js')]
		, error:    [path.resolve(__dirname, 'demo/src/javascript/error.js')]
		, eventSource:    [path.resolve(__dirname, 'demo/src/javascript/eventSource.js')]
	},
	//入口文件输出配置
	output: {
		path: path.resolve(__dirname, 'demo/dist/'),
		filename: '[name].js'
	},
	module: {
		//加载器配置
		rules: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader!sass-loader'
		}, {
			test: /\.js$/,
			loader: 'babel-loader'
		}, {
			test: /\.scss$/,
			loader: 'style-loader!css-loader!sass-loader?sourceMap'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					js: 'babel-loader',
					css: 'vue-style-loader!css-loader',
					scss: 'style-loader!css-loader!sass-loader',
					sass: 'style-loader!css-loader!sass-loader?indentedSyntax'
				}
			}
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}]
	},
	externals:{
		Vue:'Vue'
	},
	resolve: {
		modules: ["node_modules", __dirname]
		, alias: {
			vue$: 'vue/dist/vue.common.js'
			, maple: 'src/maple/base.js'
			, mapleRouter: 'src/maple/vue-plugin/router.js'
		}
	}
};