
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

}
