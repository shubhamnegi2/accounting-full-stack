<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
include "db.php"; // $conn

if(!isset($_POST['token'])) {
    echo json_encode(["error" => "Token missing"]);
    exit;
}

$token = $_POST['token'];

// 1️⃣ request_id get kare token se
$res = $conn->query("SELECT id FROM document_requests WHERE token='$token' LIMIT 1");
if($res->num_rows == 0) {
    echo json_encode(["error" => "Invalid token"]);
    exit;
}
$request = $res->fetch_assoc();
$request_id = $request['id'];

// 2️⃣ Loop through uploaded files
$uploaded_files = [];
foreach($_FILES as $fileField => $file) {
    if($file['error'] === 0 && $file['size'] <= 2 * 1024 * 1024) { // max 2MB
        $allowed = ['pdf','png','jpg','jpeg','gif','webp'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if(!in_array($ext, $allowed)) continue;

        $newName = uniqid() . "." . $ext;
        move_uploaded_file($file['tmp_name'], "uploads/$newName");

        // save in DB
        $stmt = $conn->prepare("INSERT INTO uploaded_files (request_id, file_name, uploaded_at) VALUES (?, ?, NOW())");
        $stmt->bind_param("is", $request_id, $newName);
        $stmt->execute();
        $stmt->close();

        $uploaded_files[] = $newName;
    }
}

// 3️⃣ Update request status
if(count($uploaded_files) > 0){
    $conn->query("UPDATE document_requests SET status='Completed' WHERE id=$request_id");
}

echo json_encode(["uploaded" => $uploaded_files]);
?>