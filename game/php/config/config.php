<?php

// DATABASE DETAILS CONSTANT
define('DB_HOST', 'localhost');
define('DB_USER', 'YOUR_USERNAME');
define('DB_PASS', 'YOUR_PASS');
define('DB_NAME', 'YOUR_DATABASE_NAME');
define('DB_CHAR', 'utf8mb4');

// APP ROOT

define('APP_ROOT', dirname(dirname(__FILE__)));

// URL ROOT e.g http://example.com/
$root_url = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';
define("URL_ROOT", $root_url);

// SITE NAME e.g example
$hostname = getenv('SERVER_NAME');
$cleanup = explode('.', $hostname);
define("SITE_NAME", $cleanup[0]);
