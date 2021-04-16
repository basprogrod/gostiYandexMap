import axios from 'axios'
const corsEveryWhere = 'https://cors-everywhere.herokuapp.com/'
export default () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${corsEveryWhere}https://gosti24.by/api/map?city=minsk&type=flat&roomsNumber=2`
    )
    console.log('-> res', res)
  } catch (error) {}
}
