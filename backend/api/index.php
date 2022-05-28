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
    var_dump($request->getParsedBody());
    $response->getBody()->write(json_encode(array('nom' => $args['name'])));
    return $response;
});

$app->get('/api/catalogue',
function(Request $request, Response $response, $args){
    global $entityManager;

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

$app->get('/api/catalogue/{filter}',
    function (Request $request, Response $response, $args){
        $products = [
            ["marque"=> "Buggati", "modele"=> "veyron", "prix" => 2000000, "detail"=> "Bugatti Veyron. La Veyron 16.4 (/vɛʁɔ̃/) est une supercar du constructeur automobile français Bugatti produite de 2005 à 2015, atteignant la vitesse de 431,072 km/h dans sa version Super Sport, elle était alors la voiture de série la plus rapide du monde. ... Les premiers exemplaires sont sortis d'usine le 19 avril 2005 ."],
            ["marque"=> "Buggati", "modele"=> "chiron","prix"=> 2600000, "detail"=> "La Chiron est une supercar du constructeur automobile français Bugatti (acquis en 1998 par le groupe allemand Volkswagen), descendante annoncée de la Bugatti Veyron 16.4. ... Elle tient son nom du pilote automobile monégasque Louis Chiron (1899-1979)"],
            ["marque"=> "Porsche", "modele"=>"911","prix"=> 113000, "detail"=> "La Porsche 911 est une voiture de sport haut de gamme fabriquée par la firme allemande Porsche. La première génération est commercialisée en 1964, intégralement conçue par la firme de Stuttgart. Cinquante ans plus tard, le modèle emblématique de Porsche en conserve l'esthétique générale et le nom. La 911 est toujours produite et commercialisée dans sa dernière version en date, la 992. L'architecture du moteur est restée inchangée jusqu'à aujourd'hui. Il s'agit du 6-cylindres à plat (flat-six), disposé en porte-à-faux arrière."],
            ["marque"=> "Alipne", "modele"=> "A110","prix"=> 60000, "detail"=> "L'Alpine A110 est une voiture sportive française développée par Jean Rédélé et fabriquée à Dieppe par Alpine entre 19621 et 19771 à partir de mécaniques Renault. Célèbre sous la forme de berlinette, l'A110 a été championne des rallyes en 1971 et 1973."],
            ["marque"=> "lamborghini", "modele"=> "Aventador", "prix"=>340000, "detail"=> "La Lamborghini Aventador LP700-4 (700 ch), connue en interne sous les codes « LB834 » (coupé) et « LB835 » (roadster), est une supercar développée par le constructeur automobile italien Lamborghini produite de 2011 à 20211. Dévoilée au salon de Genève 2011, elle remplace la Lamborghini Murciélago."],
            ["marque"=> "Ferrari", "modele"=> "458 Italia", "prix"=> 163000, "detail"=> "La 458 Italia est une voiture de sport produite par le constructeur italien Ferrari. Les deux premiers chiffres de son nom indiquent la cylindrée du moteur et le dernier, le nombre de cylindres. Le nom « Italia », succédant à « Modena » et « Maranello », rappelle les origines géographiques de la marque."],
            ["marque"=> "Mercedes", "modele"=> "AMG gt", "prix"=>120000, "detail"=> "La Mercedes-AMG GT est une voiture sportive produite par le constructeur automobile allemand Mercedes-AMG de 2014 à 2021. Il s'agit de la seconde voiture de sport développée complètement en interne après la Mercedes-Benz SLS AMG."],
            ["marque"=> "Mclaren", "modele"=> "victor", "prix"=> 1685000, "detail"=> "La Senna (code interne P15) est une supercar du constructeur automobile britannique Mclaren présentée le 10 décembre 20172."]  
        ];
        $filtre = $args['filter'];
        $filterArray = array_filter($products, function($var) use($filtre){
            return str_starts_with($var['marque'], ucfirst($filtre));
        }); 
        $response->getBody()->write(json_encode($filterArray));
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
        $utilisateurRepository = $entityManager->getRepository(Client::class);
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

$app->run();