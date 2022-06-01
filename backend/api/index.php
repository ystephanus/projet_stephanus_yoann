<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Firebase\JWT\JWT;
use Tuupola\Middleware\HttpBasicAuthentication;


require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__  . '/../bootstrap.php';
$app = AppFactory::create();
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();

const JWT_SECRET = "mathieuLeBg65";

function createJWT(Response $response, $login):Response {
    $issuedAt = time();
    
    $expirationTime = $issuedAt + 600;
    
    $payload = array(
        'login' => $login,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}

function getJWTToken($request){
    $payload = str_replace("Bearer ", "", $request->getHeader('Authorization')[0]);
    $token = JWT::decode($payload,JWT_SECRET , array("HS256"));
    return $token; 
}

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login","/api/signup"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];


$app->add(new Tuupola\Middleware\JwtAuthentication($options));

$app->post('/api/hello/{name}',
function (Request $request, Response $response, $args) {
    $response->getBody()->write(json_encode(array('nom' => $args['name'])));
    return $response;
});

$app->get('/api/catalogue/filtre',
    function (Request $request, Response $response, $args){
        global $entityManager;
        $jwt = getJWTToken($request);
        
        $queryParams = $request->getQueryParams();
        $modele = $queryParams['modele'];

        $qb = $entityManager->createQueryBuilder(); 
        
        $qb->select('p')
            ->from('Produit', 'p')
            ->where(
             $qb->expr()->like($qb->expr()->lower('p.marque'), '\''.strtolower($modele).'%\'') 
            );
        
        $response->getBody()->write(json_encode($qb->getQuery()->getArrayResult()));
        return $response;
    }
);

$app->get('/api/catalogue/{idProduit}',
    function(Request $request, Response $response, $args){
        global $entityManager;
        $jwt = getJWTToken($request);
        $id = $args['idProduit'];

        $produit = $entityManager->find('Produit',$id);
        if($produit === null){
            $response = $response->withStatus(500);
        }else{
            $prod = array(
                "idProduit" => $produit->getIdProduit(),
                'modele' => $produit->getModele(),
                'marque' => $produit->getMarque(),
                'prix' => $produit->getPrix()
            );
            $response->getBody()->write(json_encode($prod));
        }
        return $response;
    }
);


$app->get('/api/catalogue',
function(Request $request, Response $response, $args){

    global $entityManager;
    
    $jwt = getJWTToken($request);
    
    $em = $entityManager->getRepository(Produit::class);
    $allProduits = $em->findAll();
    
    $listProduit = array();
    foreach ($allProduits as $produit) {
        $listProduit[] = array(
            "idProduit" => $produit->getIdProduit(),
            "marque" => $produit->getMarque(),
            "modele" => $produit->getModele(),
            "prix" => $produit->getPrix()
        );
    }

    $response->getBody()->write(json_encode($listProduit));
    return $response;
    }
);

$app->get('/api/user', function(Request $request, Response $response, $args){
        $jwt = getJWTToken($request);
        $response->getBody()->write(json_encode(["user"=>$jwt->login]));
        return $response;
    }
);


$app->post('/api/signup', function (Request $request, Response $response, $args)
{
    global $entityManager;
    $body = $request->getParsedBody();


    $username = $body['username'] ?? "";
    $password = $body['password'] ?? "";
    $nom = $body['nom'] ?? "";
    $prenom = $body['prenom'] ?? "";
    $adresse = $body['adresse'] ?? "";
    $ville = $body['ville'] ?? "";
    $cp = $body['codepostal'] ?? "";
    $pays = $body['pays'] ?? "";
    $email = $body['mail'] ?? "";
    $tel = $body['telephone'] ?? "";
    $civilite = $body['civilite'] ?? "";


    $client = new Client();
    
    $client->setNom($nom);
    $client->setPrenom($prenom);
    $client->setCivilite($civilite);
    $client->setAdresse($adresse);
    $client->setCp($cp);
    $client->setVille($ville);
    $client->setPays($pays);
    $client->setTelephone($tel);
    $client->setEmail($email);
    $client->setUsername($username);
    $client->setPassword($password);

    $entityManager->persist($client);
    $entityManager->flush();

    $user = [];
    $user["username"] = $client->getUsername();

    $response->getBody()->write(json_encode($user));
    return $response;

});

$app->post('/api/login', function (Request $request, Response $response, $args) {   
    global $entityManager;
    $err=false;
    $body = $request->getParsedBody();
    $login = $body['login'] ?? "";
    $password = $body['password'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$password))  {
        $err=true;
    }
    if (!$err) {
        $utilisateurRepository = $entityManager->getRepository('Client');
        $utilisateur = $utilisateurRepository->findOneBy(array('username' => $login, 'password' => $password));
        if ($utilisateur && $login == $utilisateur->getUsername() and $password == $utilisateur->getPassword()) {
            $response = createJwT ($response, $login);
            $data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
            $response->getBody()->write(json_encode($data));
        } else {          
            $response = $response->withStatus(401);
        }
    } else {
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->run();