
import { greet, deliver, terminate } from './types.js'

export function consume(source) {
	
	let talkback
	source(greet, function(type, data) {
		if (type === greet) {
			talkback = data
			talkback(deliver)
		} else if (type === deliver) {
			talkback(deliver)
		} else if (type === terminate) {
			talkback(terminate)
		}
	})
}
