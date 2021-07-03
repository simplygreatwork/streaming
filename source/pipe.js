
import { greet, deliver, terminate } from './types.js'

export function pipe(...callbags) {
	
	let result = callbags[0]
	for (let i = 1, n = callbags.length; i < n; i++) {
		result = callbags[i](result)
	}
	return result
}
