<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
    'driver' => 'pdo_pgsql',
    'user' => 'nqvgbfidervdaw',
    'password' => 'ff51d370e95f40be621b8084f9df681712128d4f7d617a188c97b13f16e2b894',
    'dbname' => 'dalm619qmh6qlr',
    'port' => '5432',
    'host' => 'ec2-54-165-90-230.compute-1.amazonaws.com'
);
$entityManager = EntityManager::create($conn, $config);