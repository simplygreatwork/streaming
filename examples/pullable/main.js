
import { greet, deliver, terminate } from '../../source/types.js'
import { pipe } from '../../source/pipe.js'
import { pull } from '../../source/pull.js'

let source = pipe(
	pullable_source()
)

pipe(
	source,
	pull(function(next, done) {
		done(function() {
			console.log('done')
		})
		repeat(3, 100, function(index) {
			next(function(each) {
				console.log('each: ' + each)
			})
		})
	})
)

function pullable_source() {
	
	const range = [10, 20]
	return function(start, sink) {
		if (start !== greet) return
		let index = range[0]
		sink(greet, function(type, data) {
			if (type === deliver) {
				if (index <= range[1]) {
					sink(deliver, index)
					console.log(`Source delivered value "${index}" on demand.`)
					index++
				} else {
					sink(terminate)
				}
			}
		})
	}
}

function repeat(length, period, fn, done) {
	
	let index = 0
	let id = setInterval(function() {
		fn(index)
		index++
		if (index >= length) {
			clearInterval(id)
			if (done) done()
		}
	}, period)
}
