
import { greet, deliver, terminate } from './types.js'

export function transform(fn) {
	
	return function(source) {
		return function(start, sink) {
			if (start === greet) {
				source(greet, function(type, data) {
					if (type == deliver) {
						var result = fn(data, function(value) {
							sink(type, value)
						})
						if (result !== undefined) {
							sink(type, result)
						}
					} else {
						sink(type, data)
					}
				})
			}
		}
	}
}
