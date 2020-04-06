
export class CommonUtils {

	// Andy 2020.4.3 16:22
	static symbolIterator(o) {
		o[Symbol.iterator] = function* iterEntries(obj) {
			obj = this;
			let keys = Object.keys(obj);
			for (let i = 0; i < keys.length; i++) {
				let key = keys[i];
				yield [key, obj[key]];
			}
		}
	}

	/* Andy 2020.4.5 17:17  
	 * 这个防抖有些问题：1，每一次的数据流开始，总是会执行最开始的、最早的那一次数据；
	 * 				   2，而且如果发生防抖缓存，后面的时间都是基于最开始执行的那一次时间，而不是基于上一次数据流中数据emit的时间；
	 * 				   3,后续每个一段时间产生的一系列数据流中的第一次总是缓存不住，因为它的last没有清0，判断不了每一波数据流中的第一个数据；
	 */
	static throttle(fn, delay) {
		let last = 0,
			timer = null;

		return function () {
			let context = this,
				args = arguments,
				now = +new Date();

			if (now - last < delay) {
				console.log("now - last:", now - last);
				clearTimeout(timer);
				timer = setTimeout(function () {
					last = now;
					fn.apply(context, args);
				}, delay);

			} else {
				console.log("now - last:", now - last);
				last = now;
				fn.apply(context, args);
			}
		}
	}
	
	/* Andy 2020.4.5 17:17  
	 * 在上面throttle基础上修改而来，这种防抖是从第一次开始就缓存，直到达到deplay临界值才开始执行，而每一次成功防抖后把last时间清零，
	 * 表示新的一次输入风暴的重新防抖开始，这样就能每次只执行数据流中最后一次、最新的数据值；
	 */
	static debounce(fn, delay) {
		let last = 0,
			timer = null;

		return function () {
			let context = this,
				args = arguments,
				now = +new Date();

			if (last == 0 || now - last < delay) {
				console.log(`debounce task cache -> last: ${last}, now: ${now}, now - last: ${now - last}`);
				
				clearTimeout(timer);
				timer = setTimeout(function () {
					last = 0;
					fn.apply(context, args);
					console.log(`debounce task setTimeout execute -> now: ${now}, last: ${last}`);
				}, delay);

				last = now;
			} 
		}
	}

}
