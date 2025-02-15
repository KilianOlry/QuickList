<?php

namespace App\Models;

use \PDO;
use stdClass;
use PDOException;

class GosseryListModel extends SqlConnect {
  public function add(string $title, string $date, string $created_at) {
    $query = 'INSERT INTO lists (title, date, created_at) VALUES (:title, :date, :created_at)';
    $stmt = $this->db->prepare($query);
    $stmt->execute([
        ':title' => $title,
        ':date' => $date,
        ':created_at' => $created_at,
    ]);
}

    public function getAll() {
      $req = $this->db->prepare("SELECT * FROM lists");
      $req->execute();
      return $req->rowCount() > 0 ? $req->fetchAll(PDO::FETCH_ASSOC) : new stdClass();
    }

}