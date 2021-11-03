// Метод получает данные геолокации

import { showContent } from './showContent'

// Настройки определения геопозиции
const options = {
  enableHighAccuracy: true,
}

// Координаты посетителя
// export let latitude
// export let longitude

export async function geolocation() {
  let latitude = undefined
  let longitude = undefined

  // Вешаем обработчик на клик
  document.querySelector('.geolocation__button').addEventListener('click', function () {
    const coordinates = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude
          longitude = position.coords.longitude

          resolve([latitude, longitude])
        },
        (error) => {
          reject(`${error.code}: ${error.message}`)
        },
        options
      )
    })

    return coordinates
  })
}
