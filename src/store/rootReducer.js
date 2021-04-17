import actionsTypes from './actionsTypes'

const initState = {
  options: [],
  cities: [],
  ads: [],
}

export default (state = initState, { type, payload }) => {
  switch (type) {
    case actionsTypes.SET_OPTIONS:
      return {
        ...state,
        options: payload,
      }
    case actionsTypes.SET_CITIES:
      return {
        ...state,
        cities: payload,
      }
    case actionsTypes.SET_ADS:
      return {
        ...state,
        ads: payload,
      }

    default:
      return state
  }
}
