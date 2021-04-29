import axios from 'axios'
import { HOME } from '../../config/constants'

export default (spotId) => async () => {
  try {
    await axios.post(`${HOME}/favorites/add?spotId=${spotId}`)
  } catch (error) {
    console.log('-> error', error)
  }
}
