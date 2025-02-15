<?php

namespace App\Models;

use \PDO;
use stdClass;
use PDOException;

class GosseryListModel extends SqlConnect {
  public function add(string $title, string $message, string $created_at, int $user_id, int $home_id) {
    $query = 'INSERT INTO messages (title, content, created_at, user_id, home_id)
              VALUES (:title, :content, :created_at, :user_id, :home_id)';

        $stmt = $this->db->prepare($query);
        $stmt->execute([
            ':title' => $title,
            ':content' => $message,
            ':created_at' => $created_at,
            ':user_id' => $user_id,
            ':home_id' => $home_id
        ]);
}

    public function getAll() {
      $req = $this->db->prepare("SELECT * FROM products");
      $req->execute();
      return $req->rowCount() > 0 ? $req->fetchAll(PDO::FETCH_ASSOC) : new stdClass();
    }

}