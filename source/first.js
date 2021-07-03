
import { greet, deliver, terminate } from './types.js'

export function first(fn) {
	
	return function(source) {
		return function(start, sink) {
			if (start === greet) {
				let talkback
				let first = true
				source(greet, function(type, data) {
					if (type === greet) {
				      talkback = data
						sink(type, data)
					} else if (type === deliver) {
						if (first) {
							first = false
							var result = fn(data, function() {
								talkback(deliver)
							})
							if (result !== undefined) {
								talkback(deliver)
							}
						} else {
							sink(deliver, data)
						}
					} else if (type === terminate) {
						sink(type, data)
					}
				})
			}
		}
	}
}
