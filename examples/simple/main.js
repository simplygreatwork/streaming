
import { pipe } from '../../source/pipe.js'
import { interval } from '../../source/interval.js'
import { take } from '../../source/take.js'
import { map } from '../../source/map.js'
import { each } from '../../source/each.js'
import { error } from '../../source/error.js'
import { done } from '../../source/done.js'
import { consume } from '../../source/consume.js'

let source = pipe(
	interval(10),
	take(5),
	map(function(each) {
		return each + '!'
	})
)

consume(pipe(source,
	each(function(each) {
		console.log(each)
	}),
	error(function(error) {
		console.error(error)
	}),
	done(function(error) {
		console.log('done')
	})
))
