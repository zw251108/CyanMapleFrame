'use strict';

/**
 * @file    获取当前页面路径参数，并提供页面跳转方法
 *          整合 location 和 history 功能
 * */

import Base       from '../base.js';
import {Listener} from '../util/listener.js';

const URL_KEY_INDEX = ['source'
		, 'protocol'
		, 'origin'
		, 'host'
		, 'port'
		, 'path'
		, 'relative'
		, 'file'
		, 'dir'
		, 'segments'
		, 'params'
		, 'query'
		, 'hash'
		, 'from'
	]
	;

/**
 * @class
 * @desc    url 解析
 * @extends Base
 * */
class Url extends Base{
	/**
	 * @constructor
	 * @param   {string}    [url]
	 * */
	constructor(url){
		super();

		let target = Url.createParseTarget( url )
			, temp
			;

		// 处理非标准协议头，在 PC 的 Chrome 上，对非标准协议头处理，无法解析出 host 等参数
		if( ['http:', 'https:'].indexOf(target.protocol) === -1 ){
			temp = target.protocol;

			target = Url.createParseTarget( target.href.replace(temp, 'http:') );
		}

		this.protocol   = (temp || target.protocol).replace(':', '');

		this.source     = target.href;
		this.origin     = target.origin;
		this.port       = target.port || '80';
		this.hostname   = target.hostname
		this.host       = this.hostname + (this.port !== '80' ? ':'+ this.port : '');
		this.path       = target.pathname.replace(/^([^\/])/, '$1');
		// 相对路径
		this.relative   = (target.href.match(/tps?:\/\/[^\/]+(.*)/) || ['', ''])[1];
		// 当前页面文件名
		this.file       = (target.pathname.match(/\/([^\/?#]+)$/i) || ['', ''])[1];
		// 当前页面目录
		this.dir        = this.path.replace(this.file, '');
		// todo ?
		this.segments   = target.pathname.replace(/^\//, '').split('/');
		// 参数对象
		this.params     = this.parseSearch( target.search );
		// hash
		this.hash       = target.hash.slice(1);
		// 页面来源
		this.from       = document.referrer;

		target = null;   // 释放内存
	}

	// ---------- 静态方法 ----------
	/**
	 * @summary 创建解析 url 的对象
	 * @static
	 * @param   {string}    url
	 * @return  {Object}
	 * */
	static createParseTarget(url){
		let a
			;

		if( 'URL' in self ){
			a = new URL(url || location.href, location.origin);
		}
		else if( 'webkitURL' in self ){
			a = new webkitURL(url || location.href, location.origin);
		}
		else{
			if( 'document' in self ){
				a = document.createElement('a');

				a.href = url || location.href;
			}
			else{
				throw new Error('当前环境不支持该功能');
			}
		}

		return a;
	}
	/**
	 * @summary 判断某一对象是否为 Url 类型
	 * @static
	 * @param   {*}         target
	 * @return  {boolean}   返回结果
	 * */
	static is(target){
		return target && target[Symbol.toStringTag] === 'Url';
	}
	/**
	 * @summary 与 App 类约定的注入接口
	 * @static
	 * @param   {Base}  app
	 * @desc    注入为 $url
	 *          同时会注入 $urlParams、$hashParams，为函数类型，返回当前 url 上的参数
	 * */
	static inject(app){
		app.inject('$url', url);
		app.inject('$urlParams', ()=>{
			return url.params;
		});
		app.inject('$hashParams', ()=>{
			return url.hashParams;
		});
	}

	// ---------- 静态属性 ----------
	/**
	 * @static
	 * @private
	 * @const
	 * */
	static get _INDEX(){
		return URL_KEY_INDEX;
	}

	// ---------- 公有方法 ----------
	/**
	 * @summary     解析 url 的 search 部分
	 * @param       {string}    [search='']
	 * @return      {Object}
	 * */
	parseSearch(search=''){
		if( search && /^\?/.test(search) ){
			search = search.slice(1);
		}

		return search ? search.split('&').reduce((all, d)=>{
			if( d ){
				let [, key, value] = /([^=]+)(?:=(.*))?/.exec( d );

				key = decodeURIComponent( key );
				value = decodeURIComponent( value || '' );

				try{    // 对数据类型进行转换
					value = JSON.parse( value );
				}
				catch(e){}

				all[key] = value;
			}

			return all;
		}, {}) : {};
	}

	/**
	 * @summary     将现有参数组合成一个 url
	 * @return      {string}
	 * */
	pack(){
		return `${this.protocol}://${this.host}${this.path}${this.query}` + (this.hash ? `#${this.hash}` : '');
	}
	/**
	 * @summary     替换当前的 params
	 * @param       {string|string[]|Object}    params
	 * @param       {...string}
	 * @return      {Url}                       this
	 * @desc        当为多个 string 时，为删除当前 url 上参数，当为 object 时为设置当前 url 上参数
	 * */
	changeParams(params){
		let argv
			;

		if( typeof params === 'string' ){
			argv = [].slice.call( arguments );
		}
		else{
			argv = params;
		}

		if( Array.isArray( argv ) ){
			argv.forEach((d)=>{
				if( typeof d === 'string' ){
					delete this.params[d];
				}
			});
		}
		else if( typeof argv === 'object' ){
			Object.entries( argv ).forEach(([k, v])=>{
				this.params[k] = v;
			});
		}

		this.source = this.pack();
		// 相对路径
		this.relative = (this.source.match(/tps?:\/\/[^\/]+(.*)/) || ['', ''])[1];

		return this;
	}
	/**
	 * @summary 将当前 url 实例的属性替换为目标 url 实例的属性
	 * @param   {Url}   url
	 * @return  {Url}   this
	 * */
	changeTo(url){
		let source = this.source
			;

		Url._INDEX.reduce((target, k)=>{
			
			if( k !== 'query' ){
				target[k] = url[k];
			}

			return target;
		}, this);

		this.from = source;

		return this;
	}

	/**
	 * @summary toString 方法
	 * @return  {string}
	 * */
	toString(){
		return JSON.stringify( Url._INDEX.reduce((rs, k)=>{
			rs[k] = this[k];

			return rs;
		}, {}) );
	}
	/**
	 * @summary toJSON 方法
	 * @return  {Object}
	 * @desc    JSON.stringify 序列号 Model 及子类的实例对象时调用
	 * */
	toJSON(){
		return Url._INDEX.reduce((rs, k)=>{
			rs[k] = this[k];

			return rs;
		}, {});
	}

	// ---------- 公有属性 ----------
	/**
	 * @summary 实现 toStringTag 接口
	 * @readonly
	 * @desc    在 Object.prototype.toString.call( new Url() ); 时将返回 [object Url]
	 * */
	get [Symbol.toStringTag](){
		return 'Url';
	};

	/**
	 * @summary 当前页面参数拼接字符串
	 * @readonly
	 * */
	get query(){
		let query = Object.entries( this.params ).reduce((all, [k, v])=>{
				all.push( encodeURIComponent(k) +'='+ encodeURIComponent(v) );

				return all;
			}, [])
			;

		return query.length ? '?'+ query.join('&') : '';
	}
}

/**
 * @class
 * @desc    对当前 url 进行操作，为内部操作类，立即声明实例，所以必须先声明依赖关系
 * @extends Url
 * @requires    Listener
 * @todo    提到单独文件
 * */
class CurrentUrl extends Url{
	/**
	 * @constructor
	 * @param   {string}    [url]
	 * */
	constructor(url){
		super( url );
	}

	// ---------- 私有方法 ----------
	/**
	 * @summary     pushParams 和 replaceParams 内部调用处理参数操作的方法，不应直接调用
	 * @private
	 * @param       {string[]|Object}   params
	 * @param       {*|Object}          [state=null]
	 * @return      {Object|null}
	 * */
	_handlerParams(params, state=null){
		let argc = arguments.length
			, argv = arguments
			;

		if( argc > 1 ){
			if( typeof params === 'object' ){
				state = argv[1];
			}
			else if( typeof argv[argc -1] === 'object' ){
				state = argv[argc -1];
				argv = [].slice.call(argv, 0, -1);
			}
		}

		this.changeParams( ...argv );

		return state;
	}

	// ---------- 公有方法 ----------
	/**
	 * @summary     对 url 进行解析
	 * @param       {Url|string}    url
	 * @return      {Url}           若传入的 url 参数是一个 Url 对象实例，则不做处理直接返回
	 * */
	parseUrl(url){
		let result = url
			;

		if( !Url.is(url) ){
			result = new Url( typeof url === 'string' ? url : '' );
		}
		
		return result;
	}
	/**
	 * @summary     对没有协议头（以 // 开头）的路径加上协议头
	 * @param       {string}    url
	 * @return      {string}
	 * */
	addProtocol(url){
		return /^\/\//.test( url ) ? this.protocol + url : url;
	}

	/**
	 * @summary     刷新当前页面
	 * */
	reload(){
		location.reload();
	}
	/**
	 * @summary     页面后退
	 * @return      {CurrentUrl}   this
	 * */
	back(){
		history.back();

		return this;
	}
	/**
	 * @summary     页面前进
	 * @return      {CurrentUrl}   this
	 * */
	forward(){
		history.forward();

		return this;
	}
	/**
	 * @summary     调整到某一位置页面
	 * @param       {number}    index
	 * @return      {CurrentUrl}       this
	 * */
	go(index){
		history.go( index );

		return this;
	}

	/**
	 * @summary     设置页面 hash
	 * @param       {string}    hash
	 * @return      {CurrentUrl}       this
	 * */
	setHash(hash){
		this.hash = hash;
		location.hash = hash;

		return this;
	}

	// ---------- url 上的参数操作 ----------
	/**
	 * @summary     调整参数并指向调整后的路径，当前 url 添加到历史记录
	 * @param       {string[]|Object}   params
	 * @param       {*|Object}          [pushState]
	 * @return      {CurrentUrl}               this
	 * @desc        只有两种情况下 pushState 才有效：
	 *              1.当 params 是 Object 类型时
	 *              2.当不满足 1 条件时，参数中的最后一个为 Object 类型时，视为 pushState
	 * */
	pushParams(params, pushState){
		let state = this._handlerParams(params, pushState)
			;

		// 将当前浏览器上 url 换为替换后组装出来的链接，当期 url 进入
		history.pushState(state, '', this.pack());

		return this;
	}
	/**
	 * @summary     替换当前 url 上的参数
	 * @param       {Object|string[]}   params
	 * @param       {*|Object}          [replaceState]
	 * @return      {CurrentUrl}               this
	 * @desc        执行效果
	 * */
	replaceParams(params, replaceState){
		let state = this._handlerParams(params, replaceState)
			;

		// 将当前浏览器上 url 换为替换后组装出来的链接
		history.replaceState(state, '', this.pack());

		return this;
	}

	// ---------- 修改 url 历史记录 ----------
	/**
	 * @summary     将 url 指向目标路径，当前 url 添加到历史记录
	 * @param       {string}    href
	 * @param       {Object}    [state=null]
	 * @return      {CurrentUrl}       this
	 * */
	pushHistory(href, state=null){
		history.pushState(state, '', href);

		this.changeTo( this.parseUrl(href) );

		return this;
	}
	/**
	 * @summary     替换当前 url 为目标路径
	 * @param       {string}    href
	 * @param       {Object}    [state=null]
	 * @return      {CurrentUrl}       this
	 * */
	replaceHistory(href, state=null){
		history.replaceState(state, '', href);

		this.changeTo( this.parseUrl(href) );

		return this;
	}

	// ---------- 页面跳转操作 ----------
	/**
	 * @summary     跳转到目标页面，当前 url 添加到历史记录
	 * @param       {string}    href
	 * */
	changePage(href){
		location.assign( href );
	}
	/**
	 * @summary     替换当前 url 为目标路径，页面刷新
	 * @param       {string}    href
	 * */
	replacePage(href){
		location.replace( href );
	}

	// ---------- 相关事件处理 ----------
	/**
	 * @summary     监听 hashChange 事件
	 * @param       {Function}  callback
	 * @return      {Object}
	 * */
	hashChange(callback){
		return this.$listener.on('hashchange', callback);
	}
	/**
	 * @summary     监听 popstate 事件
	 * @param       {Function}  callback
	 * @return      {Object}
	 * */
	popState(callback){
		return this.$listener.on('popstate', callback);
	}

	// ---------- 公有属性 ----------
	/**
	 * @summary Url 类对象
	 * @const
	 * */
	get Url(){
		return Url;
	}
	/**
	 * @summary 返回当前 hash 的参数
	 * @readonly
	 * */
	get hashParams(){
		return this.parseUrl( this.hash ).params;
	}

	/**
	 * @property    $listener
	 * @desc        依赖注入的公有属性
	 * */
}

CurrentUrl.use( Listener );

let url = new CurrentUrl()
	;

url.hashChange((e, newUrl)=>{
	let temp
		;

	if( e.newURL ){
		temp = url.parseUrl( e.newURL );
	}
	else if( newUrl ){
		temp = url.parseUrl( newUrl );
	}

	if( temp ){
		// 替换当前 url 对象属性
		url.changeTo( temp );
	}
});

url.popState((e, newUrl)=>{
	let temp
		, state = e.state
		;

	if( newUrl ){
		temp = url.parseUrl( newUrl );
	}
	else{
		temp = url.parseUrl( location.href );
	}

	// 替换当前 url 对象属性
	url.changeTo( temp );

	// todo state 做什么？
	if( typeof state === 'string' ){
		try{
			state = JSON.parse( state );
		}
		catch(e){}
	}
});

/**
 * @exports     url
 * @type        {Object}
 * @memberOf    maple
 * */
export default url;

export {
	Url
	, CurrentUrl
};