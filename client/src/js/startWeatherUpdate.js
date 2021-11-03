import { refreshAndCompute } from './refreshAndCompute'

export function startWeatherUpdate(maximalTemperature, minimalTemperature, weatherRelevance) {
  let interval = undefined

  interval = setInterval(
    () => {
      refreshAndCompute(maximalTemperature, minimalTemperature, weatherRelevance)
    },
    1000,
    localStorage
  )

  // Чтобы не копились лишние интервалы при потере фокуса
  window.addEventListener('blur', () => {
    clearInterval(interval)
    interval = undefined
  })

  window.addEventListener('focus', () => {
    if (interval !== undefined) return // Чтобы не скопилось несколько интервалов параллельно
    interval = setInterval(
      () => {
        refreshAndCompute(maximalTemperature, minimalTemperature, weatherRelevance)
      },
      1000,
      localStorage
    )
  })
}
