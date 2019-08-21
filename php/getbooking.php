<?php

//get variables from html form
$hash = $_GET['booking'];

//connect to db
$con = mysqli_connect('localhost','username','password','db');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"u214074043_glotq");

//get booking by hash
$sql1="SELECT * from bookings where hash = $hash ";
$result = mysqli_query($con,$sql1);

while($row = mysqli_fetch_array($result)) {
    echo $row['id'] . ",";
    echo $row['date'] . ",";
    echo $row['time_section'] . ",";
    echo $row['first_name'] . ",";
    echo $row['last_name'] . ",";
    echo $row['phone'] . ",";
    echo $row['email'];
}

?>