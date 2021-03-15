<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Проверяем отравленность сообщения
function SendMail($mail, &$status)
{
  if ($mail->send())
    $status = "Сообщение успешно отправлено";
  else
    $status =  "Сообщение не было отправлено. Причина ошибки: " . $mail->ErrorInfo;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {


  // Настройки PHPMailer
  $mail = new PHPMailer\PHPMailer\PHPMailer();

  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;
  $mail->isHTML(true);
  $mail->Debugoutput = function ($str, $level) {
    $GLOBALS['status'][] = $str;
  };

  // Настройки вашей почты
  $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
  $mail->Username   = 'info@hookhelp.ru'; // Логин на почте
  $mail->Password   = 'appleJack22@'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  $mail->setFrom('info@hookhelp.ru', 'Кручок помощи'); // от кого будет уходить письмо?

  // Получатель письма
  $mail->addAddress('hookhelp@yandex.ru');

  // Переменные
  $name = $_POST['user_name'];
  $email = $_POST['user_email'];
  $form_type = $_POST['form_type'];
  $status = '';

  if ($form_type == 'volunteer') {
    $age = $_POST['user_age'];
    $select = $_POST['user_select'];

    // Формирование содержимого письма
    $title = "Поступила заявка 'Стать волонтером'";
    $body =
      "
    <html>
     <p>
      Контактная информация: <br> <br>
      <b>Имя: </b> $name <br>
      <b>Почта: </b> <a href='mailto: $email'> $email </a> <br>
      <b>Возраст: </b> $age <br>
      <b>Занятость: </b> $select
     </p>
    </html>
   ";

    // Отправка сообщения
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail_info;

    SendMail($mail, $status);
  }

  if ($form_type == 'help') {
    $age = $_POST['user_age'];
    $help = $_POST['user_help'];

    // Формирование содержимого письма
    $title = "Поступила заявка 'Любая помощь'";
    $body =
      "
    <html>
     <p>
      Контактная информация: <br> <br>
      <b>Имя: </b> $name <br>
      <b>Почта: </b> <a href='mailto: $email'> $email </a> <br>
      <b>Возраст: </b> $age <br>
      <b>Как могу помочь: </b> $help
     </p>
    </html>
   ";

    // Отправка сообщения
    $mail->Subject = $title;
    $mail->Body = $body;

    SendMail($mail, $status);
  }

  if ($form_type == 'question') {
    $message = $_POST['user_question'];

    // Формирование содержимого письма
    $title = "Поступил вопрос";
    $body =
      "
    <html>
     <p>
      Контактная информация: <br> <br>
      <b>Имя: </b> $name <br>
      <b>Почта: </b> <a href='mailto: $email'> $email </a> <br>
      <b>Вопрос: </b> $message
     </p>
    </html>
   ";

    // Отправка сообщения
    $mail->Subject = $title;
    $mail->Body = $body;

    SendMail($mail, $status);
  }

  echo json_encode($status);
}
