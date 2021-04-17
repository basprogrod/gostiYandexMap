import axios from 'axios'
import { actionSetOptions } from '../actions'
const corsEveryWhere = 'https://cors-everywhere.herokuapp.com/'

export default () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${corsEveryWhere}https://gosti24.by/api/attributes`
    )

    dispatch(actionSetOptions(res.data.attributes))
  } catch (error) {
    alert('Что-то пошло не так!')
  }
}
