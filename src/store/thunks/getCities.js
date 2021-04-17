import axios from 'axios'
import { actionSetCities } from '../actions'

const corsEveryWhere = 'https://cors-everywhere.herokuapp.com/'
export default () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${corsEveryWhere}https://gosti24.by/api/cities`
    )
    console.log('Cities', res.data)

    const cities = res.data.cities.map((city) => ({ value: city, label: city }))

    dispatch(actionSetCities(cities))
  } catch (error) {}
}
