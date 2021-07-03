
import { greet, deliver, terminate } from './types.js'
const bust_cache_type = 11

export function produce(producer) {
	
	let bust_cache = false
	return function(start, sink) {
		if (start !== greet) return
		if (typeof producer !== 'function') {
			sink(greet, () => {})
			sink(terminate)
			console.error('The callbag "produce" requires a function parameter.')
			return
		}
		let end = false
		let clean
		sink(greet, function(type) {
			if (type == bust_cache_type) {
				bust_cache = true
			}
			if (! end) {
				if (type === terminate) end = true
				if (end && typeof clean === 'function') clean()
			}
		})
		if (end) return
		clean = producer(
			function(value) {
				if (! end) sink(deliver, value)
			},
			function(error) {
				if (! end && error !== undefined) {
					end = true
					sink(terminate, error)
				}
			},
			function() {
				bust_cache = false
				if (! end) {
					end = true
					sink(terminate)
				}
			},
			bust_cache
		)
	}
}
