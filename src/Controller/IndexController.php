<?php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class IndexController extends AbstractController
{
    private $jwt;

    public function __construct(JWTTokenManagerInterface $jwt)
    {
        $this->jwt = $jwt;
    }

    public function index(): Response
    {
        $user = $this->getUser();

        if ($user) {
            return $this->render('index.html.twig', ['token' => $this->jwt->create($user)]);
        }

        return $this->render('index.html.twig');
    }
}
