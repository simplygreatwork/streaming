
import { greet, deliver, terminate } from './types.js'

export function raw(options) {
	
	return function(source) {
		return function(start, sink) {
			if (start === greet) {
				source(greet, function(type, data) {
					if (type == greet) {
						if (options.greet) {
							options.greet(data, sink)
						} else {
							sink(type, data)
						}
					} else if (type == deliver) {
						if (options.deliver) {
							options.deliver(data, sink)
						} else {
							sink(type, data)
						}
					} else if (type == terminate) {
						if (options.terminate) {
							options.terminate(data, sink)
						} else {
							sink(type, data)
						}
					} else {
						if (options.other) {
							options.other(data, sink)
						} else {
							sink(type, data)
						}
					}
				})
			}
		}
	}
}
