<?php

namespace Modules\Api\Http\Requests;

use Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;

class FileUploadRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $photoRules = [
            'file' => 'required|file|mimes:jpeg,jpg,png|max:4000',
        ];
        $videoRules = [
            'file' => 'required|file|mimes:avi,mpeg,quicktime,mp4',
        ];

        switch ($this->request->get('collection')) {
            case Club::LOGO_COLLECTION:
            case Club::PHOTO_COLLECTION:
            case Employee::PHOTO_COLLECTION:
            case Event::MAIN_PHOTO_COLLECTION:
                return $photoRules;
            case Club::VIDEO_COLLECTION:
            case Employee::VIDEO_COLLECTION:
                return $videoRules;
            default:
                return [
                    'collection' => 'required'
                ];
                break;
        }
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
