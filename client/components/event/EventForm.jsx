import React from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import {BlackPlusSvg} from "icons";
import {Button, TextField, SelectField, TextAreaField, MultiPhotoField} from "UI";
import {useTranslation} from "react-i18next";

const EventForm = ({ initialValues, onSubmit }) => {
    const {t, i18n} = useTranslation();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().required(),
                event_type_id : Yup.string().required(),
            })}
            onSubmit={onSubmit}
        >
            {({handleSubmit, isSubmitting, status}) => (
                <form onSubmit={handleSubmit}>
                    <div className="px-2">
                        {status && (
                            <div className="text-dark-green text-white px-1 mb-3">
                                {status}
                            </div>
                        )}

                        <TextField label={t('common.title')} name="title"/>

                        <SelectField
                            label={t('clubs.type')}
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

                        <TextAreaField rows={6} label={t('employees.description')} name="description"/>

                        <div className="flex flex-wrap mb-4">
                            <MultiPhotoField name="photos" label="" selectable={false}>
                                <Button
                                    className="px-3"
                                    level="primary-black"
                                    outline
                                    size="sm"
                                    type="button"
                                >
                                    <div className="flex items-center">
                                        <BlackPlusSvg/>
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
                            {t('act.create')}
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    )
};

export default EventForm;