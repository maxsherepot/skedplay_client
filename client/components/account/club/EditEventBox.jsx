import React from "react";
import * as Yup from "yup";
import {useRouter} from "next/router";
import { Formik } from "formik";
import { BlackPlusSvg } from "icons";
import { Button, TextField, SelectField, TextAreaField, MultiPhotoField } from "UI";
import { getErrors } from "utils";
import {EventForm} from "components/event";
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
                        mode: values.mode,
                        address: values.address,
                        start_date: values.start_date,
                        end_date: values.end_date,
                        days: (values.days || [])
                          .map((checked, day) => checked ? day : null)
                          .filter(day => day !== null),
                        employees_ids: values.employees_ids,
                        event_type_id: values.event_type_id,
                        photos: values.photos instanceof FileList ? values.photos : [],
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
      <div>
          <div className="text-4xl font-extrabold tracking-tighter leading-none mb-5">
              {t('account.update_event')}
          </div>

          <EventForm
            update={true}
            initialValues={initialValues}
            onSubmit={handleSubmits}
          />
      </div>
    );
};

export default EditEventBox;
