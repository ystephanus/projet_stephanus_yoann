<?php
use Doctrine\ORM\Tools\Console\ConsoleRunner;

require_once 'connect.php';

return ConsoleRunner::createHelperSet($entityManager);