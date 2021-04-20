import actionsTypes from './actionsTypes'

const initState = {
  options: [],
  cities: [],
  ads: [],
  types: [],
  adsType: '',
  adsCount: undefined,
  loading: false,
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
    case actionsTypes.SET_TYPES:
      return {
        ...state,
        types: payload,
      }
    case actionsTypes.SET_TYPE:
      return {
        ...state,
        adsType: payload.type,
        adsCount: payload.count,
      }

    case actionsTypes.LOADING:
      return {
        ...state,
        loading: payload,
      }
    default:
      return state
  }
}
