
import { greet, deliver, terminate } from './types.js'

export function interval(period) {
	
	return function(start, sink) {
		if (start !== greet) return
		let index = 0
		const id = setInterval(function() {
			sink(deliver, index++)
		}, period)
		sink(greet, function(type) {
			if (type === terminate) {
				clearInterval(id)
			}
		})
	}
}
