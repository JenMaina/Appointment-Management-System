<?php

$uniqueid = $_GET['id'];

$con = mysqli_connect('localhost','username','password','db');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"db");
$sql="DELETE FROM availability WHERE id = $uniqueid ";
$result = mysqli_query($con,$sql);

echo "Deleted Listing";

mysqli_close($con);
?>