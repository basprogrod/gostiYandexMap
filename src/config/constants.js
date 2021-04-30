import vio from '../assets/img/violetCircle.svg'
import yel from '../assets/img/yellowCircle.svg'

export const FILTER = 'filter'
export const ADS = 'ads'
export const CACH_KEEPING_TIME = 2400000 // sec
export const CORS = 'https://cors-everywhere.herokuapp.com/'
export const PHOTO_STORAGE_URL = 'https://gosti24.by/storage/'
export const HOME = 'https://gosti24.by/'

export let API_URL = document.URL.includes('gosti24.by') ? `${HOME}api` : `${CORS + HOME}/api`

export const MEDIUM_SREEN = 960
export const SMALL_SREEN = 540
export const MAX_PRICE_LENGTH = 6
export const ZOOM = 12
export const TIME_ON_CHANGE_LOCATION = 1000

export const filterFields = {
  CITY: 'city',
  TYPE: 'type',
  ROOM_NUMBER: 'roomsNumber',
  FROM: 'daily_from',
  TO: 'daily_to',
  OPTIONS: 'option[]',
  VISITORS: 'visitors',
}

export const clIcons = [
  {
    href: yel,
    size: [40, 40],
    offset: [-20, -20],
  },
  {
    href: vio,
    size: [40, 40],
    offset: [-20, -20],
  },
]

export const clOptoins = {
  clusterIcons: clIcons,
  clusterNumbers: [2],
  groupByCoordinates: false,
  clusterDisableClickZoom: true,
  clusterHideIconOnBalloonOpen: false,
  geoObjectHideIconOnBalloonOpen: false,
  hasBalloon: false,
  iconLayout: 'default#imageWithContent',
  iconImageSize: [40, 40],
  iconImageOffset: [-20, -20],
  iconContentOffset: [15, 13],
}
