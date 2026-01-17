#!/bin/bash

# Скрипт для быстрого запуска локального сервера

echo "=========================================="
echo "  Запуск локального сервера"
echo "=========================================="
echo ""

PORT=8000

# Проверяем, какой инструмент доступен
if command -v python3 &> /dev/null; then
    echo "✓ Используем Python 3"
    echo "🌐 Сервер запущен на: http://localhost:$PORT"
    echo "📂 Откройте в браузере: http://localhost:$PORT"
    echo ""
    echo "Нажмите Ctrl+C для остановки сервера"
    echo ""
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "✓ Используем Python 2"
    echo "🌐 Сервер запущен на: http://localhost:$PORT"
    echo "📂 Откройте в браузере: http://localhost:$PORT"
    echo ""
    echo "Нажмите Ctrl+C для остановки сервера"
    echo ""
    python -m SimpleHTTPServer $PORT
elif command -v php &> /dev/null; then
    echo "✓ Используем PHP"
    echo "🌐 Сервер запущен на: http://localhost:$PORT"
    echo "📂 Откройте в браузере: http://localhost:$PORT"
    echo ""
    echo "Нажмите Ctrl+C для остановки сервера"
    echo ""
    php -S localhost:$PORT
elif command -v npx &> /dev/null; then
    echo "✓ Используем Node.js (npx http-server)"
    echo "🌐 Сервер запущен на: http://localhost:$PORT"
    echo "📂 Откройте в браузере: http://localhost:$PORT"
    echo ""
    echo "Нажмите Ctrl+C для остановки сервера"
    echo ""
    npx http-server -p $PORT
else
    echo "❌ Ошибка: Не найден Python, PHP или Node.js"
    echo ""
    echo "Установите один из следующих инструментов:"
    echo "  - Python 3: sudo apt install python3"
    echo "  - PHP: sudo apt install php"
    echo "  - Node.js: sudo apt install nodejs npm"
    echo ""
    echo "Или просто откройте index.html в браузере."
    exit 1
fi
