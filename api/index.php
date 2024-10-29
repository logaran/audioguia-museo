<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Manejar solicitudes OPTIONS para el preflight de CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit;
}


$dataFile = './data/guides/desnudos.json';
$guide = json_decode(file_get_contents($dataFile));

if ($guide === null) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al leer el archivo de guía.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'DELETE':
        $id = basename((parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));
        $controller = new GuideController();
        $result = $controller->deleteArtwork($id);

        if ($result) {
            http_response_code(204);
            echo json_encode(['message' => 'Obra eliminada con éxito']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Obra no encontrada']);
        }
        exit;
}
echo json_encode($guide);
