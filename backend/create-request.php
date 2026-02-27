<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include "db.php";

$staff_id = $_POST['staff_id'];
$client_name = $_POST['client_name'];
$client_email = $_POST['client_email'];
$title = $_POST['title'];
$description = $_POST['description'];
$due_date = $_POST['due_date'];
$requested_docs = isset($_POST['requested_docs']) ? json_encode($_POST['requested_docs']) : '[]';

$token = md5(rand());

$conn->query("INSERT INTO document_requests
(staff_id, client_name, client_email, title, description, due_date, requested_docs, token)
VALUES
('$staff_id','$client_name','$client_email','$title','$description','$due_date','$requested_docs','$token')");


echo json_encode(["token"=>$token]);
?>