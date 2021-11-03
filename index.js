const express = require('express')
const helmet = require('helmet')
const fs = require('fs')

const weather = require('./modules/weather')

const server = express()
const host = '127.0.0.1'
const port = 80

// УБРАТЬ В ПРОДАКШНЕ CORS
const cors = require('cors')
server.use(cors())
server.options('*', cors()) // Разрешаем запросы с других доменов

// Установка заголовков для избавления от уязвимостей
server.use(helmet())
// Добавляем body-parser
server.use(express.json({ extended: true }))

// Метод читает метеоданные из файла и отправляет json-ответ
server.post('/weather', (request, responce) => {
  weather(request.body.latitude, request.body.longitude, responce)
})

server.use(express.static(`${__dirname}/client/dist`))

// 404
server.use((request, responce) => {
  responce.sendStatus(404)
})

// Запускаем сервер
server.listen(port, host, () => console.log(`Server is up on http://${host}:${port}`))
