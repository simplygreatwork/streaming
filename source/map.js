
import { greet, deliver, terminate } from './types.js'

export function map(fn) {
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				if (type === deliver) {
					sink(type, fn(data))
				} else {
					sink(type, data)
				}
			})
		}
	}
}
