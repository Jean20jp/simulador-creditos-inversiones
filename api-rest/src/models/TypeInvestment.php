<?php

class TypeInvestment {

    private $idInvest;
    private $idEntPer;
    private $nameInvest;
    private $rateInvest;

    public function __construct($idInvest, $idEntPer, $nameInvest, $rateInvest)
    {
        $this->idInvest = $idInvest;
        $this->idEntPer = $idEntPer;
        $this->nameInvest = $nameInvest;
        $this->rateInvest = $rateInvest;
    }

    public function getIdInvest() {
        return $this->idInvest;
    }

    public function getIdEntPer() {
        return $this->idEntPer;
    }

    public function getNameInvest() {
        return $this->nameInvest;
    }

    public function getRateInvest() {
        return $this->rateInvest;
    }
}

?>