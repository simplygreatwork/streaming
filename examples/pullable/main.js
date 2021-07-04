
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
	
	return function(start, sink) {
		if (start !== greet) return
		let index = 10
		const talkback = function(type, data) {
			if (type === deliver) {
				if (index <= 20) {
					sink(deliver, index)
					console.log(`Source delivered value "${index}" on demand.`)
					index++
				} else {
					sink(terminate)
				}
			}
		}
		sink(greet, talkback)
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
