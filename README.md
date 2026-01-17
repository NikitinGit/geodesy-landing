# Лендинг геодезических услуг

Современный одностраничный сайт для компании, предоставляющей геодезические услуги. Разработан на чистом HTML, CSS и JavaScript.

## Особенности

- ✅ Адаптивный дизайн (Desktop, Tablet, Mobile)
- ✅ Плавная прокрутка и анимации
- ✅ Слайдер отзывов с автопрокруткой
- ✅ Форма обратной связи с валидацией
- ✅ Мобильное меню-бургер
- ✅ Современный дизайн с градиентами
- ✅ SEO-оптимизированная структура
- ✅ Чистый код без зависимостей

## Структура проекта

```
geodesy-landing/
├── index.html              # Главная страница
├── css/
│   ├── style.css          # Основные стили
│   └── responsive.css     # Адаптивные стили
├── js/
│   └── main.js           # JavaScript функционал
├── images/               # Изображения (добавьте свои)
├── fonts/                # Шрифты (опционально)
└── README.md            # Документация
```

## Запуск проекта

### Локальный запуск

1. **Простой способ** - откройте `index.html` в браузере

2. **С локальным сервером** (рекомендуется):

```bash
# Используя Python
python3 -m http.server 8000

# Используя Node.js (npx)
npx http-server -p 8000

# Используя PHP
php -S localhost:8000
```

Затем откройте в браузере: `http://localhost:8000`

## Секции сайта

1. **Header** - навигация с логотипом
2. **Hero** - главный экран с заголовком и CTA
3. **О нас** - информация о компании
4. **Услуги** - 4 основных категории услуг
5. **Процесс работы** - 4 этапа выполнения работ
6. **Прайс-лист** - таблица с ценами
7. **Контакты** - форма обратной связи и контактная информация
8. **Отзывы** - слайдер с отзывами клиентов
9. **Footer** - подвал с дополнительной информацией

## Настройка формы обратной связи

### Вариант 1: Email через PHP

Создайте файл `send-email.php`:

```php
<?php
header('Content-Type: application/json');

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = "your-email@example.com";
$subject = "Новая заявка с сайта";
$body = "Имя: $name\nТелефон: $phone\nEmail: $email\nСообщение: $message";

if (mail($to, $subject, $body)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
```

### Вариант 2: Используйте сервисы рассылок

- **Formspree** - https://formspree.io/
- **EmailJS** - https://www.emailjs.com/
- **SendGrid** - https://sendgrid.com/
- **Web3Forms** - https://web3forms.com/

### Вариант 3: Интеграция с Telegram Bot

```javascript
// Добавьте в js/main.js
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

async function sendToTelegram(data) {
    const message = `
🆕 Новая заявка!

👤 Имя: ${data.name}
📱 Телефон: ${data.phone}
📧 Email: ${data.email}
💬 Сообщение: ${data.message}
    `;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        })
    });
}
```

## Настройка SPF, DKIM, DMARC для email

Добавьте DNS записи в настройках вашего домена:

```
# SPF запись
TXT: "v=spf1 include:_spf.yourmailserver.com ~all"

# DKIM запись
TXT: "v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY"

# DMARC запись
TXT: "v=DMARC1; p=quarantine; rua=mailto:admin@yourdomain.ru"
```

## Оптимизация для продакшена

### 1. Минификация файлов

```bash
# CSS
npx clean-css-cli css/style.css -o css/style.min.css

# JavaScript
npx terser js/main.js -o js/main.min.js --compress --mangle
```

### 2. Оптимизация изображений

- Используйте WebP формат
- Сжимайте изображения через TinyPNG или Squoosh
- Используйте lazy loading для изображений

### 3. Добавьте favicon

```html
<link rel="icon" type="image/png" href="favicon.png">
```

## Хостинг

### Бесплатные варианты:
- **GitHub Pages** - https://pages.github.com/
- **Netlify** - https://www.netlify.com/
- **Vercel** - https://vercel.com/
- **Cloudflare Pages** - https://pages.cloudflare.com/

### Платные варианты:
- **Timeweb** - от 100₽/мес
- **Beget** - от 120₽/мес
- **Reg.ru** - от 150₽/мес

### Деплой на Netlify (пример):

```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Деплой
netlify deploy --prod
```

## Дополнительные возможности

### Добавить Google Analytics

```html
<!-- Вставьте перед </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Добавить Яндекс.Метрику

```html
<!-- Вставьте перед </head> -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(COUNTER_ID, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

## SEO оптимизация

### Мета-теги (уже добавлены в HTML):
- `<title>` - заголовок страницы
- `<meta name="description">` - описание
- `viewport` - для адаптивности

### Дополнительные мета-теги:

```html
<!-- Open Graph для соцсетей -->
<meta property="og:title" content="Геодезические услуги">
<meta property="og:description" content="Профессиональные геодезические работы">
<meta property="og:image" content="https://yourdomain.ru/og-image.jpg">
<meta property="og:url" content="https://yourdomain.ru">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Геодезические услуги">
<meta name="twitter:description" content="Профессиональные геодезические работы">
```

## Поддержка браузеров

- ✅ Chrome (последние 2 версии)
- ✅ Firefox (последние 2 версии)
- ✅ Safari (последние 2 версии)
- ✅ Edge (последние 2 версии)
- ✅ Мобильные браузеры (iOS Safari, Chrome Mobile)

## Лицензия

Свободное использование для личных и коммерческих проектов.

## Контакты

Если у вас есть вопросы или предложения, создайте issue в репозитории.

---

**Разработано на чистом HTML, CSS и JavaScript без фреймворков**
