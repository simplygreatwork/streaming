
import { greet, deliver, terminate } from './types.js'

export function take(max) {
	
	return function(source) {
		return function(start, sink) {
			if (start !== 0) return
			let taken = 0
			let ended
			let talkback
			source(greet, function(type, data) {
				if (type === greet) {
					talkback = data
					sink(greet, function() {
						if (type === terminate) {
							ended = true
							talkback(type, data)
						} else if (taken < max) {
							talkback(type, data)
						}
					})
				} else if (type === deliver) {
					if (taken < max) {
						taken++
						sink(type, data)
						if (taken === max && ! ended) {
							ended = true
							talkback(terminate)
							sink(terminate)
						}
					}
				} else {
					sink(type, data)
				}
			})
		}
	}
}
