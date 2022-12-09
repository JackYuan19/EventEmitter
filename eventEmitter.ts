(function(): void {

    interface ListenerT {
        listener: Function;
        once: boolean;
    }

    const root: any = (typeof self === "object" && self.self === self && self) ||
           (typeof globalThis === "object" && globalThis.globalThis === globalThis && globalThis) ||
           this || {};

    function indexOf(array: any[], item: Function | ListenerT): number {

        let result: number = -1;

        item = typeof item === "object"
            ? item.listener
            : item;
        
        for (let i: number = 0, len: number = array.length; i < len; i++) {

            if (array[i] === item) {
                
                result = i;
                break;
            }

        }

        return result;
    }       
    
    class EventEmitter {

        public __events: any = {};

        public static VERSION: string = "1.0.0";

        /**
         * 添加事件
         * @param {string} eventName 事件名称
         * @param {function} listener 函数名称
         * @return {Object} 可链式调用
        */
        public on: Function = function(eventName: string, listener: Function | ListenerT): any {

            if (!eventName) return;

            const events: any = this.__events;
            const listeners: any[] = events[eventName] = events[eventName] || [];

            const listenerIsWrapped: boolean = typeof listener === "object";

            // 不重复添加事件
            if (indexOf(listeners, listener) === -1) {

                listeners.push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });

            }

            return this;
        }

        /**
         * 添加事件，该事件只能被执行一次
         * @param {string} eventName 事件名称
         * @param {Function} listener 监听器函数
         * @param {Object} 可链式调用
        */
        public once: Function = function(eventName: string, listener: Function): any {
            return this.on(eventName, {
                listener: listener,
                once: true
            });
        }

        /**
         * 删除事件
         * @param {string} eventName 事件名称
         * @param {Function} listener 监听器函数
         * @return {Object} 可链式调用
        */
        public off: Function = function(eventName: string, listener: Function): any {

            const listeners: any = this.__events[eventName];
            if (!listeners) return;

            let index: number = NaN;
            for(let i = 0, len = listeners.length; i < len; i++) {

                if (listeners[i] && listeners[i].listener === listener) {

                    index = i;
                    break;
                }

            }

            if (!isNaN(index)) {
                listeners.splice(index, 1, null);
            }
            
            return this;
        }

        /**
         * 删除某一个类型所有事件或者所有事件
         * @param {string} eventName 事件名称
        */
        public allOff: Function = function(eventName: string): void{
            
            if (eventName && this.events[eventName]) {
                this.__events[eventName] = [];
            } else {
                this.events = {};
            }

        }

        /**
         * 触发事件
         * @param {string} eventName 事件名称
         * @param {Array} args 传入监听器函数的参数，使用数组形式传入
         * @return {Object} 可调式调用
        */
        public emit: Function = function(eventName: string, args: Array<any>): any {

            const listeners = this.__events[eventName];
            if (!listeners) return;

            for (let i: number = 0, len: number = listeners.length; i < len; i++) {

                const listener = listeners[i];
                if (listener) {
                    
                    listener.listener.apply(this, args || []);
                    if (listener.once) {
                        this.off(eventName, listener.listener);
                    }

                }

            }

            return this;
        }

    }

    
} ())