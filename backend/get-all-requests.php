<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");
include "db.php";

// Get staff_id from query parameter
$staff_id = isset($_GET['staff_id']) ? (int)$_GET['staff_id'] : 0;

// Pagination parameters
$limit = 10; // records per page
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
if($page < 1) $page = 1;
$offset = ($page - 1) * $limit;

// Count total records for this staff
$countResult = $conn->query("SELECT COUNT(*) as total FROM document_requests WHERE staff_id='$staff_id'");
$totalRecords = $countResult->fetch_assoc()['total'];
$totalPages = ceil($totalRecords / $limit);

// Fetch records for this staff, alphabetically by client_name
$q = $conn->query("SELECT * FROM document_requests WHERE staff_id='$staff_id' ORDER BY client_name ASC LIMIT $limit OFFSET $offset");

$data = [];
while($row = $q->fetch_assoc()){
    $data[] = $row;
}

// Output JSON with pagination info
echo json_encode([
    "currentPage" => $page,
    "totalPages" => $totalPages,
    "limit" => $limit,
    "totalRecords" => $totalRecords,
    "data" => $data
]);
?>