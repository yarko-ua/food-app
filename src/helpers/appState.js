export const saveState = (reducerPath, data) => {
  const appState = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE)

  if (appState) {
    const state = JSON.parse(appState)

    state[reducerPath] = data

    localStorage.setItem(
      process.env.REACT_APP_LOCAL_STORAGE,
      JSON.stringify(state)
    )
  }

  if (!appState) {
    const newState = {}

    newState[reducerPath] = data

    localStorage.setItem(
      process.env.REACT_APP_LOCAL_STORAGE,
      JSON.stringify(newState)
    )
  }

}

export const loadState = key => {

  const appState = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE)

  if (appState) {
    const state = JSON.parse(appState)

    console.log(`state`, state)
    console.log(`Object.keys(state)`, Object.keys(state))
    console.log(`Object.keys(state).indexOf(key)`, Object.keys(state).indexOf(key))
    console.log(`state[key]`, state[key])
    console.log(`typeof state[key]`, typeof state[key])
    if(state[key]) {
      console.log(`Object.keys(state[key])`, Object.keys(state[key]))
      
    }

    if ( 
      !Object.keys(state).indexOf(key) < 0 ||
      !state[key] ||
      (typeof state[key] === 'object' && Object.keys(state[key]).length  < 1 ) 
      ) {
      console.log(`return null`)
      return null
    }

    if (key)
      return state[key]

    if (!key)
      return state
  }

  return null;

} 