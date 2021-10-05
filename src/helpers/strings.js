export const divideCamelString = str => {

  const upperCaseCount = str.match(/[A-Z]/gm)

  if (!upperCaseCount) return capitalize(str)

  const newString = str.replace(/([A-Z])/gm, ' $1').trim()

  return capitalize(newString)
  
}

export const capitalize = str => {
  let temp = str.split('')
  temp[0] = temp[0].toUpperCase()
  return temp.join('')
}