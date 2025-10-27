// Vowel transformation map for huification
const VOWEL_MAP: Record<string, string> = {
  а: 'я',
  о: 'ё',
  у: 'ю',
  э: 'е',
  ы: 'и',
  и: 'и',
  е: 'е',
  ё: 'ё',
  я: 'я',
  ю: 'ю',
}

// Russian vowels in lowercase
const VOWELS = 'аеёиоуыэюя'

/**
 * Finds the first vowel in a word
 */
function findFirstVowel(word: string): number {
  for (let i = 0; i < word.length; i++) {
    const char = word[i]?.toLowerCase()
    if (!char) continue
    if (VOWELS.includes(char)) {
      return i
    }
  }
  return -1
}

/**
 * Transforms a Russian word using huification rules
 * Examples: балда → хуелда, книга → хуига, море → хуёре
 */
export function huify(text: string): string | null {
  if (!text) return null
  const word = text
    .toLowerCase()
    .replace(/[^a-zа-яё\s]/gi, '')
    .trim()

  // Split by spaces and process only the first word
  const words = word.split(/\s+/)
  if (words.length > 1 || words.length === 0) {
    return null
  }

  // Разрешаем только символы кириллицы (а-яё и А-ЯЁ)
  if (!/^[а-яё]+$/i.test(word)) {
    return null
  }

  // Find first vowel
  const vowelIndex = findFirstVowel(word)

  // If no vowel found or word too short, return original
  if (vowelIndex === -1 || word.length <= 2) {
    return null
  }

  const vowel = word[vowelIndex]
  if (!vowel) return null

  const transformedVowel = (VOWEL_MAP[vowel] || vowel).toLowerCase()
  const rest = word.substring(vowelIndex + 1).toLowerCase()

  // Always use lowercase prefix
  const prefix = 'ху'

  const huifiedWord = `${prefix}${transformedVowel}${rest}`

  // If original text had multiple words, preserve them
  if (words.length > 1) {
    return `${huifiedWord} ${words.slice(1).join(' ')}`
  }

  return huifiedWord
}
