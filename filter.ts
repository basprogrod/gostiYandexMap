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
  // необязательные дополгительные поля
  aquipment?: Array<string> // Оснащение
  assigтment?: Array<string> // Для досуга
}

// Response
interface Response {
  adsNumber: string | number // общее кольчество объявление по фильтру
  result: Array<{}> // Массив объявление соответсвующий запросу фильра
}

// Запрос для отправки в "Избранное"
interface SendToFave {
  id: string // id объявление
}
// Ответ
interface ReponseOfSendToFav {
  message: 'ОК' | 'ERROR'
}
