<?php

function isValidTimeStamp($timestamp)
{
    return ((string) (int) $timestamp === $timestamp) 
        && ($timestamp <= PHP_INT_MAX)
        && ($timestamp >= ~PHP_INT_MAX);
}

function getScores()
{
    require_once('db.php');
    $sql = "SELECT * FROM score ORDER BY timer ASC";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $html = '';
    foreach($scores as $score) {
        $html .= '<p>#'.$score['id']. ' - ' . gmdate("i:s", $score['timer']) . '</p>';
    }
    if(sizeof($scores) === 0) {
        $html .= '<p>Aucun score enregistré</p>';
    }
    return $html;
}