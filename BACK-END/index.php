<?php

require 'vendor/autoload.php';

use App\Router;
use App\Controllers\GrosseryList;

new Router([

  # message actions
  'grossery_lists/' => GrosseryList::class,
  'grossery_lists/:add' => GrosseryList::class,
]);
