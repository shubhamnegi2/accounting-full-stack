<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// tumhara logic
include "db.php";

// File size limit 2MB
$maxSize = 2 * 1024 * 1024;

// Allowed MIME types
$allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp"
];

$token = $_POST['token'] ?? null;

if (!$token) {
    http_response_code(400);
    echo json_encode(["error" => "Token is required"]);
    exit;
}

// Get request id from token
$q = $conn->query("SELECT id FROM document_requests WHERE token='$token'");
if ($q->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["error" => "Invalid token"]);
    exit;
}

$request = $q->fetch_assoc();
$request_id = $request['id'];

if (!isset($_FILES['files'])) {
    http_response_code(400);
    echo json_encode(["error" => "No files uploaded"]);
    exit;
}

$files = $_FILES['files'];
$uploadedFiles = [];
$errors = [];

for ($i = 0; $i < count($files['name']); $i++) {
    $name = $files['name'][$i];
    $tmpName = $files['tmp_name'][$i];
    $size = $files['size'][$i];
    $type = $files['type'][$i];

    if ($size > $maxSize) {
        $errors[] = "$name exceeds 2MB size limit";
        continue;
    }

    if (!in_array($type, $allowedTypes)) {
        $errors[] = "$name is not a valid file type";
        continue;
    }

    $uploadDir = __DIR__ . "/uploads/";
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

    $uniqueName = time() . "_" . basename($name);
    $destination = $uploadDir . $uniqueName;

    if (move_uploaded_file($tmpName, $destination)) {
        $uploadedFiles[] = $uniqueName;

        // Insert into uploaded_files table
        $stmt = $conn->prepare("INSERT INTO uploaded_files (request_id, file_name, uploaded_at) VALUES (?, ?, NOW())");
        $stmt->bind_param("is", $request_id, $uniqueName);
        $stmt->execute();
        $stmt->close();
    } else {
        $errors[] = "Failed to upload $name";
    }
}

// Update request status if all files uploaded
if (count($errors) === 0) {
    $conn->query("UPDATE document_requests SET status='Completed' WHERE id=$request_id");
}

echo json_encode([
    "uploaded_files" => $uploadedFiles,
    "errors" => $errors
]);
?>