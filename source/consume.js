
import { greet, deliver, terminate } from './types.js'
const bust_cache_type = 11

export function consume(source, bust_cache) {
	
	let talkback
	source(greet, function(type, data) {
		if (type === greet) {
			talkback = data
			talkback(deliver)
			if (bust_cache === true) talkback(bust_cache_type)
		} else if (type === deliver) {
			talkback(deliver)
		} else if (type === terminate) {
			talkback(terminate)
		}
	})
}
