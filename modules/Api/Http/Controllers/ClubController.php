<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Club\ClubCreateRequest;
use Modules\Api\Http\Requests\Club\ClubUpdateRequest;
use Modules\Api\Http\Requests\UploadPhotoRequest;
use Modules\Api\Http\Requests\UploadVideoRequest;
use Modules\Users\Entities\Club;
use Modules\Users\Repositories\ClubRepository;

class ClubController extends Controller
{
    use Statusable;

    /**
     * @var ClubRepository
     */
    protected $clubs;

    public function __construct(ClubRepository $repository)
    {
        $this->clubs = $repository;
    }

    /**
     * @param ClubCreateRequest $request
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create(ClubCreateRequest $request)
    {
        /**
         * TODO CLUB POLICY
         */

        return $this->clubs->store($request->user('api'), collect($request->all()));
    }

    /**
     * @param ClubUpdateRequest $request
     * @param Club $club
     * @return array
     */
    public function update(ClubUpdateRequest $request, Club $club)
    {
        /**
         * TODO CLUB POLICY
         */

        $club = $this->clubs->update($club, collect($request->all()));

        return $this->success();
    }

    /**
     * @param UploadPhotoRequest $request
     * @param Club $club
     * @return void
     */
    public function uploadPhoto(UploadPhotoRequest $request, Club $club)
    {
        /**
         * TODO CLUB POLICY
         */

        $this->clubs->saveAttachments($club, $request->files, 'photos');
    }

    /**
     * @param UploadVideoRequest $request
     * @param Club $club
     * @return void
     */
    public function uploadVideo(UploadVideoRequest $request, Club $club)
    {
        /**
         * TODO CLUB POLICY
         */

        $this->clubs->saveAttachments($club, $request->files, 'videos');
    }
}
