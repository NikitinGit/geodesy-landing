<?php
/**
 * Обработчик формы обратной связи
 *
 * Использование:
 * 1. Замените YOUR_EMAIL на ваш реальный email
 * 2. Раскомментируйте код отправки в js/main.js
 * 3. Загрузите файл на хостинг с поддержкой PHP
 */

// Настройки
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Email получателя
$to_email = "YOUR_EMAIL@example.com"; // ЗАМЕНИТЕ НА ВАШ EMAIL

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Получаем данные из формы
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';

// Валидация
$errors = [];

if (empty($phone)) {
    $errors[] = 'Телефон обязателен для заполнения';
}

if (strlen($phone) < 10) {
    $errors[] = 'Некорректный номер телефона';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Защита от XSS
$phone = htmlspecialchars($phone);

// Формируем письмо
$subject = "Новая заявка с сайта Геодезия";

$email_body = "
Новая заявка с сайта!

Телефон: $phone

---
Отправлено: " . date('d.m.Y H:i:s');

// Заголовки письма
$headers = "From: noreply@yourdomain.ru\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Отправка письма
$mail_sent = mail($to_email, $subject, $email_body, $headers);

if ($mail_sent) {
    // Успешная отправка
    echo json_encode([
        'success' => true,
        'message' => 'Спасибо! Ваше сообщение отправлено.'
    ]);

    // Логирование (опционально)
    $log_file = 'contact-logs.txt';
    $log_entry = date('[Y-m-d H:i:s]') . " - Заявка с номером $phone\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND);

} else {
    // Ошибка отправки
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка при отправке. Попробуйте позже.'
    ]);
}
?>
