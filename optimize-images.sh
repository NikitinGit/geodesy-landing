#!/bin/bash

# Скрипт для оптимизации изображений портфолио
# Требуется ImageMagick: sudo apt install imagemagick

PORTFOLIO_DIR="images/portfolio"

echo "🖼️  Оптимизация изображений портфолио..."
echo "=========================================="

# Проверка наличия convert
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick не установлен!"
    echo "Установите: sudo apt install imagemagick"
    exit 1
fi

# Создаём временную директорию
mkdir -p "${PORTFOLIO_DIR}/optimized"

# Оптимизируем каждое изображение
for img in "${PORTFOLIO_DIR}"/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        echo "📸 Обработка: $filename"

        # Изменяем размер до максимум 1920x1200 и сжимаем до 85% качества
        convert "$img" \
            -resize '1920x1200>' \
            -quality 85 \
            -strip \
            "${PORTFOLIO_DIR}/optimized/$filename"

        # Показываем размеры
        original_size=$(du -h "$img" | cut -f1)
        optimized_size=$(du -h "${PORTFOLIO_DIR}/optimized/$filename" | cut -f1)
        echo "   До:  $original_size"
        echo "   После: $optimized_size"
        echo ""
    fi
done

echo "=========================================="
echo "✅ Готово! Оптимизированные изображения в:"
echo "   ${PORTFOLIO_DIR}/optimized/"
echo ""
echo "Чтобы использовать их, выполните:"
echo "   mv ${PORTFOLIO_DIR}/optimized/* ${PORTFOLIO_DIR}/"
echo "   rm -rf ${PORTFOLIO_DIR}/optimized"
