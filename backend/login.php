<?php
// Allow all origins (unsafe, but fine for your test frontend)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
include "db.php";

$email = $_POST['email'];
$password = $_POST['password'];

$result = $conn->query("SELECT id, email FROM staff_users WHERE email='$email' AND password='$password'");

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode([
        'staffToken' => md5(rand()),  // dummy token, just for frontend use
        'staffId'    => $user['id']
    ]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}
?>