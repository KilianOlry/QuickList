<?php

require 'vendor/autoload.php';

use App\Router;
use App\Controllers\GrosseryList;
use App\Controllers\Product;

new Router([

    # message actions
    'grossery_lists/' => GrosseryList::class,
    'grossery_lists/:add' => GrosseryList::class,
    'grossery_lists/:delete' => GrosseryList::class,


    'products/' => Product::class,
    'product/:add' => Product::class,
]);
