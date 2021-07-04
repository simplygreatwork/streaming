
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

export function pullable_source() {
	
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
