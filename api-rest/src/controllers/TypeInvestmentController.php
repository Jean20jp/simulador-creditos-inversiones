<?php 

require_once '../api-rest/src/data/DatabaseJsonResponse.php';

class TypeInvestmentController {

    private $dbJsonResponse;

    public function __construct() {

        $this->dbJsonResponse = new DatabaseJsonResponse();
    }

    public function getTypesInvestments($id_entity) {

        return $this->dbJsonResponse->getTypesInvestments($id_entity); 
    }

    public function registerTypeInvestment($typeInvestment, $headers) {

        return $this->dbJsonResponse->insertTypeInvestment($typeInvestment, $headers);
    }

}

?>