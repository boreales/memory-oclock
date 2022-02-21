<?php
//Ce fichier nous permet d'accéder aux classes des modules installés via Composer et va nous servir à charger la classe Dotenv
require(__DIR__.'/../vendor/autoload.php');

//On récupère nos infos de connexion à la base de données depuis notre fichier .env à la racine du projet grâce à la dépendance phpdotenv précédemment installée via composer
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Connexion à la base de données
$db = new PDO('mysql:host=mysql;dbname='.$_ENV['DB_NAME'].';charset=utf8', $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));