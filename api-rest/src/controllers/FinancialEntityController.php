<?php

require_once '../api-rest/src/data/DatabaseJsonResponse.php';

class FinancialEntityController {

    private $dbJsonResponse;

    public function __construct() {

        $this->dbJsonResponse = new DatabaseJsonResponse();
    }

    public function registerFinancialEntity($financialEntity, $headers) {
        
        return $this->dbJsonResponse->insertFinancialEntity($financialEntity, $headers); 
    }

    public function getFinancialEntities($headers) {

        return $this->dbJsonResponse->getFinancialEntities($headers);
    }
}
?>