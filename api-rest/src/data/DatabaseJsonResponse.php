<?php

include_once 'DatabaseConexion.php';
include_once '../api-rest/src/config/EnvironmentVariables.php';
include_once '../api-rest/src/config/constants.php';
include_once 'Queries.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

// Clase para retornar los datos traidos de la db en json
class DatabaseJsonResponse
{

    private $conexion;
    private $svDatabase;
    private $sqlQueries;
    private $envVariables;

    public function __construct()
    {
        $this->conexion = DatabaseConexion::getInstance()->getConnection();
        $this->svDatabase = Flight::database(); // solicita el servicio de bd registrado en DatabaseConexion
        $this->sqlQueries = new Queries();
        $this->envVariables = new EnvironmentVariables();
    }

    // Función para iniciar sesión, recibe email y contraseña
    public function loginUser($email, $password)
    {
        $query = $this->svDatabase->prepare($this->sqlQueries->queryLogin()); // Obtiene y prepara la consulta declarada en la clase Queries
        $query->execute([":email" => $email]); // Ejecuta la consulta enviando el parametro necesario
        $rowCount = $query->rowCount();

        /* Si mi contador de filas obtenidas es diferente de cero verifico 
          si la contraseña recibida es la misma con la que esta en la db */
        if ($rowCount != 0) {
            $dataUser = $query->fetch();
            $passw_db = $dataUser['passw_user'];
            // Metodo password_verify descodifica la contraseña traida de la db y la compara con la recibida
            if (password_verify($password, $passw_db)) {

                $token = $this->buildToken($dataUser); // Prepara el token pasando el usuario($dataUser) 
                $jwt = JWT::encode($token, $this->envVariables->getKeyJwt(), $this->envVariables->getAlgJwt()); // Codifica el token 

                return array(
                    "message" => "Inicio de sesión satisfactorio.",
                    "token" => $jwt,
                    "status" => 'OK'
                );
                
            } else {
                return array(
                    "message" => 'Contraseña Incorrecta.',
                    "status" => 'error'
                );
            }
        }
    }

    // Función para registrar usuario, recibe el modelo user
    public function registerUser($user)
    {

        $query = $this->svDatabase->prepare($this->sqlQueries->queryRegisterUser());

        // Array de respuesta por defecto con estado de error
        $array = [
            "error" => "Error al registrar usuario.",
            "status" => "Error"
        ];

        $passw_hash = password_hash($user->getPasswUser(), PASSWORD_BCRYPT); // Encripta la contraseña

        $result = $query->execute([":id_rol" => $user->getIdRolPer(),
            ":nameu" => $user->getNameUser(), ":lastname" => $user->getLastNameUser(),
            ":email" => $user->getEmailUser(), ":passw" => $passw_hash
        ]);

        // Si el resultado es satisfactorio modifica el array de respuesta por mensaje satisfactorio
        if ($result) {

            $array = [
                "message" => 'Registro satisfactorio.',
                "status" => 'OK'
            ];
        }

        return $array;
    }

    // Construye y retorna el token con la información y el usuario($data) requeridos
    private function buildToken($dataUser)
    {

        return array(
            "iss" => ISS,
            "aud" => AUD,
            "iat" => IAT,
            "nbf" => NBF,
            "exp" => EXP,

            "user" => array(
                "id" => $dataUser['id_user'],
                "id_rol" => $dataUser['id_rol_per'],
                "name" => $dataUser['name_user'],
                "lastname" => $dataUser['lastname_user'],
            )
        );
    }

    // Función para obtener token y retornar decodeado
    private function getToken($headers)
    {
        if (isset($headers["Authorization"])) {
            $authorization = $headers["Authorization"];
            $authorizationArray = explode(" ", $authorization);

            // Verificar si el token está vacío después de dividirlo
            if (empty($authorizationArray[1])) {
                return array(
                    "error" => 'Unauthenticated request',
                    "status" => 'error'
                );
            }

            try {
                $token = $authorizationArray[1]; // Obtener token
                return array(
                    "data" => JWT::decode($token, new Key($this->envVariables->getKeyJwt(), $this->envVariables->getAlgJwt())),
                    "status" => 'OK'
                );
            } catch (\Throwable $th) {
                return array(
                    "error" => $th->getMessage(),
                    "status" => 'error'
                );
            }
        } else {
            return array(
                "error" => 'Unauthenticated request',
                "status" => 'error'
            );
        }
    }

    // Función para validar token 
    private function validateToken($headers)
    {
        $token = $this->getToken($headers);
        if ($token["status"] == 'OK') {
            $query = $this->svDatabase->prepare($this->sqlQueries->queryGetUserById());
            $data = $token["data"];
            $query->execute([":id" => $data->user->id]);
            if (!$query->fetchColumn()) {
                return array("status" => 'OK');
            }
        }
        return $token; // en caso de no ser valido retorna el array de error
    }

    
    /*
    ==============================================================================
    Servicios para el modelo de negocio del simulador de creditos e inversiones
    ==============================================================================
    */

    public function insertFinancialEntity($financialEntity, $headers) {

        if ($this->validateToken($headers)["status"] == "error") { // Validar token recibido (headers) para obtener data
            return array(
                "error" =>  $this->validateToken($headers)["error"],
                "status" => 'error'
            );
        }
        
        $query = $this->svDatabase->prepare($this->sqlQueries->queryInsertFinancialEntity());

        // Array de respuesta por defecto con estado de error
        $array = [
            "error" => "Error al registrar entidad financiera.",
            "status" => "Error"
        ];

        $result = $query->execute([":nameent" => $financialEntity->getNameEntity(),
            ":phone" => $financialEntity->getPhoneEntity(), ":addressent" => $financialEntity->getAddressEntity(),
            ":logo" => $financialEntity->getLogoEntity()
        ]);

        // Si el resultado es satisfactorio modifica el array de respuesta por mensaje satisfactorio
        if ($result) {

            $array = [
                "message" => 'Registro satisfactorio.',
                "status" => 'OK'
            ];
        }
        return $array;
    }

    public function getFinancialEntities($headers) {

        if ($this->validateToken($headers)["status"] == "error") { // Validar token recibido (headers) para obtener data
            return array(
                "error" =>  $this->validateToken($headers)["error"],
                "status" => 'error'
            );
        }

        $query = $this->svDatabase->prepare($this->sqlQueries->queryGetFinancialEntities());
        $query->execute();
        $data = $query->fetchAll();
        $entities = [];
        foreach ($data as $row) {
            $entities[] = [
                "id" => $row['id_entity'],
                "name" => $row['name_entity'],
                "phone" => $row['phone_entity'],
                "address" => $row['address_entity'],
                "logo" => $row['logo_entity']
            ];
        }

        return array(
            "total_entities" => $query->rowCount(),
            "entities" => $entities,
            "status" => 'OK'
        );
    }

    public function insertTypeCredit($typeCredit, $headers) {
        if ($this->validateToken($headers)["status"] == "error") { // Validar token recibido (headers) para obtener data
            return array(
                "error" =>  $this->validateToken($headers)["error"],
                "status" => 'error'
            );
        }
        
        $query = $this->svDatabase->prepare($this->sqlQueries->queryInsertTypeCredit());

        // Array de respuesta por defecto con estado de error
        $array = [
            "error" => "Error al registrar tipo de crédito.",
            "status" => "Error"
        ];

        $result = $query->execute([0, ":idEntPer" => $typeCredit->getIdEntity(),
            ":nameCred" => $typeCredit->getNameEnt(), ":rateCred" => $typeCredit->getRateEnt()]);

        // Si el resultado es satisfactorio modifica el array de respuesta por mensaje satisfactorio
        if ($result) {

            $array = [
                "message" => 'Registro satisfactorio.',
                "status" => 'OK'
            ];
        }
        return $array;
    }

    public function getTypesCredits($headers) {

        if ($this->validateToken($headers)["status"] == "error") { // Validar token recibido (headers) para obtener data
            return array(
                "error" =>  $this->validateToken($headers)["error"],
                "status" => 'error'
            );
        }

        $query = $this->svDatabase->prepare($this->sqlQueries->queryGetTypesCredits());
        $query->execute();
        $data = $query->fetchAll();
        $typesCredits = [];
        foreach ($data as $row) {
            $typesCredits[] = [
                "id_cred" => $row['id_credit'],
                "id_ent_per" => $row['id_entity_per'],
                "name_cred" => $row['name_credit'],
                "rate_cred" => $row['rate_credit']
            ];
        }

        return array(
            "total_credits" => $query->rowCount(),
            "types_credits" => $typesCredits,
            "status" => 'OK'
        );

    }



}

?>


