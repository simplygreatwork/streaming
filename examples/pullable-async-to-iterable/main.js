
import { greet, deliver, terminate } from '../../source/types.js'
import { pipe } from '../../source/pipe.js'
import { take } from '../../source/take.js'
import { to_async_iterable } from '../../source/to-async-iterable.js'

async function main() {
	
	console.log('main')
	const values = pipe(
		pullable_source_async,
		//take(10),					// take does not work here
		to_async_iterable
	)
	for await (let each of values) {
		console.log('each: ' + each)
	}
}

main()

function pullable_source_async(start, sink) {
	
	if (start !== greet) return
	let i = 0
	sink(0, function(type, data) {
		if (type === deliver) {
			setTimeout(function() {
				sink(deliver, i++)
			}, 100)
		}
	})
}
