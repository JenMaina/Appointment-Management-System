<?php

//get variables from html form
$hash = $_GET['booking'];

//connect to db
$con = mysqli_connect('localhost','username','password','db');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"db");

$sql="SELECT * FROM bookings WHERE hash = $hash ";
$result = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($result)) {
    $date = $row['date'];
    $time = $row['time_section'];
}

echo $hash;
echo $date;
echo $time;

//delete booking by hash
$sql1="DELETE FROM bookings WHERE hash = $hash ";
$result = mysqli_query($con,$sql1);
$sql2="UPDATE availability SET spots_available = spots_available + 1 WHERE date = ('$date') AND time_section = ('$time')";
$sql3="UPDATE availability SET spots_taken = spots_taken - 1 WHERE date = ('$date') AND time_section = ('$time')";
$result = mysqli_query($con,$sql2);
$result = mysqli_query($con,$sql3);

?>