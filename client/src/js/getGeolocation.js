// Метод возвращает промис с координатами пользователя

// Настройки определения геопозиции
const options = {
  enableHighAccuracy: true,
}

export async function getGeolocation() {
  // Если браузер поддерживает геолокацию, то создаём промис
  if ('geolocation' in navigator) {
    const coordinates = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          // Если геолокация недоступна, то показываем Екатеринодар
          reject([45.02, 38.59])
        },
        options
      )
    })

    return coordinates
  } else {
    document.querySelector('.geolocation__text').innerHTML = `Браузер не поддерживает определение геолокации.`
  }
}
