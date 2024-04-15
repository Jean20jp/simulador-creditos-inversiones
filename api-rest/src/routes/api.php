<?php

require_once '../api-rest/src/controllers/UserController.php';
require_once '../api-rest/src/controllers/FinancialEntityController.php';
require_once '../api-rest/src/models/User.php';
include_once '../api-rest/src/config/constants.php';

require 'vendor/autoload.php';

function getUserController() {
    return new UserController();
}

function getFinancialEntityController() {
    return new FinancialEntityController();
}

// Recibe json con el email y contraseña
Flight::route('POST /login', function () {
    
    $data = Flight::request()->data; // Obtener los datos JSON del cuerpo de la solicitud

    if (isset($data['email']) && isset($data['password'])) {
        
        Flight::json(getUserController()->login($data['email'], $data['password']));

    } else {
        
        Flight::json(["error" => "Se requiere email y password"], BAD_REQUEST);
    }
});

// Recibe json con los datos del usuario a registrar
Flight::route('POST /registerUser', function () {

    $data = Flight::request()->data;

    if ($data != null) {
        // Crear modelo con el json recibido para enviar al controlador
        $user = new User(0, $data['id_rol'], $data['name'], $data['lastname'], 
                        $data['email'], $data['password']);

        Flight::json(getUserController()->registerUser($user));

    } else {

        Flight::json(["error" => "Se requiere todos los campos", BAD_REQUEST]);
    }   
});

Flight::route('GET /getUsers', function() {

    $headers = apache_request_headers(); // Obtener encabezado con el token authorization

    $response = getUserController()->getUsers($headers); // Obtener respuesta de la capa de datos

    if ($response["status"] == 'error' ) {  // Si el estado es error muestra el mensaje del error que se produjo 
        Flight::halt(FORBIDDEN, $response["error"]);
    } else {
        Flight::json($response); // Si el estado es OK devuelve la lista de usuarios
    }

});

Flight::route('POST /registerFinancialEntity', function() {

    $headers = apache_request_headers(); // Obtener encabezado con el token authorization

    $data = Flight::request()->data;

    if ($data != null) {
        // Crear modelo con el json recibido para enviar al controlador
        $entity = new FinancialEntity(0, $data['name'], $data['phone'], $data['address'], $data['logo']);
        Flight::json(getFinancialEntityController()->registerFinancialEntity($entity, $headers));

    } else {

        Flight::json(["error" => "Se requiere todos los campos", BAD_REQUEST]);
    }

});

Flight::route('GET /getFinancialEntity', function() {

    $headers = apache_request_headers(); // Obtener encabezado con el token authorization

    $response = getFinancialEntityController()->getFinancialEntities($headers); // Obtener respuesta de la capa de datos

    if ($response["status"] == 'error' ) {  // Si el estado es error muestra el mensaje del error que se produjo 
        Flight::halt(FORBIDDEN, $response["error"]);
    } else {
        Flight::json($response); // Si el estado es OK devuelve la lista de usuarios
    }
});






Flight::start(); 

?>