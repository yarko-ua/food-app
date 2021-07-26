export const saveState = (reducerPath, data) => {
  const appState = localStorage.getItem(process.env.REACT_APP_APP_STATE)

  if (appState) {
    const state = JSON.parse(appState)

    state[reducerPath] = data

    localStorage.setItem(
      process.env.REACT_APP_APP_STATE,
      JSON.stringify(state)
    )
  }

  if (!appState) {
    const newState = {}

    newState[reducerPath] = data

    localStorage.setItem(
      process.env.REACT_APP_APP_STATE,
      JSON.stringify(newState)
    )
  }

}

export const loadState = reducerPath => {

  const appState = localStorage.getItem(process.env.REACT_APP_APP_STATE)

  if (appState) {
    const state = JSON.parse(appState)

    if (reducerPath)
      return state[reducerPath]

    if (!reducerPath)
      return state
  }

  return {};

} 