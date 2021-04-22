export const FILTER = 'filter'
export const ADS = 'ads'
export const CACH_KEEPING_TIME = 2400000 // sec
export const CORS = 'https://cors-everywhere.herokuapp.com/'

export let API_URL = document.URL.includes('gosti24.by')
  ? 'https://gosti24.by/api'
  : `${CORS}https://gosti24.by/api`

export const MEDIUM_SREEN = 960
export const SMALL_SREEN = 540

export const filterFields = {
  CITY: 'city',
  TYPE: 'type',
  ROOM_NUMBER: 'roomsNumber',
  FROM: 'daily_from',
  TO: 'daily_to',
  OPTIONS: 'option[]',
  VISITORS: 'visitors',
}
