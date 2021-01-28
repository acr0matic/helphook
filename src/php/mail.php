<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

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
  $mail->Username   = 'best-for-home-24'; // Логин на почте
  $mail->Password   = ''; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  $mail->setFrom('best-for-home-24@yandex.ru', 'Тестовая'); // от кого будет уходить письмо?

  // Получатель письма
  $mail->addAddress('main.acr0matic@gmail.com');

  // Переменные
  $name = $_POST['user_name'];
  $email = $_POST['user_email'];
  $form_type = $_POST['form_type'];

  if ($form_type == 'volunteer' || $form_type == 'help') {
    $age = $_POST['user_age'];
    $select = $_POST['user_select'];

    $content .= $age . $select;
  }


  if ($form_type == 'volunteer') {
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

    // Проверяем отравленность сообщения
    $mail->send();
  }

  if ($form_type == 'help') {
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
      <b>Как могу помочь: </b> $select
     </p>
    </html>
   ";

    // Отправка сообщения
    $mail->Subject = $title;
    $mail->Body = $body;

    // Проверяем отравленность сообщения
    $mail->send();
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

    // Проверяем отравленность сообщения
    $mail->send();
  }

  echo json_encode($content);
}
