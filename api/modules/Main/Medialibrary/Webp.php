<?php declare(strict_types=1);

namespace Modules\Main\Medialibrary;

use Illuminate\Support\Collection;
use Spatie\MediaLibrary\Conversion\Conversion;
use Spatie\MediaLibrary\ImageGenerators\BaseGenerator;

final class Webp extends BaseGenerator
{
    public function convert(string $file, Conversion $conversion = null) : string
    {
        $s = microtime(true);
        $pathToImageFile = pathinfo($file, PATHINFO_DIRNAME).'/'.pathinfo($file, PATHINFO_FILENAME).'.webp';

        $imageType = exif_imagetype($file);

        if ($imageType === IMAGETYPE_JPEG) {
            $image = imagecreatefromjpeg($file);
        } elseif ($imageType === IMAGETYPE_PNG) {
            $image = imagecreatefrompng($file);
        } else {
            throw new \Exception('Supports only jpg and png formats');
        }

        imagewebp($image, $pathToImageFile);

        imagedestroy($image);
        $e = microtime(true);
        \Log::info('---', [$pathToImageFile, $s, $e, round($e - $s, 3)]);

        return $pathToImageFile;
    }

    public function requirementsAreInstalled() : bool
    {
        if (! function_exists('imagewebp')) {
            return false;
        }

        if (! function_exists('imagepng')) {
            return false;
        }

        if (! function_exists('imagejpeg')) {
            return false;
        }

        return true;
    }

    public function supportedExtensions(): Collection
    {
        \Log::info('---supportedExtensions');
        return collect(['png', 'jpg', 'jpeg']);
    }

    public function supportedMimeTypes(): Collection
    {
        \Log::info('---supportedMimeTypes');
        return collect(['image/jpeg', 'image/png']);
    }
}
