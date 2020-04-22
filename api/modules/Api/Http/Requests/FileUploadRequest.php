<?php

namespace Modules\Api\Http\Requests;

use Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;
use Modules\Users\Entities\User;

class FileUploadRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = collect();

        $photoRules = [
            'file' => 'required|file|mimes:jpeg,jpg,png|max:10000',
        ];
        $videoRules = [
            'file' => 'required|file|mimes:avi,mpeg,quicktime,mp4|max:100000',
        ];

        switch ($this->request->get('collection')) {
            case Club::LOGO_COLLECTION:
            case Club::PHOTO_COLLECTION:
            case Employee::PHOTO_COLLECTION:
            case Employee::AVATAR_COLLECTION:
            case User::PHOTO_AVATAR:
            case Event::MAIN_PHOTO_COLLECTION:
                $rules->push($photoRules);
                break;
            case Club::VIDEO_COLLECTION:
            case Employee::VIDEO_COLLECTION:
                $rules->push($videoRules);
                break;
            default:
                $rules->push([
                    'collection' => 'required'
                ]);
                break;
        }

        return $rules->toArray();

    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}
