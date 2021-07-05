
import { greet, deliver, terminate } from './types.js'

export function take(max) {
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			let taken = 0
			let talkback
			let end
			source(greet, function(type, data) {
				if (type === greet) {
					talkback = data
					sink(greet, function(type, data) {
						if (type === terminate) {
							end = true
							talkback(type, data)
						} else if (taken < max) {
							talkback(type, data)
						}
					})
				} else if (type === deliver) {
					if (taken < max) {
						taken++
						sink(type, data)
						if (taken === max && ! end) {
							end = true
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

