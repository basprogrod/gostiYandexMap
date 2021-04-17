// GET | POST
// На отправку фильтра

//Query
interface Filter {
  city: string
  type: string // тип -> аредна | покупка | квартира | комната
  roomsNumber: string | number
  priceRange: [string, string] // ценовой диапазон
  guestsNumber: string
  currecny: string
  coords: {
    leftBottom: [number, number]
    rightTop: [number, number]
  }
  // необязательные дополгительные поля
  options: Array<string> // это дополнительные опции если выбраны. Отправляется массив.
}

// Response
interface Response {
  adsNumber: string | number // общее кольчество объявление по фильтру
  result: Array<{}> // Массив объявление соответсвующий запросу фильра
}

// запрос за типом предлжения (мне нужжен эндпоинт)
// тип ответа

interface RentType {
  types: Array<{}> // массив имеющихтя типов предложений аредна квартиры | покупка квартиры | комната (из бд)
}

// запрос за дополнительными опциями (мне нужжен эндпоинт)
// тип ответа
interface OptionsType {
  types: Array<{
    id: string // 'может и не быть id'
    type: string // 'Оснащение'
    items: Array<string> // Чистящие средства | диван | кровать
  }>
}
// запрос за списком городов (мне нужжен эндпоинт)
// тип ответа
interface OptionsType {
  cities: Array<string> // все города из базы данных в кириллице
}
