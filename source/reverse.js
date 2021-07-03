
import { greet, deliver, terminate } from './types.js'

export function reverse() {
	
	return function(source) {
		return function(start, sink) {
			if (start === greet) {
				let talkback
				let array = []
				source(greet, function(type, data) {
					if (type === greet) {
						array = []
				      talkback = data
						sink(type, data)
					} else if (type === deliver) {
						array.push(data)
						talkback(deliver)
					} else if (type === terminate) {
						while (array.length > 0) {
							sink(deliver, array.pop())
						}
						sink(terminate)
					}
				})
			}
		}
	}
}
