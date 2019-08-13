<?php declare(strict_types=1);

namespace Modules\Common\Contracts;

interface HasMediable
{
    const UPLOAD_FILE_SUCCESS = 'upload.file.success';
    const UPLOAD_FILE_FAILED = 'upload.file.failed';

    const DELETE_FILE_SUCCESS = 'delete.file.success';
    const DELETE_FILE_FAILED = 'delete.file.failed';
}