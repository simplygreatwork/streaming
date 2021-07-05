
import { greet, deliver, terminate } from '../../source/types.js'
import { pipe } from '../../source/pipe.js'
import { take } from '../../source/take.js'
import { pull } from '../../source/pull.js'

let source = pipe(
	pullable_source_async(),
	take(10)
)

pull(function(next, done) {
	repeat(100, 100, function(index) {
		next(function(each) {
			console.log('each: ' + each)
		})
	})
	done(function() {
		console.log('done')
	})
})(source)

function pullable_source_sync() {
	
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

function pullable_source_async() {
	
	return function(start, sink) {
		if (start !== greet) return
		let index = 0
		sink(0, function(type, data) {
			if (type === deliver) {
				setTimeout(function() {
					sink(deliver, index)
					console.log(`Source delivered value "${index}" on demand.`)
					index++
				}, 1000)
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
