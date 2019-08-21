<?php

$con = mysqli_connect('localhost','username','password','db');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"db");
$sql="SELECT * FROM bookings";
$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_array($result)) {
    echo "|";
    echo "'" . $row['id'] . "',";
    echo "'" . $row['date'] . "',";
    echo "'" . $row['time_section'] . "',";
    echo "'" . $row['first_name'] . "',";
    echo "'" . $row['last_name'] . "',";
    echo "'" . $row['email'] . "',";
    echo "'" . $row['phone'] . "'";
    echo "|";
}

mysqli_close($con);
?>