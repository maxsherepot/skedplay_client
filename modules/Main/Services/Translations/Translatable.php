<?php declare(strict_types=1);

namespace Modules\Main\Services\Translations;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;
use Modules\Main\Services\Translations\Traits\Relationship;

trait Translatable
{
    use Relationship;

    public static function bootTranslatable(): void
    {
        static::saved(function (Model $model) {
            /* @var Translatable $model */
            return $model->saveTranslations();
        });

        static::updated(function (Model $model) {
            /* @var Translatable $model */
            return $model->saveTranslations();
        });
    }

    public function setAttribute($key, $value)
    {
        [$attribute, $locale] = $this->getAttributeAndLocale($key);

        if ($this->isTranslationAttribute($attribute)) {

            $translation = $this->getTranslationOrNew($attribute, $locale);
            $translation->key = $attribute;
            $translation->value = $value;

            return $this;
        }


        return parent::setAttribute($key, $value);
    }

    public function getNewTranslation(string $locale): Model
    {
        $modelName = $this->getTranslationModelName();

        /** @var Model $translation */
        $translation = new $modelName();
        $translation->setAttribute($this->getLocaleKey(), $locale);

        $this->translations->add($translation);
        return $translation;
    }

    public function getTranslation(?string $attribute = null, ?string $locale = null): ?Model
    {
        if ($translation = $this->getTranslationByAttribute($attribute, $locale)) {
            return $translation;
        }

        return null;
    }

    private function getTranslationByAttribute(string $attribute, string $locale): ?Model
    {
        /** @var Model $translation */
        foreach ($this->translations as $translation) {
            if ($translation->getAttribute('key') == $attribute
                && $translation->getAttribute($this->getLocaleKey()) == $locale) {
                return $translation;
            }
        }
        return null;
    }

    public function getTranslationOrNew(?string $attribute = null, ?string $locale = null): ?Model
    {
        $locale = $locale ?: $this->locale();

        if (($translation = $this->getTranslation($attribute, $locale)) === null) {
            $translation = $this->getNewTranslation($locale);
        }

        return $translation;
    }

    public function isTranslationAttribute(string $key): bool
    {
        return in_array($key, $this->translatable);
    }

    protected function isTranslationDirty(Model $translation): bool
    {
        $dirtyAttributes = $translation->getDirty();
        unset($dirtyAttributes[$this->getLocaleKey()]);
        return count($dirtyAttributes) > 0;
    }

    private function getAttributeAndLocale(string $key): array
    {
        if (Str::contains($key, ':')) {
            return explode(':', $key);
        }
        return [$key, $this->locale()];
    }

    protected function saveTranslations(): bool
    {
        $saved = true;
        if (!$this->relationLoaded('translations')) {
            return $saved;
        }

        /** @var Model $translation */
        foreach ($this->translations as $translation) {
            if ($saved && $this->isTranslationDirty($translation)) {
                if (!empty($connectionName = $this->getConnectionName())) {
                    $translation->setConnection($connectionName);
                }

                $translation->setAttribute('entity_type', self::MORPH_TYPE);
                $translation->setAttribute('entity_id', $this->getKey());
                $saved = $translation->save();
            }
        }
        return $saved;
    }

    public function getLocaleKey(): string
    {
        return $this->localeKey ?: 'locale';
    }

    protected function locale(): string
    {
        return Config::get('app.locale');
    }
}