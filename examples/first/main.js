
import { pipe } from '../../source/pipe.js'
import { interval } from '../../source/interval.js'
import { take } from '../../source/take.js'
import { map } from '../../source/map.js'
import { first } from '../../source/first.js'
import { each } from '../../source/each.js'
import { error } from '../../source/error.js'
import { done } from '../../source/done.js'
import { consume } from '../../source/consume.js'

let source = pipe(
	interval(100),
	take(10)
)

consume(pipe(source,
	first(function(first) {
		console.log(`first: ${first}`)
	}),
	each(function(each) {
		console.log(`each: ${each}`)
	}),
	error(function(error) {
		console.error(`error: ${error}`)
	}),
	done(function(error) {
		console.log('done')
	})
))
