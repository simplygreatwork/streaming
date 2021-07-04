
import { greet, deliver, terminate } from './types.js'

export const pull = function(operation) {
	
	return function(source) {
		let talkback
		let each_
		let ended_
		source(0, function(type, data) {
			if (type === greet) {
				talkback = data
				operation(
					function(each) {
						each_ = each
						talkback(1)
					},
					function(ended) {
						ended_ = ended
					}
				)
			}
			if (type === deliver) each_(data)
			if (type === terminate) {
				if (ended_) {
					ended_(data)
					ended_ = null
				} 
			}
		})
	}
}
