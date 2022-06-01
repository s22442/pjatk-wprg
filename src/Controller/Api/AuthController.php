<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AuthController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private UserPasswordHasherInterface $hasher,
        private ValidatorInterface $validator
    ) {
    }

    public function register(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['username']) || empty($data['password'])) {
            throw new BadRequestHttpException();
        }

        $user = new User();
        $user->setUsername($data['username']);
        $user->setPassword($this->hasher->hashPassword($user, $data['password']));

        if (count($this->validator->validate($user)) > 0) {
            throw new UnprocessableEntityHttpException();
        }

        $this->em->persist($user);
        $this->em->flush();

        return $this->redirectToRoute('auth_login', [], 307);
    }
}
