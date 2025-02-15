<?php

namespace App;

class Router {
    protected array $routes;
    protected string $url;

    public function __construct(array $routes) {
        $this->routes = $routes;
        $this->url = $_SERVER['REQUEST_URI'];
        $this->run();
    }

    protected function extractParams($url, $rule) {
        $params = [];
        $urlParts = explode('/', trim($url, '/'));
        $ruleParts = explode('/', trim($rule, '/'));

        foreach ($ruleParts as $index => $rulePart) {
            if (strpos($rulePart, ':') === 0 && isset($urlParts[$index])) {
                $paramName = substr($rulePart, 1);
                $params[$paramName] = $urlParts[$index];
            }
        }

        return $params;
    }

    protected function matchRule($url, $rule) {
        $urlParts = explode('/', trim($url, '/'));
        $ruleParts = explode('/', trim($rule, '/'));

        if (count($urlParts) !== count($ruleParts)) {
            return false;
        }

        foreach ($ruleParts as $index => $rulePart) {
            if ($rulePart !== $urlParts[$index] && strpos($rulePart, ':') !== 0) {
                return false;
            }
        }

        return true;
    }

    protected function run() {
        $is404 = true;
        $url = parse_url($this->url, PHP_URL_PATH);

        // Vérifie si la requête est une requête OPTIONS
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            $this->handleOptionsRequest();
            return;
        }

        // Si ce n'est pas une requête OPTIONS, passe à la recherche de la route
        foreach ($this->routes as $route => $controller) {
            if ($this->matchRule($url, $route)) {
                $params = $this->extractParams($url, $route);
                new $controller($params);
                $is404 = false;
                break;
            }
        }

        if ($is404) {
            $this->sendNotFoundResponse();
        }
    }

    protected function handleOptionsRequest() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        http_response_code(200);
        exit;
    }

    protected function sendNotFoundResponse() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.0 404 Not Found');

        echo json_encode([
            'code' => '404',
            'message' => 'Not Found'
        ]);
    }
}
