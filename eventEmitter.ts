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

            const events: any = this.events;
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

    }

} ())