// Метод вычисления прозрачности в зависимости от температуры
// Принимает температуру и диапазон температур
// Возвращает значение css-свойства opacity

export function computeOpacity(maximalTemperature, minimalTemperature, temperature) {
  // Например
  // Диапазон температур 0 - +20, разница 20 градусов
  // 100/20= 5% прозрачности в 1 градусе
  // Если сейчас 5 градусов, то 5 градусов * 5% прозрачности = 25% прозрачности
  // 100 - 25% = 75%

  // const coefficient = 100 / (maximalTemperature - minimalTemperature)
  const coefficient = 20 / (maximalTemperature - minimalTemperature)

  if (temperature >= maximalTemperature) return 0
  if (temperature <= minimalTemperature) return 1
  // Линейная функция
  // else return (100 - temperature * coefficient) / 100
  // Нелинейная функция
  else return 0.04 * (temperature * coefficient) ** 2
  // else return temperature * coefficient
}
