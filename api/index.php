<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Firebase\JWT\JWT;
use Tuupola\Middleware\HttpBasicAuthentication;

require __DIR__ . '/../vendor/autoload.php';
$app = AppFactory::create();

const JWT_TOKEN = "mathieuLeBg65";

function createJWT(Response $res):Response {
    $issuedAt = time();
    
    $expirationTime = $issuedAt + 600;
    
    $payload = array(
        'userid' => 'toto',
        'email' => 'toto@gmail.com',
        'pseudo' => 'totoPseudo',
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer{$token_jwt}");
    return $response;
}

$option = [
    "attribute" => "token",
    "header" => "Auuthorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login","/api/createUser"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type",
        "application/json")->getBody()->write(json_encode($data));
    }
];

$app->add(new Tuupola\Middleware\JwtAuthentication($options));

$app->get('/api/hello/{name}',
    function (Request $resquest, Response $response,$args) {
        $response->getBody()->write(json_encode(array('nom' => $args['name'])));
        return $response;
    }
);

$app->get('/api/user',
    function(Request $req, Response $res, $args){
        $response->getBody()->write(json_encode(array('nom' => 'test')));
        return $response;
    }
);

$app->post('/api/login', 
    function(Request $resquest, Response $response,$args){
        $err = false;
        $body = $resquest->getParsedBody();
        $login = $body['login'] ?? '';
        $pass = $body['pass'] ?? '';

        if(!preg_match("/[a-zA-Z0-9]{1,20}/"), $login){
            $err = true;
        }
        if(!preg_match("/[a-zA-Z0-9]{0-9}/"), $pass){
            $err = true;
        }
        if(!$err){
            $response = createJWT($response);
            $data = ['nom'=> 'toto', 'prenom'=> 'titi'];
            $response->getBody()->write(json_encode($data));
        }else{
            $response = $response->writeStatus(401);
        }
        return $response;
    }
);

$app->run();