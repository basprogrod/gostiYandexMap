import actionsTypes from './actionsTypes'

export const actionSetOptions = (payload) => ({
  type: actionsTypes.SET_OPTIONS,
  payload,
})

export const actionSetCities = (payload) => ({
  type: actionsTypes.SET_CITIES,
  payload,
})
