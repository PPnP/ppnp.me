<?php

function is_valid_email($email) 
{
    if (is_array($email) || is_numeric($email) || is_bool($email) || is_float($email) || is_file($email) || is_dir($email) || is_int($email)) {
        return false;
    } else {
        $email = trim(strtolower($email));

        if (filter_var($email, FILTER_VALIDATE_EMAIL) !== false) {
            return true;
        } else {
            $pattern = '/^(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){255,})(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){65,}@)(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22))(?:\\.(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-+[a-z0-9]+)*\\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-+[a-z0-9]+)*)|(?:\\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\\]))$/iD';
            return preg_match($pattern, $email) === 1;
        }
    }
}

function is_valid_phone($phone) {
    $phone_to_check = preg_replace('/[^0-9]/', '', $phone);
    return strlen($phone_to_check) >= 10 && strlen($phone_to_check) <= 15;
}

function error($message) {
    http_response_code(400);
    exit($message);
}

$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
$agreed = filter_var($_POST['agreed'], FILTER_VALIDATE_BOOLEAN);

if (empty($name)) {
    error("Не указано имя");
}

if (strlen($name) < 2) {
    error("Слишком короткое имя");
}

if (empty($email) && empty($phone)) {
    error("Не указан ни телефон, ни электронная почта");
}

if (!empty($email) && !is_valid_email($email)) {
	error("Неверная электронная почта");
}

if (!empty($phone) && !is_valid_phone($phone)) {
    error("Неверный номер телефона");
}

if (empty($message)) {
    error("Не указано сообщение");
}

if (count(explode(" ", $message)) < 5) {
    error("Сообщение слишком короткое");
}

if (!$agreed) {
    error("Не дано соглашение на обработку данных");
}

$to = "ppnpteam@gmail.com";
$subject = 'Заявка с сайта';
$from = $name . ' <' . $email . '>';
 
// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
 
// Create email headers
$headers .= 'From: '.$from."\r\n".
    'Reply-To: '.$from."\r\n" .
    'X-Mailer: PHP/' . phpversion();
 
// Compose a simple HTML email message
$body = '<html><body><p>';
$body .= $message . "</p><br><br>";
$body .= '<p><strong>Телефон:</strong> ' . $phone . '<br>';
$body .= '<strong>Соглашение:</strong> ' . ($agreed ? 'есть' : 'нет') . '</p>';
$body .= '</body></html>';
 
// Sending email
if(mail($to, $subject, $body, $headers)){
    exit('Отправлено');
} else{
    error('У нас что-то сломалось :(');
}