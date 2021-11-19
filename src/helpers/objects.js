export const objectValueByStringKey = (obj = null, path = null) => {
	if (!path || !obj) return undefined

	const temp = {}
	Object.assign(temp, obj)

	console.log(`temp`, temp)

	const value = path.split(".").reduce((p, c) => p && (p[c] || null), temp)

	console.log(`value`, value)

	return value
}

export const has = Object.prototype.hasOwnProperty
