
import { pipe } from '../../source/pipe.js'
import { to_iterable } from '../../source/to-iterable.js'

const iterator = pipe(
  pullable_source(),
  to_iterable
)

console.log('iterator.next(): ' + iterator.next().value)
console.log('iterator.next(): ' + iterator.next().value)
console.log('iterator.next(): ' + iterator.next().value)
console.log('iterator.next(): ' + iterator.next().value)

for (let each of iterator) {
	console.log('each: ' + each)
}

function pullable_source() {
	
	return function(start, sink) {
		if (start !== 0) return
		let i = 10
		const talkback = function(type, data) {
			if (type === 1) {
				if (i <= 20) sink(1, i++)
				else sink(2)
			}
		}
		sink(0, talkback)
	}
}
