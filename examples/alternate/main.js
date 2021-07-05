
import { pipe } from '../../source/pipe.js'
import { interval } from '../../source/interval.js'
import { from_iterable } from '../../source/from-iterable.js'
import { alternate } from '../../source/alternate.js'
import { iterate } from '../../source/iterate.js'
import { for_each } from '../../source/for-each.js'
import { throws } from '../../source/throws.js'
import { throw_error } from '../../source/throw-error.js'

// goal: modify concat example to to pull from (of many) sources successfully without error
// issue: might not work with piped sources (if first source is piped)

const source = alternate(
	throw_error(),
	throw_error(),
	pipe(
		from_iterable(['1a', '1b', '1c']),
		throws(1)
	),
	pipe(
		from_iterable(['2a', '2b', '2c']),
		throws(1)
	),
	from_iterable(['3a', '3b', '3c'])
)

for_each(function(each) {
	console.log(`each: ${each}`)
})(source)
