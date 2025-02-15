<?php

namespace App\Services;

class FormControl
{

  public function sanitizeInput(array $data) {
    $cleanData = [];
    foreach ($data as $key => $value) {
        $cleanData[$key] = $this->cleanInput($value);
    }
    return $cleanData;
}

  public function cleanInput(string $inputValue) {
    if (!empty($inputValue)) {
      $cleanInput = htmlspecialchars($inputValue);
      return $cleanInput;
    }
    return false;
  }
}
