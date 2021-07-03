
import { greet, deliver, terminate } from './types.js'

export function throws() {
	
	let ended = false
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				if (ended) return
				if (Math.random() < 0.1) {
					sink(terminate, new Error('Threw a random error'))
					ended = true
				} else {
					sink(type, data)
				}
			})
		}
	}
}
