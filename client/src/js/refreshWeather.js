// Метод обновляет данные о температуре по координатам
// Вставляет значение на страницу
// Возаращает значение температуры

import { getGeolocation } from './getGeolocation'
import { getTemperature } from './getTemperature'

export async function refreshWeather() {
  let coordinates = undefined
  try {
    coordinates = await getGeolocation() // Получаем координаты
  } catch (defaultCoordinates) {
    // Если пользователь не расшарил геолокацию, то ставим Екатеринодар
    coordinates = defaultCoordinates
  }

  const weather = await getTemperature(coordinates) // Получаем температуру

  // Запоминаем
  localStorage.setItem('temperature', weather.temperature)
  localStorage.setItem('image', weather.image)
  localStorage.setItem('timestamp', Number(new Date()))

  // Вставляем полученные с сервера данные в страницу
  document.querySelector('.temperature__text').innerText = weather.temperature + '°C'
  document.querySelector('.temperature__image').innerHTML = `<img src='./img/${weather.image}@2x.png'/>`

  return weather.temperature
}
