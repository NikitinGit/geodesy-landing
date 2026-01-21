# Исправление отображения портфолио

## Проблема
Фотографии в слайдере портфолио слишком большие (4-5 МБ) и не оптимизированы для веба.

## Решение

### Вариант 1: Оптимизация через ImageMagick (рекомендуется)

1. Установите ImageMagick:
```bash
sudo apt install imagemagick
```

2. Запустите скрипт оптимизации:
```bash
cd /home/igor/IdeaProjects/geodesy-landing
./optimize-images.sh
```

3. Переместите оптимизированные изображения:
```bash
mv images/portfolio/optimized/* images/portfolio/
rm -rf images/portfolio/optimized
```

4. Закоммитьте и запушьте изменения:
```bash
git add images/portfolio/
git commit -m "Optimize portfolio images"
git push
```

### Вариант 2: Оптимизация онлайн

1. Откройте https://squoosh.app/ или https://tinypng.com/

2. Загрузите изображения из `images/portfolio/`

3. Установите настройки:
   - Максимальная ширина: 1920px
   - Качество: 80-85%
   - Формат: JPEG или WebP

4. Скачайте и замените оригинальные файлы

5. Закоммитьте изменения

### Вариант 3: Использовать WebP формат

Если браузер поддерживает WebP (99% современных браузеров):

```bash
# Конвертация в WebP
for img in images/portfolio/*.jpg; do
    cwebp -q 85 "$img" -o "${img%.jpg}.webp"
done
```

Затем обновите HTML:
```html
<picture>
    <source srcset="images/portfolio/podkran.webp" type="image/webp">
    <img src="images/portfolio/podkran.jpg" alt="...">
</picture>
```

## Проверка результата

После оптимизации:
- Размер каждого файла должен быть < 500 КБ
- Общий размер страницы < 5 МБ
- Загрузка должна быть быстрой

Проверить можно здесь:
- https://developers.google.com/speed/pagespeed/insights/
- https://gtmetrix.com/

## CSS исправления

CSS уже обновлён с правильным `aspect-ratio` и `object-fit`.
Изменения автоматически применятся после push на GitHub.

## Текущие размеры файлов

```
podkran.jpg      - 4.6 MB ❌ (слишком большой)
podkran-2.jpg    - 5.6 MB ❌ (слишком большой)
podkran-3.jpg    - 5.1 MB ❌ (слишком большой)
osadki.jpg       - 135 KB ✅
razbivka.jpg     - 176 KB ✅
vynos-zu.jpg     - 369 KB ✅
```

**Нужно оптимизировать: podkran.jpg, podkran-2.jpg, podkran-3.jpg**

## Быстрое исправление (вручную)

Если не хотите использовать скрипты:

1. Откройте https://squoosh.app/
2. Загрузите `images/portfolio/podkran.jpg`
3. Resize: Width = 1920
4. Quality: 85%
5. Скачайте и замените файл
6. Повторите для `podkran-2.jpg` и `podkran-3.jpg`
7. Закоммитьте изменения

---

**После оптимизации слайдер будет работать корректно на всех устройствах!**
