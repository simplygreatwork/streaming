
import { greet, deliver, terminate } from '../../source/types.js'
import { pipe } from '../../source/pipe.js'
import { take } from '../../source/take.js'
import { to_async_iterable } from '../../source/to-async-iterable.js'

async function main() {
	
	const values = pipe(
		pullable_source_async,
		take(10),
		to_async_iterable
	)
	for await (let each of values) {
		console.log('each: ' + each)
	}
}

main()

function pullable_source_async(start, sink) {
	
	if (start !== greet) return
	let index = 0
	sink(0, function(type, data) {
		if (type === deliver) {
			setTimeout(function() {
				sink(deliver, index)
				console.log(`Source created and delivered value "${index}" on demand.`)
				index++
			}, 300)
		}
	})
}
