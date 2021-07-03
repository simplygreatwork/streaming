
import { pipe } from '../../source/pipe.js'
import { interval } from '../../source/interval.js'
import { take } from '../../source/take.js'
import { map } from '../../source/map.js'
import { header } from '../../source/header.js'
import { each } from '../../source/each.js'
import { error } from '../../source/error.js'
import { done } from '../../source/done.js'
import { consume } from '../../source/consume.js'

let source = pipe(
	interval(100),
	take(10)
)

consume(pipe(source,
	header(function(header) {
		console.log(`header: ${header}`)
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
