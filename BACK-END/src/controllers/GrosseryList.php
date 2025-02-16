<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\GosseryListModel;
use App\Services\FormControl;

class GrosseryList extends Controller
{
    protected object $grosseryListModel;
    public $formControl;

    public function __construct($param)
    {
        $this->grosseryListModel = new GosseryListModel();

        parent::__construct($param);
    }

    public function postGrosseryList()
    {
        $this->formControl = new FormControl();

        if (in_array('add', $this->params)) {
            $cleanBody = $this->formControl->sanitizeInput($this->body);

            if (in_array(false, $cleanBody)) {

                header("HTTP/1.0 406 Not Acceptable");
                return ['message' => 'Erreur veuillez remplir tous les champs'];
            }

            $created_at = date('Y-m-d H:i:s');
            $this->grosseryListModel->add($cleanBody['title'], $cleanBody['date'], $created_at);

            header("HTTP/1.0 200 OK");
            return ['message' => 'List de course crée avec succès'];

        }

    }

    public function getGrosseryList()
    {
        return $this->grosseryListModel->getAll();
    }

    public function putGrosseryList() {
        $this->formControl = new FormControl();
        $cleanBody = $this->formControl->sanitizeInput($this->body);
        return $this->grosseryListModel->update($cleanBody['id'], $cleanBody['title'], $cleanBody['date']);

    }

    public function deleteGrosseryList()
    {
        $this->grosseryListModel->delete(intval($this->body['id']));

        header("HTTP/1.0 200 OK");
        return ['message' => 'Liste supprimée avec succès'];
    }

}
