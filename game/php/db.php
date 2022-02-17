<?php
// Connexion à la base de données
$db = new PDO('mysql:host=mysql;dbname=mydb;charset=utf8', 'myuser', 'password', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));