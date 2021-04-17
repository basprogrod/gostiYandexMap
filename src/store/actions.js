import actionsTypes from './actionsTypes'

export const actionSetOptions = (payload) => ({
  type: actionsTypes.SET_OPTIONS,
  payload,
})

export const actionSetCities = (payload) => ({
  type: actionsTypes.SET_CITIES,
  payload,
})

export const actionSetAds = (payload) => ({
  type: actionsTypes.SET_ADS,
  payload,
})
