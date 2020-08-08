const KEY = process.env.REACT_APP_YANDEX_API_KEY

const translateWord = async (word, lang = 'en-ru') => {
  try {
    const URL = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${KEY}&lang=${lang}&text=${word}`
    const response = await fetch(URL)
    const result = await response.json()
    const translate = result.def || []

    return  translate

  } catch (error) {
    console.error('Translate not found...')
  }

}

export default translateWord