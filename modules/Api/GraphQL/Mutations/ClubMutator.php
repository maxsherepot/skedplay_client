<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Modules\Main\Repositories\ClubRepository;
use GraphQL\Type\Definition\ResolveInfo;
use Modules\Users\Entities\User;
use Modules\Main\Entities\Club;

class ClubMutator extends BaseMutation
{
    /**
     * @var ClubRepository
     */
    private $clubRepository;

    /**
     * @var User
     */
    private $user;

    /**
     * @var array
     */
    private $rules;

    public function __construct(ClubRepository $clubRepository)
    {
        $this->clubRepository = $clubRepository;
        $this->user = request()->user('api');
        $this->rules = $this->rules();
    }

    public function rules(): array
    {
        return [
            'name'        => 'string|max:255',
            'type'        => 'nullable|string|max:255',
            'address'     => 'nullable|string|max:255',
            'website'     => 'nullable|string|max:255',
            'phone'       => 'nullable|string',
            'description' => 'nullable|string',
            'lat'         => 'string|nullable',
            'lng'         => 'string|nullable',
        ];
    }

    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return \Modules\Main\Entities\Club
     * @throws \Exception
     */
    public function create($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): Club
    {
        $data = collect($args['input']);

        $this->validation($data, $this->rules);
        $club = $this->clubRepository->store($this->user, $data);

        return $club;
    }

    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): array
    {
        $data = collect($args);

        $this->validation($data, $this->rules);

        $club = $this->clubRepository->getById($args['id']);
        $result = $this->clubRepository->update($club, $data);

        return $result ? $this->success() : $this->fail();
    }

    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function uploadPhotos($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $this->clubRepository->saveAttachments($this->user, $args['files'], 'photos');
    }

    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function uploadVideos($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $this->clubRepository->saveAttachments($this->user, $args['files'], 'videos');
    }
}
