# Руководство по работе с изображениями

## Где добавлять изображения

Все изображения должны находиться в папке `images/`:

```
geodesy-landing/
└── images/
    ├── logo.png              # Логотип компании
    ├── hero-bg.jpg           # Фон для Hero секции
    ├── favicon.png           # Иконка сайта
    ├── services/             # Иконки услуг
    │   ├── survey.svg
    │   ├── construction.svg
    │   ├── monitoring.svg
    │   └── cadastral.svg
    └── process/              # Иконки процесса
        ├── step-1.svg
        ├── step-2.svg
        ├── step-3.svg
        └── step-4.svg
```

## Рекомендуемые размеры

- **Логотип**: 200x60px (PNG с прозрачностью)
- **Фон Hero**: 1920x1080px (JPEG, WebP)
- **Иконки услуг**: 60x60px (SVG предпочтительно)
- **Иконки процесса**: 50x50px (SVG)
- **Favicon**: 32x32px, 64x64px (PNG или ICO)

## Форматы изображений

### SVG (рекомендуется для иконок)
- ✅ Масштабируемые
- ✅ Малый размер
- ✅ Четкие на всех экранах

### WebP (рекомендуется для фото)
- ✅ Лучшее сжатие
- ✅ Поддержка прозрачности
- ⚠️ Нужен fallback для старых браузеров

### JPEG (для фотографий)
- ✅ Хорошее сжатие
- ❌ Нет прозрачности

### PNG (для графики с прозрачностью)
- ✅ Прозрачность
- ❌ Больший размер

## Как добавить изображения в HTML

### 1. Замените логотип

**Текущий код:**
```html
<div class="logo">
    <span class="logo__text">ГЕОДЕЗИЯ</span>
</div>
```

**С изображением:**
```html
<div class="logo">
    <img src="images/logo.png" alt="Геодезия" class="logo__img">
</div>
```

**Добавьте в CSS:**
```css
.logo__img {
    height: 40px;
    width: auto;
}
```

### 2. Добавьте фон для Hero секции

**В CSS (style.css):**
```css
.hero {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%),
                url('../images/hero-bg.jpg') center/cover no-repeat;
    padding: 120px 0;
    text-align: center;
    color: var(--text-light);
}
```

### 3. Замените SVG иконки на изображения

**Текущий код:**
```html
<div class="service-card__icon">
    <svg>...</svg>
</div>
```

**С изображением:**
```html
<div class="service-card__icon">
    <img src="images/services/survey.svg" alt="Геодезическая съемка">
</div>
```

### 4. Добавьте favicon

**В `<head>`:**
```html
<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">
```

## Оптимизация изображений

### Онлайн инструменты:

1. **TinyPNG** - https://tinypng.com/
   - Сжатие PNG и JPEG
   - До 70% уменьшение размера

2. **Squoosh** - https://squoosh.app/
   - Конвертация в WebP
   - Настройка качества

3. **SVGOMG** - https://jakearchibald.github.io/svgomg/
   - Оптимизация SVG
   - Удаление лишнего кода

### Командная строка:

```bash
# Установка ImageMagick
sudo apt install imagemagick

# Конвертация в WebP
convert input.jpg -quality 85 output.webp

# Изменение размера
convert input.jpg -resize 1920x1080 output.jpg

# Оптимизация PNG
optipng -o7 image.png
```

## Responsive изображения

### Picture элемент (с fallback):

```html
<picture>
    <source srcset="images/hero-bg.webp" type="image/webp">
    <source srcset="images/hero-bg.jpg" type="image/jpeg">
    <img src="images/hero-bg.jpg" alt="Геодезические работы">
</picture>
```

### Srcset для разных размеров экрана:

```html
<img
    src="images/hero-bg.jpg"
    srcset="images/hero-bg-480.jpg 480w,
            images/hero-bg-800.jpg 800w,
            images/hero-bg-1200.jpg 1200w,
            images/hero-bg-1920.jpg 1920w"
    sizes="100vw"
    alt="Геодезические работы"
>
```

## Lazy Loading

Для улучшения производительности добавьте ленивую загрузку:

```html
<img src="images/service.jpg" loading="lazy" alt="Описание">
```

## Где взять изображения

### Бесплатные ресурсы:

1. **Unsplash** - https://unsplash.com/
   - Высокое качество
   - Бесплатно для коммерческого использования

2. **Pexels** - https://www.pexels.com/
   - Фото и видео
   - Бесплатная лицензия

3. **Pixabay** - https://pixabay.com/
   - Фото, иллюстрации, векторы

4. **Flaticon** - https://www.flaticon.com/
   - Иконки (SVG, PNG)
   - Бесплатно с атрибуцией

### Для иконок:

1. **FontAwesome** - https://fontawesome.com/
2. **Material Icons** - https://fonts.google.com/icons
3. **Heroicons** - https://heroicons.com/
4. **Feather Icons** - https://feathericons.com/

## Генерация favicon

### Онлайн генераторы:

1. **Favicon.io** - https://favicon.io/
2. **RealFaviconGenerator** - https://realfavicongenerator.net/

Создайте полный набор:
- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png

## Пример полной интеграции

```html
<!-- В <head> -->
<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
<meta property="og:image" content="https://yourdomain.ru/images/og-image.jpg">

<!-- Hero секция с фоном -->
<section class="hero" style="background-image: url('images/hero-bg.jpg')">
    ...
</section>

<!-- Логотип -->
<div class="logo">
    <img src="images/logo.png" alt="Геодезия" class="logo__img">
</div>

<!-- Иконка услуги -->
<div class="service-card__icon">
    <img src="images/services/survey.svg" alt="Геодезическая съемка" width="60" height="60">
</div>
```

## Чек-лист перед публикацией

- [ ] Все изображения оптимизированы (сжаты)
- [ ] Добавлены alt-атрибуты для SEO
- [ ] Используется WebP с fallback для старых браузеров
- [ ] Добавлен favicon (все размеры)
- [ ] Большие изображения имеют loading="lazy"
- [ ] Проверена корректность путей к файлам
- [ ] Изображения адаптивны (responsive)

---

**Совет**: Начните с бесплатных стоковых изображений и иконок, затем замените их на уникальные по мере развития проекта.
