
import { pipe } from '../../source/pipe.js'
import { produce } from '../../source/produce.js'
import { interval } from '../../source/interval.js'
import { take } from '../../source/take.js'
import { each } from '../../source/each.js'
import { done } from '../../source/done.js'
import { map } from '../../source/map.js'
import { error } from '../../source/error.js'
import { consume } from '../../source/consume.js'

function create_source() {
	
	let items = []
	return pipe(
		create((next, error, done) => {
			if (items.length > 0) {
				items.forEach((item) => next(item))
				done()
			}
			setTimeout(function() {
				let counter = 0
				let id = setInterval(function() {
					if (counter > 5) {
						clearInterval(id)
						if (false) error('error')
						done()
					} else {
						let item = `item ${counter}`
						items.push(item)
						next(item)
					}
					counter++
				}, 100)
			}, 1000)
		}),
		map_async(function(each, push) {
			push(each + '!')
		})
	)
}


let source = pipe(
	interval(10),
	take(5),
	map(function(each) {
		return each + '!'
	})
)

// consume(pipe(source,
// 	map(function(each) {
// 		console.log(each)
// 		return each
// 	})
// ))

consume(pipe(source,
	each(function(each) {
		console.log(each)
	}),
	done(function(error) {
		console.log('done')
	}),
	error(function(error) {
		console.error(error)
	})
))
