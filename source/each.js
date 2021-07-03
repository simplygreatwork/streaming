
import { greet, deliver, terminate } from './types.js'

export function each(fn) {
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				if (type == deliver) fn(data)
				sink(type, data)
			})
		}
	}
}
