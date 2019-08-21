<?php

//get variables from html form
$uniqueid = $_GET['id'];
$email = $_GET['email'];
$fname = $_GET['fname'];
$lname = $_GET['lname'];
$time = $_GET['time'];
$date = $_GET['date'];
$phone = $_GET['phone'];
$hash =  mt_rand(10000000, 99999999);
$hashaddress = "mywebsite.com/mybookingpage.html?booking=" . $hash;

//connect to db
$con = mysqli_connect('localhost','username','password','db');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"db");

//update availability in terms of spots available and spots taken for this time on this date
$sql1="UPDATE availability SET spots_available = spots_available - 1 WHERE id = $uniqueid ";
$sql2="UPDATE availability SET spots_taken = spots_taken + 1 WHERE id = $uniqueid ";
$result = mysqli_query($con,$sql1);
$result = mysqli_query($con,$sql2);

//put row in bookings table
$sql="INSERT INTO bookings (id, date, time_section, first_name, last_name, phone, email, hash)
               VALUES ('','$date','$time','$fname','$lname','$phone','$email','$hash')";
$result = mysqli_query($con,$sql);

//get html email template
$template = file_get_contents('email/email.html');

//replace all the tags
$template = preg_replace('{FNAME}', $fname, $template);
$template = preg_replace('{LNAME}', $lname, $template);
$template = preg_replace('{DATE}', $date, $template);
$template = preg_replace('{TIME}', $time, $template);
$template = preg_replace('{EMAIL}', $email, $template);
$template = preg_replace('{PHONE}', $phone, $template);
$template = preg_replace('{HASH}', $hashaddress, $template);

use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';
$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->Host = 'host';
$mail->Port = port;
$mail->SMTPAuth = true;
$mail->Username = 'staff@mycompany.com';
$mail->Password = 'password';
$mail->setFrom('staff@mycompany.com', 'My Company');
$mail->addReplyTo('staff@mycompany.com', 'My Company');
$mail->addAddress($email, 'Customer');
$mail->Subject = 'Booking Confirmed';
$mail->msgHTML($template, __DIR__);
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}
?>