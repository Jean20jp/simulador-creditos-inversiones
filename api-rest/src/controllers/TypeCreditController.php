<?php

require_once '../api-rest/src/data/DatabaseJsonResponse.php';

class TypeCreditController {

    private $dbJsonResponse;

    public function __construct() {

        $this->dbJsonResponse = new DatabaseJsonResponse();
    }

    public function getTypesCredits($id_entity) {

        return $this->dbJsonResponse->getTypesCredits($id_entity); 
    }

    public function registerTypeCredit($typeCredit, $headers) {

        return $this->dbJsonResponse->insertTypeCredit($typeCredit, $headers);
    }

}

?>