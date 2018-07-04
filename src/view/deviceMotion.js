'use strict';

/**
 * @file    陀螺仪事件
 * */

import {listener}   from '../listener.js';

/**
 * @memberOf    maple.view
 * @type        {Listener}
 * */
let devicemotion = listener('devicemotion', {
		useDebounce: true
	})
	;

export default devicemotion;