'use strict';

/**
 * @file    全局事件监听对象
 * */

import merge        from './util/merge.js';
import HandlerQueue from './util/handlerQueue.js';

/**
 * 监听事件的默认配置
 * @const
 * */
const LISTENER_CONFIG = {
		type: ''
		, target: self || null
		, capture: true
		, passive: false
		, once: false
	}
	;

/**
 * @class
 * @desc        全局事件监听抽象类，默认使用捕获方式
 * */
class Listener{
	/**
	 * @constructor
	 * @param   {Object}                    config
	 * @param   {string}                    config.type
	 * @param   {Window|Document|Object}    [config.target]
	 * @param   {boolean}                   [config.capture]
	 * @param   {boolean}                   [config.passive]
	 * @param   {boolean}                   [config.once]
	 * */
	constructor(config={}){

		if( !config.type ){
			console.log('未指定监听事件');

			throw new Error('未指定监听事件');
		}

		this._config = merge(config, Listener._CONFIG);

		this._isListening = false;  // 当前监听状态

		this._listener = null;      // 执行函数

		this._eventQueue = new HandlerQueue();
	}

	// ---------- 静态属性 ----------
	/**
	 * @summary 监听事件的默认配置
	 * @static
	 * @const
	 * */
	static get _CONFIG(){
		return LISTENER_CONFIG;
	}

	// ---------- 私有方法 ----------
	/**
	 * @summary 生成函数执行队列
	 * @private
	 * @return  {Function}
	 * */
	_queueExecute(){
		let eventQueue = this._eventQueue
			;

		return function(){
			let context = this || null
				;

			return eventQueue.fireLineWith(context, Array.from(arguments));
		};
	}

	/**
	 * @summary     监听事件回调
	 * @callback    ListenerCallback
	 * @param       {Object|Event}  event
	 * @param       {...*}
	 * @this        target
	 * */

	// ---------- 公有方法 ----------
	/**
	 * @summary 添加执行函数
	 * @param   {ListenerCallback}  callback
	 * @return  {Listener}          返回 this，可以使用链式操作
	 * */
	add(callback){

		if( !this._isListening ){
			this.on();
		}

		if( !this._eventQueue.has(callback) ){
			this._eventQueue.add( callback );
		}
		else{
			console.log('该函数已经存在于队列中');
		}

		return this;
	}
	/**
	 * @summary 开始监听事件
	 * @param   {ListenerCallback}  [callback]  若传入函数也可以绑定事件回调
	 * @return  {Listener}          返回 this，可以使用链式操作
	 * */
	on(callback){

		if( callback ){
			this._eventQueue.add( callback );
		}

		if( this._isListening || !this._config.target ){
			return this;
		}

		this._listener = this._queueExecute();

		if( 'addEventListener' in this._config.target ){
			this._config.target.addEventListener(this._config.type, this._listener, this._config);
		}

		this._isListening = true;

		return this;
	}
	/**
	 * @summary 取消监听
	 * @param   {boolean|Function}  [isAll=true]
	 * @return  {Listener}          返回 this，可以使用链式操作
	 * @desc    若传入参数为 true，则将将事件监听解除绑定，若传入参数类型为函数，则只将该函数从函数队列删除，不解除监听事件
	 * */
	off(isAll=true){

		if( !this._config.target ){
			return this;
		}

		if( typeof isAll === 'boolean' && isAll ){

			if( 'removeEventListener' in this._config.target ){
				this._config.target.removeEventListener(this._config.type, this._listener, this._config);
			}

			this._isListening = false;
		}
		else if( typeof isAll === 'function' ){

			this._eventQueue.remove( isAll );
		}

		return this;
	}
	/**
	 * @summary 立即执行
	 * @param   {...*}  [argv]
	 * */
	trigger(...argv){
		let context = this._config.target
			, event = {
				type: this._config.type
				, target: this._config.target
			}
			;

		argv.unshift( event );

		this._listener.apply(context, argv);

		if( this._config.once ){    // 事件只执行一次，接触事件绑定
			this.off();
		}
	}
}

/**
 * @summary     快速监听函数
 * @param       {Window|Document|Object|string}     target                  监听对象，当类型为 string 时视为 type，将其赋值给 type，将 target 设置为 null
 * @param       {string|ListenerCallback}           [type]                  事件类型，当类型为 function 时视为 callback，将其赋值给 callback，将 type 设置为 null，若 target 不为字符串类型则会报错
 * @param       {ListenerCallback|Object}           [callback={}]           回调函数，当类型为 object 时视为 options，将其赋值给 options，将 callback 设置为 null
 * @param       {Object}                            [options={}]            配置参数与 Listener 参数相同
 * @param       {boolean}                           [options.capture]
 * @param       {boolean}                           [options.passive]
 * @param       {boolean}                           [options.once]
 * @return      {Listener}
 * @desc        可以穿四个参数，最少传一个参数，若只传一个参数会视为 type
 * */
let listener = (target, type, callback={}, options={})=>{
	let opts = {}
		, ls
		;

	if( typeof callback === 'object' ){
		options = callback;
		callback = null;
	}

	if( typeof type === 'function' ){
		callback = type;
		type = null;
	}

	if( typeof target === 'string' ){
		type = target;
		target = null;
	}

	if( type ){
		opts.type = type;
	}

	if( target ){
		opts.target = target;
	}

	opts = merge(opts, options);

	ls = new Listener( opts );

	if( callback ){

		// 在有 callback 才开始监听
		ls.on();
		ls.add( callback );
	}

	return ls;
};

export default listener;
export {
	Listener
};