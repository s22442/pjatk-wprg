<?php

namespace App\Serializer;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class JsonSerializer
{
    public function __construct(
        private SerializerInterface $serializer
    ) {
    }

    public function deserialize(string $json, string $class)
    {
        return $this->serializer->deserialize(
            $json,
            $class,
            JsonEncoder::FORMAT,
            [AbstractNormalizer::ALLOW_EXTRA_ATTRIBUTES => false]
        );
    }

    public function response(mixed $object): JsonResponse
    {
        return new JsonResponse(
            $this->serializer->serialize($object, JsonEncoder::FORMAT),
            json:true
        );
    }
}
