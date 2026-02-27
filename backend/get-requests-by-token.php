<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include "db.php";

$staffToken = $_GET['staffToken'];

$q = $conn->query("SELECT * FROM document_requests 
WHERE token='$staffToken'");

$data = [];

while($row = $q->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data);
?>