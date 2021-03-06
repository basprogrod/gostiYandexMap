import axios from 'axios'
import { API_URL } from '../../config/constants'
import { actionSetOptions } from '../actions'

export default () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/attributes`)

    dispatch(actionSetOptions(res.data.attributes))
  } catch (error) {
    alert('Что-то пошло не так!')
  }
}
