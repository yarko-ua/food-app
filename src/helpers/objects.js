export const objectValueByStringKey = (obj = null, path = null) => {
  if(!path || !obj) return ;

  const temp = {}
  Object.assign(temp, obj)

  console.log(`temp`, temp)

  const value = path.split('.').reduce((p,c)=> (p && (p[c] || null)), temp)

  console.log(`value`, value)
  
  return value
}