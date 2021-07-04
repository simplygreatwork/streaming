
import { greet, deliver, terminate } from './types.js'

export async function* to_async_iterable(source) {
	
	let talkback
	let resolve
	let hasValue
	let value
	source(greet, function(type, data) {
		if (type === greet) {
			talkback = data
		} else if (type === deliver) {
			value = data
			resolve(true)
		} else if (type === terminate) {
			resolve(false)
			talkback = false
		}
	})
	while (talkback) {
		hasValue = new Promise(function(_resolve) {
			resolve = _resolve
		})
		talkback(deliver)
		if (await hasValue) {
			yield value
		} else {
			return
		}
	}
}
