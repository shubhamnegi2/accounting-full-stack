<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include "db.php";

$token = $_GET['token'];

$q = $conn->query("SELECT * FROM document_requests 
WHERE token='$token'");

echo json_encode($q->fetch_assoc());
?>