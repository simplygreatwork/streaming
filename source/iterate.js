
import { greet, deliver, terminate } from './types.js'

export const iterate = function(operation) {
	
	return function(source) {
		let talkback
		source(greet, function(type, data) {
			if (type === greet) {
				talkback = data
				talkback(deliver)
			} else if (type === deliver) {
				operation(data)
				talkback(deliver)
			}
		})
	}
}
