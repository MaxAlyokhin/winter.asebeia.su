// Метод управляет "дёрганьем" в словах, содержащим буквы "м" и "р"

export function mr() {
  // Находим все ответы
  let answersElements = document.querySelectorAll('.answer__text')

  // В каждом ответе
  answersElements.forEach((answerElement) => {
    let answer = answerElement.innerHTML // Забираем ответ как строку
    let words = answer.split(/ |&nbsp;/gi) // Делим строку на слова
    // Собираем ответ заново, обрамив нужные слова в div с inline-block
    // Это необходимо, чтобы слова не переносились по буквам, когда мы доберёмся до букв
    let newAnswer = words
      .map((word) => {
        if (word.includes('м') || word.includes('р')) {
          return `<div style="display: inline-block;">${word}</div> `
        } else {
          return `${word} `
        }
      })
      .join(' ')

    // Вставляем строку обратно
    answerElement.innerHTML = newAnswer

    // Теперь всё, что обрамлено в div — это целевые слова
    // Вычисляем кол-во целевых слов в конкретном ответе
    let newWords = answerElement.querySelectorAll('div')

    // В зависимости от кол-ва слов ставим интервал дёрганья букв в обратной пропорциональности
    // То есть частота изменения своя для каждого ответа
    // 10000 - цифры взята "на глаз", поделив её на кол-во слов получается отпимальная частота
    const intervalTime = 10000 / newWords.length

    // По кругу рандомно выбираем слова и добавляем класс, что вызывает анимацию
    setInterval(() => {
      let randomElement = Math.floor(Math.random() * newWords.length)

      if (newWords[randomElement] != undefined) {
        let newWord = newWords[randomElement].innerHTML
        // Проверка на !letter-for-rotate нужна, чтобы по сто раз не вешать один и тот же класс
        if (newWord.includes('м') && !newWord.includes('letter-for-rotate')) {
          newWord = newWord.replace(/м/gi, `<span class="letter-for-rotate">м</span>`)
        }
        if (newWord.includes('р') && !newWord.includes('letter-for-rotate')) {
          newWord = newWord.replace(/р/gi, `<span class="letter-for-rotate">р</span>`)
        }

        // Дёргаем слово
        newWords[randomElement].innerHTML = newWord
      }
    }, intervalTime)
  })
}
