// Метод получения температуры
// Принимает координаты
// Отдаёт температуру

export async function getTemperature(coordinates) {
  const fetchOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ latitude: coordinates[0], longitude: coordinates[1] }),
  }

  // Отправляем координаты на сервер
  const dataFromServer = await fetch('http://localhost:8001/weather', fetchOptions)
  if (dataFromServer.status === 200) {
    return dataFromServer.json()
  } else {
    return false
  }
}
