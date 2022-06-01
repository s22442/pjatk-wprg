<?php

namespace App\Service;

use App\Entity\Todo;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserTodosService
{
    /** @var User */
    private $user;

    public function __construct(
        private EntityManagerInterface $em,
        private ValidatorInterface $validator,
        Security $security
    ) {
        $this->user = $security->getUser();
    }

    public function getAll()
    {
        return $this->user->getTodos();
    }

    public function getById(int $id)
    {
        $todo = $this->em->getRepository(Todo::class)->findOneById($id);

        if (empty($todo) || $todo->getUser() !== $this->user) {
            throw new NotFoundHttpException();
        }

        return $todo;
    }

    public function add(Todo $todo)
    {
        if (count($this->validator->validate($todo)) > 0) {
            throw new UnprocessableEntityHttpException();
        }

        $this->user->addTodo($todo);

        $this->em->persist($todo);
        $this->em->flush();
    }

    public function updateById(int $id, Todo $newTodo): void
    {
        $todo = $this->getById($id);

        $todo->setTitle($newTodo->getTitle());
        $todo->setBody($newTodo->getBody());

        if (count($this->validator->validate($todo)) > 0) {
            throw new UnprocessableEntityHttpException();
        }

        $this->em->persist($todo);
        $this->em->flush();
    }

    public function deleteById(int $id): void
    {
        $todo = $this->getById($id);

        if (empty($todo)) {
            throw new NotFoundHttpException();
        }

        $this->em->remove($todo);
        $this->em->flush();
    }
}
