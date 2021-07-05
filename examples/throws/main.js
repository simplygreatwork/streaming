
import { pipe } from '../../source/pipe.js'
import { interval } from '../../source/interval.js'
import { throws } from '../../source/throws.js'
import { take } from '../../source/take.js'
import { map } from '../../source/map.js'
import { each } from '../../source/each.js'
import { error } from '../../source/error.js'
import { done } from '../../source/done.js'
import { consume } from '../../source/consume.js'

let source = pipe(
	interval(10),
	throws(0.1),
	take(20)
)

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
	})
))
