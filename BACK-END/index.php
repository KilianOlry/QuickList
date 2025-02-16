<?php

require 'vendor/autoload.php';

use App\Router;
use App\Controllers\GrosseryList;
use App\Controllers\Product;

new Router([

    # GROSSERY LIST ACTIONS
    'grossery_lists/' => GrosseryList::class,
    'grossery_list/:id' => GrosseryList::class,
    'grossery_lists/:add' => GrosseryList::class,
    'grossery_lists/:delete' => GrosseryList::class,
    'grossery_lists/:put' => GrosseryList::class,


    // PRODUCT ACTIONS
    'products/' => Product::class,
    'product/:add' => Product::class,
    'product/:delete' => Product::class,
]);
