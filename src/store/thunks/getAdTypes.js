import axios from 'axios'
import { actionSetTypes } from '../actions'
import { API_URL } from '../../config/constants'

export default () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/housing-types`)
    console.log(res.data)
    const types = res.data.housingTypes.map((type) => ({
      value: type.type,
      label: type.name,
    }))

    dispatch(actionSetTypes(types))
  } catch (error) {}
}
//https://gosti24.by/api/housing-types
