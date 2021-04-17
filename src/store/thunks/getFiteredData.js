import axios from 'axios'
import qs from 'querystring'
import { API_URL } from '../../config/constants'
import dict from '../../config/dict'
import { actionSetAds, actionSetCities } from '../actions'

export default (state) => async (dispatch) => {
  const fields = {}

  for (const key in state) {
    if (Array.isArray(state[key]) && !state[key].length) continue
    if (state[key]) fields[key] = state[key]
  }

  const query = qs.stringify(fields)

  try {
    const res = await axios.get(`${API_URL}/map-by-name?type=flat&${query}`)
    console.log('-> res', res)

    dispatch(actionSetAds(res.data.data))
  } catch (error) {
    alert(dict.webInteraction.INDEFINIT_ERROR)
  }
}
