
import { greet, deliver, terminate } from './types.js'

export const iterate = function(operation) {
	
	return function(source) {
		let talkback
		source(0, function(type, data) {
			if (type === 0) talkback = data
			if (type === 1) operation(data)
			if (type === 1 || type === 0) talkback(1)
		})
	}
}
