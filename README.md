# Article AI Processor / Procesor Artykułów AI

[English](#english) | [Polski](#polski)

## English

### Description
Article AI Processor is a Node.js application that transforms text articles into HTML format using OpenAI's API. The program adds relevant images, properly structures the content, and ensures correct encoding of special characters (including Polish diacritics).

### Features
- Converts plain text articles to structured HTML
- Automatically adds relevant images using Lorem Picsum
- Handles Polish diacritical marks correctly
- Creates three output files:
    - `artykul.html` - processed article content
    - `szablon.html` - empty template with styling
    - `podglad.html` - complete preview with styles and content

### Requirements
- Node.js (v14 or higher)
- OpenAI API key
- npm package manager

### Installation
1. Clone the repository:
```bash
git clone https://github.com/Rafal-wq/Junior_AI_Developer.git
cd article-ai-processor
```

2. Install dependencies:
```bash
npm install openai iconv-lite
```

3. Set up your OpenAI API key in the code:
```javascript
const openai = new OpenAI({
  apiKey: 'your-api-key-here'
});
```

### Usage
1. Place your article in `article.txt` file (UTF-8 encoding recommended)

2. Run the program:
```bash
node index.js
```

3. Check the generated files:
- `artykul.html` - contains the processed article content
- `szablon.html` - template file for future articles
- `podglad.html` - complete preview file

### Configuration
You can modify the following parameters in the code:
- Image dimensions in the URL: `https://picsum.photos/seed/[UNIKALNY_NUMER]/800/400`
- HTML template styles in the `templateHTML` constant
- System prompt for OpenAI in the `systemPrompt` constant

### Error Handling
The program includes:
- Automatic encoding detection
- Polish characters conversion
- Multiple retry attempts for API calls
- Detailed error logging

---

## Polski

### Opis
Procesor Artykułów AI to aplikacja Node.js, która przekształca artykuły tekstowe na format HTML przy użyciu API OpenAI. Program dodaje odpowiednie obrazy, właściwie strukturyzuje treść i zapewnia poprawne kodowanie znaków specjalnych (w tym polskich znaków diakrytycznych).

### Funkcjonalności
- Konwertuje artykuły tekstowe na ustrukturyzowany HTML
- Automatycznie dodaje odpowiednie obrazy używając Lorem Picsum
- Poprawnie obsługuje polskie znaki diakrytyczne
- Tworzy trzy pliki wyjściowe:
    - `artykul.html` - przetworzona treść artykułu
    - `szablon.html` - pusty szablon ze stylami
    - `podglad.html` - kompletny podgląd ze stylami i treścią

### Wymagania
- Node.js (v14 lub wyższa)
- Klucz API OpenAI
- Menedżer pakietów npm

### Instalacja
1. Sklonuj repozytorium:
```bash
git clone https://github.com/Rafal-wq/Junior_AI_Developer.git
cd procesor-artykulow-ai
```

2. Zainstaluj zależności:
```bash
npm install openai iconv-lite
```

3. Ustaw swój klucz API OpenAI w kodzie:
```javascript
const openai = new OpenAI({
  apiKey: 'twój-klucz-api'
});
```

### Użytkowanie
1. Umieść swój artykuł w pliku `article.txt` (zalecane kodowanie UTF-8)

2. Uruchom program:
```bash
node index.js
```

3. Sprawdź wygenerowane pliki:
- `artykul.html` - zawiera przetworzoną treść artykułu
- `szablon.html` - plik szablonu do przyszłych artykułów
- `podglad.html` - plik kompletnego podglądu

### Konfiguracja
Możesz modyfikować następujące parametry w kodzie:
- Wymiary obrazków w URL: `https://picsum.photos/seed/[UNIKALNY_NUMER]/800/400`
- Style szablonu HTML w stałej `templateHTML`
- Prompt systemowy dla OpenAI w stałej `systemPrompt`

### Obsługa Błędów
Program zawiera:
- Automatyczne wykrywanie kodowania
- Konwersję polskich znaków
- Wielokrotne próby wywołań API
- Szczegółowe logowanie błędów

### Przykład Użycia
```javascript
// Przykład modyfikacji promptu systemowego
const systemPrompt = `Przekształć podany artykuł w kod HTML z następującymi wytycznymi:
1. Użyj odpowiednich tagów HTML do strukturyzacji treści
2. Wstaw unikalne obrazki w odpowiednich miejscach
3. Stwórz unikalny i szczegółowy opis każdego obrazka
...`;
```

## License / Licencja
MIT

## Author / Autor
[Rafal / Rafał]

## Contributing / Współpraca
Feel free to submit issues and pull requests / Zachęcamy do zgłaszania problemów i pull requestów