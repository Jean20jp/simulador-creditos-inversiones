<?php


// Modelo de usuario
class User {
    
    private $id_user;
    private $id_rol_per;
    private $name_user;
    private $lastname_user;
    private $email_user;
    private $passw_user;

    public function __construct($id_user, $id_rol_per, $name_user, $lastname_user, 
                                    $email_user, $passw_user) {
        
            $this->id_user = $id_user;
            $this->id_rol_per = $id_rol_per;
            $this->name_user = $name_user;
            $this->lastname_user = $lastname_user;
            $this->email_user = $email_user;
            $this->passw_user = $passw_user;

    }

    public function getIdUser() {
        return $this->id_user;
    }

    public function getIdRolPer() {
        return $this->id_rol_per;
    }

    public function getNameUser() {
        return $this->name_user;
    }

    public function getLastNameUser() {
        return $this->lastname_user;
    }

    public function getEmailUser() {
        return $this->email_user;
    }   

    public function getPasswUser() {
        return $this->passw_user;
    }
}


?>