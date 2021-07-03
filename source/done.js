
import { greet, deliver, terminate } from './types.js'

export function done(fn) {
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				if (type == terminate) fn(data)
				sink(type, data)
			})
		}
	}
}
