const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');
const iconv = require('iconv-lite');

const openai = new OpenAI({
    apiKey: 'twój-klucz-openAi',
});

const ARTICLE_PATH = path.join(__dirname, 'article.txt');
const OUTPUT_ARTICLE_PATH = path.join(__dirname, 'artykul.html');
const OUTPUT_TEMPLATE_PATH = path.join(__dirname, 'szablon.html');
const OUTPUT_PREVIEW_PATH = path.join(__dirname, 'podglad.html');

async function readFileWithEncoding(filePath) {
    const buffer = await fs.readFile(filePath);

    const encodings = ['utf8', 'win1250', 'iso-8859-2'];
    let content = '';

    for (const encoding of encodings) {
        try {
            content = iconv.decode(buffer, encoding);
            if (!content.includes('�')) {
                console.log(`Poprawne kodowanie: ${encoding}`);
                return content;
            }
        } catch (e) {
            console.log(`Próba kodowania ${encoding} nie powiodła się`);
        }
    }

    content = iconv.decode(buffer, 'utf8');

    const polishChars = {
        'Ä…': 'ą',
        'Ä™': 'ę',
        'Å›': 'ś',
        'Ä‡': 'ć',
        'Å¼': 'ż',
        'Åº': 'ź',
        'Å„': 'ń',
        'Ă³': 'ó',
        'Å‚': 'ł',
        'Ä„': 'Ą',
        'Ä˜': 'Ę',
        'Åš': 'Ś',
        'Ä†': 'Ć',
        'Å»': 'Ż',
        'Åą': 'Ź',
        'Å„': 'Ń',
        'Ă"': 'Ó',
        'Å': 'Ł',
        'wpĹ': 'wpł'
    };

    Object.entries(polishChars).forEach(([incorrect, correct]) => {
        content = content.replace(new RegExp(incorrect, 'g'), correct);
    });

    return content;
}

const systemPrompt = `Przekształć podany artykuł w kod HTML spełniający następujące wytyczne:
1. Użyj odpowiednich tagów HTML do strukturyzacji treści (h1, h2, p, article, section)
2. Wstaw unikalne obrazki w odpowiednich miejscach używając tego wzoru:
   <figure>
     <img src="https://picsum.photos/seed/[UNIKALNY_NUMER]/800/400" alt="[OPIS]">
     <figcaption>[OPIS]</figcaption>
   </figure>
3. Dla każdego obrazka użyj innego [UNIKALNY_NUMER] (np. 1, 2, 3, itd.)
4. Stwórz unikalny i szczegółowy opis każdego obrazka
5. Zwróć treść w kodowaniu UTF-8`;

async function processArticle() {
    try {
        console.log('Rozpoczynam przetwarzanie artykułu...');

        const articleContent = await readFileWithEncoding(ARTICLE_PATH);
        console.log('Pomyślnie odczytano artykuł');

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: articleContent }
            ],
            temperature: 0.7,
        });

        let htmlContent = completion.choices[0].message.content;

        const templateHTML = `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Artykuł AI</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2 {
            color: #333;
        }
        figure {
            margin: 20px 0;
            text-align: center;
        }
        img {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        figcaption {
            font-style: italic;
            color: #666;
            margin-top: 10px;
            padding: 0 20px;
        }
    </style>
</head>
<body>
${htmlContent}
</body>
</html>`;

        const writeOptions = { encoding: 'utf8' };
        const BOM = '\ufeff'; // Dodanie BOM na początku pliku

        await fs.writeFile(OUTPUT_ARTICLE_PATH, BOM + htmlContent, writeOptions);
        await fs.writeFile(OUTPUT_TEMPLATE_PATH, BOM + templateHTML.replace(htmlContent, '<!-- Tutaj wklej zawartość artykułu -->'), writeOptions);
        await fs.writeFile(OUTPUT_PREVIEW_PATH, BOM + templateHTML, writeOptions);

        console.log('Wszystkie pliki zostały wygenerowane pomyślnie!');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

processArticle();