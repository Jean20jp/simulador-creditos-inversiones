<?php

// Clase para retornar las consultas a la db
class Queries {

    public function queryLogin() {
        $query = "SELECT id_user, id_rol_per, name_user, lastname_user, email_user, passw_user 
                    FROM user WHERE email_user = :email LIMIT 0,1";

        return $query;
    }

    public function queryRegisterUser() {
        $query = "INSERT INTO user
                    SET id_rol_per = :id_rol,
                        name_user = :nameu,
                        lastname_user = :lastname,
                        email_user = :email,
                        passw_user = :passw";
        
        return $query;
    }

    public function queryGetUserById() {
        $query = "SELECT id_user, name_user, lastname_user, email_user
                    FROM user WHERE id_user = :id";
        
        return $query;
    }

    public function queryGetFinancialEntities() {
        $query = "SELECT id_entity, name_entity, phone_entity, address_entity, logo_entity
                    FROM financial_entity";
        return $query;
    }

    public function queryInsertFinancialEntity() {
        $query = "INSERT INTO financial_entity
                    SET name_entity = :nameent,
                        phone_entity = :phone,
                        address_entity = :addressent,
                        logo_entity = :logo";
        return $query;
    }

    public function queryGetTypesCredits() {
        $query = "SELECT id_credit, id_entity_per, name_credit, rate_credit
                    FROM type_credit";
        return $query;
    }

    public function queryInsertTypeCredit() {
        $query = "INSERT INTO type_credit
                    SET id_entity_per = :idEntPer,
                        name_credit = :nameCred,
                        rate_credit = :rateCred";
        return $query;             
    }

    public function queryInsertTypeInvestment() {
        $query = "INSERT INTO type_investment
                    SET id_entity_per = :idEntPer,
                        name_investment = :nameInvest
                        rate_investment = :rateInvest";
        return $query;             
    }

    public function queryGetTypesInvestments() {
        $query = "SELECT id_investment, id_entity_per, name_investment, rate_investment
                    FROM type_investment";
        return $query;
    }

}

?>