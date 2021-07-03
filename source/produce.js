
import { greet, deliver, terminate } from './types.js'

export function produce(producer) {
	
	return function(start, sink) {
		if (start !== greet) return
		if (typeof producer !== 'function') {
			sink(greet, () => {})
			sink(terminate)
			return
		}
		let end = false
		let clean
		sink(greet, function(type) {
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
				if (! end) {
					end = true
					sink(terminate)
				}
			}
		)
	}
}
