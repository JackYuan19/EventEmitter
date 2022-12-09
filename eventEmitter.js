(function () {
    var root = (typeof self === "object" && self.self === self && self) ||
        (typeof globalThis === "object" && globalThis.globalThis === globalThis && globalThis) ||
        this || {};
    function indexOf(array, item) {
        var result = -1;
        item = typeof item === "object"
            ? item.listener
            : item;
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === item) {
                result = i;
                break;
            }
        }
        return result;
    }
    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
            this.__events = {};
            /**
             * 添加事件
             * @param {string} eventName 事件名称
             * @param {function} listener 函数名称
             * @return {Object} 可链式调用
            */
            this.on = function (eventName, listener) {
                if (!eventName)
                    return;
                var events = this.__events;
                var listeners = events[eventName] = events[eventName] || [];
                var listenerIsWrapped = typeof listener === "object";
                // 不重复添加事件
                if (indexOf(listeners, listener) === -1) {
                    listeners.push(listenerIsWrapped ? listener : {
                        listener: listener,
                        once: false
                    });
                }
                return this;
            };
            /**
             * 添加事件，该事件只能被执行一次
             * @param {string} eventName 事件名称
             * @param {Function} listener 监听器函数
             * @param {Object} 可链式调用
            */
            this.once = function (eventName, listener) {
                return this.on(eventName, {
                    listener: listener,
                    once: true
                });
            };
            /**
             * 删除事件
             * @param {string} eventName 事件名称
             * @param {Function} listener 监听器函数
             * @return {Object} 可链式调用
            */
            this.off = function (eventName, listener) {
                var listeners = this.__events[eventName];
                if (!listeners)
                    return;
                var index = NaN;
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (listeners[i] && listeners[i].listener === listener) {
                        index = i;
                        break;
                    }
                }
                if (!isNaN(index)) {
                    listeners.splice(index, 1, null);
                }
                return this;
            };
            /**
             * 删除某一个类型所有事件或者所有事件
             * @param {string} eventName 事件名称
            */
            this.allOff = function (eventName) {
                if (eventName && this.events[eventName]) {
                    this.__events[eventName] = [];
                }
                else {
                    this.events = {};
                }
            };
            /**
             * 触发事件
             * @param {string} eventName 事件名称
             * @param {Array} args 传入监听器函数的参数，使用数组形式传入
             * @return {Object} 可调式调用
            */
            this.emit = function (eventName, args) {
                var listeners = this.__events[eventName];
                if (!listeners)
                    return;
                for (var i = 0, len = listeners.length; i < len; i++) {
                    var listener = listeners[i];
                    if (listener) {
                        listener.listener.apply(this, args || []);
                        if (listener.once) {
                            this.off(eventName, listener.listener);
                        }
                    }
                }
                return this;
            };
        }
        EventEmitter.VERSION = "1.0.0";
        return EventEmitter;
    }());

    if (typeof exports != 'undefined' && !exports.nodeType) {

        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = EventEmitter;
        }

        exports.EventEmitter = EventEmitter;

    } 
    else {
        root.EventEmitter = EventEmitter;
    }

}());
