
import { greet, deliver, terminate } from './types.js'

const UNIQUE = {}

export function concat(...sources) {
	
	return function(start, sink) {
		
		if (start !== greet) return
		const n = sources.length
		if (n === 0) {
			sink(greet, () => {})
			sink(terminate)
			return
		}
		let i = 0
		let sourceTalkback
		let lastPull = UNIQUE
		const talkback = (type, data) => {
			if (type === deliver) lastPull = data
			sourceTalkback(type, data)
		}
		function next() {
			if (i === n) {
				sink(terminate)
				return
			}
			sources[i](greet, function(type, data) {
				if (type === greet) {
					sourceTalkback = data
					if (i === 0) sink(greet, talkback)
					else if (lastPull !== UNIQUE) sourceTalkback(deliver, lastPull)
				} else if (type === terminate && data) {
					sink(terminate, data)
				} else if (type === terminate) {
					i++
					next()
				} else {
					sink(type, data)
				}
			})
		}
		next()
	}
}
