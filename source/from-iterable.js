
import { greet, deliver, terminate } from './types.js'

export function from_iterable(iterable) {
	
	return function(start, sink) {
		
		if (start !== greet) return
		const iterator = typeof Symbol !== 'undefined' && iterable[Symbol.iterator] ? iterable[Symbol.iterator]() : iterable
		let inloop = false
		let got1 = false
		let completed = false
		let result
		function loop() {
			inloop = true
			while (got1 && ! completed) {
				got1 = false
				result = iterator.next()
				if (result.done) {
					sink(terminate)
					break
				} else {
					sink(deliver, result.value)
				}
			}
			inloop = false
		}
		sink(greet, function(type) {
			if (completed) return
			if (type === deliver) {
				got1 = true
				if (! inloop && ! (result && result.done)) {
					loop()
				}
			} else if (type === terminate) {
				completed = true
			}
		})
	}
}
