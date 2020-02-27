import React from "react";
import * as Yup from "yup";
import {useRouter} from "next/router";
import { Formik } from "formik";
import { BlackPlusSvg } from "icons";
import { Button, TextField, SelectField, TextAreaField, MultiPhotoField } from "UI";
import { getErrors } from "utils";
import {useTranslation} from "react-i18next";

const EditEventBox = ({ initialValues, onSubmit }) => {
    const router = useRouter();
    const {t, i18n} = useTranslation();

    const handleSubmits = async (
        values,
        { setSubmitting, setErrors, setError, setStatus }
    ) => {
        try {
            const { data: { updateEvent } = {} } = await onSubmit({
                variables: {
                    event: initialValues.id,
                    input: {
                        title: values.title,
                        description: values.description,
                        event_type_id: values.event_type_id,
                        photos: values.photos,
                    }
                }
            });

            if (updateEvent && updateEvent.status) {
                router.back();
            } else {
                setError(updateEvent.message);
            }
        } catch (e) {
            if (getErrors(e) instanceof Object) {
                setErrors(getErrors(e));
            }
        }

        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
                title: Yup.string().required(),
            })}
            onSubmit={handleSubmits}
        >
            {({ handleSubmit, isSubmitting, status }) => (
                <form onSubmit={handleSubmit}>
                    <div className="px-2">
                        {status && (
                            <div className="text-dark-green text-white px-1 mb-3">
                                {status}
                            </div>
                        )}

                        <TextField label={t('common.title')} name="title" />

                        <SelectField
                            label={t('common.type')}
                            name="event_type_id"
                            options={[
                                {
                                    label: t('account.event_type.special_day'),
                                    value: 1
                                },
                                {
                                    label: t('account.event_type.parties_and_shows'),
                                    value: 2
                                },
                                {
                                    label: t('account.event_type.discount'),
                                    value: 3
                                }
                            ]}
                            placeholder=""
                        />

                        <TextAreaField rows={6} label={t('employees.description')} name="description" />

                        <div className="flex flex-wrap mb-4">
                            <MultiPhotoField name="photos" label="" initialValues={initialValues.photos} selectable={false}>
                                <Button
                                    className="px-3"
                                    level="primary-black"
                                    outline
                                    size="sm"
                                    type="button"
                                >
                                    <div className="flex items-center">
                                        <BlackPlusSvg />
                                        <span className="ml-2">{t('account.from_device')}</span>
                                    </div>
                                </Button>
                            </MultiPhotoField>
                        </div>

                        <Button
                            type="submit"
                            className="px-8"
                            size="sm"
                            disabled={isSubmitting}
                        >
                            {t('account.save_changes')}
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default EditEventBox;
