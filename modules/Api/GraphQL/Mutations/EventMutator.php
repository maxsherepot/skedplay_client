<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Modules\Main\Repositories\EventRepository;
use Modules\Users\Entities\User;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class EventMutator extends BaseMutation
{
    /**
     * @var User
     */
    private $user;

    /**
     * @var array
     */
    private $rules;

    /**
     * @var EventRepository
     */
    private $eventRepository;

    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
        $this->user = request()->user('api');
        $this->rules = $this->rules();
    }

    public function rules(): array
    {
        return [
            'title'         => 'required|string|max:255',
            'description'   => 'required|string',
            'event_type_id' => 'required|integer|exists:event_types',
        ];
    }

    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function uploadMainPhoto($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $this->eventRepository->saveFile($this->user, $args['file'], 'main_photo');
    }
}
