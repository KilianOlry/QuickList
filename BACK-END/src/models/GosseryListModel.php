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
        $query = 'SELECT 
                lists.id AS list_id, 
                lists.title AS list_title, 
                lists.date AS list_date, 
                products.id AS product_id, 
                products.name AS product_name, 
                products.description AS product_description 
              FROM lists 
              LEFT JOIN products ON lists.id = products.list_id';

      $req = $this->db->prepare($query);
        try {
            $req->execute();
            $results = $req->fetchAll(PDO::FETCH_ASSOC);
            $lists = [];

            foreach ($results as $row) {
                $listId = $row['list_id'];

                if (!isset($lists[$listId])) {
                    $lists[$listId] = [
                        'list_id' => $row['list_id'],
                        'list_title' => $row['list_title'],
                        'list_date' => $row['list_date'],
                        'products' => []
                    ];
                }

                if ($row['product_id']) {
                    $lists[$listId]['products'][] = [
                        'product_id' => $row['product_id'],
                        'product_name' => $row['product_name'],
                        'product_description' => $row['product_description']
                    ];
                }
            }
            return array_values($lists);
        } catch (PDOException $e) {
            echo "Erreur : " . $e->getMessage();
            return new stdClass();
        }
      return $req->rowCount() > 0 ? $req->fetchAll(PDO::FETCH_ASSOC) : new stdClass();
    }

    public function getById(int $id) {
      $query = 'SELECT * FROM lists WHERE id = :id';
      $req = $this->db->prepare($query);
      $req->execute([
          ':id' => $id,
      ]);
        return $req->rowCount() > 0 ? $req->fetchAll(PDO::FETCH_ASSOC) : new stdClass();
    }

    public function update(string $id, ?string $title, ?string $date): mixed {
        $recordToUpdate = $this->getById($id);
        $updateFields = [];
        $params = [];

        if ($recordToUpdate['title'] !== $title) {
            $updateFields[] = 'title = :title';
            $params[':title'] = $title;
        }

        if ($date !== "" && $recordToUpdate['date'] !== $date) {
            $updateFields[] = 'date = :date';
            $params[':date'] = $date ?: null;
        }

        if (empty($updateFields)) {
            return null;
        }

        $query = 'UPDATE lists SET ' . implode(', ', $updateFields) . ' WHERE id = :id';
        $stmt = $this->db->prepare($query);

        $params[':id'] = $id;

        $stmt->execute($params);

        return true;
    }


    public function delete(int $id) {
      $query = 'DELETE FROM lists WHERE id = :id';
      $stmt = $this->db->prepare($query);
      $stmt->execute([
          ':id' => $id,
      ]);

    }

}