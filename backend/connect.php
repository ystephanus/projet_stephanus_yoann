<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'driver' => 'pdo_pgsql',
'user' => 'nzaicbgagiudap',
'password' => '36b8e38f851aa631b653e0a777eaefbd0bb1afde2ce6a26aafcce6c40ad5d324',
'dbname' => 'd5qtcleogtceuu',
'port' => '5432',
'host' => 'ec2-63-35-156-160.eu-west-1.compute.amazonaws.com'
);
$entityManager = EntityManager::create($conn, $config);