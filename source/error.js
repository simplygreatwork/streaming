
import { greet, deliver, terminate } from './types.js'

export function error(fn) {
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				if (type == terminate) {
					if (data) {
						fn(data)
					}
				}
				sink(type, data)
			})
		}
	}
}
