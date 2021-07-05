
export const for_each = operation => source => {
	
  let talkback
  source(0, (type, data) => {
    if (type === 0) talkback = data
    if (type === 1) operation(data)
    if (type === 1 || type === 0) talkback(1)
  })
}
