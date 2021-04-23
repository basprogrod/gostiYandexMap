import axios from 'axios'
import qs from 'querystring'
import { API_URL } from '../../config/constants'
import dict from '../../config/dict'
import { storage } from '../../utils/storageService'
import { actionSetAds, actionSetType, actionShowCloseLoader } from '../actions'

export default (state, cb) => async (dispatch) => {
  dispatch(actionShowCloseLoader())
  dispatch(actionSetAds([]))
  const fields = {}

  for (const key in state) {
    if (Array.isArray(state[key]) && !state[key].length) continue
    if (state[key]) fields[key] = state[key]
  }

  const { bounds } = storage.get()

  fields.start_longitude = bounds[0][1]
  fields.start_latitude = bounds[0][0]
  fields.end_longitude = bounds[1][1]
  fields.end_latitude = bounds[1][0]

  const query = qs.stringify(fields)
  try {
    await new Promise((res) => setTimeout(() => res(), 2000))

    const res = await axios.get(
      `${API_URL}/map-by-name?${query}` // TODO
    )

    dispatch(
      actionSetType({
        type: res.data.housingTypeText || 'Снять квартиру',
        count: res.data.response.total,
      })
    )

    dispatch(actionSetAds(res.data.response.data || []))
    dispatch(actionShowCloseLoader(false))
    if (typeof cb === 'function') {
      cb()
    }
  } catch (error) {
    dispatch(actionShowCloseLoader(false))
    console.log('-> error', error)
    alert(dict.webInteraction.INDEFINIT_ERROR)
  }
}
