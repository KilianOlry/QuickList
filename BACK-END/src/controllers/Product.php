<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\ProductModel;
use App\Services\FormControl;

class Product extends Controller{
    protected object $product;
    public $formControl;

    public function __construct($param) {
        $this->product = new ProductModel();

        parent::__construct($param);
    }

    public function postProduct() {
        $this->formControl = new FormControl();

        if (in_array('add', $this->params)) {
            $cleanBody = $this->formControl->sanitizeInput($this->body);

            if (in_array(false, $cleanBody)) {

                header("HTTP/1.0 406 Not Acceptable");
                return ['message' => 'Erreur veuillez remplir tous les champs'];
            }

            $this->product->add($cleanBody['name'], $cleanBody['description'], $cleanBody['id']);

            header("HTTP/1.0 200 OK");
            return ['message' => 'Produit ajouté avec succès'];

        }

    }

    public function deleteMessage() {
        return $this->message->delete(intval($this->params['id']));
    }

    public function getProduct() {

        return $this->product->getAll();
    }

}