<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include "db.php";

$staff_id = $_GET['staff_id'];

$q = $conn->query("SELECT * FROM document_requests 
WHERE staff_id='$staff_id'");

$data = [];

while($row = $q->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data);
?>