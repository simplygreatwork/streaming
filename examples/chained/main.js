
import { produce } from '../../source/produce.js'
import { transform } from '../../source/transform.js'
import { consume } from '../../source/consume.js'
import { each } from '../../source/each.js'
import { error } from '../../source/error.js'
import { done } from '../../source/done.js'
import { pipe } from '../../source/pipe.js'
import { interval } from '../../source/interval.js'
import { take } from '../../source/take.js'
import { map } from '../../source/map.js'

function create_source(options) {
	
	let items = []
	return pipe(
		produce(function(next, error, done) {
			if (items.length > 0) {
				items.forEach((item) => next(item))
				done()
			} else {
				repeat(options.length, options.delay, function(index) {
					if (options.error && index === 2) error('error')
					let item = `item ${index}`
					items.push(item)
					next(item)
				}, done)
			}
		})
	)
}

let source = pipe(
	create_source({ length: 10, delay: 100, error: false }),
	transform(function(each, push) {
		push(each + '!')
	})
)

Source(source).on('each', function(each) {
	console.log(each)
}).on('error', function(error) {
	console.error(`An error occured: ${error}`)
}).on('done', function(error) {
	if (! error) console.log(`Done.`)
	else console.error(`Done except with an error: ${error}`)
}).consume()

function repeat(length, delay, fn, done) {
	
	let index = 0
	let id = setInterval(function() {
		if (index > length) {
			clearInterval(id)
			done()
		} else {
			fn(index)
		}
		index++
	}, delay)
}

function Source(source_) {
	
	let object
	let keys = {}
	return object = {
		on: function(key, fn) {
			keys[key] = fn
			return object
		},
		consume: function() {
			consume(pipe(source,
				each(function(each_) {
					keys['each'](each_)
				}),
				error(function(error) {
					keys['error'](error)
				}),
				done(function(error) {
					keys['done'](error)
				})
			))
		}
	}
}
