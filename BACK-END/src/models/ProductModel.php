<?php

namespace App\Models;

use \PDO;
use stdClass;
use PDOException;

class ProductModel extends SqlConnect {
    public function add(string $name, string $description, string $list_id) {
        $query = 'INSERT INTO products (name, description, list_id) VALUES (:name, :description, :list_id)';
        $stmt = $this->db->prepare($query);
        $stmt->execute([
            ':name' => $name,
            ':description' => $description,
            ':list_id' => $list_id,
        ]);
    }

    public function getAll() {
        $req = $this->db->prepare("SELECT * FROM products");
        $req->execute();
        return $req->rowCount() > 0 ? $req->fetchAll(PDO::FETCH_ASSOC) : new stdClass();
    }

    public function delete(int $id) {
        $query = 'DELETE FROM products WHERE id = :id';
        $stmt = $this->db->prepare($query);
        $stmt->execute([
            ':id' => $id,
        ]);
        return true;
    }

}