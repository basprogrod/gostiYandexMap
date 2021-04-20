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

export const actionSetTypes = (payload) => ({
  type: actionsTypes.SET_TYPES,
  payload,
})

export const actionSetType = (payload) => ({
  type: actionsTypes.SET_TYPE,
  payload,
})

export const actionShowCloseLoader = (payload = true) => ({
  type: actionsTypes.LOADING,
  payload,
})
