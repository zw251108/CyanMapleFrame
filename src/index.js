'use strict';

/**
 * @file    基础框架聚合
 *          模块聚合关系如下：
<pre>
 +-----------------------------------------------------------+
 |                                                           |
 |             Maple( index.js )                              |
 |                                                           |
 |  +-------+  +----------+  +------------+  +------------+  |
 |  |       |  |          |  |            |  |            |  |
 |  |  url  |  |  device  |  |  listener  |  |  util      |  |   运行环境检测 & 基础工具函数
 |  |       |  |          |  |            |  |            |  |
 |  +-------+  +----------+  +------------+  +------------+  |
 |                                                           |
-----------------------------------------------------------------------
 |                                                           |
 |  +--------------+  +---------------+  +----------------+  |
 |  |              |  |               |  |                |  |
 |  |  model       |  |  view         |  |  router        |  |   Model 数据处理 & View 视图处理 & router 路由配置
 |  |              |  |               |  |                |  |
 |  +--------------+  +---------------+  +----------------+  |
 |                                                           |
-----------------------------------------------------------------------
 |                                                           |
 |  +------------+  +------------+  +----------+             |
 |  |            |  |            |  |          |             |
 |  |  position  |  |  register  |  |  notify  |             |  浏览器增强功能
 |  |            |  |            |  |          |             |
 |  +------------+  +------------+  +----------+             |
 |                                                           |
 +-----------------------------------------------------------+
</pre>
 * */

/**
 * @namespace   maple
 * */

/**
 * ---------- 事件队列监听 ----------
 * */
import listener, {Listener} from './listener.js';

/**
 * ---------- 通用工具 ----------
 * */
import util     from './util/index.js';

/**
 * ---------- 全局运行时检测 ----------
 * */
// 运行参数
import url      from './runtime/url.js';

// 运行设备、系统、内核、浏览器
import device   from './runtime/device.js';

/**
 * ---------- 数据层 ----------
 * */
import model, * as Model    from './model/index.js';
export * from './model/index.js';

/**
 * ---------- View 监控对象 ----------
 * */
import view     from './view/index.js';

/**
 * ---------- Router 路由控制 ----------
 * */
import router, * as Router  from './router/index.js';
export * from './router/index.js';

/**
 * ---------- 错误处理 ----------
 * */
// 全局错误
import error    from './errorHandler/error.js';
// 为捕获的 promise reject
import unHandledRejection   from './errorHandler/unHandledRejection.js';

/**
 * ---------- 获取地理位置 ----------
 * */
import position from './position.js';

/**
 * ---------- 动画库 ----------
 * todo 实验性功能
 * */
import * as animate from './animate/index.js';

/**
 * ---------- 注册后台 worker ----------
 * */
import register from './register/index.js';

/**
 * ---------- 桌面通知 ----------
 * */
import notify   from './notify.js';

let maple = {
	Listener
	, listener
	, util

	, url
	, device

	, ...Model
	, model

	, view

	, ...Router
	, router

	, error
	, unHandledRejection

	, position

	// 实验性功能
	, animate
	, register
	, notify
};

window.maple = maple;

export default maple;

export {
	Listener
	, view as View
	, device as Device
	, util as Util
	, url as Url
};