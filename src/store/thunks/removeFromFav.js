import axios from 'axios'
import { actionSetTypes } from '../actions'
import { HOME } from '../../config/constants'

export default (spotId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${HOME}/favorites/delete?spotId=${spotId}`)
    const types = res.data.housingTypes.map((type) => ({
      value: type.type,
      label: type.name,
    }))

    // dispatch(actionSetTypes(types))
  } catch (error) {
    console.log('-> error', error)
  }
}

// POST https://gosti24.by/favorites/add?spotId=1
