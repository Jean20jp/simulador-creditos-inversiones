<?php
// Permite solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permite los métodos de solicitud GET, POST, PUT, DELETE, OPTIONS
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Permite los encabezados personalizados y los encabezados básicos
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Termina el script si la solicitud es OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}

require_once '../api-rest/src/controllers/UserController.php';
require_once '../api-rest/src/controllers/FinancialEntityController.php';
require_once '../api-rest/src/controllers/TypeCreditController.php';
require_once '../api-rest/src/controllers/TypeInvestmentController.php';
require_once '../api-rest/src/models/User.php';
require_once '../api-rest/src/models/FinancialEntity.php';
require_once '../api-rest/src/models/TypeCredit.php';
require_once '../api-rest/src/models/TypeInvestment.php';
include_once '../api-rest/src/config/constants.php';

require 'vendor/autoload.php';

function getUserController() {
    return new UserController();
}

function getFinancialEntityController() {
    return new FinancialEntityController();
}

function getTypeCreditController() {
    return new TypeCreditController();
}

function getTypeInvestmentController() {
    return new TypeInvestmentController();
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

    $headers = apache_request_headers();
    $data = Flight::request()->data;

    if ($data != null) {
        // Crear modelo con el json recibido para enviar al controlador
        $user = new User(0, $data['id_rol'], $data['name'], $data['lastname'], 
                        $data['email'], $data['password']);

        Flight::json(getUserController()->registerUser($user, $headers));

    } else {

        Flight::json(["error" => "Se requiere todos los campos", BAD_REQUEST]);
    }   
});

Flight::route('POST /registerFinancialEntity', function() {

    $headers = apache_request_headers(); // Obtener encabezado con el token authorization

    $data = Flight::request()->data;

    if ($data != null) {
        // Crear modelo con el json recibido para enviar al controlador
        $entity = new FinancialEntity(0, $data['name'], $data['phone'], $data['address']/* , $data['logo'] */);
        Flight::json(getFinancialEntityController()->registerFinancialEntity($entity, $headers));

    } else {

        Flight::json(["error" => "Se requiere todos los campos", BAD_REQUEST]);
    }

});

Flight::route('GET /getFinancialEntity', function() {

    // Obtener respuesta de la capa de datos por medio del controlador
    $response = getFinancialEntityController()->getFinancialEntities(); 

    if ($response["status"] == 'error' ) {  // Si el estado es error muestra el mensaje del error que se produjo 
        Flight::halt(FORBIDDEN, $response["error"]);
    } else {
        
        //Flight::json($response); // Si el estado es OK devuelve el json
        echo json_encode($response);
    }
});

Flight::route('POST /registerTypeCredit', function() {

    $headers = apache_request_headers(); // Obtener encabezado con el token authorization

    $data = Flight::request()->data;

    if ($data != null) {
        // Crear modelo con el json recibido para enviar al controlador
        $typeCredit = new TypeCredit(0, $data['id_ent_per'], $data['name_cred'], $data['rate_cred']);
        Flight::json(getTypeCreditController()->registerTypeCredit($typeCredit, $headers));

    } else {

        Flight::json(["error" => "Se requiere todos los campos", BAD_REQUEST]);
    }
});

Flight::route('GET /getTypesCredits', function() {

    $headers = apache_request_headers(); // Obtener encabezado con el token authorization

    $response = getTypeCreditController()->getTypesCredits($headers); // Obtener respuesta de la capa de datos

    if ($response["status"] == 'error' ) {  // Si el estado es error muestra el mensaje del error que se produjo 
        Flight::halt(FORBIDDEN, $response["error"]);
    } else {
        Flight::json($response); // Si el estado es OK devuelve el json
    }
});

Flight::route('GET /getTypesInvestments', function() {

    $headers = apache_request_headers(); // Obtener encabezado con el token authorization

    $response = getTypeInvestmentController()->getTypesInvestments($headers); // Obtener respuesta de la capa de datos

    if ($response["status"] == 'error' ) {  // Si el estado es error muestra el mensaje del error que se produjo 
        Flight::halt(FORBIDDEN, $response["error"]);
    } else {
        Flight::json($response); // Si el estado es OK devuelve el json
    }
});

Flight::route('POST /registerTypeInvestment', function() {

    $headers = apache_request_headers(); // Obtener encabezado con el token authorization

    $data = Flight::request()->data;

    if ($data != null) {
        // Crear modelo con el json recibido para enviar al controlador
        $typeInvestment = new TypeInvestment(0, $data['id_ent_per'], $data['name_invest'], $data['rate_invest']);
        Flight::json(getTypeInvestmentController()->registerTypeInvestment($typeInvestment, $headers));

    } else {

        Flight::json(["error" => "Se requiere todos los campos", BAD_REQUEST]);
    }
});

Flight::start(); 

?>