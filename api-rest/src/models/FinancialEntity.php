<?php

// Modelo Entidad financiera
class FinancialEntity {

    private $id_entity;
    private $name_entity;
    private $phone_entity;
    private $address_entity;
    /* private $logo_entity; */

    public function __construct($id, $name, $phone, $address/* , $logo */)
    {
        $this->id_entity = $id;
        $this->name_entity = $name;
        $this->phone_entity = $phone;
        $this->address_entity = $address;
        /* $this->logo_entity = $logo; */
    }

    public function getIdEntity() {
        return $this->id_entity;
    }

    public function getNameEntity() {
        return $this->name_entity;
    }

    public function getPhoneEntity() {
        return $this->phone_entity;
    }

    public function getAddressEntity() {
        return $this->address_entity;
    }

    /* public function getLogoEntity() {
        return $this->logo_entity;
    } */
}
?>