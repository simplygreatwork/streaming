
import { pipe } from '../../source/pipe.js'
import { from_iterable } from '../../source/from-iterable.js'
import { iterate } from '../../source/iterate.js'
import { concat } from '../../source/concat.js'

const source = concat(
	from_iterable(['1a', '1b', '1c']),
	from_iterable(['2a', '2b', '2c']),
	from_iterable(['3a', '3b', '3c'])
)

iterate(function(each) {
	console.log(`each: ${each}`)
})(source)
