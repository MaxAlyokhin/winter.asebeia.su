import { mr } from './mr'
import { startWeatherUpdate } from './startWeatherUpdate'

// СДЕЛАТЬ ПОПАП ПРИ ПОЛНОЙ ПРОЗРАЧНОСТИ ЧТО СЕЙЧАС СЛИШКОМ ТЕПЛО ДЛЯ ЭТОГО ТЕКСТА
// ВЕРНИТЕСЬ К НЕМУ ПОЗДНЕЕ

// Настройки
// Диапазон температур
const minimalTemperature = 0
const maximalTemperature = 15
// Время актуальности значения температуры = 10 минут
const weatherRelevance = 1000 * 60 * 10

window.addEventListener('load', () => {
  // Если уже были на сайте, то скрываем поп-ап и начинает чекать температуру
  if (localStorage.getItem('noFirst') === 'true') {
    document.querySelector('.geolocation').style.display = 'none'
    document.querySelector('.container').style.display = 'block'
    document.querySelector('.container').style.opacity = 1

    // Вставляем полученные с сервера данные в страницу
    document.querySelector('.temperature__text').innerText = localStorage.getItem('temperature') + '°C'
    document.querySelector('.temperature__image').innerHTML = `<img src='./img/${localStorage.getItem('image')}@2x.png'/>`
    startWeatherUpdate(maximalTemperature, minimalTemperature, weatherRelevance)
    mr()
  } else {
    document.querySelector('.geolocation__button').addEventListener('click', () => {
      document.querySelector('.geolocation').style.opacity = 0
      document.querySelector('.container').style.display = 'block'

      setTimeout(() => {
        document.querySelector('.geolocation').style.display = 'none'
        document.querySelector('.container').style.opacity = 1
        startWeatherUpdate(maximalTemperature, minimalTemperature, weatherRelevance)
        mr()
      }, 2000)

      // Поп-ап больше не будет показан
      localStorage.setItem('noFirst', true)
    })
  }

  // Плавно показываем интерфейс
  document.querySelector('body').style.opacity = 1
})
