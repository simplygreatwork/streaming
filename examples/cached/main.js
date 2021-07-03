
import { Bus } from './bus.js'
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

const bust_cache = true
let bus = new Bus()
let source = pipe(
	create_source({ length: 3, period: 300, error: false })
)

bus.on('first', function() {
	console.log('Caching results.')
	consume(pipe(source,
		each(function(each) {
			console.log(each)
		}),
		error(function(error) {
			console.error(`An error occured: ${error}`)
		}),
		done(function(error) {
			if (! error) console.log(`Done.`)
			else console.error(`Done except with an error: ${error}`)
			bus.emit('second')
		})
	))
})

bus.on('second', function() {
	console.log('Using cached results.')
	consume(pipe(source,
		each(function(each) {
			console.log(each)
		}),
		error(function(error) {
			console.error(`An error occured: ${error}`)
		}),
		done(function(error) {
			if (! error) console.log(`Done.`)
			else console.error(`Done except with an error: ${error}`)
			bus.emit('third')
		})
	))
})

bus.on('third', function() {
	console.log('Busting cached results.')
	consume(pipe(source,
		each(function(each) {
			console.log(each)
		}),
		error(function(error) {
			console.error(`An error occured: ${error}`)
		}),
		done(function(error) {
			if (! error) console.log(`Done.`)
			else console.error(`Done except with an error: ${error}`)
			bus.emit('fourth')
		})
	), bust_cache)
})

bus.on('fourth', function() {
	console.log('Using cached results.')
	consume(pipe(source,
		each(function(each) {
			console.log(each)
		}),
		error(function(error) {
			console.error(`An error occured: ${error}`)
		}),
		done(function(error) {
			if (! error) console.log(`Done.`)
			else console.error(`Done except with an error: ${error}`)
			bus.emit('end')
		})
	))
})

bus.emit('first')

function create_source(options) {
	
	let items = []
	return pipe(
		produce(function(value, error, done, bust) {
			if (bust) items = []
			if (items.length > 0) {
				items.forEach((item) => value(item))
				done()
			} else {
				repeat(options.length, options.period, function(index) {
					if (options.error && index === 2) error('error')
					let item = `item ${index}`
					items.push(item)
					value(item)
				}, done)
			}
		}),
		transform(function(each, push) {
			push(each + '!')
		})
	)
}

function repeat(length, period, fn, done) {
	
	let index = 0
	let id = setInterval(function() {
		if (index > length) {
			clearInterval(id)
			done()
		} else {
			fn(index)
		}
		index++
	}, period)
}
