<?php

namespace Modules\Api\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Employees\Entities\Employee;

class FileUploadRequest extends FormRequest
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
            case Employee::EMPLOYEE_PHOTO_COLLECTION:
                return $photoRules;
            case Employee::EMPLOYEE_VIDEO_COLLECTION:
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
