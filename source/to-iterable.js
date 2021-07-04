
import { greet, deliver, terminate } from './types.js'

export function* to_iterable(source) {
	
	let talkback
	let hasValue = false
	let value
	source(0, function(type, data) {
		if (type === 0) {
			talkback = data
		} else if (type === 1) {
			value = data
			hasValue = true
		} else if (type === terminate) {
			talkback = false
		}
	})
	while (talkback) {
		talkback(deliver)
		if (hasValue) {
			yield value
			hasValue = false
		} else {
			if (talkback) talkback(terminate)
			return
		}
	}
}
