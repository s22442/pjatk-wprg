<?php

namespace App\Controller\Api;

use App\Entity\Todo;
use App\Serializer\JsonSerializer;
use App\Service\UserTodosService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TodosController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private ValidatorInterface $validator,
        private SerializerInterface $serializer,
        private UserTodosService $todos,
        private JsonSerializer $json
    ) {
    }

    public function add(Request $request): Response
    {
        $todo = $this->json->deserialize($request->getContent(), Todo::class);
        $this->todos->add($todo);
        return new Response();
    }

    public function update(int $id, Request $request): Response
    {
        $todo = $this->json->deserialize($request->getContent(), Todo::class);
        $this->todos->updateById($id, $todo);
        return new Response();
    }

    public function delete(int $id): Response
    {
        $this->todos->deleteById($id);
        return new Response();
    }

    public function getAll(): Response
    {
        $todos = $this->todos->getAll();
        return $this->json->response($todos);
    }

    public function get(int $id): JsonResponse
    {
        $todo = $this->todos->getById($id);
        return $this->json->response($todo);
    }
}
