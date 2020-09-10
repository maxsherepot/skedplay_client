<?php

namespace App\Nova\Fields;

use Illuminate\Database\Eloquent\Model;
use Laravel\Nova\Fields\Field;

class Translatable extends \Spatie\NovaTranslatable\Translatable
{
    protected function createTranslatedField(Field $originalField, string $locale): Field
    {
        $translatedField = clone $originalField;

        $originalAttribute = $translatedField->attribute;

        $translatedField->attribute = 'translations';

        $translatedField->name = (count($this->locales) > 1)
            ? ($this->displayLocalizedNameUsingCallback)($translatedField, $locale)
            : $translatedField->name;

        $translatedField
            ->resolveUsing(function ($value, Model $model) use ($translatedField, $locale, $originalAttribute) {
                $translatedField->attribute = 'translations_'.$originalAttribute.'_'.$locale;
                $translatedField->panel = $this->panel;

                if ($locale === config('translatable.fallback_locale')) {
                    $translatedField->rules = array_merge(
                        $translatedField->fallbackLocaleRules ?? [],
                        $translatedField->rules
                    );

                    $translatedField->creationRules = array_merge(
                        $translatedField->creationFallbackLocaleRules ?? [],
                        $translatedField->creationRules
                    );

                    $translatedField->updateRules = array_merge(
                        $translatedField->updateFallbackLocaleRules ?? [],
                        $translatedField->updateRules
                    );
                }

                return $model->translations[$originalAttribute][$locale] ?? '';
            });

        $translatedField->fillUsing(function ($request, $model, $attribute, $requestAttribute) use ($locale, $originalAttribute) {
            $model->setTranslation($originalAttribute, $locale, $request->get($requestAttribute));
        });

        return $translatedField;
    }
}
