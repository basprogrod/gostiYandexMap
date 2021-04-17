import axios from 'axios'
import { API_URL, CORS } from '../../config/constants'
import dict from '../../config/dict'

export default (state) => async (dispatch) => {
  const query = new URLSearchParams(state).toString()
  console.log('-> query', query)

  try {
    const res = await axios.get(`${CORS}${API_URL}?${query}`)
    console.log('-> res', res)
  } catch (error) {
    alert(dict.webInteraction.INDEFINIT_ERROR)
  }
}
