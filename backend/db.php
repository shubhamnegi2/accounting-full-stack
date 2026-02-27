<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
$conn = new mysqli("localhost","root","","accounting");

if($conn->connect_error){
    die("DB Failed");
}
?>