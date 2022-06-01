<?php

namespace App\Listener;

use Doctrine\DBAL\Exception\DriverException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ExceptionListener
{
    public function onKernelException(ExceptionEvent $event)
    {
        $exception = $event->getThrowable();

        $event->setResponse(new Response(
            status:match(true) {
                $exception instanceof BadRequestHttpException => Response::HTTP_BAD_REQUEST,
                $exception instanceof AccessDeniedHttpException => Response::HTTP_FORBIDDEN,
                $exception instanceof NotFoundHttpException => Response::HTTP_NOT_FOUND,
                $exception instanceof UnprocessableEntityHttpException => Response::HTTP_UNPROCESSABLE_ENTITY,
                $exception instanceof DriverException => Response::HTTP_UNPROCESSABLE_ENTITY,
            default=> Response::HTTP_INTERNAL_SERVER_ERROR
            }
        ));
    }
}
