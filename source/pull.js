
import { greet, deliver, terminate } from './types.js'

export const pull = function(operation) {
	
	return function(source) {
		let talkback
		let next_
		let done_
		source(0, function(type, data) {
			if (type === greet) {
				talkback = data
				operation(
					function(next) {
						next_ = next
						talkback(1)
					},
					function(done) {
						done_ = done
					}
				)
			}
			if (type === deliver) next_(data)
			if (type === terminate) {
				if (done_) {
					done_(data)
					done_ = null
				} 
			}
		})
	}
}
