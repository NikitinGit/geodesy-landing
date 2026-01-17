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
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Валидация
$errors = [];

if (empty($name)) {
    $errors[] = 'Имя обязательно для заполнения';
}

if (empty($phone)) {
    $errors[] = 'Телефон обязателен для заполнения';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Некорректный email адрес';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Защита от XSS
$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);
$email = htmlspecialchars($email);
$message = htmlspecialchars($message);

// Формируем письмо
$subject = "Новая заявка с сайта Геодезия";

$email_body = "
Новая заявка с сайта!

Имя: $name
Телефон: $phone
Email: $email
Сообщение: $message

---
Отправлено: " . date('d.m.Y H:i:s');

// Заголовки письма
$headers = "From: noreply@yourdomain.ru\r\n";
$headers .= "Reply-To: $email\r\n";
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
    $log_entry = date('[Y-m-d H:i:s]') . " - Заявка от $name ($email)\n";
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
