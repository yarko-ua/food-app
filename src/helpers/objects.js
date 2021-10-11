export const objectValueByStringKey = (obj, path) => {
  const temp = {}
  Object.assign(temp, obj)

  console.log(`temp`, temp)

  const value = path.split('.').reduce((p,c)=> (p && (p[c] || null)), temp)

  console.log(`value`, value)
  return value
}