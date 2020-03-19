!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=56)}([function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(t){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?e.exports=r=function(e){return n(e)}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":n(e)},r(t)}e.exports=r},function(e,t,n){"use strict";var r=n(14),o=n.n(r),i=n(12),u=n.n(i),a=n(1),c=n.n(a),s=n(3),l=n.n(s),f=n(4),h=n.n(f),y=n(7),v=n(6),p={eventType:"modelChange"},g={},d={},_={},m=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};l()(this,e),this._value=Object.create(null),this._history=Object.create(null),this._syncToList=[],this.config=Object(v.a)(n,e._CONFIG),this._listener=Object(y.b)(this,this.config.eventType,function(e,n,r){t._sync(n,r)})}return h()(e,[{key:"_lastData",value:function(e){var t=this._history[e];return t||(t=this._history[e]=[null]),t[t.length-1]}},{key:"_trackData",value:function(e,t){var n=this._lastData(e);t!==n&&(this._history[e].push(t),console.log("设置 ".concat(e," 的值为 ").concat(t)),this._trigger(e,t,n))}},{key:"_trigger",value:function(e,t,n){this._listener.trigger(e,t,n)}},{key:"_sync",value:function(e,t){this._syncToList.length&&Promise.all(this._syncToList.map(function(n){var r;return(r=null!==t?n.setData(e,t):n.removeData(e)).catch(function(r){console.log("".concat(n.constructor.name," ").concat(e," ").concat(t," 同步失败"),r)}),r})).then(function(){console.log("同步完成")})}},{key:"_setByObject",value:function(e){var t=this;return Promise.all(Object.keys(e).map(function(n){return t.setData(n,e[n])})).then(function(e){return!!e})}},{key:"_getByArray",value:function(e){var t=this;return Promise.all(e.map(function(e){return t.getData(e).catch(function(){return null})})).then(function(t){return e.reduce(function(e,n,r){return e[n]=t[r],e},{})})}},{key:"_removeByArray",value:function(e){var t=this;return Promise.all(e.map(function(e){return t.removeData(e)})).then(function(e){return!!e})}},{key:"setData",value:function(e,t){var n,r=this;return"object"===c()(e)?n=this._setByObject(e):(e in this._value?this._value[e]=t:(Object.defineProperty(this._value,e,{enumerable:!0,configurable:!0,set:function(t){r._trackData(e,t)},get:function(){return r._lastData(e)}}),this._trackData(e,t)),n=Promise.resolve(!0)),n}},{key:"getData",value:function(e){var t=arguments.length;return Array.isArray(e)?this._getByArray(e):t>1?this._getByArray([].slice.call(arguments)):e in this._value?Promise.resolve(this._value[e]):Promise.reject(null)}},{key:"removeData",value:function(e){var t,n=arguments.length;if(Array.isArray(e))t=this._removeByArray(e);else if(n>1)t=this._removeByArray([].slice.call(arguments));else try{this._value=null,t=Promise.resolve(!0)}catch(e){t=Promise.reject(e)}return t}},{key:"clearData",value:function(){var e=this;return Object.keys(this._value).forEach(function(t){null!==e._lastData(t)&&e._history[t].push(null)}),this._value={},Promise.resolve(!0)}},{key:"on",value:function(e){return this._listener.add(e),this}},{key:"off",value:function(e){return this._listener.off(e),this}},{key:"syncTo",value:function(t){var n=this;return Array.isArray(t)||(t=[t]),t.forEach(function(t){e.is(t)&&t!==n&&-1===n._syncToList.indexOf(t)?n._syncToList.push(t):console.log("该实例类型已经存在")}),this}},{key:"cleanSync",value:function(e){var t=this._syncToList.indexOf(e);return-1!==t&&this._syncToList.splice(t,1),this}},{key:"toString",value:function(){return JSON.stringify(this._value)}},{key:"toJSON",value:function(){return this._value}},{key:Symbol.iterator,value:u.a.mark(function e(){var t,n,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=Object.keys(this._value),n=0,r=t.length;case 2:if(!(n<r)){e.next=8;break}return e.next=5,{topic:t[n],value:this._value[t[n]]};case 5:n++,e.next=2;break;case 8:o()({a:1,b:2,c:3},Symbol.iterator,u.a.mark(function e(){var t,n,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=Object.keys(this),n=0,r=t.length;case 2:if(!(n<r)){e.next=8;break}return e.next=5,{topic:t[n],value:this[t[n]]};case 5:n++,e.next=2;break;case 8:case"end":return e.stop()}},e,this)}));case 9:case"end":return e.stop()}},e,this)})},{key:Symbol.asyncIterator,value:u.a.mark(function e(){var t,n,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=Object.keys(this._value),n=0,r=t.length;case 2:if(!(n<r)){e.next=8;break}return e.next=5,Promise.resolve({topic:t[n],value:this._value[t[n]]});case 5:n++,e.next=2;break;case 8:case"end":return e.stop()}},e,this)})},{key:Symbol.toStringTag,get:function(){return"Model"}}],[{key:"register",value:function(t,n){t in e._MODEL&&t in e._MODEL_CACHE?console.log("".concat(t," 重复注册，并已生成实例，不能覆盖")):e._MODEL[t]=n}},{key:"registerAlias",value:function(t,n){Array.isArray(n)||(n=[n]),n.forEach(function(n){n in e._MODEL_ALIAS?console.log("".concat(n," 已经存在")):e._MODEL_ALIAS[n]=t})}},{key:"factory",value:function(t){var n,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t?("object"===c()(r)&&(o=r,r=!0),!(t in e._MODEL)&&t in e._MODEL_ALIAS&&(t=e._MODEL_ALIAS[t]),t in e._MODEL?!r&&t in e._MODEL_CACHE?(n=e._MODEL_CACHE[t],console.log("从缓存中取到 ".concat(t," 类型的对象"))):(n=new e._MODEL[t](o),r||(e._MODEL_CACHE[t]=n,console.log("通过工厂方法生成 ".concat(t," 类型的对象, 将 ").concat(t," 类型的对象缓存")))):(n=new e,console.log("不存在注册为 ".concat(t," 的子类")))):(n=new e,console.log("生成 model 对象")),n}},{key:"is",value:function(e){return e&&"Model"===e[Symbol.toStringTag]}},{key:"stringify",value:function(e){return null==e&&(e=""),"object"===c()(e)?JSON.stringify(e):e.toString()}},{key:"_CONFIG",get:function(){return p}},{key:"_MODEL",get:function(){return g}},{key:"_MODEL_CACHE",get:function(){return d}},{key:"_MODEL_ALIAS",get:function(){return _}}]),e}();t.a=m},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}},,function(e,t,n){"use strict";var r=n(15),o=n.n(r);t.a=function(e,t){return o()({},t,e)}},function(e,t,n){"use strict";n.d(t,"a",function(){return h});var r=n(1),o=n.n(r),i=n(3),u=n.n(i),a=n(4),c=n.n(a),s=n(6),l=n(10),f={type:"",target:self||null,capture:!0,passive:!1,once:!1,intersectionObserver:!1,mutationObserver:!1,observerOptions:{}},h=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(u()(this,e),!t.type)throw console.log("未指定监听事件"),new Error("未指定监听事件");this._config=Object(s.a)(t,e._CONFIG),this._isListening=!1,this._listener=null,this._eventQueue=new l.a,this._config.intersectionObserver?this._config.type="intersectionObserver":this._config.mutationObserver&&(this._config.type="mutationObserver")}return c()(e,[{key:"_queueExecute",value:function(){var e=this._eventQueue;return function(){var t,n=this||null;return(t=e.with(n)).line.apply(t,arguments)}}},{key:"add",value:function(e){return this._isListening||this.on(),this._eventQueue.has(e)?console.log("该函数已经存在于队列中"):this._eventQueue.add(e),this}},{key:"on",value:function(e){var t=this._config,n=t.target,r=t.intersectionObserver,o=t.mutationObserver,i=t.observerOptions;return e&&this._eventQueue.add(e),this._isListening||!this._config.target?this:(this._listener=this._queueExecute(),this._isListening=!0,r?(this._observer=new IntersectionObserver(this._listener,i),this._observer.observe(n)):o?(this._observer=new MutationObserver(this._listener),this._observer.observe(n,i)):"addEventListener"in n&&"function"==typeof n.addEventListener&&n.addEventListener(this._config.type,this._listener,this._config),this)}},{key:"off",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=this._config,n=t.target,r=t.intersectionObserver,o=t.mutationObserver;return this._config.target&&this._listener?("boolean"==typeof e&&e?(r||o?(this._observer.unobserve(n),this._observer.disconnect()):"removeEventListener"in n&&n.removeEventListener(this._config.type,this._listener,this._config),this._isListening=!1):"function"==typeof e&&this._eventQueue.remove(e),this):this}},{key:"trigger",value:function(){for(var e=this._config.target,t={type:this._config.type,target:this._config.target},n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];r.unshift(t),this._listener.apply(e,r),this._config.once&&this.off()}},{key:"target",value:function(e){return{trigger:function(){}}}},{key:"type",value:function(e){}},{key:"targetTrigger",value:function(e,t){}},{key:Symbol.toStringTag,get:function(){return"Listener"}}],[{key:"_CONFIG",get:function(){return f}}]),e}();t.b=function(e,t){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},u={};return"object"===o()(r)&&(i=r,r=null),"function"==typeof t&&(r=t,t=null),"string"==typeof e&&(t=e,e=null),t&&(u.type=t),e&&(u.target=e),u=Object(s.a)(u,i),n=new h(u),r&&(n.on(),n.add(r)),n}},function(e,t,n){var r=n(1),o=n(22);e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?o(e):t}},function(e,t,n){var r=n(16);e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}},function(e,t,n){"use strict";var r=n(11),o=n.n(r),i=n(3),u=n.n(i),a=n(4),c=n.n(a),s=function(){function e(){u()(this,e),this._queue=[],this._currIndex=0}return c()(e,[{key:"_allExecutor",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return function(r,i){var u;null!==i&&(e.is(i)?r.push.apply(r,(u=i.with(t)).all.apply(u,o()(n))):r.push(i.apply(t,n)));return r}}},{key:"_funcExecutor",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=!0;return function(u,a){var c;i&&(u||a)&&(i=!1,null===u&&(u=a,a=null),e.is(u)?u=(c=u.with(n))[t].apply(c,o()(r)):null!==a&&(u=u.apply(n,r)));return null!==a?e.is(a)?a.with(n)[t](u):a.call(n,u):u}}},{key:"_lineExecutor",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return function(r){var i;return null!==r&&(e.is(r)?(i=r.with(t)).line.apply(i,o()(n)):!1===r.apply(t,n))}}},{key:"_funcExecutorPromise",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=!0;return function(u,a){var c;i&&(u||a)&&(i=!1,null===u&&(u=a,a=null),e.is(u)?u=(c=u.with(n))[t].apply(c,o()(r)):null!==a&&(u=Promise.resolve(u.apply(n,r))));return null!==a?u.then(function(r){return e.is(a)?a.with(n)[t](r):a.call(n,r)}):u}}},{key:"_lineExecutorPromise",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return function(r,i){return null!==i?r.then(function(r){return!1===r?Promise.reject():e.is(i)?(u=i.with(t)).line.apply(u,o()(n)):i.apply(t,n);var u}):r}}},{key:"add",value:function(t){return"function"==typeof t||e.is(t)?this._queue.push(t):-1}},{key:"has",value:function(e){return-1!==this._queue.indexOf(e)}},{key:"remove",value:function(t){if("function"==typeof t||e.is(t))t=this._queue.indexOf(t);else{if("number"!=typeof t)return;t=parseInt(t)}t>-1&&(this._queue[t]=null)}},{key:"clear",value:function(){this._queue=[],this._currIndex=0}},{key:"all",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this._queue.reduce(this._allExecutor(null,t),[])}},{key:"pipe",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this._queue.reduce(this._funcExecutor("pipe",null,t))}},{key:"compose",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this._queue.reduceRight(this._funcExecutor("compose",null,t))}},{key:"line",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!this._queue.some(this._lineExecutor(null,t))}},{key:"with",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e._queue.reduce(e._allExecutor(t,r),[])};return{all:n,pipe:function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e._queue.reduce(e._funcExecutor("pipe",t,r))},compose:function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e._queue.reduceRight(e._funcExecutor("compose",t,r))},line:function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return!e._queue.some(e._lineExecutor(t,r))},promise:{all:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return Promise.all(n(t))},pipe:function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e._queue.reduce(e._funcExecutorPromise("pipe",t,r))},compose:function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e._queue.reduceRight(e._funcExecutorPromise("compose",t,r))},line:function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e._queue.reduce(e._lineExecutorPromise(t,r),Promise.resolve())}}}}},{key:"promise",get:function(){var e=this;return{all:function(){return Promise.all(e.all.apply(e,arguments))},pipe:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return e._queue.reduce(e._funcExecutorPromise("pipe",null,n))},compose:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return e._queue.reduceRight(e._funcExecutorPromise("compose",null,n))},line:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return e._queue.reduce(e._lineExecutorPromise(null,n),Promise.resolve())}}}},{key:Symbol.toStringTag,get:function(){return"HandlerQueue"}}],[{key:"is",value:function(e){return e&&"HandlerQueue"===e[Symbol.toStringTag]}}]),e}();t.a=s},function(e,t,n){var r=n(19),o=n(20),i=n(21);e.exports=function(e){return r(e)||o(e)||i()}},function(e,t,n){e.exports=n(23)},,function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t,n){var r=n(14);e.exports=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){r(e,t,n[t])})}return e}},function(e,t){function n(t,r){return e.exports=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(t,r)}e.exports=n},function(e,t,n){"use strict";var r=n(1),o=n.n(r),i=n(3),u=n.n(i),a=n(4),c=n.n(a),s=n(8),l=n.n(s),f=n(0),h=n.n(f),y=n(9),v=n.n(y),p=n(2),g=n(6),d={cacheName:"storage"},_=function(e){function t(){var e,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return u()(this,t),(e=l()(this,h()(t).call(this,n)))._config=Object(g.a)(n,t._CONFIG),"caches"in self?e._store=Promise.resolve(self.caches):e._store=Promise.reject(new Error("此浏览器不支持 Service Worker")),e}return v()(t,e),c()(t,[{key:"setData",value:function(e,n){var r=this;return this._store.then(function(e){return e.open(r._config.cacheName)}).then(function(r){return console.log("缓存 ".concat("string"==typeof e?e:e.url)),r.put(t.tranToRequest(e),n)})}},{key:"getData",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e=t.tranToRequest(e),this._store.then(function(t){return t.match(e,n)}).then(function(t){return t||Promise.reject(new Error("不存在缓存 "+e.url))})}},{key:"removeData",value:function(e){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e=t.tranToRequest(e),this._store.then(function(e){return e.open(n._config.cacheName)}).then(function(t){return t.delete(e,r)})}},{key:"clearData",value:function(){var e=this;this._store.then(function(t){return t.delete(e._config.cacheName)})}},{key:"addData",value:function(e){var t=this;return this._store.then(function(e){return e.open(t._config.cacheName)}).then(function(t){return t.add(e)})}},{key:"addAll",value:function(e){var t=this;return this._store.then(function(e){return e.open(t._config.cacheName)}).then(function(t){return t.addAll(e)})}},{key:"keys",value:function(){return this._store.then(function(e){return e.keys()})}},{key:"cacheDelete",value:function(e){return this._store.then(function(t){return t.delete(e)})}},{key:"catch",value:function(e){"function"==typeof e&&this._store.catch(e)}},{key:Symbol.toStringTag,get:function(){return"CacheStorageModel"}}],[{key:"tranToRequest",value:function(e){return"object"===o()(e)&&e instanceof Request||(e=new Request(e)),e}},{key:"_CONFIG",get:function(){return d}}]),t}(p.a);p.a.register("cacheStorage",_),p.a.registerAlias("cacheStorage","cs"),t.a=_},,function(e,t){e.exports=function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}},function(e,t){e.exports=function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},function(e,t,n){var r=function(e){"use strict";var t,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",u=o.asyncIterator||"@@asyncIterator",a=o.toStringTag||"@@toStringTag";function c(e,t,n,r){var o=t&&t.prototype instanceof p?t:p,i=Object.create(o.prototype),u=new A(r||[]);return i._invoke=function(e,t,n){var r=l;return function(o,i){if(r===h)throw new Error("Generator is already running");if(r===y){if("throw"===o)throw i;return S()}for(n.method=o,n.arg=i;;){var u=n.delegate;if(u){var a=O(u,n);if(a){if(a===v)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var c=s(e,t,n);if("normal"===c.type){if(r=n.done?y:f,c.arg===v)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=y,n.method="throw",n.arg=c.arg)}}}(e,n,u),i}function s(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var l="suspendedStart",f="suspendedYield",h="executing",y="completed",v={};function p(){}function g(){}function d(){}var _={};_[i]=function(){return this};var m=Object.getPrototypeOf,b=m&&m(m(j([])));b&&b!==n&&r.call(b,i)&&(_=b);var w=d.prototype=p.prototype=Object.create(_);function x(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function k(e){var t;this._invoke=function(n,o){function i(){return new Promise(function(t,i){!function t(n,o,i,u){var a=s(e[n],e,o);if("throw"!==a.type){var c=a.arg,l=c.value;return l&&"object"==typeof l&&r.call(l,"__await")?Promise.resolve(l.__await).then(function(e){t("next",e,i,u)},function(e){t("throw",e,i,u)}):Promise.resolve(l).then(function(e){c.value=e,i(c)},function(e){return t("throw",e,i,u)})}u(a.arg)}(n,o,t,i)})}return t=t?t.then(i,i):i()}}function O(e,n){var r=e.iterator[n.method];if(r===t){if(n.delegate=null,"throw"===n.method){if(e.iterator.return&&(n.method="return",n.arg=t,O(e,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=s(r,e.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,v;var i=o.arg;return i?i.done?(n[e.resultName]=i.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,v):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function E(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function A(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(E,this),this.reset(!0)}function j(e){if(e){var n=e[i];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,u=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return u.next=u}}return{next:S}}function S(){return{value:t,done:!0}}return g.prototype=w.constructor=d,d.constructor=g,d[a]=g.displayName="GeneratorFunction",e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,d):(e.__proto__=d,a in e||(e[a]="GeneratorFunction")),e.prototype=Object.create(w),e},e.awrap=function(e){return{__await:e}},x(k.prototype),k.prototype[u]=function(){return this},e.AsyncIterator=k,e.async=function(t,n,r,o){var i=new k(c(t,n,r,o));return e.isGeneratorFunction(n)?i:i.next().then(function(e){return e.done?e.value:i.next()})},x(w),w[a]="Generator",w[i]=function(){return this},w.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=j,A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(L),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return a.type="throw",a.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var u=this.tryEntries[i],a=u.completion;if("root"===u.tryLoc)return o("end");if(u.tryLoc<=this.prev){var c=r.call(u,"catchLoc"),s=r.call(u,"finallyLoc");if(c&&s){if(this.prev<u.catchLoc)return o(u.catchLoc,!0);if(this.prev<u.finallyLoc)return o(u.finallyLoc)}else if(c){if(this.prev<u.catchLoc)return o(u.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<u.finallyLoc)return o(u.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var u=i?i.completion:{};return u.type=e,u.arg=t,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(u)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),L(n),v}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:j(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),v}},e}(e.exports);try{regeneratorRuntime=r}catch(e){Function("r","regeneratorRuntime = r")(r)}},,,,,,,,,,,function(e,t,n){var r=n(58),o=n(59),i=n(60);e.exports=function(e,t){return r(e)||o(e,t)||i()}},,,,,,,,,,,,,,,,,,,,,,function(e,t,n){e.exports=n(57)},function(e,t,n){"use strict";n.r(t);var r=n(34),o=n.n(r),i=n(17);t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"cacheStorage",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=new i.a({cacheName:e});console.log("Service Worker 已加载"),self.addEventListener("install",function(e){console.log("Service Worker 安装完成，install event",e);var n=new Promise(function(e,n){Array.isArray(t)&&t.length?e(t):n()});e.waitUntil(n.then(function(e){return console.log("预加载",e),r.addAll(e)},function(){console.log("没有预加载文件")}).then(function(){return self.skipWaiting()}).catch(function(e){console.log(e)}))}),self.addEventListener("activate",function(t){console.log("新版本 Service Worker 激活 Active event,",t),t.waitUntil(Promise.all([r.keys(),e]).then(function(e){var t=o()(e,2),n=t[0],i=t[1];return Promise.all(n.reduce(function(e,t){return i!==t&&e.push(r.cacheDelete(t)),e},[]))}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){var t=e.request;-1===t.url.search(location.host)&&(t=new Request(t.url,{mode:"cors"})),e.respondWith(r.getData(t.clone()).then(function(e){return e||Promise.reject({message:"不存在 "+t.url+" 的相关缓存"})}).catch(function(o){return console.log(o&&o.message),fetch(t).then(function(o){var i=!1;if(o&&200===o.status&&"basic"===o.type)"GET"===t.method&&(i=!0);else if(o.status>200&&o.status,console.log("不缓存 ".concat(t.url," status: ").concat(o.status," type: ").concat(o.type)),n&&Array.isArray(n)&&n.length){var u=n.findIndex(function(t){return"string"==typeof t.ext?e.request.endsWith("."+t.ext):Array.isArray(t.ext)?t.ext.some(function(t){return e.request.endsWith("."+t)}):t.ext instanceof RegExp&&t.ext.test(e.request.url)}),a=null;-1!==u&&(a=n[u].handler(t,o)),a instanceof Response&&(o=a)}return i&&r.setData(t,o.clone()).then(function(){console.log("已缓存 ".concat(t.url))}),o})}))}),self.addEventListener("message",function(e){self.clients.matchAll().then(function(t){t.forEach(function(t){t.postMessage(e.data)})})}),self.addEventListener("push",function(e){var t,n;if(e.data){try{(t=e.data.json()).body=t.body||t.message||t.value,n=t.tag=t.tag||Date.now()}catch(r){n=Date.now(),t={title:"Push",body:e.data.text(),tag:n}}e.waitUntil(self.registration.showNotification(t.title,t))}}),self.addEventListener("pushsubscriptionchange",function(e){}),self.addEventListener("sync",function(e){console.log(e.tag,e.lastChance)}),self.addEventListener("notificationclick",function(e){e.notification.close(),console.log("桌面通知被点击"),e.notification.data&&e.waitUntil(self.clients.openWindow(e.notification.data))}),self.addEventListener("notificationclose",function(e){console.log("桌面通知被关闭")})}},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t){e.exports=function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}}])});
//# sourceMappingURL=serviceWork.js.map