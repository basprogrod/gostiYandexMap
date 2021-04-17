import axios from 'axios'
import { API_URL } from '../../config/constants'
import { actionSetCities } from '../actions'

export default () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/cities`)

    const cities = res.data.cities.map((city) => ({ value: city, label: city }))

    dispatch(actionSetCities(cities))
  } catch (error) {}
}
