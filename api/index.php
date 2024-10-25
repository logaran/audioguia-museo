<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

$dataFile = './data/guides/desnudos.json';
$guide = json_decode(file_get_contents($dataFile));

if ($guide === null) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al leer el archivo de guía.']);
    exit;
}
echo json_encode($guide);
