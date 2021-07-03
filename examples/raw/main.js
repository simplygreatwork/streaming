
import { greet, deliver, terminate } from '../../source/types.js'
import { pipe } from '../../source/pipe.js'
import { interval } from '../../source/interval.js'
import { take } from '../../source/take.js'
import { transform } from '../../source/transform.js'
import { raw } from '../../source/raw.js'
import { each } from '../../source/each.js'
import { error } from '../../source/error.js'
import { done } from '../../source/done.js'
import { consume } from '../../source/consume.js'

let total = 0
let source = pipe(
	interval(10),
	take(10),
	raw({
		greet: function(data, sink) {
			total = 0
			sink(greet, data)
		},
		deliver: function(data, sink) {
			total = total + data
		},
		terminate: function(data, sink) {
			sink(deliver, total)
			sink(terminate, data)
		}
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
