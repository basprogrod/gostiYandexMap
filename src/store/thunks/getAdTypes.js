import axios from 'axios'
import { actionSetCities } from '../actions'
import { API_URL } from '../../config/constants'

export default () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/housing-types`)
    console.log(res.data)
    // const cities = res.data.cities.map((city) => ({ value: city, label: city }))

    // dispatch(actionSetCities(cities))
  } catch (error) {}
}
//https://gosti24.by/api/housing-types
