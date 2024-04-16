<?php 

require_once '../api-rest/src/data/DatabaseJsonResponse.php';

class TypeInvestmentController {

    private $dbJsonResponse;

    public function __construct() {

        $this->dbJsonResponse = new DatabaseJsonResponse();
    }

    public function getTypesInvestments($headers) {

        return $this->dbJsonResponse->getTypesInvestments($headers); 
    }

    public function registerTypeInvestment($typeInvestment, $headers) {

        return $this->dbJsonResponse->insertTypeInvestment($typeInvestment, $headers);
    }

}

?>