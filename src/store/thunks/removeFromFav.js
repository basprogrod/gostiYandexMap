import axios from 'axios'
import { HOME } from '../../config/constants'

export default (spotId) => async () => {
  try {
    await axios.delete(`${HOME}/favorites/delete?spotId=${spotId}`)
  } catch (error) {
    console.log('-> error', error)
  }
}
