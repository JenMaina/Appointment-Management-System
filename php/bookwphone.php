<?php

$uniqueid = $_GET['id'];
$phone = $_GET['phone'];
$time = $_GET['time'];
$date = $_GET['date'];

$con = mysqli_connect('localhost','username','password','db');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"db");
$sql="DELETE FROM availability WHERE id = $uniqueid ";
$result = mysqli_query($con,$sql);

echo "Booking Confirmed!";

mail($phone . "@txt.att.net","Your Reservation","This is a reminder that you have a confirmed appointment at " . $time . " on " . $date . ".","From: reservations@mycompany.com\r\nReply-To: reservations@mycompany.com\r\nX-Mailer: PHP/".phpversion(),"-f reservations@glowtique.com");

mysqli_close($con);
?>