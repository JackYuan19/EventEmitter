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
                var events = this.events;
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
        }
        EventEmitter.VERSION = "1.0.0";
        return EventEmitter;
    }());
}());
