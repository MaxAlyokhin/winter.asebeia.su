import { computeOpacity } from './computeOpacity'
import { refreshWeather } from './refreshWeather'

export async function refreshAndCompute(maximalTemperature, minimalTemperature, weatherRelevance) {
  // Разница между сейчас и временем измерения
  let timeStampDifference = Number(new Date()) - Number(localStorage.getItem('timestamp'))
  let temperature = undefined
  if (timeStampDifference >= weatherRelevance) {
    temperature = await refreshWeather()
  } else {
    temperature = localStorage.getItem('temperature')
  }

  if (document.location.search !== '?off') {
    document.querySelector('.container').style.filter = `blur(${computeOpacity(maximalTemperature, minimalTemperature, temperature)}px)`
  } else {
    document.querySelector('.container').style.filter = `none`
  }
}
