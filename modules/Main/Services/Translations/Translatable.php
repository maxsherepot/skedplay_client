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
    }

    public function setAttribute($key, $value)
    {
        [$attribute, $locale] = $this->getAttributeAndLocale($key);

        /**
         * Attach $attribute -> $value to new translation
         */

        if ($this->isTranslationAttribute($attribute)) {
            $translation = $this->getTranslationOrNew($locale);

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

    /**
     * @param string|null $locale
     * @return Model|null
     */
    public function getTranslation(?string $locale = null): ?Model
    {
        $locale = $locale ?: $this->locale();

        if ($translation = $this->getTranslationByLocaleKey($locale)) {
            return $translation;
        }

        return null;
    }

    private function getTranslationByLocaleKey(string $key): ?Model
    {
        foreach ($this->translations as $translation) {
            if ($translation->getAttribute($this->getLocaleKey()) == $key) {
                return $translation;
            }
        }
        return null;
    }

    public function getTranslationOrNew(?string $locale = null): Model
    {
        $locale = $locale ?: $this->locale();

        if (($translation = $this->getTranslation($locale)) === null) {
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
        /** @var Model $this */
        foreach ($this->translations as $translation) {
            if ($saved && $this->isTranslationDirty($translation)) {
                if (!empty($connectionName = $this->getConnectionName())) {
                    $translation->setConnection($connectionName);
                }

                /**
                 * Todo: add entity info
                 * entity_id
                 * entity_type
                 */
//                $translation->setAttribute($this->getTranslationRelationKey(), $this->getKey());
                $saved = $translation->save();
            }
        }
        return $saved;
    }

    /**
     * @internal will change to protected
     */
    public function getLocaleKey(): string
    {
        return $this->localeKey ?: 'locale';
    }

    protected function locale(): string
    {
        return Config::get('app.locale');
    }
}